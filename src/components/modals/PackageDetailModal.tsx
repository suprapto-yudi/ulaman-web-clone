"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import InvertedButton from '@/components/ui/InvertedButton'
import HoverLink from '@/components/ui/HoverLink'

// Tipe data dari siteData.json
type Package = {
  id: number 
  slug: string 
  name: string
  tagline: string
  modalImageUrl: string
  price: string
  details: { left: string[]; right: string[] }
}

type PackageDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onBookNowClick: (packageName: string) => void;
    packages: Package[];
    initialPackageId: number | null;
};

export default function PackageDetailModal({
  isOpen,
  onClose,
  onBookNowClick,
  packages,
  initialPackageId,
}: PackageDetailModalProps) {
  
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    // Sinkronisasi index
    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on('select', onSelect)
        return () => { emblaApi.off('select', onSelect) }
    }, [emblaApi])

    // Scroll ke paket yang diklik saat modal terbuka
    useEffect(() => {
        if (isOpen && emblaApi && initialPackageId !== null) {
            // KUNCI OPTIMASI: Perbandingan sekarang NUMBER === NUMBER
            const initialIndex = packages.findIndex(p => p.id === initialPackageId) 
            
            if (initialIndex !== -1) {
                emblaApi.scrollTo(initialIndex, true) 
            }
        }
    }, [isOpen, emblaApi, initialPackageId, packages])

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const currentPackage = packages[selectedIndex]

    return (
        <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 bg-black/70 backdrop-blur
                            flex items-center justify-center"
                onClick={onClose}
            >
            {/* Tombol Close "X" (Detail 5) */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white z-120"
                aria-label="Close package detail modal"
            >
                <X size={32} />
            </button>

            {/* Konten Modal (Slider) */}
            <motion.div
                className="relative w-full h-full lg:w-[90vw] lg:h-[90vh] 
                        bg-background shadow-2xl overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {packages.map((pkg) => (
                    <div 
                        className="grow-0 shrink-0 basis-full h-full 
                                grid grid-cols-1 lg:grid-cols-2" 
                        key={pkg.id}
                    >
                        {/* Kolom Kiri: Gambar */}
                        <div className="relative h-[50vh] lg:h-full">
                        <Image
                            src={pkg.modalImageUrl}
                            alt={pkg.name}
                            fill
                            className="object-cover"
                        />
                        </div>
                        {/* Kolom Kanan: Teks Detail */}
                        <div className="p-8 lg:p-16 overflow-y-auto">
                        <p className="font-sans text-sm text-foreground/70 mb-2">
                            {selectedIndex + 1} / {packages.length}
                        </p>
                        <h2 className="font-serif text-4xl lg:text-5xl text-primary mb-4">
                            {pkg.name}
                        </h2>
                        <p className="font-sans text-sm text-foreground/70 mb-6">
                            {pkg.tagline}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-8">
                            <ul className="list-none space-y-3">
                            {pkg.details.left.map((item, i) => (
                                <li key={i} className="font-sans text-sm border-b border-primary/20 pb-3">{item}</li>
                            ))}
                            </ul>
                            <ul className="list-none space-y-3">
                            {pkg.details.right.map((item, i) => (
                                <li key={i} className="font-sans text-sm border-b border-primary/20 pb-3">{item}</li>
                            ))}
                            </ul>
                        </div>
                        
                        <p className="font-sans text-sm font-medium text-foreground mb-6">
                            Price: {pkg.price}
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <InvertedButton onClick={() => onBookNowClick(pkg.name)}>
                            Book Now
                            </InvertedButton>
                            <HoverLink href="/#view-terms">
                            View Terms
                            </HoverLink>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Navigasi Slider Internal (Detail 5) */}
                <div className="absolute bottom-6 right-6 lg:bottom-16 lg:right-16 flex gap-2 z-10">
                <button
                    onClick={scrollPrev}
                    className="h-12 w-12 border border-primary/30 text-primary/50
                            hover:bg-primary hover:text-white transition-colors
                            flex items-center justify-center rounded-lg"
                    aria-label="Previous Package"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                    onClick={scrollNext}
                    className="h-12 w-12 border border-primary/30 text-primary/50
                            hover:bg-primary hover:text-white transition-colors
                            flex items-center justify-center rounded-lg"
                    aria-label="Next Package"
                >
                    <ArrowRight className="h-5 w-5" />
                </button>
                </div>
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    )
}
