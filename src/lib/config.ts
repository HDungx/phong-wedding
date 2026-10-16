// Toàn bộ nội dung thiệp nằm ở đây — chỉnh sửa tại 1 chỗ.

export const wedding = {
  groom: {
    name: "Thanh Phong",
    short: "Thanh Phong",
    father: "Tống Đức Thái",
    mother: "Nguyễn Thị Xanh",
    photo: "/images/groom.jpg",
    photoFallback:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
  },
  bride: {
    name: "Mỹ Nhi",
    short: "Mỹ Nhi",
    father: "Trần Công Luyến",
    mother: "Nguyễn Thị Huệ",
    photo: "/images/bride-2.jpg",
    photoFallback:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
  // 12/12/2026 là Thứ Bảy (bản HTML gốc ghi nhầm "Chủ Nhật")
  dateISO: "2026-12-12T17:00:00+07:00",
  dateLabel: "Thứ Bảy, Ngày 12 Tháng 12 Năm 2026",
  lunarLabel: "Nhằm Ngày 04 Tháng 11 Năm Bính Ngọ",
  welcomeTime: "17:00",
  partyTime: "18:30",
  rsvpDeadline: "05/12/2026",
  venue: {
    name: "NHÀ HÀNG HƯƠNG PHỐ",
    hall: "Tầng 2 - Sảnh 3 & 4",
    address: "A12 Đ. Phan Văn Trị, Phường 10, Quận Gò Vấp, TP. Hồ Chí Minh",
    mapUrl: "https://maps.google.com/?cid=12288145105314434140",
  },
  music: { videoId: "72qtZ2ezb44", start: 139, title: "Gói Con Tim Làm Quà" },
  heroPhoto: "/images/photo-1.jpg",
  heroFallback:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  gallery: [
    {
      src: "/images/photo-1.jpg",
      fallback:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    },
    {
      src: "/images/photo-2.jpg",
      fallback:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    },
    {
      src: "/images/photo-3.jpg",
      fallback:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
    },
    {
      src: "/images/photo-4.jpg",
      fallback:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
    },
    {
      src: "/images/photo-5.jpg",
      fallback:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
    },
    {
      src: "/images/photo-6.jpg",
      fallback:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
    },
  ],
  // TODO: thay bằng số tài khoản + ảnh QR thật (đặt ảnh vào public/images/qr-groom.png, qr-bride.png)
  gifts: {
    groom: {
      label: "Chú Rể Thanh Phong",
      bank: "MB Bank",
      number: "999988889999",
      holder: "TỐNG THANH PHONG",
      qr: "/images/qr-groom.png",
    },
    bride: {
      label: "Cô Dâu Mỹ Nhi",
      bank: "Vietcombank",
      number: "1012345678",
      holder: "TRẦN MỸ NHI",
      qr: "/images/qr-bride.png",
    },
  },
} as const;

export const seedWishes = [
  {
    name: "Nguyễn Văn Hùng",
    message: "Chúc hai bạn Phong & Nhi trăm năm hạnh phúc, vẹn tròn như ý nhé!",
    createdAt: "",
  },
  {
    name: "Trần Mai Anh",
    message:
      "Chúc cô dâu xinh đẹp Mỹ Nhi luôn tràn ngập niềm vui và yêu thương bên anh Phong!",
    createdAt: "",
  },
];
