import type { Metadata, Viewport } from 'next';
import { Alex_Brush, Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const script = Alex_Brush({ weight: '400', subsets: ['latin', 'vietnamese'], variable: '--font-script' });
const serif = Cormorant_Garamond({ weight: ['400', '600', '700'], style: ['normal', 'italic'], subsets: ['latin', 'vietnamese'], variable: '--font-serif' });
const sans = Montserrat({ weight: ['300', '400', '500', '600'], subsets: ['latin', 'vietnamese'], variable: '--font-sans' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://phong-wedding.vercel.app';
const title = 'Thiệp Cưới Online - Thanh Phong & Mỹ Nhi';
const description = 'Trân trọng kính mời bạn đến dự Lễ Thành Hôn của Thanh Phong & Mỹ Nhi — 12/12/2026 tại Nhà hàng Hương Phố, Gò Vấp, TP.HCM.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: 'website', locale: 'vi_VN', images: [{ url: '/images/1_3.jpg' }] },
};

export const viewport: Viewport = { themeColor: '#8B0000', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${script.variable} ${serif.variable} ${sans.variable}`}>
      <body className="bg-creamBG font-sans text-gray-800 antialiased relative overflow-x-hidden">{children}</body>
    </html>
  );
}
