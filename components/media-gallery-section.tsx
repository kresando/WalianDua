"use client"

import * as React from "react"
import Image from "next/image"
import { 
  Camera, 
  Video, 
  ExternalLink, 
  Maximize2, 
  Play
} from "lucide-react"
import { ASSET_CATALOGUE, VIDEO_REFERENCES, MediaAsset } from "@/lib/data/kelurahan-data"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export function MediaGallerySection() {
  const [activeTab, setActiveTab] = React.useState<"photos" | "videos">("photos")
  const [selectedPhoto, setSelectedPhoto] = React.useState<MediaAsset | null>(null)

  const photos = ASSET_CATALOGUE.filter((a) => a.type === "image" || a.type === "map")

  return (
    <section id="galeri" className="py-16 md:py-24 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Galeri Visual & Video Dokumentasi
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Koleksi aset visual autentik lanskap alam, peta wilayah, florikultura bunga khas Tomohon, serta liputan video resmi daerah.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-muted/40 self-start md:self-end">
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${
                activeTab === "photos"
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Camera className="size-3.5" />
              Foto Wilayah ({photos.length})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all min-h-[38px] ${
                activeTab === "videos"
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Video className="size-3.5" />
              Video Daerah ({VIDEO_REFERENCES.length})
            </button>
          </div>
        </div>

        {/* Tab Content: Photos */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/40 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="size-9 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-lg">
                        <Maximize2 className="size-4" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 text-[10px] text-muted-foreground border-t border-border/40 flex items-center justify-between">
                  <span>Klik untuk perbesar</span>
                  <span className="truncate max-w-[140px] text-right font-mono">
                    {item.credit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Videos */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_REFERENCES.map((video, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Video Mockup Header */}
                  <div className="relative aspect-[16/9] bg-neutral-900 flex items-center justify-center text-white overflow-hidden group">
                    <Image
                      src={idx === 0 ? "/images/danau-linow.jpg" : idx === 1 ? "/images/bunga-tomohon.jpg" : "/images/tomohon-overview.jpg"}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <a
                      href="https://www.youtube.com/results?search_query=Kota+Tomohon+TIFF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 size-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110"
                      aria-label={`Tonton video ${video.title} di YouTube`}
                    >
                      <Play className="size-5 fill-white ml-0.5" />
                    </a>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      {video.channel}
                    </span>
                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {video.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {video.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-[10px] font-medium"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href="https://www.youtube.com/results?search_query=Tomohon+Sulawesi+Utara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "w-full text-xs h-9 gap-1.5 justify-center",
                    })}
                  >
                    <ExternalLink className="size-3.5" />
                    Tonton di YouTube Resmi
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Lightbox Modal via shadcn */}
      <Dialog
        open={Boolean(selectedPhoto)}
        onOpenChange={(open) => {
          if (!open) setSelectedPhoto(null)
        }}
      >
        <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-y-auto p-0 gap-0 overflow-hidden">
          {selectedPhoto && (
            <>
              <div className="relative aspect-[16/10] w-full bg-black/90">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-card border-t border-border">
                <DialogHeader className="gap-1 mb-2">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <Badge variant="outline" className="text-[11px] font-bold uppercase tracking-wider">
                      {selectedPhoto.category}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {selectedPhoto.credit}
                    </span>
                  </div>
                  <DialogTitle className="text-lg sm:text-xl font-bold text-foreground text-left">
                    {selectedPhoto.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-left">
                    {selectedPhoto.caption}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
