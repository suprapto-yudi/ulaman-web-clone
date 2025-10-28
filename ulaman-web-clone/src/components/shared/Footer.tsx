import Link from 'next/link'
import FooterLink from '@/components/ui/FooterLink'
import AwardsCarousel from '@/components/ui/AwardsCarousel'
import { Star, Plus, Minus } from 'lucide-react' // Contoh ikon

// Data untuk navigasi footer
const exploreLinks1 = [
  { href: 'https://ulamanbali.com/', label: 'Home' },
  { href: 'https://earthbyulaman.com/', label: 'Dining' },
  { href: 'https://ulamanbali.com/retreats/', label: 'Retreats' },
  { href: 'https://ulamanbali.com/facilities', label: 'Facilities' },
  { href: 'https://ulamanbali.com/about', label: 'About' },
  { href: 'https://ulamanbali.com/contact', label: 'Contact' },
]

const exploreLinks2 = [
  { href: 'https://ulamanbali.com/rooms/', label: 'Villas' },
  { href: 'https://riversidespabyulaman.com/', label: 'Spa' },
  { href: 'https://ulamanbali.com/activities', label: 'Experiences' },
  { href: 'https://ulamanbali.com/ulaman-map', label: 'Ulaman Map' },
  { href: 'https://ulamanbali.com/blog', label: 'Articles' },
  { href: 'https://ulamanbali.com/testimonials', label: 'Video Testimonials' },
]

const connectLinks = [
  { href: 'https://wa.me/6281227142854', label: 'Whatsapp' },
  { href: 'https://www.google.com/maps/dir//Ulaman+Road,+Buwit,+Kediri,+Tabanan+Regency,+Bali+82121/@-8.5929565,115.048163,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd23921369d5713:0x84f33e9385550fd4!2m2!1d115.1305649!2d-8.5929653?entry=ttu', label: 'Directions' },
  { href: 'https://www.tripadvisor.com/Hotel_Review-g608496-d21058098-Reviews-Ulaman_Eco_Luxury_Resort-Tabanan_Bali.html', label: 'TripAdvisor' },
  { href: 'https://www.instagram.com/ulamanbali', label: 'Instagram' },
  { href: 'https://www.facebook.com/UlamanBali/', label: 'Facebook' },
]

