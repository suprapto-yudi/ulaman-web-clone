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
    },
  },
  plugins: [],
}
export default config
