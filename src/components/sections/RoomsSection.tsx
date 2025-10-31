// src/components/sections/RoomsSection.tsx

"use client" // Perlu "use client" untuk Embla Carousel & Framer Motion
import React, { useState, useCallback } from 'react';
import RoomCard from '@/components/ui/RoomCard';
import { motion, type Variants } from 'framer-motion' 
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// KUNCI PERBAIKAN: Path import JSON yang benar
import data from '../../../data/siteData.json'
// KUNCI UTAMA: Import tipe dari file sentral
// NOTE: Kita hanya perlu RoomData dan SiteData, modal logic sudah dihapus.
import { SiteData, RoomData } from '@/types/siteTypes'; 

// Varian animasi untuk subheadline
const fadeInUp: Variants = { 
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1.0], // Fix Framer Motion Easing
    },
  },
}

export default function RoomsSection() {
  
  // KUNCI PERBAIKAN UTAMA: Hapus semua state dan handler yang tidak digunakan
  // const [isModalOpen, setIsModalOpen] = useState(false); // Hapus
  // const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null); // Hapus

  // Type Assertion untuk mendapatkan data rooms yang benar
  const rooms = (data as SiteData).rooms as RoomData[];

  // KUNCI PERBAIKAN: Hapus fungsi handleOpenModal yang tidak digunakan
  // const handleOpenModal = (roomDetails: RoomType) => {
  //     setSelectedRoom(roomDetails);
  //     setIsModalOpen(true);
  // }; 

  // Setup Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start', 
    watchResize: true, 
  })

  // Fungsi untuk tombol navigasi
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    // Kita kasih ID agar bisa di-link jika perlu
    <section id="rooms-section" className="py-24 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. Subheadline */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-center
                     text-primary leading-tight max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Discover cozy elegance, where tranquility
          meets Bali's serene beauty.
        </motion.h2>

        {/* 2. Wrapper Slider (Penting untuk posisi navigasi) */}
        <div className="relative">
          
          {/* Tombol Navigasi Kiri (Hanya muncul di desktop/lg) */}
          <div className="hidden lg:flex flex-col gap-3 z-10 
                          absolute top-1/2 -translate-y-1/2 -left-16"> 
            <button
              onClick={scrollPrev}
              className="h-12 w-12 border border-primary/30 text-primary/50
                         hover:bg-primary hover:text-white transition-colors
                         flex items-center justify-center rounded-lg" 
              aria-label="Previous Room Slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="h-12 w-12 border border-primary/30 text-primary/50
                         hover:bg-primary hover:text-white transition-colors
                         flex items-center justify-center rounded-lg"
              aria-label="Next Room Slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* 3. Viewport Slider */}
          <motion.div 
            className="overflow-hidden" 
            ref={emblaRef}
            variants={fadeInUp} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ delay: 0.2 }}
          >
            <div className="flex">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} /> 
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
