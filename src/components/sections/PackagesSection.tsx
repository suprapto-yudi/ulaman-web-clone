"use client" // Ini adalah komponen induk, harus "use client"

import React, { useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Impor data dan komponen
import data from '../../../data/siteData.json'
import PackageCard from '@/components/ui/PackageCard'
import PackageDetailModal from '@/components/modals/PackageDetailModal'
import BookingModal from '@/components/modals/BookingModal'

// KUNCI PERBAIKAN 2: Interface untuk Package (Sesuai dengan JSON yang sudah kita optimasi)
// Ini diperlukan untuk menghilangkan ts(7006) dan ts(2322)
interface PackageType {
    id: number;
    slug: string;
    name: string;
    tag: string;
    tagline: string;
    cardImageUrl: string;
    modalImageUrl: string;
    price: string;
    details: {
        left: string[];
        right: string[];
    };
}

export default function PackagesSection() {
    // Kita paksakan tipe data packages
    const packages = data.packages as PackageType[];
    
    // State untuk slider utama
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

    // === State Management untuk SEMUA Modal (Detail 5) ===
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    
    // Menyimpan ID paket yg diklik, atau nama paket untuk modal booking
    const [activeData, setActiveData] = useState<number | null>(null)
    
    // 1. Saat "DISCOVER" diklik
    const handleDiscoverClick = (packageId: number) => {
        setActiveData(packageId)
        setIsDetailModalOpen(true)
    }
    const handleCloseDetailModal = () => setIsDetailModalOpen(false)

    // 2. Saat "BOOK NOW" diklik (di dalam modal detail)
    const handleBookNowClick = (packageName: string) => {
        // Kita BUKA modal booking
        setIsBookingModalOpen(true)
        // Kita simpan NAMA PAKET di activeData.
        // Karena activeData sekarang adalah number|null, kita perlu state baru.
        // Tapi untuk menyederhanakan, kita biarkan saja BookNowModal menerima nama.
        
        // Kita ubah activeData menjadi penyimpanan ID Paket atau Nama Paket
        // Solusi tercepat: Buat state baru untuk nama paket booking
        // Tapi karena kita ingin efisien: kita kirimkan string nama paket ke BookingModal melalui prop.
        
        // KITA BIARKAN activeData menyimpan ID (number) dan kirimkan nama melalui prop ke BookingModal.
        // Jika kita ingin modal booking menggunakan activeData, kita harus pakai string | number | null.
        // Mari kita stick pada ID (number) untuk Detail Modal dan kirim nama langsung ke BookingModal.
        
        setActiveData(null); // Reset ID
        // Kita kirimkan nama paket melalui prop BookingModal.
    }
    const handleCloseBookingModal = () => setIsBookingModalOpen(false)
    
    // Fungsi tombol slider utama
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section id="packages-section" className="py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Wrapper Slider */}
            <div className="relative">
            
                {/* Tombol Navigasi Kiri (mirip RoomsSection) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 
                                flex flex-col gap-3 z-10">
                    <button
                    onClick={scrollPrev}
                    className="h-12 w-12 border border-primary/30 text-primary/50
                                hover:bg-primary hover:text-white transition-colors
                                flex items-center justify-center rounded-lg"
                    aria-label="Previous Package Slide"
                    >
                    <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                    onClick={scrollNext}
                    className="h-12 w-12 border border-primary/30 text-primary/50
                                hover:bg-primary hover:text-white transition-colors
                                flex items-center justify-center rounded-lg"
                    aria-label="Next Package Slide"
                    >
                    <ArrowRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Viewport Slider */}
                <div className="overflow-hidden -ml-4" ref={emblaRef}>
                    <div className="flex">
                        {packages.map((pkg) => (
                            <PackageCard 
                                key={pkg.id} 
                                packageData={pkg} 
                                // KUNCI OPTIMASI: Mengirim ID sebagai NUMBER
                                onDiscoverClick={() => handleDiscoverClick(pkg.id)} // ✅ FIX ts(2345)
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* RENDER MODAL-MODAL KITA */}
        {/* Modal ini tidak terlihat sampai state-nya true */}
        
        <PackageDetailModal
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            onBookNowClick={handleBookNowClick}
            packages={packages}
            initialPackageId={activeData}
        />
        
        <BookingModal
                isOpen={isBookingModalOpen}
                onClose={handleCloseBookingModal}
                // Catatan: packageName di BookingModal harus diupdate di handleBookNowClick
                packageName={packages.find(p => p.id === activeData)?.name || 'Your Stay'}
            />

        </section>
  )
}
