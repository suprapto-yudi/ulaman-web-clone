// src/components/sections/HeroSection.tsx

import { motion } from 'framer-motion'
// Kita tidak perlu Image karena poster sudah menghandle fallback

export default function HeroSection() {
  return (
    <motion.section 
      className="relative h-screen w-full overflow-hidden"
      // Animasi fade in untuk section container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }} 
    >
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        // KUNCI PERBAIKAN: Menambahkan atribut poster
        // Pastikan file 'hero-fallback.jpg' ada di public/images/
        poster="/images/hero-fallback.jpg" 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        {/* Pastikan nama file video kamu benar */}
        <source src="/videos/ulaman-hero-video.mp4" type="video/mp4" /> 
        {/* Fallback teks jika browser tidak support video tag sama sekali */}
        Your browser does not support the video tag.
      </video>

      {/* 2. Overlay Gelap (agar Navbar putih kontras) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />
    </motion.section>
  )
}