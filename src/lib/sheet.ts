// Gọi Google Apps Script (ghi vào Google Sheet). Chỉ dùng phía server.

const URL_ = process.env.GOOGLE_SCRIPT_URL;
const SECRET = process.env.GOOGLE_SCRIPT_SECRET ?? '';

export const sheetConfigured = Boolean(URL_);

export async function appendRow(sheet: 'RSVP' | 'Wishes', data: Record<string, string | number>) {
  if (!URL_) throw new Error('GOOGLE_SCRIPT_URL chưa được cấu hình');
  const res = await fetch(URL_, {
    method: 'POST',
    // text/plain để Apps Script không yêu cầu preflight
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ secret: SECRET, sheet, data }),
    redirect: 'follow',
    cache: 'no-store',
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.ok) throw new Error(json?.error ?? `Apps Script lỗi (${res.status})`);
}

export async function readWishes(): Promise<{ name: string; message: string; createdAt: string }[]> {
  if (!URL_) return [];
  const u = new URL(URL_);
  u.searchParams.set('action', 'wishes');
  u.searchParams.set('secret', SECRET);
  const res = await fetch(u, { redirect: 'follow', next: { revalidate: 20 } });
  const json = await res.json().catch(() => null);
  return json?.ok ? json.wishes : [];
}
