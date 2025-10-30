// src/components/ui/HoverButton.tsx
"use client"

import React from 'react'
import { twMerge } from 'tailwind-merge' // Wajib

type HoverButtonProps = {
  children: React.ReactNode
  className?: string
  onClick: () => void 
}

export default function HoverButton({
  children,
  className,
  onClick,
}: HoverButtonProps) { // Hapus default value = '' dari className

  // Base classes
  const baseClasses =
    'relative group text-primary uppercase text-sm tracking-widest bg-transparent border-none pt-1 transition-colors duration-300' 
  
  // Animasi underline (Kita buat group pada elemen terluar)
  const underlineClasses = `
    after:content-[''] after:absolute after:bottom-[-2px] after:left-0 
    after:h-px after:w-full after:bg-primary 
    after:transition-transform after:duration-300 after:ease-out
    after:origin-left after:scale-x-0 
    group-hover:after:scale-x-100
  `
  // KUNCI: Gabungkan semua class dengan twMerge
  const finalClasses = twMerge(baseClasses, underlineClasses, className)

  return (
    <button
      onClick={onClick}
      className={finalClasses}
    >
      {children}
    </button>
  )
}