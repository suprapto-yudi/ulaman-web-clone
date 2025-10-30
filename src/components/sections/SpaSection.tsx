"use client"

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import HoverLink from '@/components/ui/HoverLink'
import VideoModal from '@/components/modals/VideoModal'
import data from '../../../data/siteData.json'
import { Play } from 'lucide-react'

// Varian animasi (fade in dari bawah)
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
}

export default function SpaSection() {
  const { spa } = data // Ambil data spa

  // State untuk modal video
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // 1. Setup useRef untuk target scroll
  const scrollContainerRef = useRef(null)

  // 2. Setup hook useScroll
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start end', 'end start'],
  })

  // 3. Setup hook useTransform (Sesuai Detail 7)
  
  // Animasi Teks Atas ("Balinese"): Bergerak ke kanan
  const topTextX = useTransform(scrollYProgress, [0.3, 0.7], ['-20%', '20%'])
  
  // Animasi Teks Bawah ("Healing"): Bergerak ke kiri
  const bottomTextX = useTransform(scrollYProgress, [0.3, 0.7], ['20%', '-20%'])

  return (
    <>
      {/* Kita buat "landasan pacu" scroll */}
      <section
        ref={scrollContainerRef}
        className="relative h-[220vh] w-full overflow-hidden
                   flex flex-col justify-between"
      >
        {/* Ini adalah "jendela" kita (h-screen) yang menempel (sticky) */}
        <div className="sticky top-0 h-screen w-full">
          
          {/* Wrapper untuk Teks Parallax */}
          <div className="absolute inset-0 flex flex-col items-center 
                          justify-center z-0 scale-[1.5]">
            <motion.h2 
              className="font-serif text-8xl lg:text-[15vw] 
                         text-primary/10 select-none"
              style={{ x: topTextX }}
            >
              {spa.watermarkTop}
            </motion.h2>
            <motion.h2 
              className="font-serif text-8xl lg:text-[15vw] 
                         text-primary/10 select-none"
              style={{ x: bottomTextX }}
            >
              {spa.watermarkBottom}
            </motion.h2>
          </div>

          {/* Wrapper untuk Konten (Gambar & Teks Bawah) */}
          <div className="relative z-10 h-full flex flex-col 
                          items-center justify-center pt-32">
            
            {/* Gambar Kubah (Detail 7) */}
            <motion.div
              className="relative w-[300px] h-[450px] 
                         md:w-[400px] md:h-[600px] 
                         overflow-hidden group cursor-pointer"
              // Kita pakai border-radius besar untuk efek kubah
              style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              onClick={openModal}
            >
              <Image
                src={spa.imageUrl}
                alt="Spa Image"
                fill
                className="object-cover transition-transform 
                           duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Tombol Play Video (Detail 7) */}
              <div className="absolute inset-0 bg-black/0 
                              group-hover:bg-black/30 transition-colors
                              flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/80 rounded-full
                                flex items-center justify-center
                                scale-0 group-hover:scale-100 transition-transform"
                >
                  <Play size={32} className="text-white fill-white ml-1" />
                </div>
                <span className="absolute bottom-8 text-white font-sans 
                                 uppercase tracking-widest text-sm
                                 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-300">
                  Play Video
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Konten Bawah (Headline & Tombol) */}
        {/* Ini akan muncul di akhir 'h-[220vh]' landasan pacu */}
        <motion.div
          className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 
                     lg:px-8 flex flex-col items-center text-center pb-24 lg:pb-32"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-2xl mb-8">
            {spa.headline}
          </h2>
          {/* Tombol "VISIT THE WEBSITE" (Sesuai Detail 7) */}
          <HoverLink href={spa.link} isExternal>
            Visit The Website
          </HoverLink>
        </motion.div>

      </section>

      {/* Render Modal Video */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl={spa.videoUrl}
      />
    </>
  )
}
