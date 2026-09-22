#!/usr/bin/env python3
import concurrent.futures
import json
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
AUDIT = pathlib.Path('/tmp/baidu_song_audit')
rows = json.loads((AUDIT / 'song_asset_matches_final.json').read_text())['rows']
items = json.loads((AUDIT / 'tree.json').read_text())['items']
files = [item for item in items if not item.get('isdir')]
out_dir = ROOT / 'public' / 'previews'
out_dir.mkdir(parents=True, exist_ok=True)

def find_file(path: str):
    if not path:
        return None
    suffix = '/' + path
    return next((item for item in files if item.get('path', '').endswith(suffix) and item.get('thumbs')), None)

def child_images(folder: str):
    if not folder:
        return []
    suffix = '/' + folder
    children = [item for item in files if item.get('_parent', '').endswith(suffix) and item.get('thumbs')]
    children.sort(key=lambda item: item.get('server_filename', ''))
    return children[:4]

def preview_url(item):
    thumbs = item.get('thumbs', {})
    return thumbs.get('url3') or thumbs.get('url2') or thumbs.get('url1') or thumbs.get('icon')

tasks = []
manifest = {}
for row in rows:
    song_id = f"song-{row['no']:03d}"
    entry = {'poster': '', 'lyric': '', 'flashcards': []}
    video = find_file(row.get('video_path', ''))
    if video:
        rel = f'previews/posters/{song_id}.jpg'
        tasks.append((preview_url(video), ROOT / 'public' / rel))
        entry['poster'] = '/' + rel
    lyric = find_file(row.get('lyric_path', ''))
    if lyric:
        rel = f'previews/lyrics/{song_id}.jpg'
        tasks.append((preview_url(lyric), ROOT / 'public' / rel))
        entry['lyric'] = '/' + rel
    for index, flash in enumerate(child_images(row.get('flash_jpg_folder', '')), start=1):
        rel = f'previews/flashcards/{song_id}-{index}.jpg'
        tasks.append((preview_url(flash), ROOT / 'public' / rel))
        entry['flashcards'].append('/' + rel)
    manifest[song_id] = entry

def fetch(task):
    url, target = task
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists() and target.stat().st_size > 1000:
        return True, str(target)
    try:
        request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=25) as response:
            data = response.read()
        if len(data) < 1000:
            raise RuntimeError(f'short response: {len(data)} bytes')
        target.write_bytes(data)
        return True, str(target)
    except Exception as exc:
        return False, f'{target}: {exc}'

failures = []
with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
    for ok, message in pool.map(fetch, tasks):
        if not ok:
            failures.append(message)

lines = [
    'export type SongPreview = { poster: string; lyric: string; flashcards: string[] };',
    '',
    'export const SONG_PREVIEWS: Record<string, SongPreview> = ' + json.dumps(manifest, ensure_ascii=False, indent=2) + ';',
    '',
]
(ROOT / 'src' / 'data' / 'previewData.ts').write_text('\n'.join(lines))
print(json.dumps({'tasks': len(tasks), 'failures': len(failures), 'manifest': len(manifest)}, ensure_ascii=False))
for failure in failures[:20]:
    print(failure)
