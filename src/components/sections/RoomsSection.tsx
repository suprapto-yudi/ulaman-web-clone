// src/components/sections/RoomsSection.tsx

"use client" // Perlu "use client" untuk Embla Carousel & Framer Motion
import React, { useState, useCallback } from 'react';
import RoomCard from '@/components/ui/RoomCard';
import { motion, type Variants } from 'framer-motion' 
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// KUNCI PERBAIKAN: Path import JSON yang benar
import data from '../../../data/siteData.json'
import { RoomType } from '@/types/siteTypes';

// Varian animasi untuk subheadline
const fadeInUp: Variants = { 
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

// Interface untuk modal props (mengatasi error any)
interface RoomModalProps {
    room: RoomType | null;
    isOpen: boolean;
    onClose: () => void;
}

// ASUMSI: Anda akan membuat komponen ini. Ini adalah modal yang akan muncul.
const RoomModal = ({ room, isOpen, onClose }: RoomModalProps) => {
    if (!isOpen || !room) return null;
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 max-w-4xl max-h-[90vh] overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-xl">X</button>
                {/* Konten modal dari room.name, room.subtitle, dll. */}
                <h3 className="text-3xl font-serif">{room.name}</h3>
                <p>{room.subtitle}</p>
                {/* ... Render detail seperti di screenshot yang Anda lampirkan ... */}
            </div>
        </div>
    );
};


export default function RoomsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State untuk menyimpan data ruangan yang sedang dilihat di modal
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null); 
  // Cast data.rooms ke RoomType[] agar TypeScript tidak complain
  const rooms: RoomType[] = data.rooms as RoomType[]; 

  // Fungsi yang dipanggil oleh RoomCard untuk menampilkan modal
  const handleOpenModal = (roomDetails: RoomType) => {
      setSelectedRoom(roomDetails);
      setIsModalOpen(true);
  }; 

  // Setup Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start', 
    watchResize: true, 
  })

  // Fungsi untuk tombol navigasi (useCallback sudah benar)
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
                <RoomCard 
                    key={room.id} 
                    room={room} 
                    // Meneruskan fungsi pembuka modal
                    onOpenModal={handleOpenModal} 
                /> 
              ))}
              </div>
          </motion.div>
        </div>
      </div>
      {/* RENDER MODAL DI SINI (Terlihat di client-side) */}
      <RoomModal 
        room={selectedRoom} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
