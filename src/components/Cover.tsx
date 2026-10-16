'use client';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { wedding as w } from '@/lib/config';
import SafeImage from './SafeImage';

// Màn hình "Chạm để mở thiệp" — chỉ hiện trên mobile (md:hidden).
// Cú chạm này là cử chỉ người dùng hợp lệ nên MusicPlayer (nghe click/touchend trên window) phát được nhạc.
export default function Cover() {
  const [state, setState] = useState<'shown' | 'closing' | 'gone'>('shown');

  useEffect(() => {
    if (state !== 'shown') return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    if (!mobile) { setState('gone'); return; }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [state]);

  if (state === 'gone') return null;

  function open() {
    setState('closing');
    setTimeout(() => setState('gone'), 700);
  }

  return (
    <div
      role="dialog"
      aria-label="Mở thiệp cưới"
      onClick={open}
      className={`md:hidden fixed inset-0 z-[60] flex flex-col items-center justify-center text-center text-white cursor-pointer transition-opacity duration-700 ${state === 'closing' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <SafeImage src={w.heroPhoto} fallback={w.heroFallback} alt="" priority className="absolute inset-0 w-full h-full object-cover brightness-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
      <div className="relative z-10 px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-weddingGoldLight mb-4">Thư mời cưới</p>
        <h1 className="font-script text-6xl text-weddingGold drop-shadow-lg">{w.groom.short}</h1>
        <p className="font-script text-4xl my-1">&amp;</p>
        <h1 className="font-script text-6xl text-weddingGold drop-shadow-lg">{w.bride.short}</h1>
        <div className="w-24 h-px bg-weddingGold mx-auto my-6" />
        <p className="font-serif tracking-wider uppercase font-semibold">12 . 12 . 2026</p>
      </div>
      <button className="relative z-10 mt-10 inline-flex items-center gap-2 bg-weddingRed/90 border-2 border-weddingGold text-weddingGoldLight font-semibold text-sm px-7 py-3 rounded-full shadow-2xl animate-pulse">
        <Heart size={16} fill="currentColor" /> Chạm để mở thiệp
      </button>
    </div>
  );
}
