// src/components/ui/HoverLink.tsx
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type HoverLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    isExternal?: boolean; 
};

export default function HoverLink({ href, children, className, isExternal }: HoverLinkProps) {
    // Tentukan apakah link eksternal atau kita menggunakan prop isExternal
    const isExternalLink = isExternal || href.startsWith('http') || href.startsWith('https');
    return (
        <Link 
            href={href} 
            target={isExternalLink ? '_blank' : '_self'}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
            className={twMerge(
                "font-sans text-sm uppercase tracking-widest text-primary relative group pt-1",
                className
            )}
        >
            {children}
            <span
                className="block absolute bottom-0 left-0 h-px w-0 bg-primary 
                           transition-all duration-300 group-hover:w-full"
            />
        </Link>
    );
}