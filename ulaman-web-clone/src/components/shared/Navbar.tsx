// src/components/shared/Navbar.tsx
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react' 

// Impor komponen kustom kita
import CustomHamburger from '@/components/ui/CustomHamburger' // Wajib ada
import NavLink from '@/components/ui/NavLink' // Wajib ada
import StayWithUsButton from '@/components/ui/StayWithUsButton' // Wajib ada

// Varian animasi untuk container
const navbarVariants: Variants = { 
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5, 
      staggerChildren: 0.2, 
    },
  },
}

// Varian animasi untuk item
const itemVariants: Variants = { 
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
}

// Data Links (Dipersingkat untuk contoh)
const navLinks = [
  { href: 'https://ulamanbali.com/rooms/', label: 'Villas', external: false },
  { href: 'https://riversidespabyulaman.com/', label: 'Spa', external: true },
  { href: 'https://earthbyulaman.com/', label: 'Dine', external: true },
  { href: 'https://ulamanbali.com/retreats/', label: 'Retreats', external: false },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false) 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // KUNCI: useEffect untuk mendengarkan event scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // KUNCI: Variabel dinamis untuk warna bar
  const barColorClass = isScrolled ? 'bg-foreground' : 'bg-white';

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
            ${isScrolled ? 'bg-background shadow-md' : 'bg-transparent'}
        `}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Kontainer Navigasi Utama: W-full, tanpa max-width */}
        <nav className="w-full h-20 relative"> 
          
          {/* Kontainer Flex Internal: Mengatur 3-kolom dan memberi padding horizontal */}
          {/* Kunci Mentok Tepi: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 */}
          <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 

            {/* SISI KIRI: Tombol Menu & Links Navigasi Desktop */}
            <motion.div 
              className="flex-1 flex justify-start items-center space-x-6" 
              variants={itemVariants}
            >
              {/* KUNCI INTEGRASI: CustomHamburger */}
              <CustomHamburger 
                onClick={toggleMobileMenu} 
                isOpen={isMobileMenuOpen} 
                barColor={barColorClass} 
              />
              
              {/* Navigasi Desktop Links */}
              <div className="hidden lg:flex space-x-6 font-sans text-sm uppercase tracking-widest font-medium">
                {navLinks.map((link) => (
                    <NavLink 
                        key={link.href} 
                        href={link.href} 
                        external={link.external} 
                        // KUNCI: Style dinamis
                        className={isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-primary'}
                    >
                        {link.label}
                    </NavLink>
                ))}
              </div>
            </motion.div>

            {/* SISI TENGAH: Logo (Selalu Muncul di Tengah Flex Container) */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
              variants={itemVariants}
            >
                <Link 
                    href="https://ulamanbali.com" 
                    onClick={() => window.location.href = 'https://ulamanbali.com'} 
                >
                    <Image 
                        src="/images/ulaman-logo-small.svg" // Pastikan nama file ini benar
                        alt="Ulaman Logo"
                        width={100}
                        height={30}
                        priority
                        // Filter Invert tetap ada untuk menyesuaikan warna saat scroll
                        className={`transition-all duration-300 ${
                            isScrolled ? 'filter-none' : 'invert'
                        }`}
                    />
                </Link>
            </motion.div>


            {/* SISI KANAN: Tombol Booking */}
            <motion.div 
              className="flex-1 flex justify-end"
              variants={itemVariants}
            >
              {/* KUNCI INTEGRASI: StayWithUsButton */}
              <StayWithUsButton 
                isScrolled={isScrolled} 
              />
            </motion.div>
            
          </div>
        </nav>
      </motion.header>

      {/* MOBILE MENU OVERLAY (Disarankan menggunakan komponen terpisah) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100vw' }} 
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-100 bg-background"
          >
            {/* Header Close Button */}
            <div className="flex justify-end items-center h-20 px-4 sm:px-6">
              <button
                onClick={toggleMobileMenu}
                aria-label="Close navigation menu"
                className="text-foreground"
              >
                <X size={32} />
              </button>
            </div>
            
            {/* Konten Menu Utama (Sesuai Struktur Gambar 5271d3.jpg) */}
            <nav className="flex flex-col items-center justify-start py-12 px-4 h-[calc(100vh-80px)]">
                <div className="text-center font-serif text-3xl md:text-5xl text-primary leading-snug">
                    <p>Home / Villas / Packages</p>
                    <p>/ Spa / Retreats / Dine</p>
                    <p>Experiences</p>
                </div>
                
                <div className="mt-auto pb-8 flex flex-col items-center">
                    <StayWithUsButton 
                        isScrolled={true} 
                        onClick={toggleMobileMenu} // Menutup menu setelah klik
                    />
                    <p className="font-sans text-xs text-foreground/60 mt-8">
                        Whatsapp / Directions / TripAdvisor
                        <br/>/ Instagram / Facebook
                    </p>
                </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}