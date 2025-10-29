"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import HoverLink from '@/components/ui/HoverLink' // Kita pakai lagi link kustom kita

/// Varian animasi (Detail 4: "ease in dari bawah ke atas")
const fadeInUp: Variants = { // Diberi tipe Variants
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      // KUNCI PERBAIKAN: Ganti 'easeOut' (string) menjadi array standar [0.42, 0, 0.58, 1.0] atau 'easeInOut'
      // Kita gunakan array Bezier curve (0.42, 0, 0.58, 1.0) untuk ease-out yang lebih aman
      ease: [0.42, 0, 0.58, 1.0],
    },
  },
}

export default function ParallaxCtaSection() {
  // 1. Setup useRef untuk target scroll
  // Kita akan melacak progres scroll di dalam container 'h-[250vh]'
  const scrollContainerRef = useRef(null)

  // 2. Setup hook useScroll
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    // Animasi dimulai saat 'start' container menyentuh 'end' viewport
    // Selesai saat 'end' container menyentuh 'end' viewport
    offset: ['start end', 'end end'],
  })

  // 3. Setup hook useTransform (Ini adalah KUNCINYA)
  // Kita akan mengubah 'scrollYProgress' (0-1) menjadi 'clip-path'
  // Sesuai Detail 4: "bukaan kurva setengah lingkaran yang semakin membesar"
  // Kita pakai 'circle' yang dimulai dari bawah-tengah (50% 100%)
  const clipPathValue = useTransform(
    scrollYProgress,
    [0.1, 0.5], // Animasi terjadi antara 10% dan 50% dari total scroll
    ['circle(5% at 50% 100%)', 'circle(150% at 50% 100%)'] // Mulai dari 5% membesar jadi 150%
  )

  return (
    // Section ini tidak punya background, jadi dia menyatu dengan <main>
    <section id="parallax-cta-section">
      
      {/* 1. Subheadline Pertama (Sesuai Detail 4) */}
      <motion.div
        className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
                   flex flex-col items-center text-center py-24 lg:py-32"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-2xl mb-8">
          Experience a blend of nature, comfort and luxury like never before.
        </h2>
        {/* Tombol "BOOK YOUR STAY" (Sesuai Detail 4) */}
        <HoverLink href="/#booking-placeholder"> {/* Nanti link ke modal booking */}
          Book Your Stay
        </HoverLink>
      </motion.div>

      {/* 2. Container Parallax (Sesuai Detail 4) */}
      {/* - Kita buat container 'h-[250vh]' sebagai "landasan pacu" scroll.
        - Kita pasang 'ref' di sini.
      */}
      <div ref={scrollContainerRef} className="relative h-[250vh]">
        {/* - div ini akan 'sticky' (menempel di layar)
          - Ini adalah "jendela" kita (h-screen)
        */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* - Ini adalah elemen yang akan kita animasikan 'clip-path'-nya
            - Ini akan "membuka" gambar di dalamnya
          */}
          <motion.div
            className="h-full w-full"
            style={{ clipPath: clipPathValue }}
          >
            {/* - Ini adalah gambarnya.
              - Kita pakai 'scale-110' agar ada sedikit ruang untuk efek parallax
            */}
            <Image
              src="/images/parallax/parallax-image.jpg"
              alt="Ulaman Parallax View"
              width={1920}
              height={1080}
              className="h-full w-full object-cover scale-110"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* 3. Subheadline Kedua (Sesuai Detail 4) */}
      {/* - Section ini muncul SETELAH container 'h-[250vh]' selesai di-scroll
      */}
      <motion.div
        className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8
                   flex flex-col items-center text-center py-24 lg:py-32"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-3xl">
          Book one of our special packages for a getaway you’ll never forget.
        </h2>
      </motion.div>

    </section>
  )
}
