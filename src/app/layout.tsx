// src/app/layout.tsx

import type { Metadata } from 'next'
// Mengganti Playfair_Display dengan Cormorant_Garamond
import { Jost, Cormorant_Garamond, Playfair_Display } from 'next/font/google' 
import './globals.css'
import Navbar from '@/components/shared/Navbar'
// Pastikan kamu sudah membuat file Footer.tsx
import Footer from '@/components/shared/Footer' 

// ... (Kode setup Jost tetap sama) ...
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jost', // Variabel CSS untuk body
})

// Definisikan Cormorant Garamond untuk heading
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant', // Variabel CSS untuk heading
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Ulaman Bali Clone',
  description: 'Kloning 100% identik Ulaman Bali oleh Muhamad Yudi Suprapto',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body 
        // Wajib: Tambahkan suppressHydrationWarning
        suppressHydrationWarning={true} 
        // Wajib: Menerapkan Global Styles dari Theme dan Font-Sans
        className={`${jost.variable} ${cormorant.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased`}
      >
        
        <Navbar />
        
        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  )
}