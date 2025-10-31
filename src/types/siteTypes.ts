// src/types/siteTypes.ts

import React from 'react';

// === Hotspots/Map Types ===

export interface HotspotData {
  id: number;
  name: string;
  iconName: string; // Nama ikon Lucide-react
  left: string; 
  top: string;
}

export interface MapData {
  headline: string;
  subheadline: string;
  hotspots: HotspotData[];
}

// Interface untuk props visual Hotspot (digunakan di MapHotspot.tsx)
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

// Data untuk Experience Card (Spa, Dine, Events, yang menggunakan layout grid)
export interface ExperienceData {
  id: number;
  name: string;
  tag: string;
  imageUrl: string;
  linkHref: string;
}

// Data untuk Facilities (Icon + Teks)
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

export interface RatingData {
    id: string; // tripadvisor, google
    name: string;
    score: string;
    count: string;
    stars: number;
}

export interface ReviewData {
    id: number;
    author: string;
    date: string;
    title: string;
    body: string;
    rating: number;
}

export interface TestimonialsData {
    headline: string;
    ratings: RatingData[];
    reviews: ReviewData[];
}


// --- Interface Utama yang Mencakup SEMUA Bagian ---
// Inilah yang HARUS diimpor sebagai tipe untuk data/siteData.json
export interface SiteData {
  intro: IntroData;
  rooms: RoomData[];
  facilities: FacilityData[]; // Tambahan facilities
  experiences: ExperienceData[]; // Tambahan experiences
  packages: PackageData[];
  spa: SpaData;
  dine: DineData[];
  map: MapData;
  testimonials: TestimonialsData; // Tambahan testimonials
  // Tidak ada 'wellness' karena kita pakai 'spa' dan 'experiences'
}