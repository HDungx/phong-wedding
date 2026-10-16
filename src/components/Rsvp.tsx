'use client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { wedding as w } from '@/lib/config';

const field = 'w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-weddingGold focus:outline-none text-sm bg-white';
const label = 'block text-xs font-semibold text-gray-700 uppercase mb-1';

export default function Rsvp() {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      const name = String(fd.get('name'));
      setMsg(attending === 'yes'
        ? `Cảm ơn ${name} đã xác nhận tham dự! Rất hân hạnh được đón tiếp bạn.`
        : `Cảm ơn ${name} đã phản hồi. Rất tiếc không được gặp bạn, mong sớm hẹn gặp lại!`);
      setStatus('done');
      form.reset();
      setAttending('yes');
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Có lỗi xảy ra, vui lòng thử lại.');
      setStatus('error');
    }
  }

  return (
    <section id="rsvp" className="py-12 px-6 bg-white text-center">
      <div className="max-w-lg mx-auto bg-creamBG p-6 md:p-8 rounded-2xl border border-weddingGold/30 shadow-lg">
        <span className="text-xs uppercase font-semibold tracking-widest text-weddingGold">Xác Nhận Tham Dự</span>
        <h2 className="font-serif text-3xl font-bold text-weddingRed mt-1 mb-2">RSVP</h2>
        <p className="text-xs text-gray-600 mb-6">Xin vui lòng phản hồi trước ngày {w.rsvpDeadline} để gia đình chuẩn bị đón tiếp chu đáo nhất!</p>

        <form onSubmit={onSubmit} className="space-y-4 text-left">
          {/* honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div>
            <label className={label} htmlFor="name">Họ &amp; Tên của bạn *</label>
            <input id="name" name="name" required maxLength={80} placeholder="Nhập tên của bạn" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="side">Bạn là khách của</label>
            <select id="side" name="side" className={field}>
              <option value="Chú Rể Thanh Phong">Khách mời Chú Rể Thanh Phong</option>
              <option value="Cô Dâu Mỹ Nhi">Khách mời Cô Dâu Mỹ Nhi</option>
              <option value="Cả Hai">Khách mời Cả Hai</option>
            </select>
          </div>
          <div>
            <span className={label}>Xác nhận tham dự</span>
            <div className="grid grid-cols-2 gap-3">
              {([['yes', 'Sẽ Tham Dự'], ['no', 'Rất Tiếc Vắng Mặt']] as const).map(([v, t]) => (
                <label key={v} className={`flex items-center gap-2 p-3 bg-white border rounded-xl cursor-pointer hover:border-weddingGold ${attending === v ? 'border-weddingRed' : 'border-gray-200'}`}>
                  <input type="radio" name="attending" value={v} checked={attending === v} onChange={() => setAttending(v)} className="accent-weddingRed" />
                  <span className="text-xs font-medium text-gray-800">{t}</span>
                </label>
              ))}
            </div>
          </div>
          {attending === 'yes' && (
            <div>
              <label className={label} htmlFor="guests">Số lượng người tham dự</label>
              <select id="guests" name="guests" className={field}>
                <option value="1">1 người</option>
                <option value="2">2 người</option>
                <option value="3">3 người</option>
                <option value="4">4 người (Gia đình)</option>
                <option value="5">5 người trở lên</option>
              </select>
            </div>
          )}
          <div>
            <label className={label} htmlFor="note">Ghi chú (không bắt buộc)</label>
            <input id="note" name="note" maxLength={300} placeholder="VD: ăn chay, có em bé…" className={field} />
          </div>

          <button type="submit" disabled={status === 'sending'} className="w-full bg-weddingRed hover:bg-weddingRedLight disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all text-sm mt-2 inline-flex items-center justify-center gap-2">
            {status === 'sending' && <Loader2 size={16} className="animate-spin" />} Gửi Phản Hồi RSVP
          </button>
        </form>

        {(status === 'done' || status === 'error') && (
          <div role="status" className={`mt-4 p-3 rounded-xl text-xs font-medium ${status === 'done' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{msg}</div>
        )}
      </div>
    </section>
  );
}
