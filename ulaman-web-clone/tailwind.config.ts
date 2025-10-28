import type { Config } from 'tailwindcss'

const config: Config = {
  // Kunci: Tambahkan './src/' di depan semua path
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fdfbf8', // Putih gading Ulaman
        foreground: '#1a1a1a', // Hitam arang
        primary: '#b9915f',    // Emas/Perunggu Ulaman
        accent: '#4a5c43',     // Hijau zaitun
        white: '#ffffff',      // Putih murni
      },
      fontFamily: {
        // Jost (sans-serif) untuk paragraf (dari layout.tsx)
        sans: ['var(--font-jost)', 'sans-serif'],
        // Kunci Perubahan: Menggunakan nama font lokal 'Americana' 
        // yang didefinisikan di @font-face
        serif: ['Americana', 'serif'],
      },
      // Mengatur breakpoint 'lg' agar sama dengan 991px (sesuai web asli)
      screens: {
        'lg': '991px', 
      },
      // Border radius asimetris untuk tombol
      borderRadius: {
        // tl (kiri atas), tr (kanan atas), br (kanan bawah), bl (kiri bawah)
        'asymmetric': '0.5rem 0 0.5rem 0', 
      },
      // KUNCI: Tambahkan keyframes dan animation di sini
      keyframes: {
        // 1. Keyframes untuk Slide-Up (Muncul dari bawah)
        'slide-up': {
          '0%': { transform: 'translateY(25px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // 2. Keyframes untuk Fade-In (Hanya Transparansi)
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        // 1. Animation untuk Slide-Up (Waktu default 0.8s, ease-out)
        'slide-up': 'slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        // 2. Animation untuk Fade-In (Waktu default 0.5s, linear)
        'fade-in': 'fade-in 0.5s linear forwards',
      },
      // AKHIR DARI keyframes dan animation
    },
  },
  plugins: [],
}
export default config
