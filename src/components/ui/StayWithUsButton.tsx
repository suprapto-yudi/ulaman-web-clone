// src/components/ui/StayWithUsButton.tsx

import Button from '@/components/ui/Button'; 
import React from 'react';

// Asumsi: Komponen Button Anda sudah di-handle oleh Next/Link di dalamnya
type StayWithUsButtonProps = {
  isScrolled: boolean;
  onClick?: () => void;
  className?: string; // Prop opsional untuk styling tambahan
};

export default function StayWithUsButton({ isScrolled, onClick, className }: StayWithUsButtonProps) {

  // Kunci: Style yang diterapkan saat awal (transparan) atau setelah di-scroll (solid/putih)
  const dynamicClassName = isScrolled 
    ? 'border-primary text-primary bg-transparent hover:bg-primary hover:text-white' // Tombol Emas saat Scroll (Di web ori, tombol ini biasanya berubah menjadi solid emas)
    : 'border-white text-white bg-transparent hover:bg-white hover:text-primary'; // Tombol Putih Transparan di Hero

  // Gabungkan styling dinamis dan styling eksternal (className)
  const finalClassName = `${dynamicClassName} ${className || ''}`;

  return (
    <Button
      href="/booking"
      variant="outline" // Selalu outline, tetapi warna border/text-nya yang berubah
      // KOREKSI: Gunakan finalClassName agar styling dari parent (jika ada) ikut diterapkan
      className={finalClassName} 
      onClick={onClick} 
    >
      Stay With Us
    </Button>
  );
}