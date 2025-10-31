// src/components/ui/TestimonialCard.tsx
import HoverLink from './HoverLink';
import { Star } from 'lucide-react';

// Interface Tipe data Testimonial untuk kartu
type ReviewType = {
  id: number;
  author: string;
  date: string;
  title: string;
  body: string;
  rating: number;
};

type TestimonialCardProps = {
  review: ReviewType;
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
  return (
    // Layout slide (wajib ada untuk embla-carousel)
    <div className="flex-grow-0 flex-shrink-0 basis-full pl-4 md:pl-8 lg:pl-16">
      <div className="max-w-4xl pt-4">
        
        {/* Rating Bintang */}
        <StarRating count={review.rating} />

        {/* Judul dan Body Review */}
        <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-4 mb-4">
          {review.title}
        </h3>
        
        <p className="font-sans text-lg text-foreground/80 leading-relaxed mb-6">
          {review.body}
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
        <HoverLink href="#" className="text-primary">
            Continue Reading
        </HoverLink>
      </div>
    </div>
  );
}
