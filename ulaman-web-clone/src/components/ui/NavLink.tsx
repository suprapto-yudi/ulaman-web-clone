// src/components/ui/NavLink.tsx

import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';
import { twMerge } from 'tailwind-merge'; // Import twMerge

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string; // Menerima className untuk style dinamis (warna)
  // KUNCI: Tambahkan prop external
  external?: boolean; 
};

export default function NavLink({ href, children, className, external }: NavLinkProps) {
  
  const target = external ? '_blank' : '_self'; // Logika target
  
  // Menggabungkan className bawaan dan className dinamis dari Navbar
  const classes = twMerge("transition-colors duration-300 relative group pt-1", className);

  return (
    <Link 
      href={href} 
      className={classes}
      target={target} // Terapkan target _blank jika external
    >
      {children}
      {/* Garis Bawah Hover (Warna garis akan mengikuti warna teks) */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }} 
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        // Garis menggunakan warna 'currentColor' agar sama dengan warna teks (putih/foreground)
        className="h-px absolute bottom-0 left-0 w-full bg-current" 
      />
    </Link>
  );
}