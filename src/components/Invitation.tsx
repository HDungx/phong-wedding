import { Heart } from 'lucide-react';
import { wedding as w } from '@/lib/config';
import SafeImage from './SafeImage';

function Side({ title, role, p }: { title: string; role: string; p: typeof w.groom | typeof w.bride }) {
  return (
    <div className="flex flex-col items-center bg-creamBG p-5 rounded-2xl border border-weddingGold/30 shadow-sm">
      <div className="w-36 h-48 rounded-2xl overflow-hidden border-2 border-weddingGold shadow-md mb-4">
        <SafeImage src={p.photo} fallback={p.photoFallback} alt={`${role} ${p.name}`} className="w-full h-full object-cover object-top" />
      </div>
      <h3 className="font-serif font-bold text-base text-weddingRed uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-xs text-gray-600 mb-1">Thân phụ: <span className="font-medium text-gray-800">{p.father}</span></p>
      <p className="text-xs text-gray-600 mb-3">Thân mẫu: <span className="font-medium text-gray-800">{p.mother}</span></p>
      <div className="border-t border-weddingGold/40 w-16 my-2" />
      <p className="text-[11px] text-weddingGold uppercase font-semibold tracking-widest">{role}</p>
      <h4 className="font-serif text-2xl font-bold text-gray-800 mt-1">{p.name}</h4>
    </div>
  );
}

export default function Invitation() {
  return (
    <section id="loi-moi" className="py-12 px-6 bg-creamBG text-center">
      <div className="wedding-border p-6 md:p-8 rounded-2xl bg-white shadow-lg">
        <Heart className="mx-auto mb-4 text-weddingRed" size={34} fill="currentColor" />
        <p className="text-xs uppercase tracking-widest font-semibold text-weddingGold mb-1">Thư Mời Trân Trọng</p>
        <h2 className="font-script text-5xl text-weddingRed mb-3">Lễ Thành Hôn</h2>
        <p className="font-serif italic text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
          &ldquo;Yêu là tìm thấy hạnh phúc của mình trong hạnh phúc của người khác. Trân trọng kính mời quý khách đến chung vui trong ngày trọng đại của chúng tôi.&rdquo;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <Side title="Gia Đình Nhà Trai" role="Chú Rể" p={w.groom} />
          <Side title="Gia Đình Nhà Gái" role="Cô Dâu" p={w.bride} />
        </div>
      </div>
    </section>
  );
}
