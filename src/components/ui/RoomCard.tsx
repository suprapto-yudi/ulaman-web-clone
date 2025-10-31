// src/components/ui/RoomCard.tsx
"use client"

import Image from 'next/image';
import Link from 'next/link'; 
import { motion, type Variants } from 'framer-motion'; 
// hapus import HoverLink from '@/components/ui/HoverLink'; 
import { RoomData } from '@/types/siteTypes';

// Varian Animasi untuk Fade In Slide Up
const cardVariants: Variants = { 
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1.0],
    },
  },
};

type RoomCardProps = {
  room: RoomData;
};

export default function RoomCard({ room }: RoomCardProps) {
  // Pastikan kamu menggunakan room.subtitle dan room.detailsHref di JSX di bawah ini
  return (
    <motion.div 
      className="flex-grow-0 flex-shrink-0 basis-[90%] sm:basis-1/2 lg:basis-[40%] pl-4"
      variants={cardVariants}
    >
      <Link href={room.detailsHref} className="group block h-full">
        <div className="flex flex-col h-full bg-background">
          
          {/* Gambar Kamar */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={room.imageUrl}
              alt={room.name}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Konten Teks */}
          <div className="pt-6 pb-2 px-2">
            
            <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
              {room.name}
            </h3>
            
            <p className="font-sans text-sm text-foreground/70 mt-1 mb-2 uppercase tracking-wider">
              {room.subtitle} {/* Menggunakan subtitle */}
            </p>
            
            {/* Tombol Discover */}
            <div className="mt-4">
                <span className="font-sans text-sm font-medium text-primary uppercase 
                             tracking-wider group-hover:text-foreground transition-colors duration-300">
                  Discover
                </span>
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}