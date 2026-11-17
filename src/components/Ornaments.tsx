// Hoa văn vàng dùng SVG + currentColor (đổi màu bằng class text-*).

/** Hoa văn góc (trang trí xoắn kiểu thiệp cổ). Mặc định ở góc trái-trên; dùng `flip` để lật. */
export function CornerFlourish({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {/* thân xoắn chính */}
      <path d="M6 84 C6 56 22 40 44 38 C58 37 66 28 60 18 C56 11 46 12 45 20 C44 27 53 29 56 23" />
      <path d="M6 84 C16 72 20 62 32 58 C44 54 52 62 46 70 C42 76 34 72 37 66" />
      {/* lá phụ */}
      <path d="M44 38 C50 30 60 28 72 30 C66 38 54 42 44 38 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M22 50 C20 40 24 30 34 24 C38 34 34 44 22 50 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M60 18 C66 8 78 6 90 10 C86 20 72 24 60 18 Z" fill="currentColor" fillOpacity="0.25" />
      {/* nụ hoa */}
      <circle cx="30" cy="64" r="3.2" fill="currentColor" />
      <circle cx="52" cy="22" r="2.4" fill="currentColor" />
      <circle cx="82" cy="18" r="1.8" fill="currentColor" />
      <path d="M76 36 C82 34 88 36 94 42" />
    </svg>
  );
}

/** Hoa văn trung tâm nhỏ (hình thoi + lá hai bên). */
function CenterMotif({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M60 3 L74 15 L60 27 L46 15 Z" />
      <path d="M60 9 L68 15 L60 21 L52 15 Z" fill="currentColor" />
      <path d="M46 15 C38 4 26 4 20 11 C26 13 30 12 34 9 C30 15 24 18 16 15 C24 26 38 26 46 15 Z" />
      <path d="M74 15 C82 4 94 4 100 11 C94 13 90 12 86 9 C90 15 96 18 104 15 C96 26 82 26 74 15 Z" />
      <circle cx="8" cy="15" r="2" fill="currentColor" />
      <circle cx="112" cy="15" r="2" fill="currentColor" />
    </svg>
  );
}

/** Đường kẻ ngang: chấm — gạch — hoa văn giữa — gạch — chấm. */
export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 text-weddingGold ${className}`} aria-hidden="true">
      <span className="w-2.5 h-2.5 rounded-full bg-current" />
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="h-px w-10 sm:w-16 bg-current" />
      <span className="w-1 h-1 rounded-full bg-current" />
      <CenterMotif className="w-20 sm:w-24 h-6 shrink-0" />
      <span className="w-1 h-1 rounded-full bg-current" />
      <span className="h-px w-10 sm:w-16 bg-current" />
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="w-2.5 h-2.5 rounded-full bg-current" />
    </div>
  );
}

/**
 * Khung hoa văn bao quanh nội dung: đường kẻ trên có hoa văn, hai góc xoắn,
 * hai đường kẻ dọc hai bên kết thúc bằng chấm tròn.
 */
export function OrnateFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative text-weddingGold ${className}`}>
      {/* trên */}
      <div className="relative pt-3">
        <CornerFlourish className="absolute -top-1 -left-1 w-16 sm:w-20 h-auto" />
        <CornerFlourish className="absolute -top-1 -right-1 w-16 sm:w-20 h-auto" flip />
        <OrnamentDivider />
      </div>

      {/* thân + hai đường dọc */}
      <div className="relative mt-10 px-5 sm:px-7">
        <span className="absolute left-1.5 top-0 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-current" />
        <span className="absolute right-1.5 top-0 w-2.5 h-2.5 translate-x-1/2 rounded-full bg-current" />
        <span className="absolute left-1.5 top-4 bottom-4 w-px bg-current" />
        <span className="absolute right-1.5 top-4 bottom-4 w-px bg-current" />
        <span className="absolute left-1.5 bottom-0 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-current" />
        <span className="absolute right-1.5 bottom-0 w-2.5 h-2.5 translate-x-1/2 rounded-full bg-current" />
        <div className="text-inherit">{children}</div>
      </div>

      {/* dưới */}
      <div className="relative mt-6 pb-3">
        <OrnamentDivider />
      </div>
    </div>
  );
}

/** Cụm hoa lá vẽ nét (đặt đầu trang/đầu mục), mờ nhẹ. */
export function FloralSpray({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {/* hoa giữa */}
      <path d="M200 14 C176 8 160 26 170 44 C178 58 196 54 200 40 C204 54 222 58 230 44 C240 26 224 8 200 14 Z" />
      <path d="M200 40 C196 30 196 22 200 14 M184 30 C190 34 196 38 200 40 M216 30 C210 34 204 38 200 40" />
      {/* nhánh trái */}
      <path d="M170 44 C140 52 110 64 70 100 C60 108 52 112 46 116" />
      <path d="M140 54 C128 44 112 44 100 50 C108 62 126 64 140 54 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M112 72 C102 62 86 62 76 70 C84 82 102 82 112 72 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M86 90 C78 80 64 80 56 88 C64 98 78 98 86 90 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M150 62 C146 76 138 84 126 90 C124 78 132 68 150 62 Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="50" cy="112" r="2.2" fill="currentColor" />
      {/* nhánh phải (đối xứng) */}
      <path d="M230 44 C260 52 290 64 330 100 C340 108 348 112 354 116" />
      <path d="M260 54 C272 44 288 44 300 50 C292 62 274 64 260 54 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M288 72 C298 62 314 62 324 70 C316 82 298 82 288 72 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M314 90 C322 80 336 80 344 88 C336 98 322 98 314 90 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M250 62 C254 76 262 84 274 90 C276 78 268 68 250 62 Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="350" cy="112" r="2.2" fill="currentColor" />
      {/* lá nhỏ trên hoa */}
      <path d="M170 20 C160 10 146 10 138 16 C146 26 162 28 170 20 Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M230 20 C240 10 254 10 262 16 C254 26 238 28 230 20 Z" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}
