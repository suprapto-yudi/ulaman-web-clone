// src/components/ui/HoverLink.tsx
import Link from 'next/link';
import React from 'react';

type HoverLinkProps = {
    href: string;
    children: React.ReactNode;
};

export default function HoverLink({ href, children }: HoverLinkProps) {
    return (
        <Link 
            href={href} 
            // Styling untuk link di Rooms Section
            className="font-sans text-sm uppercase tracking-widest text-primary relative group pt-1"
        >
            {children}
            {/* Garis Bawah */}
            <span
                className="block absolute bottom-0 left-0 h-px w-0 bg-primary 
                           transition-all duration-300 group-hover:w-full"
            />
        </Link>
    );
}