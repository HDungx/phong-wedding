'use client';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { seedWishes } from '@/lib/config';

type Wish = { name: string; message: string; createdAt: string };
const field = 'w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-weddingGold focus:outline-none text-sm bg-white';

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(seedWishes);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/wishes')
      .then((r) => r.json())
      .then((j) => j.ok && j.wishes.length && setWishes(j.wishes))
      .catch(() => {});
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      // Hiển thị ngay (optimistic); danh sách đầy đủ lấy lại từ Sheet ở lần tải sau
      setWishes((prev) => [{ name: String(fd.get('name')), message: String(fd.get('message')), createdAt: 'Vừa xong' }, ...prev]);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-lg mx-auto text-center">
        <span className="text-xs uppercase font-semibold tracking-widest text-weddingGold">Sổ Lưu Bút</span>
        <h2 className="font-serif text-3xl font-bold text-weddingRed mt-1 mb-2">Gửi Lời Chúc Mừng</h2>
        <p className="text-xs text-gray-600 mb-6">Hãy gửi những lời chúc tốt đẹp nhất đến cặp đôi Thanh Phong &amp; Mỹ Nhi</p>

        <form onSubmit={onSubmit} className="space-y-4 text-left bg-creamBG p-6 rounded-2xl shadow-md border border-weddingGold/20 mb-8">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <input name="name" required maxLength={60} placeholder="Tên của bạn *" className={field} />
          <textarea name="message" rows={3} required maxLength={500} placeholder="Nhập lời chúc trân trọng của bạn..." className={field} />
          {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
          <button type="submit" disabled={sending} className="w-full bg-weddingGold hover:bg-yellow-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl shadow transition-all text-sm inline-flex items-center justify-center gap-2">
            {sending && <Loader2 size={16} className="animate-spin" />} Gửi Lời Chúc
          </button>
        </form>

        <div className="space-y-3 text-left max-h-72 overflow-y-auto pr-1">
          {wishes.map((w, i) => (
            <div key={i} className="bg-creamBG p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs text-weddingRed">{w.name}</span>
                <span className="text-[10px] text-gray-400">{w.createdAt.slice(0, 10) === w.createdAt ? w.createdAt : w.createdAt.slice(0, 10).split('-').reverse().join('/')}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{w.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
