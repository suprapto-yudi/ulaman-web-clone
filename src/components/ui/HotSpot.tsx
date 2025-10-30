"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Tentukan tipe props
type HotspotProps = {
  name: string
  icon: React.ReactNode // Kita terima icon sebagai JSX
  posY: string
  posX: string
}

export default function Hotspot({ name, icon, posY, posX }: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    // Wrapper hotspot, diposisikan secara absolut
    <div
      className="absolute z-10"
      style={{ top: posY, left: posX }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tombol ikon bulat */}
      <button
        className="w-10 h-10 bg-background/80 backdrop-blur-sm 
                   rounded-full flex items-center justify-center 
                   text-primary shadow-lg
                   transform transition-transform duration-300 hover:scale-110"
        aria-label={`Show details for ${name}`}
      >
        {icon}
      </button>

      {/* Tooltip (Detail 9) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            // Animasi: geser ke kanan (Detail 9)
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            
            // Posisi: di sebelah kanan (left-full) dari tombol ikon
            className="absolute top-1/2 -translate-y-1/2 left-full ml-3 
                       whitespace-nowrap"
          >
            {/* Styling: bentuk pill (Detail 9) */}
            <div className="flex items-center gap-2 
                            bg-background/90 backdrop-blur-sm 
                            rounded-full py-2 px-4 shadow-lg"
            >
              <span className="text-primary">{icon}</span>
              <span className="font-sans text-sm font-medium text-foreground">
                {name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
