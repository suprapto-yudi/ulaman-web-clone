Daftar Jawaban untuk Dokumentasi README.md
Front End Implementation
1. Component Structure
Kami mendesain hierarki komponen menggunakan pendekatan yang dimodifikasi dari Atomic Design dan pemisahan berbasis fungsi (Feature/Domain). Tujuannya adalah memastikan reusability yang tinggi dan maintainability yang mudah.

src/components/ui/ (Atoms/Molecules): Berisi komponen yang sangat reusable dan dumb (tanpa logic atau state), seperti Button.tsx, NavLink.tsx, UlamanLogo.tsx, GalleryCard.tsx, dan Hotspot.tsx.

src/components/sections/ (Organisms/Templates): Berisi komponen besar yang membentuk bagian-bagian halaman utama, seperti IntroSection.tsx, RoomsSection.tsx, dan GallerySection.tsx. Komponen ini menggabungkan beberapa komponen ui/.

src/components/layout/ (Templates): Berisi struktur kerangka halaman, seperti Header.tsx, Footer.tsx, dan AppLayout.tsx.

src/types/: Berisi semua definisi tipe TypeScript (.ts) seperti RoomType, GalleryImage, dan SiteData untuk memastikan konsistensi data.

2. State Management
Kami menggunakan pendekatan hybrid yang memprioritaskan local state untuk kinerja dan kesederhanaan.

Local State (useState): Digunakan secara ekstensif dalam komponen yang berorientasi klien, seperti:

Status hover dan click pada Hotspot.tsx dan RoomCard.tsx.

Status scroll di Header.tsx (scrolled dan logoSize).

Index dan cycling pada GallerySection.tsx (startIndex).

Global State (Context API/Zustand - Hipotetis): Jika diperlukan, kami akan menggunakan Context API untuk state yang dibagikan secara mendalam (misalnya, status mobile menu atau tema gelap/terang) atau Zustand untuk state global yang kompleks (misalnya, keranjang belanja atau user authentication). Dalam proyek ini, useState sudah cukup untuk mengelola modal (isModalOpen).

3. Responsive Strategy
Kami menerapkan strategi mobile-first yang didukung penuh oleh Tailwind CSS.

Custom Breakpoint: Mengatur breakpoint lg ke 991px di tailwind.config.ts untuk mencocokkan transisi layout yang sering terjadi di web Ulaman Bali.

Fluid Utility: Menggunakan utility seperti sm:, md:, dan lg: untuk memastikan layout menyesuaikan. Contoh: grid-cols-1 lg:grid-cols-2.

Masonry Grid: Menggunakan auto-rows dan row-span-X yang dikontrol oleh logic JavaScript (getGridRowSpan) untuk memastikan Masonry Grid tampil konsisten di desktop (md:grid-cols-3) dan mobile (grid-cols-2).

4. Performance Optimization
Karena Next.js unggul dalam performa, kami fokus pada fitur bawaan Next.js:

Asset Loading: Menggunakan komponen next/image untuk semua gambar. Ini secara otomatis:

Mengkompresi dan mengoptimalkan gambar (lazy loading).

Menyajikan gambar dalam format modern (seperti WEBP) jika didukung.

Font Optimization: Menggunakan next/font (atau @font-face yang di-host lokal) untuk memastikan font dimuat secepat mungkin tanpa layout shift (CLS).

Code Splitting: App Router Next.js secara otomatis membagi bundle kode berdasarkan rute dan komponen, memastikan pengguna hanya memuat JavaScript yang mereka butuhkan.

Server Component (Hipotetis): Meskipun komponen ini sebagian besar adalah client-side ("use client"), section yang statis (misalnya Footer atau Layout) tetap di-render di server (SSR/RSC) untuk initial load yang sangat cepat.

Data Management
5. Data Fetching (Struktur JSON)
Kami menggunakan satu file siteData.json yang terstruktur sebagai objek tunggal yang berisi semua data model.
{
  "intro": { ... },     /* Data untuk Hero/Intro Section */
  "rooms": [ ... ],     /* Array untuk Room Cards dan detail */
  "packages": [ ... ],  /* Array untuk Experience Packages */
  "gallery": { ... },   /* Objek untuk Galeri dan Gambar */
  "map": { ... },       /* Objek untuk data Hotspot di MapSection */
  "testimonials": { ... }
}
Pendekatan ini menjamin skalabilitas karena frontend hanya perlu memanggil satu endpoint (dalam kasus ini, satu import JSON) untuk mendapatkan semua state halaman.

6. API Integration (Hipotetis)
Jika kami menggunakan API kustom, kami akan menggunakan React Query (atau SWR) di frontend untuk menangani data fetching yang kompleks:

Caching dan Deduplication: Mencegah request duplikat dan menyediakan data instan saat navigasi balik.

Loading/Error States: Secara otomatis mengekspos isLoading, isError, dan data error, memungkinkan conditional rendering yang graceful (misalnya, menampilkan skeleton loading screen atau pesan error yang ramah pengguna).

