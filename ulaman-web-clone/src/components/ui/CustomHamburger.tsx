"use client"

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react' // Kita butuh ikon X untuk fallback/closure

type CustomHamburgerProps = {
  onClick: () => void;
  // KUNCI: Menerima state apakah menu sedang terbuka atau tidak
  isOpen: boolean; 
  // Menerima warna garis dari Navbar (bg-white atau bg-foreground)
  barColor: string; 
}

export default function CustomHamburger({ onClick, isOpen, barColor }: CustomHamburgerProps) {
  
  // Menggunakan AnimatedMenuIcon kustom (Logika yang sama seperti di Navbar)
  const AnimatedMenuBars = () => (
    <div className="flex flex-col space-y-2 cursor-pointer group">
        {/* Baris Atas: Lebih pendek (w-4) saat default, memanjang saat hover (w-8), berputar jadi X */}
        <motion.div
            animate={{ 
                rotate: isOpen ? 45 : 0, 
                y: isOpen ? 6 : 0, 
                width: isOpen ? 32 : 18 
            }}
            transition={{ duration: 0.3 }}
            className={`h-px ${barColor} ${!isOpen && 'w-4 group-hover:w-8'} transition-all duration-300 origin-left`}
        />
        {/* Baris Bawah: Panjang penuh (w-8), berputar jadi X */}
        <motion.div
            animate={{ 
                rotate: isOpen ? -45 : 0, 
                y: isOpen ? -6 : 0, 
                width: 32
            }}
            transition={{ duration: 0.3 }}
            className={`h-px ${barColor} w-8 group-hover:w-8 transition-all duration-300 origin-left`}
        />
    </div>
  );

  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      className="p-1" // Tambahkan padding agar area klik lebih nyaman
    >
      {/* Jika menu terbuka, tampilkan ikon X yang sudah kita gunakan di overlay */}
      {isOpen ? (
        <X size={28} className={barColor.replace('bg-', 'text-')} />
      ) : (
        // Jika menu tertutup, tampilkan animasi 2 baris
        <AnimatedMenuBars />
      )}
    </button>
  )
}