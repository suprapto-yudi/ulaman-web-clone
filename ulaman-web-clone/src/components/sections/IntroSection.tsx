// src/components/sections/IntroSection.tsx
"use client"

import { motion, type Variants } from 'framer-motion';
import Button from '@/components/ui/Button'; // Menggunakan Button yang sudah kita buat
// Import komponen Slider dan data JSON
import IntroSlider from '@/components/sections/IntroSlider'; 
import siteData from '../../../data/siteData.json'; 

// Varian animasi untuk item (slide-up)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function IntroSection() {
  const introData = siteData.intro;

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Kontainer 2 Kolom (1 kolom di mobile, 2 kolom di lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Kolom Kiri: Teks & Button (Animasi Stagger) */}
          <motion.div
            className="flex flex-col gap-6 lg:order-2" // Order 2 agar teks di kanan
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
          >
            
            {/* Headline/Judul */}
            <motion.h2 
                variants={itemVariants}
                className="font-serif text-3xl md:text-4xl text-primary leading-tight" 
            >
                {introData.heading}
            </motion.h2>

            {/* Paragraf 1 */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-base leading-relaxed text-foreground/80"
            >
              {introData.paragraph1}
            </motion.p>
            
            {/* Paragraf 2 */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-base leading-relaxed text-foreground/80"
            >
              {introData.paragraph2}
            </motion.p>

            {/* Button Discover More */}
            <motion.div 
              variants={itemVariants}
              className="mt-4"
            >
              <Button
                href={introData.buttonHref}
                variant="primary"
                // Button primary menggunakan border-primary dan text-white
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