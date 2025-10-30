// src/types/siteTypes.ts

// --- Bagian Hotspot sudah ada di file mapTypes sebelumnya, tapi saya ulangi di sini ---
export interface HotspotData {
  id: number;
  name: string;
  iconName: string;
  left: string; 
  top: string;
}

// Tambahkan di file tipe Anda (src/types/siteTypes.ts)
export interface HotspotProps {
  name: string;
  icon: React.ReactNode; // Tipe untuk ikon JSX
  top: string;         // Tipe untuk koordinat top (mis. "10%")
  left: string;        // Tipe untuk koordinat left (mis. "35%")
}

// --- Interfaces untuk Bagian Lain ---

export interface IntroData {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  buttonHref: string;
}

export interface RoomData {
  id: number;
  name: string;
  subtitle: string;
  imageUrl: string;
  detailsHref: string;
}

export interface PackageDetail {
  left: string[];
  right: string[];
}

export interface PackageData {
  id: number;
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  cardImageUrl: string;
  modalImageUrl: string;
  price: string;
  details: PackageDetail;
}

export interface WellnessData {
  headline: string;
  text: string;
  link: string;
}

export interface SpaData {
  watermarkTop: string;
  watermarkBottom: string;
  imageUrl: string;
  videoUrl: string;
  headline: string;
  link: string;
}

export interface DineData {
  id: number;
  imageUrl: string;
  alt: string;
}

export interface MapData {
  headline: string;
  subheadline: string;
  hotspots: HotspotData[];
}

// --- Interface Utama yang Mencakup SEMUA Bagian ---
// Inilah yang harus diimpor sebagai tipe untuk file siteData.json
export interface SiteData {
  intro: IntroData;
  rooms: RoomData[];
  packages: PackageData[];
  wellness: WellnessData;
  spa: SpaData;
  dine: DineData[];
  map: MapData; // Properti 'map' yang sudah kita kerjakan
}