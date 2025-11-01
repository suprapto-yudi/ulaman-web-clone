// src/components/sections/IntroSection.tsx

"use client"

import { motion, useScroll, useTransform, type Variants } from 'framer-motion'; // <-- Tambah useScroll, useTransform
import React, { useRef } from 'react'; // Tambah useRef
import Button from '@/components/ui/Button'; 
import IntroSlider from '@/components/sections/IntroSlider'; 
import siteData from '../../../data/siteData.json'; 

// --- Komponen Teks Animasi per Huruf (Ambil dari logic saya sebelumnya) ---
// Note: Asumsi font-americana adalah class Tailwind yang sudah Anda definisikan
const AnimatedText = ({ text }: { text: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });

    const words = text.split(" "); 
    const totalChars = text.length; 
    let charCount = 0;

    return (
        <div ref={ref} className={`text-center font-americana text-3xl md:text-4xl leading-snug lg:text-left`}> 
            {words.map((word, wordIndex) => (
                // Menggunakan whitespace-pre-wrap untuk menjaga spasi, dan inline-block untuk animasi
                <span key={wordIndex} className="inline-block whitespace-pre-wrap">
                    {word.split("").map((char, charIndex) => {
                        // Hitung start dan end progress untuk huruf ini
                        const charProgressStart = charCount / totalChars;
                        const charProgressEnd = (charCount + 1) / totalChars;
                        
                        // KUNCI: Opacity 0.2 (awal) -> 1 (tengah) -> 0.2 (akhir)
                        const opacity = useTransform(
                            scrollYProgress,
                            [charProgressStart, charProgressStart + 0.05], // Transisi dari 0.2 ke 1
                            [0.2, 1] 
                        );

                        charCount++; 

                        return (
                            <motion.span 
                                key={charIndex} 
                                style={{ opacity }}
                                // Gunakan warna emas/primary yang Anda definisikan
                                className="text-primary-gold inline-block" 
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                    {" "} {/* Tambahkan spasi antar kata */}
                </span>
            ))}
        </div>
    );
};
// --- END AnimatedText ---


// Varian animasi untuk item (slide-up)
const itemVariants: Variants = { /* ... tetap sama ... */ };

export default function IntroSection() {
    const introData = siteData.intro;

    // Gabungkan paragraf untuk animasi teks reveal (sesuai permintaan UI/UX)
    const combinedHeadline = `${introData.paragraph1} ${introData.paragraph2}`; 

    return (
        <section className="py-24 lg:py-32 bg-background">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* HEADLINE UTAMA (Scroll Animated Text) - KUNCI RELEVANSI */}
                {/* Ini harus di luar grid jika Anda ingin animasi mencakup seluruh section */}
                <div className="mb-16 lg:mb-20 text-center">
                    <AnimatedText text={combinedHeadline} />
                </div>

                {/* Kontainer 2 Kolom (Data Statis/Slider) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Kolom Kiri: Teks & Button (Animasi Stagger) */}
                    <motion.div
                        className="flex flex-col gap-6 lg:order-2" // Order 2 agar teks di kanan
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
                    >
                        
                        {/* KUNCI: Sekarang ini hanya sub-headline atau heading kedua */}
                        <motion.h2 
                            variants={itemVariants}
                            className="font-serif text-3xl md:text-4xl text-primary leading-tight" 
                        >
                            {introData.heading} {/* Menggunakan heading statis dari JSON */}
                        </motion.h2>

                        {/* Paragraf statis (optional jika sudah digabung di atas) */}
                        {/* <motion.p variants={itemVariants}>...</motion.p>
                        */}

                        {/* Button Discover More */}
                        <motion.div 
                            variants={itemVariants}
                            className="mt-4"
                        >
                            <Button
                                href={introData.buttonHref}
                                variant="primary"
                                className="px-10 py-3 text-lg" 
                            >
                                {introData.buttonText}
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Kolom Kanan: Slider Gambar */}
                    <motion.div 
                        className="w-full lg:order-1" // Order 1 agar slider di kiri
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <IntroSlider />
                    </motion.div>
                    
                </div>
            </div>
        </section>
    );
}