export default function Footer() {
  // Placeholder untuk form
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Form submitted (placeholder)')
  }

  return (
    // Kita pakai warna 'accent' yang kita definisikan di tailwind.config
    <footer className="bg-accent text-white/70">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Bagian Atas: Rating & Booking Widget */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 border-b border-white/20 pb-12">
          
          {/* Rating */}
          <div className="flex flex-col gap-4">
            <Link href="https://www.google.com/travel/search?q=ulaman%20bali&g2lb=4814050%2C4874190%2C4893075%2C4965990%2C4969803%2C10210222%2C72248047%2C72248049%2C72277293%2C72302247%2C72317059%2C72406588%2C72414906%2C72421566%2C72462234%2C72470899%2C72471280%2C72472051%2C72473841%2C72481459%2C72485658%2C72486593%2C72494250%2C72499705%2C72513513%2C72536387%2C72549171%2C72569093%2C72570850%2C72602734%2C72616120%2C72619927%2C72620306%2C72620962%2C72634630%2C72648289%2C72653660%2C72658035%2C72661848%2C72662543%2C72671093%2C72673973&hl=en-ID&gl=id&cs=1&ssta=1&ts=CAEaRwopEicyJTB4MmRkMjM5MjEzNjlkNTcxMzoweDg0ZjMzZTkzODU1NTBmZDQSGhIUCgcI6A8QCRgTEgcI6A8QCRgUGAEyAhAA&qs=CAEyFENnc0kxSl9VcXJqU3pfbUVBUkFCOAJCCQnUD1WFkz7zhEIJCdQPVYWTPvOE&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwiomPuP68GHAxUAAAAAHQAAAAAQCg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <Star className="h-4 w-4 text-primary" fill="#b9915f" />
              <span>4.7 / 742 Google Reviews</span>
            </Link>
            <Link href="https://www.tripadvisor.com/Hotel_Review-g608496-d21058098-Reviews-Ulaman_Eco_Luxury_Resort-Tabanan_Bali.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <Star className="h-4 w-4 text-primary" fill="#b9915f" />
              <span>4.8 / 295 TripAdvisor Reviews</span>
            </Link>
          </div>
          
          {/* Booking Widget Placeholder */}
          <div className="flex flex-col md:flex-row items-center gap-4 border border-white/20 p-4">
            <button className="text-white/70 hover:text-white">Check In</button>
            <span className="text-white/20">|</span>
            <button className="text-white/70 hover:text-white">Check Out</button>
            <span className="text-white/20 hidden md:block">|</span>
            <div className="flex items-center gap-2">
              <span className="text-white/70">Adult</span>
              <button className="text-white/70 hover:text-white"><Minus size={16} /></button>
              <span className="text-white">2</span>
              <button className="text-white/70 hover:text-white"><Plus size={16} /></button>
            </div>
            <button className="px-6 py-2 border border-white/50 text-white text-sm uppercase tracking-wider hover:bg-white hover:text-accent transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Bagian Tengah: Map & Navigasi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
          
          {/* Kiri: Teks & Form */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            {/* Teks */}
            <div>
              <h3 className="font-serif text-3xl text-white mb-4">
                Tucked Within Majestic Balinese Nature.
              </h3>
              <p className="text-sm leading-relaxed">
                Strategically located near popular areas like Canggu and Ubud, experience serene nature and luxury. With endless activities, you'll never want to leave Ulaman.
              </p>
            </div>
            
            {/* Form Newsletter */}
            <div>
              <h4 className="font-serif text-2xl text-white mb-4">
                Get Notified On Our Offers
              </h4>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name*" 
                  required 
                  className="bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-primary" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email*" 
                  required 
                  className="bg-transparent border-b border-white/30 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-primary" 
                />
                <button type="submit" className="text-primary tracking-widest uppercase text-left mt-2 hover:text-white">
                  Submit
                </button>
              </form>
            </div>
          </div>
          
          {/* Kanan: Map & Links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Placeholder Map */}
            <div className="md:col-span-3 h-64 bg-black/20 flex items-center justify-center text-white/30">
              [Map Placeholder - Sesuai Detail 13]
            </div>
            
            {/* Links "Explore" */}
            <div className="flex flex-col gap-3">
              <h5 className="font-serif text-xl text-white mb-2">Explore</h5>
              {exploreLinks1.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
            <div className="flex flex-col gap-3 md:mt-8"> {/* Kolom kedua "Explore" */}
              {exploreLinks2.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
            
            {/* Links "Connect" */}
            <div className="flex flex-col gap-3">
              <h5 className="font-serif text-xl text-white mb-2">Connect</h5>
              {connectLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bagian Bawah: Awards & Copyright */}
        <div className="border-t border-white/20 pt-12">
          {/* Carousel Awards */}
          <div className="mb-12">
            <AwardsCarousel />
          </div>
          
          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 text-xs text-white/50">
            <div className="flex flex-col md:flex-row gap-x-4">
              <Link href="https://ulamanbali.com/legal/terms" className="hover:text-white">Terms</Link>
              <Link href="https://ulamanbali.com/legal/privacy-policy" className="hover:text-white">Privacy</Link>
              <Link href="https://ulamanbali.com/contact/ulaman-bookings" className="hover:text-white">Ulaman Bookings</Link>
              <span>Kids under 6 are not advised.</span>
            </div>
            <div className="flex flex-col md:flex-row gap-x-4">
              <span>© 2024-2025 Two Moons Studio for ulamanbali.com. All Rights Reserved</span>
              <span>Made With ♥︎ By Two Moons Studio</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sub-Footer (Carousel Packages) - Sesuai Detail 13 */}
      <div className="w-full bg-black/20 py-4 overflow-hidden">
        {/* Ini placeholder untuk carousel teks kedua */}
        <div className="flex gap-8 animate-slide text-white/50 text-sm whitespace-nowrap">
          <span>The Ultimate Honeymoon | 3 days 2 nights</span>
          <span>•</span>
          <span>The Avatar Experience | 3 days 2 nights</span>
          <span>•</span>
          {/* Duplikasi */}
          <span>The Ultimate Honeymoon | 3 days 2 nights</span>
          <span>•</span>
          <span>The Avatar Experience | 3 days 2 nights</span>
        </div>
      </div>
    </footer>
  )
}
