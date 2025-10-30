// src/components/ui/FooterLink.tsx
import Link from 'next/link'
import React from 'react';
// Wajib import twMerge untuk menggabungkan class dengan aman
import { twMerge } from 'tailwind-merge';

type FooterLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function FooterLink({
  href,
  children,
  className = '',
}: FooterLinkProps) {
  // Logika external link (untuk target dan rel)
  const isExternal = href.startsWith('http') || href.startsWith('https');

  // Base classes untuk link di footer (text-white/70)
  const baseClasses = 
    'text-white/70 text-sm tracking-wide hover:text-white transition-colors duration-300 relative group'
  
  // Kelas untuk pseudoelemen ::after (Underline)
  const underlineClasses = `
    after:content-[''] after:absolute after:bottom-[-2px] after:left-0 
    after:h-[1px] after:w-full after:bg-primary 
    after:transition-transform after:duration-300 after:ease-out
    after:origin-left after:scale-x-0 
    group-hover:after:scale-x-100
  `
  // Menggabungkan semua class
  const finalClasses = twMerge(baseClasses, underlineClasses, className);

  return (
    <Link
      href={href}
      // Terapkan target dan rel hanya jika isExternal adalah true
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined} 
      className={finalClasses}
    >
      {children}
    </Link>
  );
}
