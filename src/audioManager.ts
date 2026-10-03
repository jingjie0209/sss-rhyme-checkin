// Global audio manager: only one audio can play at a time.
type Listener = (info: { playing: boolean; songId: string | null; title: string; source: string }) => void;

let currentEl: HTMLAudioElement | null = null;
let currentSongId: string | null = null;
let currentTitle: string = "";
let currentSource: string = "";
let listeners: Listener[] = [];

function notify() {
  const info = {
    playing: !!currentEl && !currentEl.paused,
    songId: currentSongId,
    title: currentTitle,
    source: currentSource,
  };
  listeners.forEach((fn) => fn(info));
}

export function audioManagerPlay(songId: string, src: string, title: string, source: string) {
  // Pause whatever is playing.
  if (currentEl) {
    currentEl.pause();
    currentEl.removeEventListener("ended", onEnded);
  }
  if (!currentEl) currentEl = new Audio();
  currentEl.src = src;
  currentSongId = songId;
  currentTitle = title;
  currentSource = source;
  currentEl.addEventListener("ended", onEnded);
  currentEl.play().then(() => notify()).catch(() => {});
}

function onEnded() {
  notify();
}

export function audioManagerPause() {
  currentEl?.pause();
  notify();
}

export function audioManagerStop() {
  if (currentEl) {
    currentEl.pause();
    currentEl.removeEventListener("ended", onEnded);
    currentEl.currentTime = 0;
  }
  currentSongId = null;
  currentTitle = "";
  currentSource = "";
  notify();
}

export function audioManagerSubscribe(fn: Listener) {
  listeners.push(fn);
  return () => { listeners = listeners.filter((l) => l !== fn); };
}

export function audioManagerGetInfo() {
  return {
    playing: !!currentEl && !currentEl.paused,
    songId: currentSongId,
    title: currentTitle,
    source: currentSource,
  };
}
