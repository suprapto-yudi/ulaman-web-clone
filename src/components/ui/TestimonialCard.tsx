// src/components/ui/TestimonialCard.tsx
import HoverLink from './HoverLink';
import { Star } from 'lucide-react';
// KUNCI PERBAIKAN: Import tipe dari file sentral
import { ReviewData } from '@/types/siteTypes';

type TestimonialCardProps = {
  review: ReviewData; // Gunakan tipe yang diimpor
};

// Komponen untuk menampilkan bintang rating
const StarRating = ({ count }: { count: number }) => {
  return (
    <div className="flex space-x-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          // Beri warna primary jika index kurang dari rating
          className={`
            ${index < count ? 'text-primary fill-primary' : 'text-primary/20 fill-primary/20'}
            transition-colors duration-300
          `}
        />
      ))}
    </div>
  );
};


export default function TestimonialCard({ review }: TestimonialCardProps) {
    // KUNCI PERBAIKAN: Hitung rating jika ada (misal rating 5)
    // Di JSON kamu tidak ada rating bintang per review, jadi kita asumsikan 5 jika ingin ditampilkan
    const starCount = 5;

  return (
    // Layout slide (wajib ada untuk embla-carousel)
    <div className="flex-grow-0 flex-shrink-0 basis-full pl-4 md:pl-8 lg:pl-16">
      <div className="max-w-4xl pt-4">
        
        {/* Rating Bintang (Hanya untuk visual, bisa dihilangkan jika tidak ada data bintang di JSON Review) */}
        <StarRating count={starCount} />

        {/* Judul dan Body Review */}
        <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-4 mb-4">
          {review.title}
        </h3>
        
        {/* KUNCI PERBAIKAN: Menggunakan review.comment, BUKAN review.body */}
        <p className="font-sans text-lg text-foreground/80 leading-relaxed mb-6">
          {review.comment}
        </p>

        {/* Author dan Tanggal */}
        <div className="font-sans text-sm text-foreground/70 mb-8">
          <span className="font-semibold text-primary">{review.author}</span>
          {' '}
          /
          {' '}
          <span className="text-foreground/50">{review.date}</span>
        </div>

        {/* Tombol Continue Reading (Detail 10) */}
        <HoverLink href={review.url} className="text-primary">
            Continue Reading
        </HoverLink>
      </div>
    </div>
  );
}
