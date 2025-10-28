// src/components/ui/Button.tsx

import Link from 'next/link'
import { twMerge } from 'tailwind-merge' 
import React from 'react' // Import React

// Definisikan props untuk Button/Link
type ButtonProps = {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'outline' 
  // Tambahkan prop onClick, opsional, yang menerima fungsi tanpa return
  onClick?: (() => void)
}

export default function Button({ 
  href, 
  children, 
  className, 
  variant = 'primary',
  onClick 
}: ButtonProps) {

  // Kunci: Gunakan rounded-tl-lg dan rounded-br-lg
  const baseStyle = "px-8 py-3 text-sm font-medium uppercase tracking-widest transition-all duration-300 inline-block rounded-tl-lg rounded-br-lg"

  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    // Base style untuk outline. Perubahan warna saat scroll akan di-override dari Navbar/StayWithUsButton
    outline: "border text-foreground bg-transparent hover:opacity-80" 
  }

  // Menggabungkan style bawaan, style variant, dan style dinamis dari props
  const classes = twMerge(baseStyle, variants[variant], className)

  return (
    // Tambahkan prop onClick ke komponen Link
    <Link href={href} className={classes} onClick={onClick}> 
      {children}
    </Link>
  )
}