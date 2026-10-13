"use client"

import * as React from "react"
import Image from "next/image"
import { 
  Users, 
  HeartHandshake, 
  Calendar, 
  UserCheck, 
  Maximize2,
  Camera
} from "lucide-react"
import { GaleriWargaRecord } from "@/lib/db/schema"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const INITIAL_FALLBACK_GALLERY: GaleriWargaRecord[] = [
  {
    id: 11,
    title: "Posko KKT UNSRAT & KKN UNIMA di Kantor Kelurahan Walian Dua",
    category: "Pendidikan & Pengabdian Masyarakat",
    description: "Dokumentasi kebersamaan mahasiswa Kuliah Kerja Terpadu (KKT) Universitas Sam Ratulangi (UNSRAT) dan Kuliah Kerja Nyata (KKN) Universitas Negeri Manado (UNIMA) di posko Kantor Kelurahan Walian Dua bersama Lurah Marlon Jhon Taroreh, A.Md.Kep.",
    highlight: "KKT UNSRAT & KKN UNIMA • Posko Kantor Kelurahan",
    image: "/images/galeri-kkn-unsrat-unima.jpg",
    author_or_contributor: "Mahasiswa KKT/KKN & Pemerintah Kelurahan",
    date: "Posko Pengabdian Mahasiswa",
    sort_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: 6,
    title: "Kerja Bakti Mapalus: Perangkat, Linmas & Tim Ukur Kelurahan Walian Dua",
    category: "Gotong Royong Mapalus",
    description: "Aksi gotong royong terpadu pembersihan lingkungan, perapihan rumput, penataan jalan pemukiman, dan pengukuran wilayah bersama jajaran perangkat, Linmas, dan warga.",
    highlight: "Mapalus Linmas & Tim Ukur",
    image: "/images/galeri-kerja-bakti-mapalus.jpg",
    author_or_contributor: "Perangkat, Linmas & Warga",
    date: "Dokumentasi Resmi",
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: 7,
    title: "Gerakan Menanam & Kebun Pertanian Sayur Mandiri Warga",
    category: "Pertanian & Perkebunan",
    description: "Kegiatan swadaya warga bergotong royong mengolah bedeng perkebunan dan menanam daun bawang serta aneka sayuran segar demi ketahanan pangan lokal Walian Dua.",
    highlight: "Ketahanan Pangan Warga",
    image: "/images/galeri-pertanian-sayur-warga.jpg",
    author_or_contributor: "Kelompok Tani & Warga Swadaya",
    date: "Kegiatan Gotong Royong",
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: 8,
    title: "Sinergi Kerja Bersama, Bersama Bekerja untuk Walian Dua Hebat",
    category: "Pelayanan Warga",
    description: "Satu tujuan, satu semangat untuk hasil yang hebat! Komitmen jajaran aparatur pemerintah kelurahan memberikan pelayanan administrasi cepat, ramah, dan transparan.",
    highlight: "Satu Semangat • Bersama Bisa",
    image: "/images/galeri-kerja-bersama-banner.jpg",
    author_or_contributor: "Pemerintah Kelurahan Walian Dua",
    date: "Komitmen Pelayanan",
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: 4,
    title: "Kantor Kelurahan Walian Dua: Balai Pelayanan Rumah Panggung Kayu Minahasa",
    category: "Pemerintahan & Pelayanan",
    description: "Pusat pelayanan masyarakat berarsitektur tradisional rumah panggung kayu Minahasa di Lingkungan II, melayani kebutuhan persuratan dan administrasi warga.",
    highlight: "Rumah Panggung Kayu • Lingk. II",
    image: "/images/kantor-kelurahan-walian-dua.jpg",
    author_or_contributor: "Pemerintah Kelurahan Walian Dua",
    date: "Pusat Pelayanan Warga",
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: 5,
    title: "Kepemimpinan & Dedikasi Pelayanan Pamong Praja Kelurahan Walian Dua",
    category: "Pemerintahan & Pelayanan",
    description: "Lurah Walian Dua Marlon Jhon Taroreh, A.Md.Kep. bersama jajaran penggerak TP-PKK dalam memimpin pelayanan publik dan pembinaan masyarakat.",
    highlight: "Pamong Praja & TP-PKK",
    image: "/images/lurah-marlon-taroreh-full.jpg",
    author_or_contributor: "Pemerintah Kelurahan Walian Dua",
    date: "Dokumentasi Resmi",
    sort_order: 5,
    created_at: "",
    updated_at: "",
  },
]

