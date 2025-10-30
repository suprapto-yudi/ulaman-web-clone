"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import data from '../../../data/siteData.json'

// Varian animasi (fade in dari bawah)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1.0],
    },
  },
}

export default function DineSection() {
  const { dine } = data // Ambil data dine

  // 1. Setup useRef untuk target scroll
  // Kita akan melacak progres scroll di dalam <section>
  const gridContainerRef = useRef(null)

  // 2. Setup hook useScroll
  const { scrollYProgress } = useScroll({
    target: gridContainerRef,
    // Mulai animasi saat 'start' (atas) section menyentuh 'end' (bawah) viewport
    // Selesai animasi saat 'end' (bawah) section menyentuh 'start' (atas) viewport
    offset: ['start end', 'end start'],
  })

  // 3. Setup hook useTransform (KUNCI PARALLAX - Sesuai Detail 8)
  // Kita buat 3 'y' (posisi vertikal) yang berbeda
  // Saat scrollYProgress dari 0 (awal) ke 1 (akhir)...
  
  // Gambar 1: bergerak dari 0% ke -20% (bergerak ke atas 20%)
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  
  // Gambar 2: bergerak dari 0% ke -5% (bergerak paling lambat)
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])
  
  // Gambar 3: bergerak dari 0% ke -15% (bergerak sedang)
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  // Gabungkan data dengan animasi 'y'
  const parallaxImages = [
    { ...dine[0], y: y1 },
    { ...dine[1], y: y2 },
    { ...dine[2], y: y3 },
  ]

  return (
    <section
      ref={gridContainerRef}
      className="py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Kita buat grid-nya */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={fadeInUp} // Animasi fade-in untuk seluruh grid
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {parallaxImages.map((img) => (
            // Ini adalah wrapper gambar yang akan bergerak
            <motion.div
              key={img.id}
              style={{ y: img.y }} // Terapkan 'y' yang sudah di-transform
              className="relative w-full h-[60vh] 
                         overflow-hidden rounded-lg" // Rounded kecil (Detail 8)
            >
              <Image
                src={img.imageUrl}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