7. Content Structure
Struktur data dirancang berdasarkan modul domain utama situs:

rooms: Array objek yang berisi props yang dibutuhkan RoomCard (misalnya id, name, subtitle, imageUrl, detailsHref).

gallery: Objek yang berisi headline dan array images (dengan src, alt, dan id) yang digunakan untuk Masonry Grid yang auto-cycle.

map: Objek berisi headline dan array hotspots (dengan iconName, top, left) yang merupakan state lengkap dari MapSection.

Deployment & Infrastructure
8. Vercel Deployment
Next.js dan Vercel bekerja dengan model Zero-Configuration. Konfigurasi kinerja optimal meliputi:

Global Edge Network: Semua aset statis dan serverless functions didistribusikan secara global.

Automatic Caching: Vercel meng-cache halaman dan aset statis secara otomatis.

Serverless Functions: API routes (jika ada) diubah menjadi serverless functions yang dieksekusi berdasarkan permintaan, menghemat sumber daya.

Instant Deploy: Proses build Next.js dioptimalkan oleh Vercel untuk deployment cepat.

9. Environment Setup
Kami menggunakan standar Next.js untuk menjaga keamanan kredensial:

Development (.env.local): Digunakan untuk variabel sensitif selama pengembangan lokal (misalnya, kunci database lokal, base URL API staging). File ini tidak di-commit ke Git.

Production (Vercel Dashboard): Variabel Environment disetel langsung di pengaturan Vercel. Variabel ini digunakan selama proses build di Vercel dan saat serverless functions dieksekusi di production.

10. Asset Optimization
Strategi kami fokus pada pengiriman aset yang cepat dan ringan:

Next/Image: Semua gambar Hero, Room, dan Gallery dilayani melalui next/image untuk kompresi/format modern.

Font Inlining: Menggunakan next/font (atau host lokal @font-face yang dimuat di globals.css) untuk mengurangi request pihak ketiga dan memastikan font dimuat tanpa render blocking.

SVG Optimization: Logo dan ikon (misalnya Lucide React) digunakan sebagai SVG untuk memastikan skalabilitas tanpa kehilangan kualitas dan ukuran file yang kecil.

CMS Integration (Bonus Points - Hipotetis)
11. API Design
Jika menggunakan Laravel Filament sebagai CMS, desain REST API akan mengikuti prinsip versioning dan resource-centric:

Versioning: Menggunakan api/v1/ (misalnya, /api/v1/rooms) untuk mempermudah maintenance di masa depan.

Endpoints:

/api/v1/page/home: Mengembalikan semua data yang dibutuhkan untuk halaman utama (termasuk hero, intro, dan rooms).

/api/v1/rooms/{slug}: Mengambil detail spesifik dari satu ruangan.

Laravel Resources: Menggunakan Laravel API Resources untuk memastikan payload JSON ke frontend sudah bersih, menghilangkan field database yang tidak perlu.

12. Content Modeling
Desain database akan fokus pada modularitas konten:

Rooms: Tabel utama dengan fields (slug, name, subtitle, image_url).

Facilities & Galleries: Tabel terpisah dengan relasi ke Content Blocks yang memungkinkan manajemen image array yang fleksibel.

Pages: Tabel yang sangat fleksibel (misalnya, menggunakan pola EAV atau JSON columns) untuk static content seperti headline dan paragraf pada IntroSection.

13. Admin UX
Fitur penting pada panel admin (Filament) untuk memudahkan manajemen konten:

WYSIWYG Editor: Untuk mengedit paragraf kompleks (rich text).

Media Library: Fitur drag-and-drop image uploads yang langsung terintegrasi dengan path Next.js (public/images).

Repeater Fields: Digunakan untuk mengelola array data seperti Gallery Images, Hotspots, atau list fitur package (memungkinkan penambahan/penghapusan baris dengan mudah).

Best Practices
14. Code Organization
Kami memastikan proyek terstruktur untuk kolaborasi:

Monorepo Style (Folder Structure): Memisahkan logic utama ke dalam src/ (ui/, sections/, types/).

Linting & Formatting: Menggunakan ESLint (untuk code quality dan aturan React Hooks) dan Prettier (untuk format kode yang konsisten), dengan konfigurasi yang disetujui tim.

TypeScript: Semua komponen dan data menggunakan TypeScript (.tsx/.ts) untuk integritas dan mencegah runtime error yang umum.

15. Error Handling
Kami menangani error secara graceful di semua layer:

UI/Rendering: Menggunakan React Error Boundaries di tingkat section atau layout untuk mencegah crash seluruh aplikasi. Jika satu komponen gagal, sisanya tetap berfungsi.

Data/Network: Menggunakan try...catch pada fungsi fetch (jika ada) atau menggunakan framework fetching (React Query/SWR) yang memiliki mekanisme retry dan error bawaan.

User Feedback: Menampilkan pesan error yang jelas dan tidak teknis (misalnya, "Data tidak dapat dimuat, coba lagi") dan fallback component (skeleton loading) saat data hilang.
