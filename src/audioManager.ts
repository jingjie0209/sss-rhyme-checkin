// Global audio manager: only one audio can play at a time.
import { startPlaySession } from "./playHistory";

export type AudioInfo = {
  playing: boolean;
  songId: string | null;
  title: string;
  source: string;
  index: number;
  total: number;
};

type Listener = (info: AudioInfo) => void;
type PlaylistItem = { songId: string; src: string; title: string; source: string };

let playlist: PlaylistItem[] = [];
let index = -1;
let el: HTMLAudioElement | null = null;
let listeners: Listener[] = [];
let session: ReturnType<typeof startPlaySession> | null = null;
let switching = false;

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

function closeSession() {
  session?.end();
  session = null;
}

function ensureElement() {
  if (!el) {
    el = new Audio();
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", () => {
      const item = index >= 0 ? playlist[index] : null;
      if (item && !session) session = startPlaySession(item.songId, item.title);
      notify();
    });
    el.addEventListener("pause", () => {
      if (switching) return;
      closeSession();
      notify();
    });
  }
  return el;
}

function loadIndex(nextIndex: number, autoplay = true) {
  if (!playlist.length) return;
  if (nextIndex < 0) nextIndex = playlist.length - 1;
  if (nextIndex >= playlist.length) nextIndex = 0;

  const audio = ensureElement();
  switching = true;
  audio.pause();
  closeSession();

  index = nextIndex;
  const item = playlist[index];
  audio.src = item.src;
  if (autoplay) {
    audio.play().catch(() => {});
  }
  switching = false;
  notify();
}

export function audioManagerSetPlaylist(tracks: PlaylistItem[], startIndex = 0, autoplay = true) {
  playlist = tracks;
  if (!tracks.length) {
    audioManagerStop();
    return;
  }
  const audio = ensureElement();
  switching = true;
  audio.pause();
  closeSession();
  switching = false;
  loadIndex(startIndex, autoplay);
}

export function audioManagerPlayAt(target: number) {
  loadIndex(target, true);
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
  closeSession();
  notify();
}

export function audioManagerResume() {
  const audio = el;
  if (!audio) return;
  const item = index >= 0 ? playlist[index] : null;
  if (item && !session) session = startPlaySession(item.songId, item.title);
  audio.play().catch(() => {});
  notify();
}

export function audioManagerStop() {
  switching = true;
  if (el) {
    el.pause();
    el.currentTime = 0;
  }
  switching = false;
  closeSession();
  playlist = [];
  index = -1;
  notify();
}

// 兼容旧调用：直接播放单曲。
export function audioManagerPlay(songId: string, src: string, title: string, source: string) {
  audioManagerSetPlaylist([{ songId, src, title, source }], 0, true);
}

function onEnded() {
  closeSession();
  if (index + 1 < playlist.length) loadIndex(index + 1, true);
  else notify();
}

export function audioManagerSubscribe(fn: Listener) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function audioManagerGetInfo() {
  return info();
}
