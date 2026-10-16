import { Camera, Printer, Infinity as Inf, Smile, Sparkles } from 'lucide-react';

export default function Photobooth() {
  return (
    <section className="px-6 py-2 bg-creamBG">
      <div className="photobooth-card relative bg-gradient-to-r from-weddingRed via-weddingRedLight to-weddingRed text-white p-6 rounded-2xl border-2 border-weddingGold shadow-xl overflow-hidden text-center">
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-weddingGold/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-weddingGold/20 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-weddingGold text-weddingRed rounded-full shadow-lg mb-3 border-2 border-white">
            <Camera size={26} />
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-weddingGold/20 border border-weddingGold text-weddingGoldLight font-semibold text-[11px] uppercase tracking-widest rounded-full mb-2">
            <Sparkles size={12} /> Trải Nghiệm Đặc Biệt
          </span>
          <h3 className="font-serif text-2xl font-bold text-weddingGoldLight mb-2">Chụp Ảnh Photobooth Lấy Liền</h3>
          <p className="text-sm md:text-base font-medium text-gray-100 leading-relaxed max-w-md mx-auto">
            Sẽ có máy chụp hình <span className="text-weddingGold font-bold underline decoration-weddingGold/60">photobooth chụp ảnh lấy liền không giới hạn</span> xuyên suốt buổi lễ để mọi người đến sớm chụp hình lưu niệm cùng cô dâu &amp; chú rể!
          </p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-3 text-xs text-weddingGoldLight font-serif italic">
            <span className="inline-flex items-center gap-1"><Printer size={13} /> In ảnh lấy ngay</span>•
            <span className="inline-flex items-center gap-1"><Inf size={13} /> Không giới hạn</span>•
            <span className="inline-flex items-center gap-1"><Smile size={13} /> Miễn phí 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
