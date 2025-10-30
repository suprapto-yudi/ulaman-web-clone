"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import React from 'react'

type VideoModalProps = {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  // Ubah link YouTube biasa (watch?v=) menjadi link embed
  const embedUrl = videoUrl.replace("watch?v=", "embed/");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-200 bg-black/80 backdrop-blur-sm
                     flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Tombol Close "X" */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-220"
            aria-label="Close video modal"
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()} // Mencegah close saat klik video
          >
            <iframe
              src={embedUrl}
              title="Ulaman Bali Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
