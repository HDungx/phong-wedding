'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Disc3, Music } from 'lucide-react';
import { wedding } from '@/lib/config';

type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  unMute(): void;
  loadVideoById(o: { videoId: string; startSeconds: number }): void;
};
type YTEvent = { data: number };
declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: object) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PLAYING = 1;
const PAUSED = 2;
const ENDED = 0;

export default function MusicPlayer() {
  const holder = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const ready = useRef(false);
  const pending = useRef(false); // khách đã chạm nhưng player chưa sẵn sàng
  const started = useRef(false);
  const userPaused = useRef(false);
  const isPlaying = useRef(false);
  const [playing, setPlaying] = useState(false);
  const { videoId, start, title } = wedding.music;

  const play = useCallback(() => {
    const p = player.current;
    if (!p || !ready.current) { pending.current = true; return; }
    pending.current = false;
    p.unMute();
    // loadVideoById trong cùng cử chỉ chạm → mobile cho phép phát, và nhảy thẳng tới giây `start`
    if (!started.current) { started.current = true; p.loadVideoById({ videoId, startSeconds: start }); }
    else p.playVideo();
  }, [videoId, start]);

  // Tải YouTube API ngay khi vào trang để giảm độ trễ
  useEffect(() => {
    const init = () => {
      if (!holder.current || player.current || !window.YT) return;
      const el = document.createElement('div');
      holder.current.appendChild(el);
      player.current = new window.YT.Player(el, {
        height: '1', width: '1', videoId,
        playerVars: { controls: 0, start, playsinline: 1, rel: 0, disablekb: 1 },
        events: {
          onReady: () => { ready.current = true; if (pending.current) play(); },
          onStateChange: (e: YTEvent) => {
            if (e.data === PLAYING) { isPlaying.current = true; setPlaying(true); }
            else if (e.data === PAUSED) { isPlaying.current = false; setPlaying(false); }
            else if (e.data === ENDED) { // lặp lại từ giây `start`
              player.current?.loadVideoById({ videoId, startSeconds: start });
            }
          },
        },
      });
    };
    if (window.YT?.Player) init();
    else {
      window.onYouTubeIframeAPIReady = init;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }
    }
  }, [videoId, start, play]);

  // Trình duyệt chặn tự phát có tiếng. Chỉ `click`/`touchend` mới tính là cử chỉ hợp lệ
  // (pointerdown lúc bắt đầu vuốt không được tính). Thử lại ở mỗi lần chạm đến khi phát được.
  useEffect(() => {
    const tryPlay = () => { if (!isPlaying.current && !userPaused.current) play(); };
    window.addEventListener('click', tryPlay);
    window.addEventListener('touchend', tryPlay);
    return () => { window.removeEventListener('click', tryPlay); window.removeEventListener('touchend', tryPlay); };
  }, [play]);

  function toggle() {
    if (playing) { userPaused.current = true; player.current?.pauseVideo(); }
    else { userPaused.current = false; play(); }
  }

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Không dùng display:none — một số trình duyệt mobile không nạp iframe bị ẩn */}
      <div ref={holder} aria-hidden className="fixed -left-2 -top-2 w-px h-px opacity-0 pointer-events-none overflow-hidden" />
      <div className="bg-black/70 text-white text-[11px] px-3 py-1.5 rounded-full shadow-lg border border-weddingGold/40 flex items-center gap-1">
        <Music size={12} className="text-weddingGold" />
        <span className="hidden md:inline">{title}</span>
        <span className="md:hidden">{playing ? title : 'Chạm để bật nhạc'}</span>
      </div>
      <button onClick={(e) => { stop(e); toggle(); }} onTouchEnd={stop} aria-label={playing ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        className="w-14 h-14 bg-weddingRed text-weddingGold rounded-full shadow-2xl flex items-center justify-center border-2 border-weddingGold hover:scale-110 transition-transform">
        <Disc3 size={26} className={playing ? 'animate-spin-cd' : ''} />
      </button>
    </div>
  );
}
