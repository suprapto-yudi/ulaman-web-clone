// src/components/ui/GalleryCard.tsx
"use client"

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion'; 
import { GalleryImage, GalleryCardProps } from '@/types/siteTypes';

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

export default function GalleryCard({ image, className, onOpenModal }: GalleryCardProps) {
    return (
        <motion.button // KUNCI: Menggunakan <button> untuk aksi klik
            className={`relative w-full h-full overflow-hidden block group focus:ring-2 focus:ring-primary ${className}`}
            onClick={() => onOpenModal(image.id)} // Panggil modal dengan ID gambar
            variants={cardVariants}
            aria-label={`Lihat detail galeri: ${image.alt}`}
        >
            {/* Gambar */}
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay/Caption (misalnya nama pengalaman) */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-end p-4">
                <p className="text-white text-sm font-semibold leading-tight">{image.alt}</p>
            </div>
        </motion.button>
    );
}