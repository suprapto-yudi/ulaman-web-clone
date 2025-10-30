// src/components/ui/InvertedButton.tsx
"use client"

import React from 'react'
import { twMerge } from 'tailwind-merge' // Wajib

type InvertedButtonProps = {
  children: React.ReactNode
  className?: string
  onClick: () => void
}

export default function InvertedButton({
  children,
  className, // Hapus default value = ''
  onClick,
}: InvertedButtonProps) {
  
  // Base style Inverted (Primary BG -> White Hover)
  const baseStyle = 
    "px-8 py-3 text-sm font-sans font-medium uppercase tracking-widest transition-all duration-300 " +
    "bg-primary text-white border border-primary " +
    // KUNCI: Gunakan rounded-asymmetric
    "rounded-asymmetric " +
    "hover:bg-background hover:text-primary hover:border-primary" // Ganti hover:bg-white menjadi hover:bg-background untuk konsistensi theme
    
  // KUNCI: Gunakan twMerge
  return (
    <button
      onClick={onClick}
      className={twMerge(baseStyle, className)}
    >
      {children}
    </button>
  )
}