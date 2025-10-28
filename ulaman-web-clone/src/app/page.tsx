// src/app/page.tsx

// Kita hanya perlu mengimpor HeroSection untuk awal.
import HeroSection from "@/components/sections/HeroSection"; 
// Import section lainnya akan ditambahkan di langkah berikutnya:
// import IntroSection from "@/components/sections/IntroSection";
// import RoomsSection from "@/components/sections/RoomsSection";
// import FacilitiesSection from "@/components/sections/FacilitiesSection";
// import ExperienceSection from "@/components/sections/ExperienceSection";


export default function Home() {
  return (
    // Struktur utama Next.js App Router
    <main> 
      {/* 1. Hero Section (Video Background) */}
      <HeroSection />
      
      {/* 2. Placeholder untuk Section Berikutnya */}
      <div className="h-screen bg-background text-foreground flex flex-col items-center justify-center font-serif text-2xl px-8">
        <p>Section Berikutnya: Intro, Rooms, Facilities, dan Experiences.</p>
        <p className="mt-4 text-primary text-base font-sans">Semua error Typescript sudah diselesaikan. Sekarang fokus ke UI!</p>
      </div>
    </main>
  );
}