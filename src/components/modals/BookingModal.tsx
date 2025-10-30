"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
  packageName: string // Untuk watermark
}

// Mockup Kalender Sederhana
const CalendarMockup = () => (
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-serif text-2xl text-primary">October 2025</h3>
    </div>
    <div className="grid grid-cols-7 gap-1 text-center font-sans text-sm">
      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
        <div key={day} className="font-medium text-foreground/50">{day}</div>
      ))}
      {/*... (isi tanggal)... */}
      {[...Array(31)].map((_, i) => (
        <div key={i} className="py-2 hover:bg-primary/10 rounded-full cursor-pointer">
          {i + 1}
        </div>
      ))}
    </div>
  </div>
)

export default function BookingModal({
  isOpen,
  onClose,
  packageName,
}: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm
                     flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Watermark Teks (Detail 5) */}
          <div className="absolute inset-0 flex items-center justify-center 
                          overflow-hidden pointer-events-none">
            <h1 className="font-serif text-[12vw] lg:text-[15vw] 
                           text-white/10 whitespace-nowrap uppercase">
              {packageName}
            </h1>
          </div>

          {/* Konten Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-background p-6 rounded-lg shadow-2xl w-full max-w-xl"
            onClick={(e) => e.stopPropagation()} // Mencegah close saat klik konten
          >
            {/* Tombol Close "X" (Detail 5) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-foreground/50 hover:text-primary"
              aria-label="Close booking modal"
            >
              <X size={24} />
            </button>
            
            <h2 className="font-serif text-3xl text-primary mb-6">Book Your Stay</h2>
            <CalendarMockup />
            {/* ... (Form input lainnya) ... */}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