export function CitizenGallerySection() {
  const [items, setItems] = React.useState<GaleriWargaRecord[]>(INITIAL_FALLBACK_GALLERY)
  const [activeCategory, setActiveCategory] = React.useState<string>("Semua")
  const [selectedItem, setSelectedItem] = React.useState<GaleriWargaRecord | null>(null)

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/galeri-warga")
        if (res.ok) {
          const json = await res.json()
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setItems(json.data)
          }
        }
      } catch (e) {
        console.error("Gagal memuat galeri warga dinamis:", e)
      }
    }
    loadData()
  }, [])

  const categories = React.useMemo(() => {
    const cats = new Set<string>()
    items.forEach((item) => cats.add(item.category))
    return ["Semua", ...Array.from(cats)]
  }, [items])

  const filteredItems = React.useMemo(() => {
    if (activeCategory === "Semua") return items
    return items.filter((item) => item.category === activeCategory)
  }, [items, activeCategory])

  return (
    <section id="galeri-warga" className="py-16 md:py-24 border-b border-border bg-muted/15 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Galeri Warga & Kegiatan Komunitas
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Dokumentasi autentik kebersamaan warga di 5 Lingkungan, semangat gotong royong <em>Mapalus</em>, budidaya bunga krisan, serta denyut kehidupan sosial masyarakat Kelurahan Walian Dua.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <Badge variant="outline" className="px-3 py-1.5 text-xs font-semibold gap-1.5 shadow-2xs">
              <Camera className="size-3.5 text-emerald-600" />
              <span>{filteredItems.length} Dokumentasi</span>
            </Badge>
          </div>
        </div>

        {/* Category Filter Pills (Responsive scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 min-h-[40px] ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground shadow-xs"
                  : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredItems.map((item, index) => {
            const isFeatured = index === 0
            const colSpan = isFeatured 
              ? "lg:col-span-8 md:col-span-2" 
              : index === 1 
              ? "lg:col-span-4 md:col-span-1" 
              : "lg:col-span-6 md:col-span-1"

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`${colSpan} group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between hover:border-foreground/40 transition-all duration-300 shadow-xs hover:shadow-md`}
              >
                {/* Image Frame */}
                <div className={`relative ${isFeatured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]"} overflow-hidden bg-muted`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={isFeatured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-background/95 backdrop-blur-md text-foreground border border-border/80 shadow-2xs">
                      {item.category.includes("Mapalus") ? (
                        <HeartHandshake className="size-3 text-emerald-600" />
                      ) : (
                        <Users className="size-3 text-emerald-600" />
                      )}
                      <span>{item.category}</span>
                    </span>

                    {item.highlight && (
                      <span className="hidden sm:inline-flex px-2 py-1 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  {/* Top-Right Expand Icon */}
                  <div className="absolute top-3.5 right-3.5 size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="size-3.5" />
                  </div>

                  {/* Bottom Image Headline */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h3 className={`${isFeatured ? "text-lg sm:text-xl lg:text-2xl" : "text-base sm:text-lg"} font-bold tracking-tight text-white leading-snug line-clamp-2`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="size-3.5 text-foreground shrink-0" />
                      <span className="font-medium text-foreground truncate max-w-[200px]">
                        {item.author_or_contributor || "Warga Walian Dua"}
                      </span>
                    </div>

                    {item.date && (
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span>{item.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Accessible Lightbox Modal via shadcn */}
        <Dialog
          open={Boolean(selectedItem)}
          onOpenChange={(open) => {
            if (!open) setSelectedItem(null)
          }}
        >
          <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-y-auto p-0 gap-0 overflow-hidden">
            {selectedItem && (
              <>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-muted">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="p-6 bg-card border-t border-border">
                  <DialogHeader className="gap-1 mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs font-semibold">
                        {selectedItem.category}
                      </Badge>
                      {selectedItem.highlight && (
                        <span className="text-xs text-emerald-700 font-medium">
                          • {selectedItem.highlight}
                        </span>
                      )}
                    </div>
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground text-left">
                      {selectedItem.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground leading-relaxed text-left">
                      {selectedItem.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>Kontributor: <strong className="text-foreground">{selectedItem.author_or_contributor || "Warga Walian Dua"}</strong></span>
                    {selectedItem.date && <span>Waktu: {selectedItem.date}</span>}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  )
}
