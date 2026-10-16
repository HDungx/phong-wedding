'use client';
import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { wedding as w } from '@/lib/config';
import SafeImage from './SafeImage';

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const n = w.gallery.length;

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % n));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + n) % n));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, n]);

  return (
    <section className="py-12 px-6 bg-creamBG">
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-semibold tracking-widest text-weddingGold">Khoảnh Khắc Hạnh Phúc</span>
        <h2 className="font-serif text-3xl font-bold text-weddingRed mt-1">Album Ảnh Cưới</h2>
        <p className="text-xs text-gray-500 mt-1">Chạm vào hình để xem rõ hơn</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {w.gallery.map((g, i) => (
          <button key={g.src} onClick={() => setOpen(i)} className="overflow-hidden rounded-xl border-2 border-white shadow-md aspect-[3/4]" aria-label={`Xem ảnh cưới ${i + 1}`}>
            <SafeImage src={g.src} fallback={g.fallback} alt={`Ảnh cưới ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setOpen(null)} role="dialog" aria-modal>
          <button className="absolute top-4 right-4 text-white hover:text-weddingGold" aria-label="Đóng" onClick={() => setOpen(null)}><X size={32} /></button>
          <button className="absolute left-2 md:left-6 text-white hover:text-weddingGold" aria-label="Ảnh trước" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + n) % n); }}><ChevronLeft size={40} /></button>
          <button className="absolute right-2 md:right-6 text-white hover:text-weddingGold" aria-label="Ảnh sau" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % n); }}><ChevronRight size={40} /></button>
          <SafeImage src={w.gallery[open].src} fallback={w.gallery[open].fallback} alt={`Ảnh cưới ${open + 1}`} className="max-w-full max-h-[85vh] rounded-lg object-contain shadow-2xl" />
        </div>
      )}
    </section>
  );
}
