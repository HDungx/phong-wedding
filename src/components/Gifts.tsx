'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { wedding as w } from '@/lib/config';

type Key = keyof typeof w.gifts;

export default function Gifts() {
  const [tab, setTab] = useState<Key>('groom');
  const [copied, setCopied] = useState(false);
  const g = w.gifts[tab];

  async function copy() {
    try {
      await navigator.clipboard.writeText(g.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Sao chép số tài khoản:', g.number);
    }
  }

  return (
    <section className="py-12 px-6 bg-creamBG text-center">
      <div className="max-w-lg mx-auto">
        <span className="text-xs uppercase font-semibold tracking-widest text-weddingGold">Gửi Quà Tặng</span>
        <h2 className="font-serif text-3xl font-bold text-weddingRed mt-1 mb-2">Hộp Mừng Cưới</h2>
        <p className="text-xs text-gray-600 mb-6">Nếu không thể tham dự trực tiếp, quý khách có thể gửi quà mừng hạnh phúc cho cặp đôi qua đây.</p>

        <div className="flex justify-center border-b border-weddingGold/30 mb-6" role="tablist">
          {(Object.keys(w.gifts) as Key[]).map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`px-6 py-2.5 font-serif font-bold text-sm transition-all ${tab === k ? 'border-b-2 border-weddingRed text-weddingRed' : 'text-gray-500 hover:text-weddingRed'}`}>
              {w.gifts[k].label}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-weddingGold/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={tab}
            src={g.qr}
            alt={`QR ${g.label}`}
            className="w-44 h-44 mx-auto rounded-xl shadow border border-weddingGold/40 mb-4 object-contain"
            onError={(e) => { e.currentTarget.src = `https://placehold.co/220x220/8B0000/FFFFFF?text=QR+${encodeURIComponent(tab === 'groom' ? 'Thanh Phong' : 'My Nhi')}`; }}
          />
          <p className="text-xs font-semibold uppercase text-gray-500">Ngân Hàng {g.bank}</p>
          <p className="font-bold text-lg text-weddingRed my-1 tracking-wider">{g.number}</p>
          <p className="text-sm font-medium text-gray-800">{g.holder}</p>
          <button onClick={copy} className="mt-4 inline-flex items-center gap-2 bg-creamBG hover:bg-weddingGold/20 text-weddingRed text-xs font-semibold px-4 py-2 rounded-lg border border-weddingGold/40 transition">
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Đã sao chép!' : 'Sao chép số tài khoản'}
          </button>
        </div>
      </div>
    </section>
  );
}
