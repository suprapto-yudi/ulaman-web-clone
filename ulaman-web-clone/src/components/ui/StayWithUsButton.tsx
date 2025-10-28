// src/components/ui/StayWithUsButton.tsx

import Button from '@/components/ui/Button'; 
import React from 'react';

type StayWithUsButtonProps = {
  // KUNCI: Tambahkan prop isScrolled
  isScrolled: boolean;
  // KUNCI: Tambahkan prop onClick (opsional, dipakai di mobile menu)
  onClick?: () => void;
};

export default function StayWithUsButton({ isScrolled, onClick }: StayWithUsButtonProps) {

  // Logika style kondisional (sama seperti di Navbar)
  const dynamicClassName = isScrolled 
    ? 'border-primary text-primary hover:bg-primary hover:text-white' 
    : 'border-white text-white hover:bg-primary hover:text-white';

  return (
    <Button
      href="/booking"
      variant="outline"
      className={dynamicClassName}
      onClick={onClick} // Pasang onClick untuk mobile menu
    >
      Stay With Us
    </Button>
  );
}