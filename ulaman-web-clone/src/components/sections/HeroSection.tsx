import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <motion.section 
      className="relative h-screen w-full overflow-hidden"
      // Animasi fade in untuk video
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }} // Video muncul duluan
    >
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/ulaman-hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Overlay Gelap (agar Navbar putih kontras) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />
    </motion.section>
  )
}
