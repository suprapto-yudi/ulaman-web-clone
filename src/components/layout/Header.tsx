// src/components/layout/Header.tsx

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
// KOREKSI UTAMA: Ubah path import menjadi relative path (Jalan Pintas)
import UlamanLogo from '../ui/UlamanLogo'; 
import NavLink from '@/components/ui/NavLink'; 
import StayWithUsButton from '@/components/ui/StayWithUsButton'; 

const HEADER_HEIGHT_CHANGE = 80; 

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [logoSize, setLogoSize] = useState(1); 

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    
    setScrolled(scrollY > 50); 
    
    const newSize = Math.max(0.7, 1 - (scrollY / HEADER_HEIGHT_CHANGE) * 0.3);
    setLogoSize(newSize);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // KOREKSI: Hitung style background/shadow langsung di sini
  const backgroundStyle = scrolled 
    ? "bg-background/95 shadow-md backdrop-blur-sm" 
    : "bg-transparent"; // Style transparan

  return (
    <motion.header
      // Terapkan style background langsung
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${backgroundStyle}`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Navigasi Kiri */}
        <div className="flex space-x-6">
          {/* NavLink harus bertipe emas/primary */}
          <NavLink href="/villas" className="text-primary hover:text-accent transition-colors">Villas</NavLink>
          <NavLink href="/spa" className="text-primary hover:text-accent transition-colors">Spa</NavLink>
          <NavLink href="/dine" className="text-primary hover:text-accent transition-colors">Dine</NavLink>
          <NavLink href="/retreats" className="text-primary hover:text-accent transition-colors">Retreats</NavLink>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <motion.div
            style={{ scale: logoSize }}
            className="origin-center"
          >
            {/* Warna Logo tetap Emas (Primary) */}
            <UlamanLogo className="text-primary" /> 
          </motion.div>
        </div>

        {/* Tombol Kanan */}
        <div className="h-full flex items-center">
            <StayWithUsButton isScrolled={scrolled} /> 
        </div>

      </div>
    </motion.header>
  );
}