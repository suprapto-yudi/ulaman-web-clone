"use client" // Perlu "use client" untuk animasi whileInView

import { motion, type Variants } from 'framer-motion'

// Data teks headline (kita pisah per baris)
const headlineText = [
  "Nestled among the rice fields and",
  "coconut trees of Tabanan, Ulaman",
  "is only 20 minutes away from the",
  "vibrant town of Canggu.",
]

// Varian animasi untuk container (agar anak-anaknya muncul berurutan)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Jeda antar baris 0.3s
    },
  },
}

// Varian animasi untuk tiap baris teks
// Akan "fade in" dan "slide up"
// Sesuai Detail 2, teks "belum aktif" akan pudar (opacity: 0.2)
const lineVariants: Variants = {
  hidden: { opacity: 0.2, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export default function AnimatedHeadline() {
  return (
    <motion.h2
      className="font-serif text-4xl md:text-5xl lg:text-6xl text-center 
                 text-primary leading-tight max-w-4xl mx-auto
                 py-24 lg:py-32"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Trigger animasi saat komponen terlihat
      viewport={{ once: true, amount: 0.5 }} // Trigger sekali saat 50% terlihat
    >
      {headlineText.map((line, index) => (
        <motion.span
          key={index}
          className="block"
          variants={lineVariants}
        >
          {/* Ini trik dari screenshot: kata "coconut" dan "vibrant" 
            warnanya solid, sisanya agak pudar.
            Kita bisa buat lebih simpel: semua solid. 
            Atau kita buat semua pudar dan jadi solid saat animasi.
            Kita pilih yang kedua (sesuai lineVariants).
          */}
          {line}
        </motion.span>
      ))}
    </motion.h2>
  )
}
