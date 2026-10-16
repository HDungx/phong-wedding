'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Disc3, Music } from 'lucide-react';
import { wedding } from '@/lib/config';

type YTPlayer = { playVideo(): void; pauseVideo(): void; unMute(): void; mute(): void; seekTo(s: number, a: boolean): void };
declare global {
  interface Window { YT?: { Player: new (el: HTMLElement, opts: object) => YTPlayer }; onYouTubeIframeAPIReady?: () => void }
}

export default function MusicPlayer() {
  const holder = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const touched = useRef(false);
  const { videoId, start, title } = wedding.music;

  useEffect(() => {
    const init = () => {
      if (!holder.current || player.current || !window.YT) return;
      const el = document.createElement('div');
      holder.current.appendChild(el);
      player.current = new window.YT.Player(el, {
        height: '0', width: '0', videoId,
        playerVars: { controls: 0, start, loop: 1, playlist: videoId, playsinline: 1 },
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
  }, [videoId, start]);

  const play = useCallback(() => {
    const p = player.current;
    if (!p) return;
    p.unMute(); p.seekTo(start, true); p.playVideo(); setPlaying(true);
  }, [start]);

  // Trình duyệt chặn autoplay có tiếng → phát nhạc ở lần chạm đầu tiên của khách
  useEffect(() => {
    const first = () => { if (!touched.current) play(); };
    window.addEventListener('pointerdown', first, { once: true });
    return () => window.removeEventListener('pointerdown', first);
  }, [play]);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    touched.current = true;
    const p = player.current;
    if (!p) return;
    if (playing) { p.pauseVideo(); setPlaying(false); } else play();
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <div ref={holder} className="hidden" aria-hidden />
      <div className="bg-black/70 text-white text-[11px] px-3 py-1.5 rounded-full shadow-lg border border-weddingGold/40 hidden md:flex items-center gap-1">
        <Music size={12} className="text-weddingGold" /> {title}
      </div>
      <button onClick={toggle} onPointerDown={(e) => e.stopPropagation()} aria-label={playing ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        className="w-14 h-14 bg-weddingRed text-weddingGold rounded-full shadow-2xl flex items-center justify-center border-2 border-weddingGold hover:scale-110 transition-transform">
        <Disc3 size={26} className={playing ? 'animate-spin-cd' : ''} />
      </button>
    </div>
  );
}
