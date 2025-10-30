"use client" // Perlu "use client" untuk me-render Hotspot.tsx

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import data from '../../../data/siteData.json'
import Hotspot from '@/components/ui/Hotspot'
import { SiteData, HotspotData } from '@/types/siteTypes';

// Impor ikon dari lucide-react (sesuai data/siteData.json)
import { 
  Home, Gift, Bell, Dumbbell, Utensils, Hotel, User, Martini, Droplet,
  // Nama yang sering berbeda/spesial:
  Sailboat, // Ganti Boat
  Waves,    // Ganti Ripples & Pool (jika tidak ada)
  Trees,    // Ganti TreeDeciduous
  HeartHandshake, // Ganti Massage
  Goal,     // Ganti Racket (atau pakai yang lain)
  Flower,   // Ganti Lotus (jika tidak ada Lotus)
  Zap,      // Ganti Waterfall (jika tidak ada)
} from 'lucide-react'

// Varian animasi (fade in dari bawah)
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

// "Kamus" untuk memetakan nama ikon (string) ke komponen ikon (JSX)
const iconMap: { [key: string]: React.ReactNode } = {
  Home: <Home size={20} />,
  Racket: <Goal size={20} />,
  "Shopping Bag": <Gift size={20} />,
  Bell: <Bell size={20} />,
  Dumbbell: <Dumbbell size={20} />,
  "Tree Deciduous": <Trees size={20} />,
  Boat: <Sailboat size={20} />,
  Utensils: <Utensils size={20} />,
  Pool: <Waves size={20} />,
  Hotel: <Hotel size={20} />,
  Massage: <HeartHandshake size={20} />,
  User: <User size={20} />,
  Waterfall: <Zap size={20} />,
  Ripples: <Waves size={20} />,
  Martini: <Martini size={20} />,
  Droplet: <Droplet size={20} />,
  Lotus: <Flower size={20} />,
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
            src="/images/map/ulaman-map.jpg"
            alt="Ulaman Bali Map"
            fill
            className="object-contain"
          />

          {/* Render semua Hotspot */}
          {map.hotspots.map((hotspot: HotspotData) => (
            <Hotspot
              key={hotspot.id}
              name={hotspot.name}
              icon={iconMap[hotspot.iconName] || <Home size={20} />} // Ambil ikon dari kamus
              top={hotspot.top} 
              left={hotspot.left}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
