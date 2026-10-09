import * as React from "react"
import Image from "next/image"
import { Flower2, Sprout, HeartHandshake, Mountain, ArrowUpRight } from "lucide-react"
import { POTENSI_UNGGULAN } from "@/lib/data/kelurahan-data"

export function PotenciesSection() {
  const flowerItem = POTENSI_UNGGULAN.find((p) => p.category === "Florikultura") || POTENSI_UNGGULAN[0]
  const mapalusItem = POTENSI_UNGGULAN.find((p) => p.category === "Budaya & Gotong Royong") || POTENSI_UNGGULAN[2]
  const wawoItem = POTENSI_UNGGULAN.find((p) => p.category === "Pertanian") || POTENSI_UNGGULAN[1]
  const linowItem = POTENSI_UNGGULAN.find((p) => p.category === "Pariwisata") || POTENSI_UNGGULAN[3]

  return (
    <section id="potensi" className="py-16 md:py-24 border-b border-border bg-muted/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Potensi Unggulan & Kearifan Lokal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Dari keindahan bunga krisan pemasok festival dunia hingga kesuburan bukit Wawo dan kuatnya ikatan kekeluargaan Mapalus di Kota Bunga Tomohon.
          </p>
        </div>

        {/* 21st.dev Style Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Item 1: Florikultura (Featured, Span 8) */}
          <div className="lg:col-span-8 rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between group hover:border-foreground/30 transition-colors shadow-xs">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-muted">
              <Image
                src={flowerItem.image}
                alt={flowerItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60">
                  <Flower2 className="size-3.5 text-foreground" />
                  Sentra Florikultura Tomohon
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-emerald-300 block mb-1">
                  {flowerItem.highlight}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  {flowerItem.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {flowerItem.description}
              </p>

              <div className="mt-6 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1 font-medium text-foreground">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Pemasok Parade Bunga TIFF
                  </span>
                  <span>Varietas Krisan Kulo & Riri</span>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                  Kelompok Tani Bunga
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Mapalus Gotong Royong (Span 4) */}
          <div className="lg:col-span-4 rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between group hover:border-foreground/30 transition-colors shadow-xs">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={mapalusItem.image}
                alt={mapalusItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60">
                  <HeartHandshake className="size-3.5 text-foreground" />
                  Kearifan Budaya
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-emerald-300 block mb-0.5">
                  {mapalusItem.highlight}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white leading-snug">
                  {mapalusItem.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {mapalusItem.description}
              </p>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-serif italic text-foreground">Sitou Timou Tumou Tou</span>
                <span className="font-semibold text-foreground">5 Lingkungan</span>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Hortikultura Wawo (Span 6) */}
          <div className="lg:col-span-6 rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between group hover:border-foreground/30 transition-colors shadow-xs">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={wawoItem.image}
                alt={wawoItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60">
                  <Sprout className="size-3.5 text-foreground" />
                  Ketahanan Pangan
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-emerald-300 block mb-0.5">
                  {wawoItem.highlight}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {wawoItem.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {wawoItem.description}
              </p>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span>Tanah Vulkanik Subur</span>
                <span className="font-semibold text-foreground">Sayur Mayur Segar</span>
              </div>
            </div>
          </div>

          {/* Bento Item 4: Danau Linow & Geotermal (Span 6) */}
          <div className="lg:col-span-6 rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between group hover:border-foreground/30 transition-colors shadow-xs">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={linowItem.image}
                alt={linowItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60">
                  <Mountain className="size-3.5 text-foreground" />
                  Pariwisata & Lanskap
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-emerald-300 block mb-0.5">
                  {linowItem.highlight}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
                  {linowItem.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {linowItem.description}
              </p>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span>Tomohon Selatan</span>
                <span className="font-semibold text-foreground">Ekowisata Danau & Geotermal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
