import { createContext, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { FlowStack, MobileScroll, type FlowControls, type FlowScreen } from "./mobile";
import { RESOURCE_DATA, type ResourceSong, type ThemeGroup } from "./data/appData";
import { SONG_PREVIEWS } from "./data/previewData";

type SongWithTheme = ResourceSong & { themeId: string; themeName: string; themeLabel: string };

type CheckinContextValue = {
  checked: Set<string>;
  streak: number;
  totalDays: number;
  celebrate: { streak: number; total: number; songsToday: number } | null;
  toggle: (songId: string) => void;
  clearCelebrate: () => void;
};

const CheckinContext = createContext<CheckinContextValue | null>(null);
const CHECKIN_KEY = "sss-song-checkins-v1";
const STREAK_KEY = "sss-song-checkin-streak-v1";
const themeEmoji = ["🌙", "🔤", "🚌", "🛁", "👋", "🖐️", "🍎", "🎨", "😊", "🎶", "🏃", "🔢", "🎄", "🐾"];

function readLocalDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function readCheckinDays() {
  try {
    const saved = JSON.parse(localStorage.getItem(STREAK_KEY) || "null") as {
      lastDate?: string;
      streak?: number;
      days?: string[];
    } | null;

    const days = new Set(Array.isArray(saved?.days) ? saved?.days.filter(Boolean) : []);
    if (saved?.lastDate) days.add(saved.lastDate);
    const today = readLocalDate();

    let streak = 0;
    if (saved?.lastDate && Number.isFinite(saved.streak) && (saved.streak || 0) > 0) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayText = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
      if (saved.lastDate === today || saved.lastDate === yesterdayText) streak = saved.streak as number;
    }

    return { streak, totalDays: days.size };
  } catch {
    return { streak: 0, totalDays: 0 };
  }
}

function CheckinProvider({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CHECKIN_KEY) || "[]");
      return new Set(Array.isArray(saved) ? saved : []);
    } catch {
      return new Set();
    }
  });
  const [celebrate, setCelebrate] = useState<CheckinContextValue["celebrate"]>(null);
  const [days, setDays] = useState(readCheckinDays);

  useEffect(() => {
    localStorage.setItem(CHECKIN_KEY, JSON.stringify([...checked]));
  }, [checked]);

  const toggle = (songId: string) => {
    if (checked.has(songId)) return;
    const next = new Set(checked);
    next.add(songId);
    setChecked(next);

    const today = readLocalDate();
    let saved: { lastDate?: string; streak?: number; days?: string[] } | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STREAK_KEY) || "null");
    } catch {}

    const daySet = new Set(Array.isArray(saved?.days) ? saved?.days.filter(Boolean) : []);
    if (saved?.lastDate) daySet.add(saved.lastDate);
    daySet.add(today);

    const isAlreadyToday = saved?.lastDate === today;
    const nextStreak = isAlreadyToday ? Math.max(1, days.streak) : days.streak + 1;
    localStorage.setItem(STREAK_KEY, JSON.stringify({
      lastDate: today,
      streak: nextStreak,
      days: [...daySet].sort(),
    }));
    setDays({ streak: nextStreak, totalDays: daySet.size });
    setCelebrate({ streak: nextStreak, total: next.size, songsToday: 1 });
  };

  const clearCelebrate = () => setCelebrate(null);

  return <CheckinContext.Provider value={{ checked, streak: days.streak, totalDays: days.totalDays, celebrate, toggle, clearCelebrate }}>{children}</CheckinContext.Provider>;
}

function useCheckins() {
  const value = useContext(CheckinContext);
  if (!value) throw new Error("CheckinProvider is missing");
  return value;
}

function pathLeaf(path: string) {
  return path.split("/").filter(Boolean).at(-1) ?? path;
}

