import { MapPin, Navigation, Utensils } from 'lucide-react';
import { wedding as w } from '@/lib/config';
import Countdown from './Countdown';

export default function Venue() {
  const { venue: v } = w;
  return (
    <section className="py-12 px-6 bg-white text-center">
      <div className="max-w-xl mx-auto">
        <span className="text-xs uppercase font-semibold tracking-widest text-weddingGold">Thời Gian &amp; Địa Điểm</span>
        <h2 className="font-serif text-3xl font-bold text-weddingRed mt-1 mb-6">Trân Trọng Đón Tiếp</h2>

        <div className="bg-creamBG p-6 rounded-2xl border-2 border-weddingGold/40 shadow-md mb-8">
          <div className="w-14 h-14 bg-weddingRed text-weddingGold rounded-full flex items-center justify-center mx-auto mb-4 shadow">
            <Utensils size={22} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">{v.name}</h3>
          <div className="inline-block bg-weddingRed text-white text-xs font-semibold px-4 py-1 rounded-full mb-3 shadow-sm">{v.hall}</div>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed flex items-start justify-center gap-1.5">
            <MapPin size={16} className="text-weddingRed shrink-0 mt-0.5" /> {v.address}
          </p>
          <div className="grid grid-cols-2 gap-4 border-y border-weddingGold/30 py-4 my-4">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Đón Khách &amp; Photobooth</p>
              <p className="font-serif text-2xl font-bold text-weddingRed mt-0.5">{w.welcomeTime}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Khai Tiệc</p>
              <p className="font-serif text-2xl font-bold text-weddingRed mt-0.5">{w.partyTime}</p>
            </div>
          </div>
          <p className="text-base font-semibold text-gray-800">{w.dateLabel}</p>
          <p className="text-xs text-gray-500 italic mt-0.5">({w.lunarLabel})</p>
          <a href={v.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 bg-weddingRed hover:bg-weddingRedLight text-white font-medium text-sm py-3 px-6 rounded-full shadow-md transition-all hover:scale-105">
            <Navigation size={16} className="text-weddingGold" /> Xem Bản Đồ Chỉ Đường Google Maps
          </a>
        </div>

        <Countdown />
      </div>
    </section>
  );
}
