"use client"

import * as React from "react"
import Image from "next/image"
import { UserCheck, Shield, CheckCircle2 } from "lucide-react"
import { APARATUR_KELURAHAN } from "@/lib/data/kelurahan-data"
import { Badge } from "@/components/ui/badge"

export function OfficialsSection() {
  const [list, setList] = React.useState(APARATUR_KELURAHAN)

  React.useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/aparatur")
        if (res.ok) {
          const json = await res.json()
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setList(json.data)
          }
        }
      } catch (e) {
        console.error("Gagal sinkron data aparatur:", e)
      }
    }
    load()
  }, [])

  const lurah = list[0] || APARATUR_KELURAHAN[0]
  const staff = list.slice(1)

  return (
    <section id="aparatur" className="py-16 md:py-24 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Aparatur & Pamong Kelurahan Walian Dua
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Penyelenggara administrasi pemerintahan dan pelayanan kemasyarakatan yang berdedikasi menjaga ketertiban, transparansi, serta kerukunan di 5 Lingkungan.
          </p>
        </div>

        {/* Lurah Featured Message Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Lurah Avatar / Profile badge */}
            <div className="flex flex-col items-center md:items-start shrink-0">
              <div className="relative size-24 sm:size-28 md:size-32 rounded-2xl border-2 border-border overflow-hidden bg-muted shadow-sm ring-1 ring-border/50">
                {lurah.avatar ? (
                  <Image
                    src={lurah.avatar}
                    alt={lurah.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <div className="size-full flex items-center justify-center text-foreground font-bold text-2xl shadow-inner">
                    <UserCheck className="size-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <Badge className="mt-3 text-[10px] uppercase font-bold tracking-wider bg-foreground text-background">
                Lurah Definitif
              </Badge>
            </div>

            {/* Lurah Details & Commitment */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {lurah.name}
                </h3>
                {lurah.rank && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border/80">
                    {lurah.rank}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground font-semibold block mt-0.5">
                {lurah.role} • Pemerintah Kota Tomohon {lurah.nip && `(NIP. ${lurah.nip})`}
              </span>

              <div className="mt-4 p-4 rounded-xl border border-border/60 bg-muted/20 text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;Komitmen kami di Kelurahan Walian Dua adalah memastikan setiap warga mendapatkan pelayanan administrasi yang cepat, ramah, dan tanpa beban biaya. Bersama Kepala Lingkungan (Pala) dan seluruh elemen masyarakat, mari kita pelihara semangat gotong royong Mapalus demi kemajuan bersama.&rdquo;
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Pelayanan Berorientasi Warga</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Transparansi Dana Kelurahan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Sinergi 5 Lingkungan (Pala & Maweteng)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Perangkat & Seksi Kelurahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((person) => (
            <div
              key={person.name}
              className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between hover:border-foreground/30 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {person.title}
                  </span>
                  {person.rank && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {person.rank}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 mt-1 mb-2">
                  {person.avatar && (
                    <div className="relative size-11 rounded-xl border border-border bg-muted overflow-hidden shrink-0">
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-foreground">
                      {person.name}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {person.role}
                    </p>
                  </div>
                </div>
                {person.nip && (
                  <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    NIP. {person.nip}
                  </p>
                )}
                {person.staff && (
                  <p className="text-[11px] text-zinc-600 font-medium mt-1">
                    Didampingi: {person.staff}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  {person.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Shield className="size-3 text-muted-foreground" />
                <span>{person.unit || "Perangkat Kelurahan"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lembaga Kemasyarakatan Kelurahan (LKK) Strip */}
        <div className="mt-12 p-6 rounded-xl border border-border bg-muted/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
            Lembaga Kemasyarakatan Kelurahan (LKK) Walian Dua
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-lg border border-border/60 bg-card">
              <span className="font-bold text-foreground block">TP-PKK</span>
              <span className="text-muted-foreground text-[11px]">Pemberdayaan Kesejahteraan Keluarga & Dasawisma</span>
            </div>
            <div className="p-3 rounded-lg border border-border/60 bg-card">
              <span className="font-bold text-foreground block">Karang Taruna</span>
              <span className="text-muted-foreground text-[11px]">Kepemudaan, Olahraga & Bakti Lingkungan</span>
            </div>
            <div className="p-3 rounded-lg border border-border/60 bg-card">
              <span className="font-bold text-foreground block">KDKMP</span>
              <span className="text-muted-foreground text-[11px]">Koperasi Desa Kelurahan Merah Putih</span>
            </div>
            <div className="p-3 rounded-lg border border-border/60 bg-card">
              <span className="font-bold text-foreground block">Linmas</span>
              <span className="text-muted-foreground text-[11px]">Satuan Perlindungan & Ketertiban Masyarakat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
