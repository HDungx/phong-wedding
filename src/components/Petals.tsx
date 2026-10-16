'use client';
import { useEffect, useRef } from 'react';

export default function Petals() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (document.hidden || !ref.current) return;
      const p = document.createElement('div');
      const size = Math.random() * 12 + 8;
      p.className = 'petal';
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 5 + 7}s`;
      ref.current.appendChild(p);
      setTimeout(() => p.remove(), 12000);
    }, 600);
    return () => clearInterval(id);
  }, []);
  return <div ref={ref} aria-hidden className="fixed inset-0 pointer-events-none z-30 overflow-hidden" />;
}
