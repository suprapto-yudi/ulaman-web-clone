// src/app/page.tsx

// Kita hanya perlu mengimpor HeroSection untuk awal.
import HeroSection from "@/components/sections/HeroSection"; 
// Import section lainnya akan ditambahkan di langkah berikutnya:
import IntroSection from "@/components/sections/IntroSection";
import RoomsSection from "@/components/sections/RoomsSection";
import ParallaxCtaSection from "@/components/sections/ParallaxCtaSection";
import PackagesSection from "@/components/sections/PackagesSection";
import WellnessSection from "@/components/sections/WellnessSection";
import SpaSection from "@/components/sections/SpaSection";
import DineSection from "@/components/sections/DineSection";
// import FacilitiesSection from "@/components/sections/FacilitiesSection";
// import ExperienceSection from "@/components/sections/ExperienceSection";


export default function Home() {
  return (
    // Struktur utama Next.js App Router
    <main> 
      {/* 1. Hero Section (Video Background) */}
      <HeroSection />

      {/* 2. Intro Section (Teks & Slider) */}
      <IntroSection />
      
      {/* 3. Rooms Section */}
      <RoomsSection />

      {/* 4. Parallax Section */}
      <ParallaxCtaSection />
      
      {/* 5. Packages Section */}
      <PackagesSection />

      {/* 6. Wellness Section */}
      <WellnessSection />

      {/* 7. Spa Section */}
      <SpaSection />

      {/* 8. Dine Section */}
      <DineSection />

    </main>
  );
}