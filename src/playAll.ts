import { useCallback, useEffect, useState } from "react";
import { audioManagerSetPlaylist, audioManagerStop, audioManagerSubscribe } from "./audioManager";
import type { PlayAllTrack } from "./playAllTypes";

export type { PlayAllTrack } from "./playAllTypes";

export function usePlayAll(tracks: PlayAllTrack[], audioMap: Record<string, string>) {
  const [index, setIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const available = tracks.filter((t) => audioMap[t.id]);
  const current = index !== null ? available[index] : null;

  useEffect(() => {
    return audioManagerSubscribe((info) => {
      if (!info.source) return;
      const nextIndex = available.findIndex((t) => t.id === info.songId);
      setIndex(nextIndex >= 0 ? nextIndex : null);
      setPlaying(info.playing);
    });
  }, [available]);

  const start = useCallback(() => {
    if (!available.length) return;
    audioManagerSetPlaylist(
      available.map((t) => ({ songId: t.id, src: audioMap[t.id], title: t.title, source: "连续播放" })),
      0,
      true,
    );
    setIndex(0);
    setPlaying(true);
  }, [available, audioMap]);

  const stop = useCallback(() => {
    audioManagerStop();
    setIndex(null);
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing || index !== null) stop();
    else start();
  }, [index, playing, start, stop]);

  return { available, current, playing, index, start, stop, toggle };
}
