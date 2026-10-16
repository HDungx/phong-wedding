# Thiệp cưới online — Thanh Phong & Mỹ Nhi

Next.js 15 (App Router) + Tailwind CSS 3. RSVP và sổ lưu bút được ghi vào **Google Sheet** qua Google Apps Script.

## Chạy local

```bash
npm install
cp .env.example .env.local   # rồi điền giá trị
npm run dev
```

Mọi nội dung thiệp (tên, ngày giờ, địa điểm, số tài khoản, danh sách ảnh…) nằm trong `src/lib/config.ts`.

## Ảnh

Đặt ảnh vào `public/images/` với đúng tên: `1_3.jpg`, `4_3.jpg`, `5_3.jpg`, `6_3.jpg`, `8_3.jpg`, `9_3.jpg`, `groom.jpg`, `bride.jpg`, và QR ngân hàng `qr-groom.png`, `qr-bride.png`.
Nếu chưa có file, trang tự dùng ảnh dự phòng.

## Kết nối Google Sheet

1. Tạo một Google Sheet mới (tên tuỳ ý).
2. Menu **Tiện ích mở rộng → Apps Script**, xoá code mẫu, dán toàn bộ `apps-script/Code.gs`.
3. Đổi `SECRET` ở đầu file thành một chuỗi bí mật của bạn.
4. **Triển khai → Tùy chọn triển khai mới → Ứng dụng web**: *Thực thi bằng: Tôi*, *Ai có quyền truy cập: Bất kỳ ai*. Cấp quyền khi được hỏi, rồi copy **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
5. Đặt biến môi trường (`.env.local` khi chạy local; **Vercel → Settings → Environment Variables** khi deploy):
   - `GOOGLE_SCRIPT_URL` = URL ở bước 4
   - `GOOGLE_SCRIPT_SECRET` = đúng chuỗi `SECRET` ở bước 3
   - `NEXT_PUBLIC_SITE_URL` = domain thật của trang
6. Sheet sẽ tự tạo 2 tab: **RSVP** (thời gian, họ tên, khách của, xác nhận, số người, ghi chú) và **Wishes** (lời chúc).

> Mỗi lần sửa `Code.gs` cần **Triển khai → Quản lý bản triển khai → Chỉnh sửa → Phiên bản mới**, URL giữ nguyên.

## Deploy lên Vercel

Import repo trên vercel.com → thêm 3 biến môi trường ở trên → Deploy. Không cần cấu hình thêm.
