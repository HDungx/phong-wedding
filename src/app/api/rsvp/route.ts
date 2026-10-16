import { NextResponse } from 'next/server';
import { appendRow } from '@/lib/sheet';

const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: 'Dữ liệu không hợp lệ' }, { status: 400 });

  // Honeypot chống bot: người thật không điền ô này
  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const attending = body.attending === 'no' ? 'Vắng mặt' : 'Tham dự';
  const guests = attending === 'Tham dự' ? Math.min(Math.max(Number(body.guests) || 1, 1), 10) : 0;
  if (!name) return NextResponse.json({ ok: false, error: 'Vui lòng nhập tên' }, { status: 400 });

  try {
    await appendRow('RSVP', {
      name,
      side: clean(body.side, 40),
      attending,
      guests,
      note: clean(body.note, 300),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('RSVP error', e);
    return NextResponse.json({ ok: false, error: 'Không gửi được, vui lòng thử lại' }, { status: 502 });
  }
}
