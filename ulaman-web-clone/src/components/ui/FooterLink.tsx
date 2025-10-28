import Link from 'next/link'

type FooterLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export default function FooterLink({
  href,
  children,
  className = '',
}: FooterLinkProps) {
  // Base classes untuk link di footer (warna teks beda)
  const baseClasses =
    'relative text-white/70 hover:text-white transition-colors duration-300'
  
  // Animasi underline (kiri-ke-kanan)
  const afterClasses = `
    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 
    after:h-[1px] after:w-full after:bg-primary 
    after:transition-transform after:duration-300 after:ease-in-out
    after:origin-left after:scale-x-0 
    hover:after:origin-right hover:after:scale-x-100
  `

  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className={`${baseClasses} ${afterClasses} ${className}`}
    >
      {children}
    </Link>
  )
}
