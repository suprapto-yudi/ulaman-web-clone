"use client" // Perlu "use client" untuk me-render Hotspot.tsx

import Image from 'next/image'
import { motion } from 'framer-motion'
import data from '@/data/siteData.json'
import Hotspot from '@/components/ui/Hotspot'

// Impor ikon dari lucide-react (sesuai data/siteData.json)
import { 
  Wind, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Sparkles, 
  Home 
} from 'lucide-react'

// Varian animasi (fade in dari bawah)
const fadeInUp = {
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

// "Kamus" untuk memetakan nama ikon (string) ke komponen ikon (JSX)
const iconMap: { [key: string]: React.ReactNode } = {
  Wind: <Wind size={20} />,
  Utensils: <Utensils size={20} />,
  Waves: <Waves size={20} />,
  Dumbbell: <Dumbbell size={20} />,
  Sparkles: <Sparkles size={20} />,
  Home: <Home size={20} />,
}

export default function MapSection() {
  const { map } = data // Ambil data map

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Teks */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">
            {map.headline}
          </h2>
          <p className="font-sans text-sm text-foreground/80 flex items-center 
                        justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {map.subheadline}
          </p>
        </motion.div>

        {/* Wrapper Peta (PENTING) */}
        <motion.div
          className="relative w-full aspect-[4/3] max-w-5xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2 }}
        >
          {/* Gambar Peta Latar Belakang */}
          <Image
            src="/images/map/map-background.jpg"
            alt="Ulaman Bali Map"
            fill
            className="object-contain"
          />

          {/* Render semua Hotspot */}
          {map.hotspots.map((hotspot) => (
            <Hotspot
              key={hotspot.id}
              name={hotspot.name}
              icon={iconMap[hotspot.iconName] || <Home size={20} />} // Ambil ikon dari kamus
              posY={hotspot.posY}
              posX={hotspot.posX}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
