// 收听记录：记录每次播放的歌曲、开始时间与时长，用于「儿歌每日报告」。
export type PlayEntry = {
  songId: string;
  title: string;
  startedAt: number; // epoch ms
  duration: number; // seconds
};

const KEY = "sss-play-history-v1";
const MAX_ENTRIES = 800;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function subscribePlayHistory(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function loadPlayHistory(): PlayEntry[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(
      (item): item is PlayEntry =>
        !!item && typeof item.startedAt === "number" && typeof item.title === "string",
    );
  } catch {
    return [];
  }
}

export function appendPlayEntry(entry: PlayEntry) {
  const list = loadPlayHistory();
  list.push(entry);
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX_ENTRIES)));
  } catch {}
  emit();
}

export function localDateKey(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function entriesForDate(dateKey: string) {
  return loadPlayHistory().filter((entry) => localDateKey(entry.startedAt) === dateKey);
}

/** 开启一段播放计时；结束时调用 end() 落库。 */
export function startPlaySession(songId: string, title: string) {
  const startedAt = Date.now();
  let closed = false;
  return {
    end() {
      if (closed) return;
      closed = true;
      const duration = Math.round((Date.now() - startedAt) / 1000);
      if (duration >= 1) appendPlayEntry({ songId, title, startedAt, duration });
    },
  };
}
