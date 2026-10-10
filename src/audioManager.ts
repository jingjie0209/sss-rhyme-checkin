// Global audio manager: only one audio can play at a time.
export type AudioInfo = {
  playing: boolean;
  songId: string | null;
  title: string;
  source: string;
  index: number;
  total: number;
};

type Listener = (info: AudioInfo) => void;

let playlist: { songId: string; src: string; title: string; source: string }[] = [];
let index = -1;
let el: HTMLAudioElement | null = null;
let listeners: Listener[] = [];

function info(): AudioInfo {
  return {
    playing: !!el && !el.paused && !el.ended,
    songId: index >= 0 ? playlist[index]?.songId ?? null : null,
    title: index >= 0 ? playlist[index]?.title ?? "" : "",
    source: index >= 0 ? playlist[index]?.source ?? "" : "",
    index,
    total: playlist.length,
  };
}

function notify() {
  const i = info();
  listeners.forEach((fn) => fn(i));
}

function loadIndex(nextIndex: number, autoplay = true) {
  if (!playlist.length) return;
  if (nextIndex < 0) nextIndex = playlist.length - 1;
  if (nextIndex >= playlist.length) nextIndex = 0;
  index = nextIndex;
  const item = playlist[index];
  if (!el) el = new Audio();
  el.src = item.src;
  if (autoplay) el.play().catch(() => {});
  notify();
}

export function audioManagerSetPlaylist(
  tracks: { songId: string; src: string; title: string; source: string }[],
  startIndex = 0,
  autoplay = true,
) {
  if (el) {
    el.pause();
    el.removeEventListener("ended", onEnded);
  }
  playlist = tracks;
  if (!tracks.length) {
    index = -1;
    notify();
    return;
  }
  el = el ?? new Audio();
  el.addEventListener("ended", onEnded);
  loadIndex(startIndex, autoplay);
}

export function audioManagerPlayAt(index: number) {
  loadIndex(index, true);
}

export function audioManagerNext() {
  if (index < 0) return;
  loadIndex(index + 1, true);
}

export function audioManagerPrevious() {
  if (index < 0) return;
  loadIndex(index - 1, true);
}

export function audioManagerPause() {
  el?.pause();
  notify();
}

export function audioManagerResume() {
  el?.play().catch(() => {});
  notify();
}

export function audioManagerStop() {
  if (el) {
    el.pause();
    el.removeEventListener("ended", onEnded);
    el.currentTime = 0;
  }
  playlist = [];
  index = -1;
  notify();
}

// Keep this export for existing callers that need to interrupt playback.
export function audioManagerPlay(songId: string, src: string, title: string, source: string) {
  audioManagerSetPlaylist([{ songId, src, title, source }], 0, true);
}

function onEnded() {
  if (index + 1 < playlist.length) loadIndex(index + 1, true);
  else notify();
}

export function audioManagerSubscribe(fn: Listener) {
  listeners.push(fn);
  return () => { listeners = listeners.filter((l) => l !== fn); };
}

export function audioManagerGetInfo() {
  return info();
}
