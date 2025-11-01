// src/components/ui/UlamanLogo.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UlamanLogoProps {
  className?: string; // Menerima text-primary dari Header
}

export default function UlamanLogo({ className }: UlamanLogoProps) {
    
    const LOGO_SIZE = 48; // Dimensi default logo

    return (
        <Link 
            href="/" 
            // Hapus flex-col dan items-center karena hanya ada 1 elemen
            className="flex items-center justify-center group focus:outline-none" 
        >
            {/* Logo Utama (SVG) */}
            <div className={`w-12 h-12 transition-colors duration-300 ${className}`}>
                <Image
                    // Path ke file SVG Anda di public
                    src="/images/ulaman-logo-small.svg" 
                    alt="Ulaman Eco Luxury Retreat Logo"
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                />
            </div>
            
            {/* Teks Pendamping "ECO LUXURY RETREAT" DIHILANGKAN */}
            
        </Link>
    );
}