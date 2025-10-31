// src/components/sections/GallerySection.tsx
"use client"

import React, { useState, useEffect } from 'react'; 
import { motion, type Variants } from 'framer-motion';

import data from '../../../data/siteData.json';
import GalleryCard from '@/components/ui/GalleryCard';
import { SiteData, GalleryImage, GalleryData } from '@/types/siteTypes';
import { AnimatePresence } from 'framer-motion';

const ITEMS_TO_SHOW = 6; // Kunci: Hanya tampilkan 6 gambar

// Varian untuk membungkus dan mengontrol stagger anak
const containerVariants: Variants = {
    visible: {
        transition: {
            staggerChildren: 0.1, // Jeda antara kemunculan setiap kartu
        },
    },
};

// Fungsi untuk menentukan tinggi kartu (untuk efek Masonry)
const getGridRowSpan = (index: number): string => {
    // KOREKSI: Pola 6 elemen yang cocok dengan visual Ulaman
    const patterns = [
        'row-span-3', // Gambar 1: Sangat Tinggi
        'row-span-2', // Gambar 2: Tinggi
        'row-span-3', // Gambar 3: Tinggi
        'row-span-3', // Gambar 4: Normal
        'row-span-2', // Gambar 5: Sangat Tinggi
        'row-span-2', // Gambar 6: Tinggi
    ];
    // KOREKSI: Gunakan array 'patterns' yang sudah didefinisikan (tanpa dynamicPatterns)
    return patterns[index % patterns.length];
};

// Interface untuk modal props (Mengatasi Error 'any')
interface GalleryModalProps {
    imageId: number | null;
    isOpen: boolean;
    onClose: () => void;
}

// ASUMSI: Modal Anda (misalnya GalleryModal)
const GalleryModal = ({ imageId, isOpen, onClose }: GalleryModalProps) => {
    // Di sini Anda bisa mengambil data detail dari ID yang diterima
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 max-w-4xl max-h-[90vh] overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-xl">X</button>
                {/* Tampilkan detail modal berdasarkan imageId */}
                <h3 className="text-3xl font-serif">Detail Gambar ID: {imageId}</h3>
            </div>
        </div>
    );
};

export default function GallerySection() {
    // State untuk Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

    // State Kunci untuk Auto-Cycling (Melacak indeks awal dari 6 gambar yang ditampilkan)
    const [startIndex, setStartIndex] = useState(0);

    // KUNCI PERBAIKAN: Tambahkan definisi fungsi di sini
    const handleOpenModal = (imageId: number) => { 
        setSelectedImageId(imageId);
        setIsModalOpen(true);
    };

    // KUNCI: Kita akan menggunakan state terpisah untuk gambar yang sedang di-render.
    // Ini membantu memisahkan data yang sedang dihitung dari data yang sedang ditampilkan.
    const [currentImages, setCurrentImages] = useState<GalleryImage[]>([]);

    // Type Assertion untuk mendapatkan data gallery yang benar
    const galleryData: GalleryData = (data as SiteData).gallery; 
    const totalImages = galleryData.images.length;

    // --- LOGIC AUTO-CYCLING ---
    useEffect(() => {
        // Fungsi untuk menggeser startIndex
        const cycleImages = () => {
            const newStartIndex = (startIndex + ITEMS_TO_SHOW) % totalImages;
            setStartIndex(newStartIndex);
        };
        
        // Atur interval 3 detik
        const intervalId = setInterval(cycleImages, 3000); 

        // Cleanup: Hapus interval saat komponen di-unmount
        return () => clearInterval(intervalId);
    }, [startIndex, totalImages]);

    // KUNCI: Hitung dan set currentImages berdasarkan startIndex yang baru
    useEffect(() => {
        const calculateDisplayedImages = () => {
            let displayed = galleryData.images
                .slice(startIndex, startIndex + ITEMS_TO_SHOW);
                
            if (displayed.length < ITEMS_TO_SHOW) {
                const remainingCount = ITEMS_TO_SHOW - displayed.length;
                displayed = displayed.concat(galleryData.images.slice(0, remainingCount));
            }
            return displayed;
        };

        setCurrentImages(calculateDisplayedImages());
    }, [startIndex, totalImages, galleryData.images]);
    // --- END LOGIC AUTO-CYCLING ---

    return (
        <section id="gallery-section" className="py-24 lg:py-32 bg-background">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* HEADLINE */}
                <motion.h2
                    className="font-serif text-4xl md:text-5xl text-center text-primary leading-tight max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    {galleryData.headline}
                </motion.h2>

                {/* Wrapper MASONRY GRID dengan AnimatePresence */}
                <motion.div
                    className="relative" // Perlu relative untuk AnimatePresence
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <AnimatePresence mode="wait"> {/* Mode "wait" memastikan set lama selesai keluar sebelum set baru masuk */}
                        <motion.div
                            // KUNCI: Gunakan startIndex sebagai key untuk memaksa React me-mount konten baru
                            key={startIndex} 
                            
                            // Animasi masuk/keluar saat konten berubah
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                            
                            // Kelas Grid Masonry di sini
                            className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[10rem] md:auto-rows-[15rem] lg:auto-rows-[18rem]"
                        >
                            {/* Menggunakan currentImages yang stabil untuk rendering */}
                            {currentImages.map((image: GalleryImage, index: number) => (
                            <div key={image.id} className={getGridRowSpan(index)}>
                                <GalleryCard 
                                    image={image} 
                                    onOpenModal={handleOpenModal} 
                                />
                            </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
                {/* RENDER MODAL */}
                <GalleryModal 
                    imageId={selectedImageId} 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                />
            </div>
        </section>
    );
}
