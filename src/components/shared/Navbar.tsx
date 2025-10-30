// src/components/shared/Navbar.tsx
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react' 

// Impor komponen kustom kita
import CustomHamburger from '@/components/ui/CustomHamburger' 
import NavLink from '@/components/ui/NavLink' 
import StayWithUsButton from '@/components/ui/StayWithUsButton' 

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

// Data Links 
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
      // Set state true jika scroll vertikal melebihi 10px
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

  // KUNCI: Variabel dinamis untuk warna bar & teks saat SCROLL
  const defaultBarColor = 'bg-white';
  const scrolledBarColor = 'bg-primary';
  const barColorClass = isScrolled ? scrolledBarColor : defaultBarColor;
  
  // Warna Teks saat SCROLL
  const linkTextColorClass = isScrolled ? 'text-primary' : 'text-white';

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
        {/* Kontainer Navigasi Utama: W-full */}
        <nav className="w-full h-20 relative"> 
          
          {/* Kontainer Flex Internal: Mengatur 3-kolom dan memberi padding horizontal */}
          <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 

            {/* SISI KIRI: Tombol Menu & Links Navigasi Desktop */}
            <motion.div 
              className="flex-1 flex justify-start items-center space-x-6" 
              variants={itemVariants}
            >
              {/* CustomHamburger */}
              <CustomHamburger 
                onClick={toggleMobileMenu} 
                isOpen={isMobileMenuOpen} 
                barColor={barColorClass} // Mengirimkan warna baru
              />
              
              {/* Navigasi Desktop Links */}
              <div className="hidden lg:flex space-x-6 font-sans text-sm uppercase tracking-widest font-medium">
                {navLinks.map((link) => (
                    <NavLink 
                        key={link.href} 
                        href={link.href} 
                        external={link.external} 
                        // KUNCI: Style dinamis (text-primary saat scroll)
                        className={`${linkTextColorClass} hover:text-primary`}
                    >
                        {link.label}
                    </NavLink>
                ))}
              </div>
            </motion.div>

            {/* SISI TENGAH: Logo (Selalu Muncul di Tengah Flex Container) */}
            <motion.div 
              // Positioning: absolute top/left/transform
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                // KUNCI SCALE: Default 100%, Scrolled 70%
                ${isScrolled ? 'scale-70' : 'scale-100'}`} 
              variants={itemVariants}
            >
                <Link 
                    href="https://ulamanbali.com" 
                    onClick={() => window.location.href = 'https://ulamanbali.com'} 
                >
                    <Image 
                        src="/images/ulaman-logo-small.svg" 
                        alt="Ulaman Logo"
                        // Wajib: Definisikan ukuran dasar
                        width={100} 
                        height={30}
                        priority
                        className={`transition-all duration-300 ${
                            // Logo berwarna PRIMARY (filter-none) saat di-scroll
                            // Logo default di Hero (invert) harus menggunakan warna putih
                            isScrolled ? 'filter-none' : 'filter-none' 
                        }`}
                    />
                </Link>
            </motion.div>


            {/* SISI KANAN: Tombol Booking */}
            <motion.div 
              className="flex-1 flex justify-end"
              variants={itemVariants}
            >
              <StayWithUsButton 
                isScrolled={isScrolled} 
              />
            </motion.div>
            
          </div>
        </nav>
      </motion.header>

      {/* MOBILE MENU OVERLAY (Sudah direvisi ke layout grid) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100vw' }} 
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background"
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
            
            {/* Konten Menu Utama (Grid Teks Besar) */}
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-2 gap-x-16 gap-y-4 font-serif text-3xl md:text-5xl text-primary leading-snug">
                    <div className="flex flex-col gap-2 text-right">
                        <Link onClick={toggleMobileMenu} href="/"><span className="hover:text-foreground transition-colors">Home</span></Link>
                        <Link onClick={toggleMobileMenu} href="/rooms"><span className="hover:text-foreground transition-colors">Villas / Packages</span></Link>
                        <Link onClick={toggleMobileMenu} href="https://riversidespabyulaman.com/"><span className="hover:text-foreground transition-colors">Spa / Retreats</span></Link>
                        <Link onClick={toggleMobileMenu} href="https://earthbyulaman.com/"><span className="hover:text-foreground transition-colors">Dine / Experiences</span></Link>
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                        <Link onClick={toggleMobileMenu} href="/facilities"><span className="hover:text-foreground transition-colors">Facilities / Blog</span></Link>
                        <Link onClick={toggleMobileMenu} href="/reviews"><span className="hover:text-foreground transition-colors">Reviews / About</span></Link>
                        <Link onClick={toggleMobileMenu} href="/contact"><span className="hover:text-foreground transition-colors">Contact / The Map</span></Link>
                    </div>
                </div>
                
                <div className="mt-12 flex flex-col items-center">
                    <StayWithUsButton 
                        isScrolled={true} 
                        onClick={toggleMobileMenu}
                        className="px-10 py-4 text-xl" 
                    />
                    <p className="font-sans text-xs text-foreground/60 mt-8 text-center">
                        Whatsapp / Directions / TripAdvisor / Instagram / Facebook
                    </p>
                </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}