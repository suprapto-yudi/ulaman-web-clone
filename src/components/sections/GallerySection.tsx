// src/components/sections/GallerySection.tsx
"use client"

import React, { useState } from 'react'; // Tambah useState
import { motion, type Variants } from 'framer-motion';

import data from '../../../data/siteData.json';
import GalleryCard from '@/components/ui/GalleryCard';
import { SiteData, GalleryImage, GalleryData } from '@/types/siteTypes';

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
    // Memberikan span baris yang berbeda untuk menciptakan efek masonry
    const patterns = [
        'row-span-3', // Gambar 1: Sangat Tinggi (Chef)
        'row-span-2', // Gambar 2: Tinggi (Afternoon Delight)
        'row-span-2', // Gambar 3: Tinggi (Photoshoot)
        'row-span-2', // Gambar 4: Tinggi (Yoga)
        'row-span-3', // Gambar 5: Sangat Tinggi (Healing)
        'row-span-2', // Gambar 6: Tinggi (Dinner)
    ];
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

    const handleOpenModal = (imageId: number) => {
        setSelectedImageId(imageId);
        setIsModalOpen(true);
    };

    // Type Assertion untuk mendapatkan data gallery yang benar
    const galleryData: GalleryData = (data as SiteData).gallery; // Cast tipe
    const images: GalleryImage[] = galleryData.images; // Menggunakan properti images

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

                {/* MASONRY GRID LAYOUT */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[10rem] md:auto-rows-[15rem] lg:auto-rows-[18rem]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {images.map((image, index) => (
                    <div key={image.id} className={getGridRowSpan(index)}>
                        <GalleryCard 
                            image={image} 
                            onOpenModal={handleOpenModal} // Meneruskan fungsi pembuka
                        />
                    </div>
                    ))}
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
