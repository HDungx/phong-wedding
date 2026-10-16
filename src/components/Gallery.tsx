'use client';
import { wedding as w } from '@/lib/config';
import SafeImage from './SafeImage';
import { useLightbox } from './Lightbox';

export default function Gallery() {
  const show = useLightbox();
  return (
    <section className="py-12 px-6 bg-creamBG">
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-semibold tracking-widest text-weddingGold">Khoảnh Khắc Hạnh Phúc</span>
        <h2 className="font-serif text-3xl font-bold text-weddingRed mt-1">Album Ảnh Cưới</h2>
        <p className="text-xs text-gray-500 mt-1">Chạm vào hình để xem rõ hơn</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {w.gallery.map((g, i) => (
          <button key={g.src} onClick={() => show(i)} className="overflow-hidden rounded-xl border-2 border-white shadow-md aspect-[3/4]" aria-label={`Xem ảnh cưới ${i + 1}`}>
            <SafeImage src={g.src} fallback={g.fallback} alt={`Ảnh cưới ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </button>
        ))}
      </div>
    </section>
  );
}
