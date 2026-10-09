import * as React from "react"
import Image from "next/image"
import { Navigation, Landmark, Church, School, Mountain, Activity, Award, History, Dumbbell } from "lucide-react"
import { KELURAHAN_DATA } from "@/lib/data/kelurahan-data"
import { Badge } from "@/components/ui/badge"

export function ProfileTerritory() {
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
    infrastructure
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
      name: "Sarana Ibadah: 4 Gereja",
      type: "Rumah Ibadah",
      detail: "Melayani 1.241 jemaat Kristen Protestan (termasuk GMIM Bukit Zaitun Tomohon IV) dan 368 umat Katolik dalam kerukunan penuh.",
      icon: Church,
    },
    {
      name: "Pendidikan: PAUD & PAT",
      type: "Sarana Edukasi",
      detail: "Pendidikan Anak Usia Dini (PAUD) dan Pendidikan Alkitab Tabernakel (PAT) untuk pembinaan budi pekerti generasi penerus.",
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
                <span className="text-[11px] text-muted-foreground block font-medium">Luas Wilayah Inti</span>
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

            {/* Sejarah Berdirinya Kelurahan Card */}
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="text-sm font-bold tracking-tight text-foreground mb-3 flex items-center gap-2">
                <History className="size-4 text-foreground" />
                Sejarah Berdirinya Kelurahan Walian Dua
              </h3>
              <div className="text-xs text-muted-foreground space-y-2.5 leading-relaxed">
                <p>
                  Menyusul ditetapkannya Kota Tomohon melalui <strong>UU No. 10 Tahun 2003</strong> yang disahkan Presiden R.I. Megawati Soekarnoputri pada 25 Februari 2003, wilayah Tomohon mengalami perkembangan pesat. Pemerintah Kota Tomohon di bawah Walikota pertama <strong>Bapak Jefferson S.M. Rumayar</strong> kemudian memekarkan Kelurahan Walian menjadi tiga: <em>Walian Induk</em>, <em>Walian Satu</em>, dan <em>Walian Dua</em>.
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
                    Peta Wilayah Kecamatan
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Tomohon Selatan, Kota Tomohon
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">
                  BIG Geospasial
                </Badge>
              </div>
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src="/images/peta-tomohon.png"
                  alt="Peta Pembagian Wilayah Kota Tomohon dan Tomohon Selatan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-3"
                />
              </div>
              <div className="p-4 text-xs text-muted-foreground border-t border-border/60 bg-card">
                Kelurahan Walian Dua berbatasan langsung dengan pusat aktivitas Tomohon Selatan dan wilayah penyangga perkebunan Wawo.
              </div>
            </div>

            {/* Danau Linow proximity preview */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm group">
              <div className="relative aspect-[16/9] bg-muted">
                <Image
                  src="/images/danau-linow.jpg"
                  alt="Danau Linow di Tomohon Selatan"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    Kawasan Terdekat • 5 Menit
                  </span>
                  <h4 className="text-sm font-bold">Danau Linow Tomohon Selatan</h4>
                  <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                    Danau 3 warna hydrothermal ikonik dunia di Tomohon Selatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
