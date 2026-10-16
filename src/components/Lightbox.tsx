'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { wedding as w } from '@/lib/config';
import SafeImage from './SafeImage';

// Danh sách ảnh xem phóng to: album trước, rồi ảnh chú rể, ảnh cô dâu
export const lightboxItems = [
  ...w.gallery,
  { src: w.groom.photo, fallback: w.groom.photoFallback },
  { src: w.bride.photo, fallback: w.bride.photoFallback },
];
export const GROOM_INDEX = w.gallery.length;
export const BRIDE_INDEX = w.gallery.length + 1;

const Ctx = createContext<(i: number) => void>(() => {});
export const useLightbox = () => useContext(Ctx);

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const n = lightboxItems.length;

  const show = useCallback((i: number) => setOpen(i), []);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, go]);

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <Ctx.Provider value={show}>
      {children}
      {open !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[55] flex items-center justify-center p-4"
          role="dialog" aria-modal onClick={() => setOpen(null)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); // vuốt trái = ảnh sau
          }}
        >
          <button className="absolute top-4 right-4 p-2 text-white hover:text-weddingGold" aria-label="Đóng" onClick={() => setOpen(null)}><X size={32} /></button>
          <button className="absolute left-1 md:left-6 p-3 text-white hover:text-weddingGold" aria-label="Ảnh trước" onClick={(e) => { stop(e); go(-1); }}><ChevronLeft size={40} /></button>
          <button className="absolute right-1 md:right-6 p-3 text-white hover:text-weddingGold" aria-label="Ảnh sau" onClick={(e) => { stop(e); go(1); }}><ChevronRight size={40} /></button>
          <SafeImage key={lightboxItems[open].src} src={lightboxItems[open].src} fallback={lightboxItems[open].fallback} alt={`Ảnh ${open + 1}/${n}`} priority className="max-w-full max-h-[85vh] rounded-lg object-contain shadow-2xl" />
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/70 tabular-nums">{open + 1} / {n}</span>
        </div>
      )}
    </Ctx.Provider>
  );
}
