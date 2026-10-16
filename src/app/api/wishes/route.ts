import { NextResponse } from 'next/server';
import { appendRow, readWishes } from '@/lib/sheet';

const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

export async function GET() {
  try {
    return NextResponse.json({ ok: true, wishes: await readWishes() });
  } catch {
    return NextResponse.json({ ok: true, wishes: [] });
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: 'Dữ liệu không hợp lệ' }, { status: 400 });
  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name, 60);
  const message = clean(body.message, 500);
  if (!name || !message) return NextResponse.json({ ok: false, error: 'Vui lòng nhập đủ thông tin' }, { status: 400 });

  try {
    await appendRow('Wishes', { name, message });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Wish error', e);
    return NextResponse.json({ ok: false, error: 'Không gửi được, vui lòng thử lại' }, { status: 502 });
  }
}
