// Ini adalah placeholder untuk carousel logo dari Detail 13
// Implementasi penuhnya akan menggunakan Embla Carousel dengan Autoplay

export default function AwardsCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-12 animate-slide">
        {/* Placeholder untuk logo-logo */}
        <span className="text-white/50 text-sm">Award Logo 1</span>
        <span className="text-white/50 text-sm">Award Logo 2</span>
        <span className="text-white/50 text-sm">Award Logo 3</span>
        <span className="text-white/50 text-sm">Award Logo 4</span>
        <span className="text-white/50 text-sm">Award Logo 5</span>
        {/* Duplikasi untuk efek loop mulus */}
        <span className="text-white/50 text-sm">Award Logo 1</span>
        <span className="text-white/50 text-sm">Award Logo 2</span>
        <span className="text-white/50 text-sm">Award Logo 3</span>
        <span className="text-white/50 text-sm">Award Logo 4</span>
        <span className="text-white/50 text-sm">Award Logo 5</span>
      </div>
      {/* Kita tambahkan animasi simpel di tailwind.config.ts */}
    </div>
  )
}
