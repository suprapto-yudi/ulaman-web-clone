// src/types/siteTypes.ts

import React from 'react';

// === Hotspots/Map Types ===
export interface HotspotData {
  id: number;
  name: string;
  iconName: string;
  left: string; 
  top: string;
}

export interface MapData {
  headline: string;
  subheadline: string;
  hotspots: HotspotData[];
}

export interface HotspotProps {
  name: string;
  icon: React.ReactNode; 
  top: string;
  left: string;
}

// === Section Data Types ===

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

export interface ExperienceData {
  id: number;
  name: string;
  tag: string;
  imageUrl: string;
  linkHref: string;
}

export interface FacilityData {
    id: number;
    iconName: string;
    name: string;
    description: string;
}


// === Packages Types ===

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

// === Wellness Type BARU ===
// KUNCI PERBAIKAN: Interface yang sebelumnya hilang
export interface WellnessData {
  headline: string;
  text: string;
  link: string;
}

// === Spa & Dine Types ===

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


// === Testimonials Types ===
// KUNCI PERBAIKAN: Merefleksikan struktur JSON saat ini
export interface RatingData {
    platform: string; 
    rating: number;   // Di JSON: 4.8 (number)
    count: number;    // Di JSON: 295 (number)
    url: string;      
}

export interface ReviewData {
    id: number;
    author: string;
    date: string;
    title: string;
    // KUNCI PERBAIKAN: comment sesuai dengan JSON
    comment: string;  
    url: string;
}

export interface TestimonialsData {
    headline: string;
    ratings: RatingData[];
    reviews: ReviewData[];
}

// Tambahkan interface untuk Galeri
export interface GalleryImage {
    id: number;
    // KUNCI PERBAIKAN: Ganti 'imageUrl' menjadi 'src'
    src: string; 
    alt: string;
}

export interface GalleryData {
    headline: string;
    // KUNCI PERBAIKAN: Tambahkan CTA
    cta: {
        href: string;
        label: string;
    };
    images: GalleryImage[];
}

// --- Interface Utama yang Mencakup SEMUA Bagian ---
export interface SiteData {
  intro: IntroData;
  rooms: RoomData[];
  facilities: FacilityData[]; 
  experiences: ExperienceData[]; 
  packages: PackageData[];
  wellness: WellnessData; // Fix: Menghilangkan Cannot find name 'WellnessData'
  spa: SpaData;
  dine: DineData[];
  map: MapData;
  testimonials: TestimonialsData;
  gallery: GalleryData;
}