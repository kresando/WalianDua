"use client"

import * as React from "react"
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle,
  Phone
} from "lucide-react"
import { LAYANAN_PUBLIK, PublicService } from "@/lib/data/kelurahan-data"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const CATEGORIES = [
  { id: "all", label: "Semua Layanan" },
  { id: "kependudukan", label: "Kependudukan" },
  { id: "usaha", label: "Usaha / UMKM" },
  { id: "sosial", label: "Sosial & Bantuan" },
  { id: "pertanahan", label: "Pertanahan" },
]

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [activeService, setActiveService] = React.useState<PublicService | null>(null)

  const filteredServices = React.useMemo(() => {
    return LAYANAN_PUBLIK.filter((service) => {
      return selectedCategory === "all" || service.category === selectedCategory
    })
  }, [selectedCategory])

  return (
    <section id="layanan" className="py-16 md:py-24 border-b border-border bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Pengurusan Surat & Administrasi Warga
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Panduan lengkap berkas persyaratan dan alur pengurusan surat keterangan resmi dari Pemerintah Kelurahan Walian Dua.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/60 self-start md:self-end">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Komitmen Bebas Pungutan</p>
              <p>Seluruh legalisasi surat di kantor lurah tidak dipungut biaya apapun (Rp 0).</p>
            </div>
          </div>
        </div>

        {/* Categories Filter Tabs (Responsive Horizontal Scroll on Mobile) */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? LAYANAN_PUBLIK.length
                : LAYANAN_PUBLIK.filter((s) => s.category === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 active:scale-[0.98] flex items-center gap-1.5 shrink-0 min-h-[40px] ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "bg-card text-muted-foreground border border-border/80 hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] tabular-nums ${
                    selectedCategory === cat.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted-foreground/15 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Services Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200/90 bg-card hover:border-zinc-300 hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  <div className="mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                      {service.category}
                    </Badge>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted-foreground">
                    {service.requirements.length} Dokumen Syarat
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveService(service)}
                    className="text-xs font-semibold h-9 gap-1"
                  >
                    Lihat Syarat & Alur
                    <ArrowRight className="size-3" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center border border-dashed border-border rounded-xl p-8">
              <HelpCircle className="size-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-base font-semibold text-foreground">
                Tidak ada layanan pada kategori ini
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Silakan pilih kategori lain atau hubungi kantor kelurahan untuk informasi lebih lanjut.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="mt-4 text-xs"
              >
                Tampilkan Semua Layanan
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Accessible Detail Dialog via shadcn */}
      <Dialog
        open={Boolean(activeService)}
        onOpenChange={(open) => {
          if (!open) setActiveService(null)
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {activeService && (
            <>
              <DialogHeader>
                <div className="mb-1">
                  <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                    {activeService.category}
                  </Badge>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground text-left">
                  {activeService.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-left">
                  {activeService.description}
                </DialogDescription>
              </DialogHeader>

              {/* Requirements Checklist */}
              <div className="mt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Dokumen Persyaratan yang Harus Disiapkan
                </h4>
                <ul className="space-y-2">
                  {activeService.requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/50 bg-card text-xs text-foreground"
                    >
                      <span className="size-4 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] text-muted-foreground shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Workflow Steps */}
              <div className="mt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                  <FileText className="size-4 text-foreground" />
                  Tahapan Pengurusan Berkas
                </h4>
                <div className="space-y-2">
                  {activeService.flow.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-muted/20 text-xs text-muted-foreground"
                    >
                      <span className="size-5 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed text-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="mt-4 flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2">
                <p className="text-[11px] text-muted-foreground text-center sm:text-left">
                  Butuh panduan lebih lanjut? Petugas kelurahan siap membantu.
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveService(null)}
                    className="flex-1 sm:flex-none text-xs h-9"
                  >
                    Tutup
                  </Button>
                  <a
                    href={`https://wa.me/6285172340386?text=Halo%20Kelurahan%20Walian%20Dua,%20saya%20ingin%20berkonsultasi%20mengenai%20syarat%20${encodeURIComponent(
                      activeService.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      size: "sm",
                      className:
                        "flex-1 sm:flex-none text-xs h-9 gap-1.5 bg-foreground text-background hover:bg-foreground/90 font-semibold",
                    })}
                  >
                    <Phone className="size-3.5" />
                    Tanya Petugas
                  </a>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
