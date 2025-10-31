// src/components/sections/TestimonialsSection.tsx
"use client"

import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

import data from '../../../data/siteData.json';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { SiteData, RatingData, ReviewData } from '@/types/siteTypes';

// Varian animasi
const fadeInUp: Variants = { 
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1.0], 
    },
  },
};

// Komponen Rating Widget Mini
const RatingWidget: React.FC<{ rating: RatingData }> = ({ rating }) => (
    <div className="flex flex-col items-center p-4 border border-primary/20 rounded-lg bg-white shadow-sm">
        <div className="flex items-center space-x-1 mb-2">
            <Star size={16} className="text-primary fill-primary" />
            <span className="font-sans text-xl font-semibold text-primary">{rating.rating.toFixed(1)}</span> 
        </div>
        <p className="font-sans text-xs text-foreground/70 uppercase tracking-widest">{rating.platform}</p>
        <p className="font-sans text-xs text-foreground/50 mt-1">{rating.count} reviews</p>
    </div>
);


export default function TestimonialsSection() {
    // KUNCI PERBAIKAN 1: Gunakan Type Assertion Sekali di sini
    const siteData = data as SiteData;
    const { testimonials } = siteData; 
    
    // KUNCI PERBAIKAN 2: HANYA deklarasikan variabel ratings dan reviews sekali
    const ratings: RatingData[] = testimonials.ratings; 
    const reviews: ReviewData[] = testimonials.reviews;
    //hapus const reviews = testimonials.reviews as ReviewType[];

    // Setup Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true, 
        align: 'start', 
        watchResize: true, 
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section id="testimonials-section" className="py-24 lg:py-32 bg-secondary/30 overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* HEADLINE */}
                <motion.h2
                    className="font-serif text-4xl md:text-5xl text-primary leading-tight max-w-4xl mb-12"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {testimonials.headline}
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12">
                    
                    {/* KOLOM KIRI: RATING WIDGETS */}
                    <div className="flex flex-col gap-6">
                        {ratings.map((rating, index) => (
                            <RatingWidget key={rating.platform || index} rating={rating} />
                        ))}
                    </div>

                    {/* KOLOM KANAN: SLIDER TESTIMONI */}
                    <div className="relative">
                        {/* Tombol Navigasi Kustom (Detail 10) */}
                        <div className="absolute top-0 right-0 flex gap-2 z-10">
                            <button
                                onClick={scrollPrev}
                                className="h-12 w-12 border border-primary/30 text-primary/50
                                          hover:bg-primary hover:text-white transition-colors
                                          flex items-center justify-center rounded-lg" 
                                aria-label="Previous Review"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="h-12 w-12 border border-primary/30 text-primary/50
                                          hover:bg-primary hover:text-white transition-colors
                                          flex items-center justify-center rounded-lg"
                                aria-label="Next Review"
                            >
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Viewport Slider */}
                        <motion.div 
                            className="overflow-hidden pt-16" 
                            ref={emblaRef}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }} 
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex -ml-4 md:-ml-8 lg:-ml-16">
                                {reviews.map((review) => (
                                    <TestimonialCard key={review.id} review={review} />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
