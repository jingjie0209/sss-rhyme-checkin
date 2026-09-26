import { useEffect, useRef, useState } from "react";

export type PlayAllTrack = { id: string; title: string };

export function usePlayAll(tracks: PlayAllTrack[], audioMap: Record<string, string>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const available = tracks.filter((t) => audioMap[t.id]);
  const current = index !== null ? available[index] : null;

  useEffect(() => {
    if (index === null) return;
    const track = available[index];
    if (!track) {
      stop();
      return;
    }
    const src = audioMap[track.id];
    if (!src) return;
    let el = audioRef.current;
    if (!el) {
      el = new Audio();
      audioRef.current = el;
    }
    if (!el.src.endsWith(src)) {
      el.src = src;
    }
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [index]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => {
      if (index === null) return;
      if (index + 1 < available.length) setIndex(index + 1);
      else { setPlaying(false); setIndex(null); }
    };
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [index, available.length]);

  const start = () => {
    if (!available.length) return;
    setIndex(0);
  };

  const stop = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setIndex(null);
  };

  const toggle = () => {
    if (playing || index !== null) stop();
    else start();
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return { available, current, playing, index, start, stop, toggle };
}
