import { ChevronDown } from 'lucide-react';
import { wedding as w } from '@/lib/config';
import SafeImage from './SafeImage';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between items-center text-center p-6 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SafeImage src={w.heroPhoto} fallback={w.heroFallback} alt={`${w.groom.short} & ${w.bride.short}`} priority className="w-full h-full object-cover object-center brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
      </div>

      <div className="relative z-10 pt-8 tracking-widest text-xs uppercase font-light text-weddingGoldLight flex items-center gap-2">
        <span className="w-8 h-px bg-weddingGold" /> Save The Date <span className="w-8 h-px bg-weddingGold" />
      </div>

      <div className="relative z-10 my-auto py-8">
        <p className="text-xs md:text-sm font-serif italic tracking-widest text-gray-200 mb-2 uppercase">Lễ Thành Hôn</p>
        <h1 className="font-script text-6xl md:text-7xl text-weddingGold drop-shadow-lg mb-2">{w.groom.short}</h1>
        <p className="font-script text-4xl text-white">&amp;</p>
        <h1 className="font-script text-6xl md:text-7xl text-weddingGold drop-shadow-lg mt-2">{w.bride.short}</h1>
        <div className="w-28 h-px bg-weddingGold mx-auto my-6" />
        <p className="font-serif text-lg md:text-xl tracking-wider uppercase font-semibold">12 Tháng 12 Năm 2026</p>
        <p className="text-xs text-weddingGoldLight font-serif italic mt-1">(Tức Ngày 04/11 Năm Bính Ngọ)</p>
      </div>

      <a href="#loi-moi" className="relative z-10 pb-6 flex flex-col items-center">
        <span className="text-xs tracking-wider text-gray-300 mb-2">Chạm để xem thiệp cưới</span>
        <ChevronDown className="animate-bounce text-weddingGold" />
      </a>
    </section>
  );
}
