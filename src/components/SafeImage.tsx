'use client';
import { useEffect, useRef, useState } from 'react';

// <img> thường: dùng ảnh thật trong /public/images, tự chuyển sang ảnh dự phòng nếu chưa có file.
export default function SafeImage({ src, fallback, alt, className, priority }: { src: string; fallback: string; alt: string; className?: string; priority?: boolean }) {
  const [url, setUrl] = useState(src);
  const ref = useRef<HTMLImageElement>(null);

  // Ảnh lỗi trước khi React hydrate sẽ không kích hoạt onError → kiểm tra lại khi mount
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setUrl(fallback);
  }, [fallback]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={url} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} onError={() => url !== fallback && setUrl(fallback)} />
  );
}
