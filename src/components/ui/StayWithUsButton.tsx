// src/components/ui/StayWithUsButton.tsx

import Button from '@/components/ui/Button'; 
import React from 'react';

type StayWithUsButtonProps = {
  // KUNCI: Tambahkan prop isScrolled
  isScrolled: boolean;
  // KUNCI: Tambahkan prop onClick (opsional, dipakai di mobile menu)
  onClick?: () => void;
  // KUNCI PERBAIKAN: Tambahkan prop className opsional
  className?: string;
};

export default function StayWithUsButton({ isScrolled, onClick, className }: StayWithUsButtonProps) {

  // Logika style kondisional (sama seperti di Navbar)
  const dynamicClassName = isScrolled 
    ? 'border-primary text-primary hover:bg-primary hover:text-white' 
    : 'border-white text-white hover:bg-primary hover:text-white';

  // Gabungkan dynamic className dengan className yang datang dari parent (Mobile Menu)
  const finalClassName = `${dynamicClassName} ${className || ''}`;
  
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