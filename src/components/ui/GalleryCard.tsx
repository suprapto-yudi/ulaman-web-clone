// src/components/ui/GalleryCard.tsx
"use client"

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { GalleryImage } from '@/types/siteTypes'; // Import tipe dari file sentral

type GalleryCardProps = {
    image: GalleryImage;
};

// Varian animasi stagger untuk setiap kartu
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.42, 0, 0.58, 1.0], // Easing yang smooth
        },
    },
};

export default function GalleryCard({ image }: GalleryCardProps) {
    // Kita akan menggunakan rasio aspect yang berbeda di CSS untuk membuat efek masonry
    return (
        <motion.div
            className="w-full relative overflow-hidden rounded-lg group"
            variants={cardVariants}
        >
            <Image
                src={image.src}
                alt={image.alt}
                // Atur fill=true untuk membiarkan CSS parent mengontrol ukuran
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay untuk teks atau hover effect */}
            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
            
        </motion.div>
    );
}
