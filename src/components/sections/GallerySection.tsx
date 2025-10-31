// src/components/sections/GallerySection.tsx
"use client"

import React from 'react';
import { motion, type Variants } from 'framer-motion';

import data from '../../../data/siteData.json';
import GalleryCard from '@/components/ui/GalleryCard';
import { SiteData, GalleryImage } from '@/types/siteTypes';

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
        'row-span-2', // Tinggi (2x)
        'row-span-3', // Sangat Tinggi (3x)
        'row-span-2', // Tinggi (2x)
        'row-span-2', // Tinggi (2x)
        'row-span-1', // Normal (1x)
    ];
    return patterns[index % patterns.length];
};

export default function GallerySection() {
    // Type Assertion untuk mendapatkan data gallery yang benar
    const galleryData = (data as SiteData).gallery;
    const images: GalleryImage[] = galleryData.images;

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
                            <GalleryCard image={image} />
                        </div>
                    ))}
                </motion.div>
                
            </div>
        </section>
    );
}
