import Image from 'next/image'
import HoverButton from '@/components/ui/HoverButton' // Pakai HoverButton baru kita

// Impor tipe data (bisa dari @/types/index.ts nanti)
type Package = {
  id: number
  name: string
  tagline: string
  cardImageUrl: string
  // ... (sisa data)
}

type PackageCardProps = {
  packageData: Package
  onDiscoverClick: () => void // Fungsi untuk membuka modal
}

export default function PackageCard({ packageData, onDiscoverClick }: PackageCardProps) {
  return (
    // Layout slide (mirip RoomCard, tapi kita buat 2 slide per view di desktop)
    <div className="flex-grow-0 flex-shrink-0 basis-[90%] sm:basis-1/2 lg:basis-1/2 pl-4">
      <div className="flex flex-col gap-4">
        {/* Gambar */}
        <div className="overflow-hidden rounded-lg">
          <Image
            src={packageData.cardImageUrl}
            alt={packageData.name}
            width={600}
            height={600}
            className="w-full h-auto object-cover aspect-square
                       transition-transform duration-500 ease-in-out
                       hover:scale-105"
          />
        </div>
        
        {/* Teks Konten */}
        <div className="flex flex-col items-start gap-2">
          <p className="font-sans text-xs text-foreground/70 uppercase tracking-widest">
            {packageData.tagline}
          </p>
          <h3 className="font-serif text-3xl text-primary">{packageData.name}</h3>
          
          {/* Tombol "DISCOVER" (Detail 5) */}
          <HoverButton onClick={onDiscoverClick}>
            Discover
          </HoverButton>
        </div>
      </div>
    </div>
  )
}
