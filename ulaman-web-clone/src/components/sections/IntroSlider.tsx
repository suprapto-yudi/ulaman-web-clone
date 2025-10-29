// src/components/sections/IntroSlider.tsx
"use client" // Perlu "use client" untuk Embla Carousel hooks

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
// REVISI KUNCI 1: Hapus { EmblaOptionsType } dari impor ini
import useEmblaCarousel from 'embla-carousel-react' 
// REVISI KUNCI 2: Impor EmblaOptionsType secara terpisah dan benar
import { EmblaOptionsType } from 'embla-carousel' 
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Data gambar slider (ambil dari /public/images/intro/ yang kamu download)
const slides = [
  { src: '/images/intro/intro-slider-1.jpg', alt: 'Intro Image 1' },
  { src: '/images/intro/intro-slider-2.jpg', alt: 'Intro Image 2' },
  { src: '/images/intro/intro-slider-3.jpg', alt: 'Intro Image 3' },
]

// Opsi Embla
const OPTIONS: EmblaOptionsType = { loop: true }

export default function IntroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Fungsi untuk tombol
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  // Sinkronisasi dot navigasi
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="relative w-full">
      {/* Viewport Slider */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-grow-0 flex-shrink-0 basis-full" key={index}>
              <Image
                src={slide.src}
                alt={slide.alt}
                width={800}
                height={900}
                // Border radius asimetris dari Detail 2!
                className="w-full h-auto object-cover aspect-[4/5] rounded-asymmetric"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Navigasi Kustom (sesuai Detail 2) */}
      <div className="absolute bottom-6 left-6 flex gap-2">
        <button
          onClick={scrollPrev}
          className="h-12 w-12 bg-white/80 hover:bg-white transition-colors
                     flex items-center justify-center rounded-asymmetric"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={scrollNext}
          className="h-12 w-12 bg-white/80 hover:bg-white transition-colors
                     flex items-center justify-center rounded-asymmetric"
          aria-label="Next Slide"
        >
          <ArrowRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Paginasi Dots (sesuai Detail 2) */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-all
              ${index === selectedIndex ? 'bg-white' : 'bg-white/40'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
