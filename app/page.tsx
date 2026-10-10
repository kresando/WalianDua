import * as React from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsStrip } from "@/components/stats-strip"
import { ServicesSection } from "@/components/services-section"
import { ProfileTerritory } from "@/components/profile-territory"
import { PotenciesSection } from "@/components/potencies-section"
import { OfficialsSection } from "@/components/officials-section"
import { CitizenGallerySection } from "@/components/citizen-gallery-section"
import { MediaGallerySection } from "@/components/media-gallery-section"
import { AnnouncementsSection } from "@/components/announcements-section"
import { FaqSection } from "@/components/faq-section"
import { HaloLurahSection } from "@/components/halo-lurah-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
      {/* Primary Fixed Navbar */}
      <Navbar />

      {/* Main Civic Page Flow */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section with scenic Tomohon panorama & direct CTAs */}
        <HeroSection />

        {/* 2. Key Figures & Demographics Strip */}
        <StatsStrip />

        {/* 3. Core Citizen Public Services & Document Requirements */}
        <ServicesSection />

        {/* 4. Geography, Boundaries, and Facilities Profile */}
        <ProfileTerritory />

        {/* 5. Potensi Unggulan & Kearifan Lokal Florikultura & Mapalus */}
        <PotenciesSection />

        {/* 6. Governance, Officials & LKK Community Bodies */}
        <OfficialsSection />

        {/* 6. Galeri Warga & Kegiatan Komunitas Walian Dua */}
        <CitizenGallerySection />

        {/* 7. Visual Media Gallery & Official Video Highlights */}
        <MediaGallerySection />

        {/* 8. Citizen Announcements & Noticeboard */}
        <AnnouncementsSection />

        {/* 9. Citizen FAQ Accordion */}
        <FaqSection />

        {/* 10. Interactive Halo Lurah WhatsApp & Office Contact */}
        <HaloLurahSection />
      </main>

      {/* Official Government Footer */}
      <Footer />
    </div>
  )
}
