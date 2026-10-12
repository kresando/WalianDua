"use client"

import * as React from "react"
import Image from "next/image"
import { 
  Navigation, 
  Landmark, 
  Church, 
  School, 
  Mountain, 
  Activity, 
  Award, 
  History, 
  Dumbbell, 
  Users, 
  ExternalLink,
  ZoomIn,
  Download,
  Maximize2
} from "lucide-react"
import { KELURAHAN_DATA } from "@/lib/data/kelurahan-data"
import { Badge } from "@/components/ui/badge"
import { InteractiveMapModal } from "@/components/interactive-map-modal"

export function ProfileTerritory() {
  const [isMapOpen, setIsMapOpen] = React.useState(false)

  const { 
    legalBasis, 
    kemendagriCode, 
    postalCode, 
    areaM2Text, 
    altitudeMeters, 
    distanceToCamatKm, 
    distanceEnvironmentToOfficeKm,
    travelTimeToOfficeMinutes,
    inaugurationDate,
    inauguratedBy,
    firstLurah,
    facilities,
    infrastructure,
    population
  } = KELURAHAN_DATA

  const BOUNDARIES = [
    { direction: "Sebelah Utara", border: "Kelurahan Walian & Kecamatan Tomohon Tengah" },
    { direction: "Sebelah Timur", border: "Perbukitan Wawo / Kawasan Danau Pangolombian" },
    { direction: "Sebelah Selatan", border: "Kelurahan Walian Satu & Kelurahan Lansot" },
    { direction: "Sebelah Barat", border: "Kecamatan Tomohon Barat / Lereng Kaki Gunung Lokon" },
  ]

  const PUBLIC_FACILITIES = [
    {
      name: "Kantor Kelurahan Walian Dua",
      type: "Pusat Pemerintahan",
      detail: "Rumah panggung kayu tradisional Minahasa, Jl. Kolongan - Walian, Lingkungan II. Pelayanan Senin-Jumat 08:00 - 16:00 WITA.",
      icon: Landmark,
    },
    {
      name: "Sarana Ibadah: 4 Gereja Resmi",
      type: "Rumah Ibadah",
      detail: "GMIM Bukit Zaitun Walian Dua, GPdI Ekklesia Walian Dua, GKMI Gloria, dan Gereja YHS Bukit Hermon yang tersebar di wilayah lingkungan.",
      icon: Church,
    },
    {
      name: "Pendidikan: TK GMIM Bukit Zaitun & PAUD",
      type: "Sarana Edukasi",
      detail: "TK GMIM Bukit Zaitun Walian Dua dan PAUD untuk pembinaan pendidikan usia dini dan budi pekerti generasi penerus.",
      icon: School,
    },
    {
      name: "Kesehatan: 1 Pustu & 1 Posyandu",
      type: "Layanan Medis Warga",
      detail: "Puskesmas Pembantu (Pustu) dan Posyandu Siklus Hidup terpadu untuk pemeriksaan balita, remaja, dan lansia.",
      icon: Activity,
    },
    {
      name: "Olahraga: 1 Lap. Bulutangkis & 2 Lap. Voli",
      type: "Fasilitas Olahraga",
      detail: "Sarana kebugaran jasmani pemuda dan warga yang tersebar di lingkungan pemukiman kelurahan.",
      icon: Dumbbell,
    },
    {
      name: "Kawasan Hortikultura & Perkebunan Wawo",
      type: "Sentra Pertanian",
      detail: "Hamparan perkebunan vulkanik subur penghasil aneka sayur mayur segar serta budidaya bunga krisan potong khas Tomohon.",
      icon: Mountain,
    },
  ]

  return (
    <section id="profil" className="py-16 md:py-24 border-b border-border bg-muted/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Profil Geografis & Sejarah Kelurahan Walian Dua
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Berdiri secara historis melalui pemekaran kelurahan di Kota Tomohon pasca pengesahan <strong className="text-foreground font-semibold">UU No. 10 Tahun 2003</strong>. Berada di kawasan pegunungan sejuk Tomohon Selatan dengan tradisi agraris dan gotong royong yang kokoh.
          </p>
        </div>

        {/* Grid Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Data Wilayah & Batas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Fact Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border border-border bg-card">
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Wilayah Administrasi</span>
                <span className="text-sm font-bold text-foreground">5 Lingkungan</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Kode Kemendagri</span>
                <span className="text-sm font-bold text-foreground font-mono tabular-nums">{kemendagriCode}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Kode Pos</span>
                <span className="text-sm font-bold text-foreground font-mono tabular-nums">{postalCode}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Luas Wilayah</span>
                <span className="text-xs font-bold text-foreground">{areaM2Text}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Ketinggian Tempat</span>
                <span className="text-sm font-bold text-foreground tabular-nums">{altitudeMeters}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Rentang Kendali Warga</span>
                <span className="text-sm font-bold text-foreground tabular-nums">± {distanceEnvironmentToOfficeKm} km ({travelTimeToOfficeMinutes} Menit)</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Ke Kantor Camat</span>
                <span className="text-sm font-bold text-foreground tabular-nums">± {distanceToCamatKm} km</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[11px] text-muted-foreground block font-medium">Panjang Jalan Aspal</span>
                <span className="text-sm font-bold text-foreground tabular-nums">22.589,75 m²</span>
              </div>
            </div>

            {/* Demografi Penduduk Resmi (DKB Semester 2) Card */}
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Users className="size-4 text-foreground" />
                  Demografi Penduduk Resmi (Data DKB Semester 2)
                </h3>
                <Badge variant="outline" className="text-[10px] font-semibold text-emerald-600 border-emerald-500/30 bg-emerald-500/10">
                  Data Terverifikasi
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-muted/40">
                  <span className="text-[11px] text-muted-foreground block font-medium">Total Penduduk</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-extrabold text-foreground tabular-nums">{population.total.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-muted-foreground font-semibold">Jiwa</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/40">
                  <span className="text-[11px] text-muted-foreground block font-medium">Laki-Laki</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-extrabold text-foreground tabular-nums">{population.male.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-muted-foreground font-semibold">Jiwa</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/40">
                  <span className="text-[11px] text-muted-foreground block font-medium">Perempuan</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-extrabold text-foreground tabular-nums">{population.female.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-muted-foreground font-semibold">Jiwa</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/40">
                  <span className="text-[11px] text-muted-foreground block font-medium">Kepala Keluarga</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-extrabold text-foreground tabular-nums">{population.households.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-muted-foreground font-semibold">KK</span>
                  </div>
                </div>
              </div>

              {/* Sebaran per Lingkungan */}
              <div className="pt-3 border-t border-border/60">
                <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
                  Distribusi Penduduk per Lingkungan:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  {population.neighborhoodDistribution?.map((dist) => (
                    <div key={dist.name} className="p-2 rounded-lg bg-muted/20 border border-border/40 text-center">
                      <span className="text-[10px] text-muted-foreground block font-medium">{dist.name}</span>
                      <strong className="text-xs text-foreground tabular-nums mt-0.5 block">{dist.total} Jiwa</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Komposisi Usia Penduduk Riil */}
              <div className="pt-3 border-t border-border/60">
                <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
                  Komposisi Kelompok Usia Penduduk (DKB):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Balita (&lt; 3 - 6 Thn)</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">125 Jiwa</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Usia Sekolah (7 - 18 Thn)</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">350 Jiwa</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Usia Produktif (19 - 59 Thn)</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">1.153 Jiwa</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Lansia (&ge; 60 Thn)</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">180 Jiwa</strong>
                  </div>
                </div>
              </div>

              {/* Komposisi Pendidikan Terakhir Riil */}
              <div className="pt-3 border-t border-border/60">
                <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
                  Komposisi Pendidikan Terakhir Warga:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Tamat SD / Sederajat</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">152 Jiwa</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Tamat SLTP / SMP</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">261 Jiwa</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Tamat SLTA / SMA/SMK</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">687 Jiwa</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/20 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block font-medium">Perguruan Tinggi (D1-S3)</span>
                    <strong className="text-xs text-foreground tabular-nums block mt-0.5">324 Jiwa</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Sejarah Berdirinya Kelurahan Card */}
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-sm font-bold tracking-tight text-foreground mb-3 flex items-center gap-2">
                <History className="size-4 text-foreground" />
                Sejarah Berdirinya Kelurahan Walian Dua
              </h3>
              <div className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
                <p>
                  Menyusul ditetapkannya Kota Tomohon melalui <strong>UU No. 10 Tahun 2003</strong> yang disahkan Presiden R.I. Megawati Soekarnoputri pada 25 Februari 2003, wilayah Tomohon mengalami perkembangan pesat. Pemerintah Kota Tomohon di bawah Walikota pertama <strong>Bapak Jefferson S.M. Rumajar</strong> kemudian memekarkan Kelurahan Walian menjadi tiga: <em>Walian Induk</em>, <em>Walian Satu</em>, dan <em>Walian Dua</em>.
                </p>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Tanggal Pengesahan Resmi:</span>
                    <strong className="text-foreground">{inaugurationDate}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Diresmikan Oleh:</span>
                    <strong className="text-foreground">{inauguratedBy}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Lurah Pertama:</span>
                    <strong className="text-foreground">{firstLurah}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Boundaries Table */}
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-sm font-bold tracking-tight text-foreground mb-3 flex items-center gap-2">
                <Navigation className="size-4 text-foreground" />
                Batas-Batas Wilayah Kelurahan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BOUNDARIES.map((item) => (
                  <div key={item.direction} className="p-3 rounded-lg border border-border/50 bg-muted/20 text-xs">
                    <span className="font-semibold text-foreground block mb-0.5">{item.direction}</span>
                    <span className="text-muted-foreground leading-snug">{item.border}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Facilities */}
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-sm font-bold tracking-tight text-foreground mb-3 flex items-center gap-2">
                <Landmark className="size-4 text-foreground" />
                Fasilitas Publik & Kelembagaan di Walian Dua
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PUBLIC_FACILITIES.map((facility) => {
                  const Icon = facility.icon
                  return (
                    <div key={facility.name} className="flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-muted/10">
                      <div className="p-2 rounded-md bg-muted text-foreground shrink-0 mt-0.5">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">{facility.name}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium px-1.5 py-0.2 rounded bg-muted/60 inline-block my-1">
                          {facility.type}
                        </span>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {facility.detail}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Peta Administrasi & Visual Kawasan */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Peta Administrasi Kelurahan Walian Dua
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Skala 1:2.000 • KKT-149 Unsrat 2026 & Pemkot Tomohon
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300">
                  Resmi 5 Lingkungan
                </Badge>
              </div>
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                aria-label="Buka peta administrasi interaktif resolusi tinggi"
                className="relative aspect-[4/3] bg-muted/30 w-full block group overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  src="/images/peta-walian-dua-web.webp"
                  alt="Peta Administrasi Kelurahan Walian Dua Kecamatan Tomohon Selatan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xs text-white text-xs font-semibold shadow-md">
                    <ZoomIn className="size-3.5" />
                    Perbesar Peta Interaktif
                  </span>
                </div>
              </button>

              <InteractiveMapModal 
                open={isMapOpen} 
                onOpenChange={setIsMapOpen} 
              />

              <div className="p-4 text-xs text-muted-foreground border-t border-border/60 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Memuat batas resmi Lingkungan 1–5, jaringan jalan, kantor kelurahan, puskesmas pembantu, dan sarana ibadah.</span>
                <a
                  href="/images/peta-walian-dua.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary shrink-0 text-xs mt-1 sm:mt-0 transition-colors"
                >
                  <span>Buka Peta HD (4K)</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Narwastu Hills proximity preview */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm flex flex-col">
              <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Kawasan Wisata Terdekat
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Narwastu Hills Resort • Puncak Wawo
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 shrink-0">
                  ± 8–10 Menit (4,2 km)
                </Badge>
              </div>

              <a
                href="https://www.google.com/maps/place/Narwastu+Hills+Resort/@1.302137,124.847342,17z"
                target="_blank"
                rel="noopener noreferrer"
                title="Buka rute Narwastu Hills Resort di Google Maps"
                className="relative aspect-[4/3] bg-muted/30 w-full block group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  src="/images/narwastu-hills.jpg"
                  alt="Destinasi Wisata Narwastu Hills Resort Puncak Wawo Tomohon dengan panorama Gunung Lokon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  style={{ objectPosition: "center 70%" }}
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xs text-white text-xs font-semibold shadow-md">
                    <ExternalLink className="size-3.5" />
                    Buka di Google Maps
                  </span>
                </div>
              </a>

              <div className="p-4 text-xs text-muted-foreground border-t border-border/60 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="leading-relaxed">
                  Destinasi panorama alam Gunung Lokon & lembah Kota Tomohon di perbukitan timur Walian Dua.
                </p>
                <a
                  href="https://www.google.com/maps/place/Narwastu+Hills+Resort/@1.302137,124.847342,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary shrink-0 text-xs transition-colors py-1 px-2 rounded-md hover:bg-muted"
                >
                  <span>Petunjuk Rute</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
