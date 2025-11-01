// tailwind.config.ts (Tidak ada perubahan substantif, hanya penamaan yang lebih bersih)
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Simplifikasi path content
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F6F0E6',     // Cream Pucat (Menggantikan '#fdfbf8' untuk konsistensi)
        'foreground': '#333333',     // Teks Utama (Dark Gray/Brown, Menggantikan '#1a1a1a')
        'primary': '#A78C5E',        // Emas/Gold Ulaman (Menggantikan '#b9915f')
        'accent': '#4A5C43',         // Hijau zaitun (Jika digunakan)
        // ... warna lainnya
      },
      fontFamily: {
        // Font Sans dari layout.tsx
        'sans': ['var(--font-jost)', 'sans-serif'], 
        // Font Serif dari globals.css (@font-face)
        'serif': ['Americana', 'serif'],
      },
      screens: {
        'lg': '991px', // Breakpoint kustom Ulaman
      },
      // ... (borderRadius)
      
      // Kunci: Keyframes dan Animation sudah benar
      keyframes: {
        'slide-up': { /* ... */ },
        'fade-in': { /* ... */ },
      },
      animation: {
        'slide-up': 'slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fade-in 0.5s linear forwards',
      },
    },
  },
  plugins: [],
}
export default config