function songDisplayName(title: string) {
  const cleaned = title
    .replace(/\s*(?:featuring|feat\.?)\s+.*$/i, "")
    .replace(/\s*[-–|]\s*(?:Super Simple Songs?|Kids Songs?|Nursery Rhymes?).*$/i, "")
    .replace(/(?:\s|^)(?:Super Simple Songs?|Nursery Rhymes?|Kids Songs?|Original Kids Song|Original Nursery Rhyme|Sing Along With Tobee)\s*$/i, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim()
    .replace(/[\s\-–|]+$/,"");
  // Collapse over-aggressive brand removal for a few known title patterns.
  return cleaned
    .replace(/^Peekaboo Original Peek-a-boo Song for Kids\b/i, "Peekaboo")
    .replace(/^Bye Bye Goodbye\b/i, "Bye Bye Goodbye");
}

function resourceState(song: ResourceSong) {
  return [
    { key: "video", label: "视频", icon: "▶", available: Boolean(song.videoPath) },
    { key: "audio", label: "音频", icon: "♫", available: Boolean(song.audioPath) },
    { key: "lyrics", label: "歌词", icon: "文", available: song.hasLyrics },
    { key: "flash", label: "闪卡", icon: "▦", available: song.hasFlashcards },
  ];
}

function AppHeader() {
  const { totalDays } = useCheckins();
  return (
    <header className="resource-header">
      <div>
        <span>SUPER SIMPLE SONGS</span>
        <h1>儿歌主题打卡</h1>
      </div>
      <div className="header-count"><b>{totalDays}</b><small>累计打卡天</small></div>
    </header>
  );
}

function CheckinButton({ songId, compact = false }: { songId: string; compact?: boolean }) {
  const { checked, toggle } = useCheckins();
  const done = checked.has(songId);
  return (
    <button
      className={`checkin-button ${done ? "done" : ""} ${compact ? "compact" : ""}`}
      onClick={(event) => { event.stopPropagation(); if (!done) toggle(songId); }}
      type="button"
      aria-pressed={done}
      aria-label={compact ? (done ? `取消打卡：${songId}` : `打卡：${songId}`) : undefined}
    >
      <span>{done ? "✓" : ""}</span>{compact ? <i>{done ? "已打卡" : "打卡"}</i> : done ? "已打卡" : "打卡"}
    </button>
  );
}

function CelebrationModal() {
  const { celebrate, clearCelebrate, checked } = useCheckins();
  useEffect(() => {
    if (!celebrate) return;
    const timer = window.setTimeout(clearCelebrate, 2600);
    return () => window.clearTimeout(timer);
  }, [celebrate, clearCelebrate]);

  if (!celebrate) return null;
  const percent = Math.min(100, checked.size / RESOURCE_DATA.stats.songs * 1000) / 10;
  const message = celebrate.streak <= 1
    ? "今天已经开始啦，坚持就是最棒的！"
    : celebrate.streak <= 3
      ? "节奏很好，继续保持这份小习惯！"
      : celebrate.streak <= 7
        ? "你已经进入稳定节奏，超级厉害！"
        : "连续坚持这么多天，孩子会记住这份陪伴！";

  return (
    <div className="celebration-overlay" role="dialog" aria-modal="true" aria-label="打卡成功" onClick={clearCelebrate}>
      <div className="celebration-card" onClick={(event) => event.stopPropagation()}>
        <div className="celebration-rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="celebration-badge">🎉</div>
        <span className="celebration-kicker">打卡成功</span>
        <h2>连续打卡 {celebrate.streak} 天</h2>
        <p>{message}</p>
        <div className="celebration-progress">
          <i style={{ width: `${percent}%` }} />
        </div>
        <small>今天第 {celebrate.songsToday} 首 · 总进度 {percent.toFixed(1)}%</small>
        <button onClick={clearCelebrate} type="button">继续加油</button>
      </div>
    </div>
  );
}

function ThemeSongRow({ song, theme, onOpen }: { song: ResourceSong; theme: ThemeGroup; onOpen: () => void }) {
  const { checked } = useCheckins();
  const done = checked.has(song.id);
  return (
    <article className={`theme-song-row ${done ? "checked" : ""}`}>
      <button className="song-open-button" onClick={onOpen} type="button">
        <span className="song-number">{String(song.no).padStart(3, "0")}</span>
        <span className="song-row-copy">
          <b>{songDisplayName(song.title)}</b>
          <small>{resourceState(song).filter((item) => item.available).map((item) => item.label).join(" · ")}</small>
        </span>
        <span className="song-open-arrow">›</span>
      </button>
      <CheckinButton songId={song.id} compact />
    </article>
  );
}

function ThemeLibraryView({ flow }: { flow: FlowControls }) {
  const { checked } = useCheckins();
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

  const themes = RESOURCE_DATA.themes;

  const openSong = (song: ResourceSong, theme: ThemeGroup) => {
    const songWithTheme: SongWithTheme = { ...song, themeId: theme.id, themeName: theme.name, themeLabel: theme.label };
    flow.push({ id: song.id, headerHeight: 0, render: () => <SongDetail song={songWithTheme} onBack={flow.pop} /> });
  };

  const totalPercent = Math.min(100, checked.size / RESOURCE_DATA.stats.songs * 1000) / 10;
  return (
    <>
      <div className="resource-sticky-top">
        <AppHeader />
        <section className="theme-hero">
          <div>
            <span>按主题循序打卡</span>
            <strong>14 个主题 · 205 首儿歌</strong>
            <p>点开一个主题查看歌曲，完成一首就打卡一首。</p>
          </div>
          <div className="hero-progress" style={{ "--progress": totalPercent } as CSSProperties}><b>{checked.size}</b><span>/ {RESOURCE_DATA.stats.songs}</span></div>
        </section>
      </div>
      <div className="section-heading"><div><b>主题清单</b><span>点击展开歌曲明细</span></div><small>{themes.length} 个主题</small></div>
      <section className="theme-accordion-list">
        {themes.map((theme, index) => {
          const isOpen = expandedTheme === theme.id;
          const completed = theme.songs.filter((song) => checked.has(song.id)).length;
          const percent = theme.songCount ? Math.round((RESOURCE_DATA.themes.find((item) => item.id === theme.id)?.songs.filter((song) => checked.has(song.id)).length || 0) / theme.songCount * 100) : 0;
          return (
            <article className={`theme-accordion ${isOpen ? "open" : ""}`} key={theme.id}>
              <button className="theme-accordion-head" onClick={() => setExpandedTheme(isOpen ? null : theme.id)} type="button" aria-expanded={isOpen}>
                <span className="theme-order">主题 {theme.number}</span>
                <span className="theme-symbol">{themeEmoji[index]}</span>
                <span className="theme-title-block">
                  <b>{theme.name}</b>
                  <small>{theme.songCount} 首歌曲 · {theme.level}</small>
                  <i><em style={{ width: `${percent}%` }} /></i>
                </span>
                <span className="theme-complete"><b>{completed}</b><small>已完成</small></span>
                <span className="theme-chevron">⌄</span>
              </button>
              {isOpen ? (
                <div className="theme-song-list">
                  {theme.songs.map((song) => <ThemeSongRow key={song.id} song={song} theme={theme} onOpen={() => openSong(song, theme)} />)}
                  {theme.songs.length === 0 ? <p className="empty-result">该主题下没有匹配歌曲</p> : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
      <WeChatFooter />
    </>
  );
}

function ResourceShell({ flow, mobile = false }: { flow: FlowControls; mobile?: boolean }) {
  return (
    <div className={`resource-shell ${mobile ? "native-mobile" : ""}`}>
      <MobileScroll className="resource-scroll">
        <main className="resource-main">
          <ThemeLibraryView flow={flow} />
        </main>
      </MobileScroll>
    </div>
  );
}

// 方案 B：媒体不托管到网站，改为按单首歌跳转网盘。
type PanDriveLinks = { video: string; audio: string };
const THEME_PAN_LINK = "https://pan.baidu.com/s/1lE0ag-xeoAc5uyi8x_98LQ?pwd=hnqd";
const PAN_DRIVE_LINKS: Record<string, PanDriveLinks> = {
  // 主题 1 · 摇篮曲：单曲 MP4 分享，音频暂复用同一 MP4 播放页。
  "song-001": {
    video: "https://pan.baidu.com/s/15PRD8omfiLM7x0C99ucs2A?pwd=34q1",
    audio: "https://pan.baidu.com/s/15PRD8omfiLM7x0C99ucs2A?pwd=34q1",
  },
  "song-002": {
    video: "https://pan.baidu.com/s/1nTSwz3VWl1wlyHBrKaRoLg?pwd=34q1",
    audio: "https://pan.baidu.com/s/1nTSwz3VWl1wlyHBrKaRoLg?pwd=34q1",
  },
  "song-003": {
    video: "https://pan.baidu.com/s/1czLm2gvtOeMn1MM1ZPNADQ?pwd=34q1",
    audio: "https://pan.baidu.com/s/1czLm2gvtOeMn1MM1ZPNADQ?pwd=34q1",
  },
  "song-004": {
    video: "https://pan.baidu.com/s/1u_KYoOWKCJw31S_LxhmSWw?pwd=34q1",
    audio: "https://pan.baidu.com/s/1u_KYoOWKCJw31S_LxhmSWw?pwd=34q1",
  },
  "song-005": {
    video: "https://pan.baidu.com/s/1lTchNvoDPLj5dYGnWXno6A?pwd=34q1",
    audio: "https://pan.baidu.com/s/1lTchNvoDPLj5dYGnWXno6A?pwd=34q1",
  },
  "song-006": {
    video: "https://pan.baidu.com/s/173U3qz1W3X7O0y5sEhBQJA?pwd=34q1",
    audio: "https://pan.baidu.com/s/173U3qz1W3X7O0y5sEhBQJA?pwd=34q1",
  },
  "song-007": {
    video: "https://pan.baidu.com/s/1UgR5Jo6en6-alFs5wmSn7Q?pwd=34q1",
    audio: "https://pan.baidu.com/s/1UgR5Jo6en6-alFs5wmSn7Q?pwd=34q1",
  },
  "song-008": {
    video: "https://pan.baidu.com/s/1368MMn0L3__lLz9fK_R2DQ?pwd=34q1",
    audio: "https://pan.baidu.com/s/1368MMn0L3__lLz9fK_R2DQ?pwd=34q1",
  },

  // 主题 2 · 字母拼读：单曲 MP4 分享，音频暂复用同一 MP4 播放页。
  "song-009": {
    video: "https://pan.baidu.com/s/1WBCOnLuFhCG7JUKME1BenQ?pwd=dh15",
    audio: "https://pan.baidu.com/s/1WBCOnLuFhCG7JUKME1BenQ?pwd=dh15",
  },
  "song-010": {
    video: "https://pan.baidu.com/s/165loH4kAvNzh8LuTy3oksw?pwd=dh15",
    audio: "https://pan.baidu.com/s/165loH4kAvNzh8LuTy3oksw?pwd=dh15",
  },
  "song-011": {
    video: "https://pan.baidu.com/s/17bZI7t1Hdlg6BJWrDkR2AQ?pwd=dh15",
    audio: "https://pan.baidu.com/s/17bZI7t1Hdlg6BJWrDkR2AQ?pwd=dh15",
  },
  "song-012": {
    video: "https://pan.baidu.com/s/1wbuRKJXVFcg7ysswsy2b_Q?pwd=dh15",
    audio: "https://pan.baidu.com/s/1wbuRKJXVFcg7ysswsy2b_Q?pwd=dh15",
  },
  "song-013": {
    video: "https://pan.baidu.com/s/1wVcvN9OS7StkE-A6EJw9Gg?pwd=dh15",
    audio: "https://pan.baidu.com/s/1wVcvN9OS7StkE-A6EJw9Gg?pwd=dh15",
  },

  // 主题 3 · 交通工具：单曲 MP4 分享，音频暂复用同一 MP4 播放页。
  "song-014": {
    video: "https://pan.baidu.com/s/1JYEiyTjBeiKvjjTyTXNYYg?pwd=yira",
    audio: "https://pan.baidu.com/s/1JYEiyTjBeiKvjjTyTXNYYg?pwd=yira",
  },
  "song-015": {
    video: "https://pan.baidu.com/s/1EN_v_ytHY5kY_CbuD3dFfw?pwd=yira",
    audio: "https://pan.baidu.com/s/1EN_v_ytHY5kY_CbuD3dFfw?pwd=yira",
  },
  "song-016": {
    video: "https://pan.baidu.com/s/13-Uvfm7kUe1zFnnsnQH3CA?pwd=yira",
    audio: "https://pan.baidu.com/s/13-Uvfm7kUe1zFnnsnQH3CA?pwd=yira",
  },
  "song-017": {
    video: "https://pan.baidu.com/s/1pi8dcwi3dFho3QiwFsDkcA?pwd=yira",
    audio: "https://pan.baidu.com/s/1pi8dcwi3dFho3QiwFsDkcA?pwd=yira",
  },
  "song-018": {
    video: "https://pan.baidu.com/s/1Q6FlvAkm1D6D8fuiXiR0CA?pwd=yira",
    audio: "https://pan.baidu.com/s/1Q6FlvAkm1D6D8fuiXiR0CA?pwd=yira",
  },
  "song-019": {
    video: "https://pan.baidu.com/s/10FToMTldnnmfYCvSe84NIQ?pwd=yira",
    audio: "https://pan.baidu.com/s/10FToMTldnnmfYCvSe84NIQ?pwd=yira",
  },
  "song-020": {
    video: "https://pan.baidu.com/s/1mf-TrA9dF8oJvL8QZUG5Yw?pwd=yira",
    audio: "https://pan.baidu.com/s/1mf-TrA9dF8oJvL8QZUG5Yw?pwd=yira",
  },
  "song-021": {
    video: "https://pan.baidu.com/s/1Ef9X_N5W0mj8s0Pv23lSTw?pwd=yira",
    audio: "https://pan.baidu.com/s/1Ef9X_N5W0mj8s0Pv23lSTw?pwd=yira",
  },
  "song-022": {
    video: "https://pan.baidu.com/s/1bbbKySqdvRpRjiN92gknAQ?pwd=yira",
    audio: "https://pan.baidu.com/s/1bbbKySqdvRpRjiN92gknAQ?pwd=yira",
  },
  "song-023": {
    video: "https://pan.baidu.com/s/13nKVVJYBN-SxM_8czwDiUw?pwd=yira",
    audio: "https://pan.baidu.com/s/13nKVVJYBN-SxM_8czwDiUw?pwd=yira",
  },
  "song-024": {
    video: "https://pan.baidu.com/s/1KoOpSc9UPzycPzbe1IjukQ?pwd=yira",
    audio: "https://pan.baidu.com/s/1KoOpSc9UPzycPzbe1IjukQ?pwd=yira",
  },
};
const WECHAT_ID = "GL11280308";

function getPanDriveLinks(songId: string): PanDriveLinks {
  return PAN_DRIVE_LINKS[songId] || { video: THEME_PAN_LINK, audio: THEME_PAN_LINK };
}

function CloudMediaCard({ song, kind }: { song: SongWithTheme; kind: "video" | "audio" }) {
  const links = getPanDriveLinks(song.id);
  const isVideo = kind === "video";
  return (
    <section className="content-card cloud-media-card">
      <header>
        <div>
          <span className="content-icon">{isVideo ? "▶" : "♫"}</span>
          <div>
            <b>{isVideo ? "MP4 视频" : "MP3 音频"}</b>
            <small>百度网盘 · 单首歌分享</small>
          </div>
        </div>
        <em>网盘播放</em>
      </header>
      <a className={`cloud-media-button ${isVideo ? "" : "audio"}`} href={isVideo ? links.video : links.audio} target="_blank" rel="noreferrer">
        {isVideo ? "播放视频" : "播放音频"}
      </a>
      <p className="cloud-media-tip">链接已定位到当前分享内容，但百度网盘可能会显示分享页或提取码页。建议保存到自己网盘后，在 App 里播放。</p>
    </section>
  );
}

function WeChatFooter() {
  return (
    <footer className="wechat-footer">
      <a
        href="weixin://"
        onClick={() => navigator.clipboard?.writeText(WECHAT_ID).catch(() => {})}
      >
        添加VX获取更多资源：{WECHAT_ID}
      </a>
      <small>点击已复制微信号，可打开微信添加</small>
    </footer>
  );
}

type ImageViewerState = {
  images: string[];
  index: number;
  title: string;
};

function ImageLightbox({ viewer, onClose, onChange }: { viewer: ImageViewerState; onClose: () => void; onChange: (index: number) => void }) {
  const hasMultiple = viewer.images.length > 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMultiple) onChange((viewer.index - 1 + viewer.images.length) % viewer.images.length);
      if (event.key === "ArrowRight" && hasMultiple) onChange((viewer.index + 1) % viewer.images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasMultiple, onChange, onClose, viewer.images.length, viewer.index]);

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`${viewer.title}大图`} onClick={onClose}>
      <header className="lightbox-header" onClick={(event) => event.stopPropagation()}>
        <div><b>{viewer.title}</b>{hasMultiple ? <span>{viewer.index + 1} / {viewer.images.length}</span> : <span>点击空白处关闭</span>}</div>
        <button type="button" onClick={onClose} aria-label="关闭大图">×</button>
      </header>
      <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
        {hasMultiple ? <button className="lightbox-arrow previous" type="button" onClick={() => onChange((viewer.index - 1 + viewer.images.length) % viewer.images.length)} aria-label="上一张">‹</button> : null}
        <img src={viewer.images[viewer.index]} alt={`${viewer.title} ${viewer.index + 1}`} onClick={onClose} />
        {hasMultiple ? <button className="lightbox-arrow next" type="button" onClick={() => onChange((viewer.index + 1) % viewer.images.length)} aria-label="下一张">›</button> : null}
      </div>
      {hasMultiple ? <div className="lightbox-dots" onClick={(event) => event.stopPropagation()}>{viewer.images.map((image, index) => <button key={image} className={index === viewer.index ? "active" : ""} onClick={() => onChange(index)} type="button" aria-label={`查看第 ${index + 1} 张`} />)}</div> : null}
    </div>
  );
}

function LyricsPreview({ song, onView }: { song: SongWithTheme; onView: (viewer: ImageViewerState) => void }) {
  const preview = SONG_PREVIEWS[song.id];
  return (
    <section className={`content-card lyrics-content-card ${song.hasLyrics ? "" : "unavailable"}`}>
      <header><div><span className="content-icon">文</span><div><b>歌词</b><small>{song.hasLyrics ? song.lyricStatus : "未找到对应歌词"}</small></div></div><em>{song.hasLyrics ? "点击查看大图" : "暂无"}</em></header>
      {song.hasLyrics && preview?.lyric ? (
        <button className="image-preview-button lyric-preview-button" type="button" onClick={() => onView({ images: [preview.lyric!], index: 0, title: `${song.title} · 歌词` })} aria-label={`查看 ${song.title} 歌词大图`}>
          <img className="lyric-preview" src={preview.lyric} alt={`${song.title} 歌词`} />
          <span className="image-zoom-hint">⌕ 点击查看大图</span>
        </button>
      ) : <div className="missing-content">这首歌暂时没有歌词图片</div>}
    </section>
  );
}

function FlashcardPreview({ song, onView }: { song: SongWithTheme; onView: (viewer: ImageViewerState) => void }) {
  const preview = SONG_PREVIEWS[song.id];
  const cards = preview?.flashcards || [];
  if (!cards.length) return null;
  return (
    <section className="content-card flash-content-card">
      <header><div><span className="content-icon">▦</span><div><b>闪卡</b><small>{`${song.flashJpgCount || cards.length} 张图片${song.flashPdfPath ? " · 含 PDF" : ""}`}</small></div></div><em>点击查看大图</em></header>
      <div className="flashcard-grid">{cards.map((card, index) => (
        <button className="image-preview-button flashcard-preview-button" type="button" onClick={() => onView({ images: cards, index, title: `${songDisplayName(song.title)} · 闪卡` })} aria-label={`查看 ${songDisplayName(song.title)} 第 ${index + 1} 张闪卡大图`} key={card}>
          <img src={card} alt={`${songDisplayName(song.title)} 闪卡 ${index + 1}`} />
          <span className="flashcard-number">{index + 1}</span>
        </button>
      ))}</div>
    </section>
  );
}

function SongDetail({ song, onBack }: { song: SongWithTheme; onBack: () => void }) {
  const { checked } = useCheckins();
  const done = checked.has(song.id);
  const [viewer, setViewer] = useState<ImageViewerState | null>(null);
  const updateViewerIndex = (index: number) => setViewer((current) => current ? { ...current, index } : current);
  return (
    <MobileScroll className="detail-scroll resource-detail-scroll">
      <main className="resource-detail">
        <div className="detail-hero-shell">
          <button className="detail-back" onClick={onBack} type="button" aria-label="返回主题">
            <span className="detail-back-icon" aria-hidden="true">←</span>
            <span>返回主题</span>
          </button>
          <section className="detail-title-card">
          <div className="detail-theme"><span>主题 {RESOURCE_DATA.themes.find((theme) => theme.id === song.themeId)?.number} · {song.themeName}</span><em>第 {song.no} 首</em></div>
          <h1>{songDisplayName(song.title)}</h1>
          <div className="detail-actions">
            <div className="detail-status-row">
              {resourceState(song).map((item) => <span key={item.key} className={item.available ? "on" : "off"}><i>{item.icon}</i>{item.label}</span>)}
            </div>
            <CheckinButton songId={song.id} />
          </div>
            {done ? <p className="checked-message">已完成本首儿歌打卡，进度已计入主题统计。</p> : null}
          </section>
        </div>
        <div className="detail-section-title"><h2>对应内容</h2><span>歌词直接查看大图</span></div>
        <CloudMediaCard song={song} kind="video" />
        <CloudMediaCard song={song} kind="audio" />
        <LyricsPreview song={song} onView={setViewer} />
        <FlashcardPreview song={song} onView={setViewer} />
        <WeChatFooter />
      </main>
      {viewer ? <ImageLightbox viewer={viewer} onClose={() => setViewer(null)} onChange={updateViewerIndex} /> : null}
    </MobileScroll>
  );
}

export default function Prototype({ mobile = false }: { mobile?: boolean } = {}) {
  const initial: FlowScreen = { id: "resource-home", headerHeight: 0, render: (flow) => <ResourceShell flow={flow} mobile={mobile} /> };
  return (
    <CheckinProvider>
      <CelebrationModal />
      <FlowStack initial={initial} />
    </CheckinProvider>
  );
}
