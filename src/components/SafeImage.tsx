'use client';
import { useState } from 'react';

// <img> thường: dùng ảnh thật trong /public/images, tự chuyển sang ảnh dự phòng nếu chưa có file.
export default function SafeImage({ src, fallback, alt, className, priority }: { src: string; fallback: string; alt: string; className?: string; priority?: boolean }) {
  const [url, setUrl] = useState(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} onError={() => url !== fallback && setUrl(fallback)} />
  );
}
