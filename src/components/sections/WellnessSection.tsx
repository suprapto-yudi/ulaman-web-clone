"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import HoverLink from '@/components/ui/HoverLink' // Kita pakai lagi link kustom kita
import data from '../../../data/siteData.json' // Impor data

export default function WellnessSection() {
  const { wellness } = data // Ambil data wellness

  // 1. Setup useRef untuk target scroll
  // Kita akan melacak progres scroll di dalam container 'h-[200vh]'
  const scrollContainerRef = useRef(null)

  // 2. Setup hook useScroll
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    // Animasi dimulai saat 'center' container menyentuh 'center' viewport
    // Selesai saat 'bottom' container menyentuh 'bottom' viewport
    // Ini memberi kita kontrol penuh
    offset: ['start end', 'end start'],
  })

  // 3. Setup hook useTransform (Ini adalah KUNCINYA - Sesuai Detail 6)
  
  // Animasi Gambar Kiri:
  // - 'translateX': Bergerak dari 0 (tengah) ke -50vw (tepi kiri)
  // - 'rotate': Berputar dari -5 derajat ke -12 derajat
  const leftImageX = useTransform(scrollYProgress, [0.2, 0.5], ['0vw', '-50vw'])
  const leftImageRotate = useTransform(scrollYProgress, [0.2, 0.5], [-5, -12])

  // Animasi Gambar Kanan:
  // - 'translateX': Bergerak dari 0 (tengah) ke 50vw (tepi kanan)
  // - 'rotate': Berputar dari 5 derajat ke 12 derajat
  const rightImageX = useTransform(scrollYProgress, [0.2, 0.5], ['0vw', '50vw'])
  const rightImageRotate = useTransform(scrollYProgress, [0.2, 0.5], [5, 12])
  
  // Animasi Teks Konten (Detail 6: "fade in dari bawah ke atas")
  // - 'opacity': Muncul (0 ke 1) saat gambar mulai terpisah (di 30% scroll)
  // - 'y': Bergerak ke atas (30px ke 0)
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])
  const textY = useTransform(scrollYProgress, [0.3, 0.4], [30, 0])

  return (
    // Kita buat "landasan pacu" scroll setinggi 200vh
    <section
      ref={scrollContainerRef}
      className="relative h-[200vh] w-full"
    >
      {/* Ini adalah "jendela" kita (h-screen) yang menempel (sticky) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Wrapper untuk semua elemen animasi */}
        <div className="absolute inset-0 flex items-center justify-center">

          {/* Gambar Kiri */}
          <motion.div
            className="relative w-[45vh] h-[60vh] lg:w-[40vw] lg:h-[70vh]"
            style={{
              translateX: leftImageX,
              rotate: leftImageRotate,
              zIndex: 10, // Gambar kiri di atas
            }}
          >
            <Image
              src="/images/wellness/wellness-1.jpg"
              alt="Wellness 1"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>

          {/* Gambar Kanan */}
          <motion.div
            className="relative w-[45vh] h-[60vh] lg:w-[40vw] lg:h-[70vh]"
            style={{
              translateX: rightImageX,
              rotate: rightImageRotate,
              zIndex: 9, // Gambar kanan di bawah
            }}
          >
            <Image
              src="/images/wellness/wellness-2.jpg"
              alt="Wellness 2"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>

          {/* Teks Konten di Tengah */}
          <motion.div
            className="absolute z-20 flex w-full max-w-lg flex-col 
                       items-center text-center p-4"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">
              {wellness.headline}
            </h2>
            <p className="font-sans text-sm text-foreground/80 mb-8">
              {wellness.text}
            </p>
            <HoverLink href={wellness.link}>
              Learn More
            </HoverLink>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
