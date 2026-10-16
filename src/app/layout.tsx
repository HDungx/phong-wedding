import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://phong-wedding.vercel.app';
const title = 'Thiệp Cưới Online - Thanh Phong & Mỹ Nhi';
const description = 'Trân trọng kính mời bạn đến dự Lễ Thành Hôn của Thanh Phong & Mỹ Nhi — 12/12/2026 tại Nhà hàng Hương Phố, Gò Vấp, TP.HCM.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: 'website', locale: 'vi_VN', images: [{ url: '/images/photo-1.jpg' }] },
};

export const viewport: Viewport = { themeColor: '#8B0000', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-creamBG font-sans text-gray-800 antialiased relative overflow-x-hidden">{children}</body>
    </html>
  );
}
