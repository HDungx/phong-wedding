'use client';
import { useEffect, useState } from 'react';
import { wedding } from '@/lib/config';

const target = new Date(wedding.dateISO).getTime();
const pad = (n: number) => String(n).padStart(2, '0');

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const d = now === null ? 0 : target - now;
  const done = now !== null && d < 0;
  const parts = [
    ['Ngày', Math.floor(d / 864e5)],
    ['Giờ', Math.floor((d % 864e5) / 36e5)],
    ['Phút', Math.floor((d % 36e5) / 6e4)],
    ['Giây', Math.floor((d % 6e4) / 1e3)],
  ] as const;

  return (
    <div className="bg-weddingRed text-white p-6 rounded-2xl shadow-xl">
      <h4 className="font-serif text-base tracking-wider text-weddingGoldLight mb-4 uppercase">Cùng Đếm Ngược Đến Ngày Vui</h4>
      {done ? (
        <div className="text-weddingGold font-serif text-lg font-bold">Lễ Thành Hôn Đã Diễn Ra — Cảm ơn bạn!</div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {parts.map(([label, v]) => (
            <div key={label} className="bg-black/30 p-3 rounded-xl border border-weddingGold/30">
              <span className="block font-serif text-3xl font-bold text-weddingGold tabular-nums">{now === null ? '--' : pad(Math.max(v, 0))}</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-300">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
