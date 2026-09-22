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

function resourceState(song?: ResourceSong) {
  const hasAudio = Boolean(song && LOCAL_AUDIO[song.id]);
  const hasLyrics = Boolean(song?.hasLyrics);
  const hasFlash = Boolean(song?.hasFlashcards && (SONG_PREVIEWS[song.id]?.flashcards.length || song.flashJpgCount));
  return [
    { key: "video", label: "视频", icon: "▶", available: !hasAudio },
    { key: "audio", label: "音频", icon: "♫", available: true },
    { key: "lyrics", label: "歌词", icon: "文", available: hasLyrics },
    { key: "flash", label: "闪卡", icon: "▦", available: hasFlash },
  ];
}

function AppHeader() {
  const { totalDays } = useCheckins();
  return (
    <header className="resource-header">
      <div>
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

const WECHAT_ID = "GL11280308";

const LOCAL_AUDIO: Record<string, string> = {
  "song-001": "/sss-rhyme-checkin/audio/song-001.m4a",
  "song-002": "/sss-rhyme-checkin/audio/song-002.m4a",
  "song-003": "/sss-rhyme-checkin/audio/song-003.m4a",
  "song-004": "/sss-rhyme-checkin/audio/song-004.m4a",
  "song-005": "/sss-rhyme-checkin/audio/song-005.m4a",
  "song-006": "/sss-rhyme-checkin/audio/song-006.m4a",
  "song-007": "/sss-rhyme-checkin/audio/song-007.m4a",
  "song-008": "/sss-rhyme-checkin/audio/song-008.m4a",
};

function MediaContactCard({ song }: { song: SongWithTheme }) {
  const audio = LOCAL_AUDIO[song.id];
  return (
    <section className="content-card media-contact-card">
      <header>
        <div>
          <span className="content-icon">{audio ? "♫" : "▶"}</span>
          <div>
            <b>{audio ? "MP3 音频" : "视频和音频"}</b>
            <small>{audio ? "当前页面直接播放" : "添加微信获取完整 MP4 / MP3"}</small>
          </div>
        </div>
        <em>{audio ? "可播放" : "微信获取"}</em>
      </header>
      {audio ? (
        <audio controls preload="metadata" className="local-audio">
          <source src={audio} type="audio/mp4" />
          您的浏览器不支持音频播放。
        </audio>
      ) : (
        <>
          <p className="media-contact-copy">添加客服微信号，获取这首歌的完整视频和音频。</p>
          <div className="media-contact-row">
            <span className="wechat-id">{WECHAT_ID}</span>
            <button className="copy-contact" type="button" onClick={() => navigator.clipboard?.writeText(WECHAT_ID).catch(() => {})}>复制微信号</button>
          </div>
        </>
      )}
    </section>
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
      <header><div><span className="content-icon">文</span><div><b>歌词</b><small>{song.hasLyrics ? "点击查看大图" : "暂无歌词图"}</small></div></div><em>{song.hasLyrics ? "可查看" : "暂无"}</em></header>
      {song.hasLyrics && preview?.lyric ? (
        <button className="image-preview-button lyric-preview-button" type="button" onClick={() => onView({ images: [preview.lyric!], index: 0, title: `${songDisplayName(song.title)} · 歌词` })} aria-label={`查看 ${songDisplayName(song.title)} 歌词大图`}>
          <img className="lyric-preview" src={preview.lyric} alt={`${songDisplayName(song.title)} 歌词`} />
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
      <header><div><span className="content-icon">▦</span><div><b>闪卡</b><small>{`${cards.length} 张图片`}</small></div></div><em>点击查看大图</em></header>
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
        <div className="detail-section-title"><h2>对应内容</h2><span>视频 · 歌词 · TPR</span></div>
        <MediaContactCard song={song} />
        <LyricsPreview song={song} onView={setViewer} />
        <FlashcardPreview song={song} onView={setViewer} />
        </main>
      {viewer ? <ImageLightbox viewer={viewer} onClose={() => setViewer(null)} onChange={updateViewerIndex} /> : null}
    </MobileScroll>
  );
}

export default function Prototype({ safePublic = false }: { safePublic?: boolean } = {}) {
  void safePublic;
  const initial: FlowScreen = { id: "resource-home", headerHeight: 0, render: (flow) => <ResourceShell flow={flow} mobile={false} /> };
  return (
    <CheckinProvider>
      <CelebrationModal />
      <FlowStack initial={initial} />
    </CheckinProvider>
  );
}
