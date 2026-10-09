"use client"

import * as React from "react"
import Image from "next/image"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
}

const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[85vh] flex items-center pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-border bg-background scroll-mt-24"
    >
      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Clean Editorial Narrative & Typographic Metrics            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Display Headline without eyebrow/kicker ban */}
            <motion.h1
              variants={FADE_UP}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-foreground leading-[1.08] text-balance"
            >
              Harmonis, Berdaya, dan Transparan di Kelurahan Walian Dua
            </motion.h1>

            {/* Cultural Narrative Subheading */}
            <motion.p
              variants={FADE_UP}
              className="mt-6 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl"
            >
              Berlandaskan falsafah luhur Minahasa{" "}
              <strong className="text-foreground font-semibold italic">
                &ldquo;Sitou Timou Tumou Tou&rdquo;
              </strong>{" "}
              dan tradisi gotong royong{" "}
              <strong className="text-foreground font-semibold">Mapalus</strong>. Kami
              berdedikasi mewujudkan pelayanan administrasi mandiri yang cepat,
              terbuka, dan bebas pungutan liar bagi seluruh masyarakat di 5 Lingkungan
              Walian Dua, Kecamatan Tomohon Selatan.
            </motion.p>

            {/* Call To Action Buttons (Standard, Sharp, Purposeful) */}
            <motion.div
              variants={FADE_UP}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#layanan"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-zinc-950 text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 active:scale-[0.98] transition-all gap-2 shadow-xs group"
              >
                <span>Lihat Layanan Surat Warga</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#profil"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm font-medium hover:bg-muted/60 active:scale-[0.98] transition-all shadow-2xs"
              >
                Profil Wilayah & Potensi
              </a>
            </motion.div>

            {/* Typographic Civic Metrics Strip (3 Symmetrical Columns, No Wrap) */}
            <motion.div
              variants={FADE_UP}
              className="mt-12 pt-7 border-t border-border/80 grid grid-cols-3 gap-3 sm:gap-6 divide-x divide-border/80"
            >
              <div className="pr-3 sm:pr-6 group/metric">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground tabular-nums whitespace-nowrap">
                  Rp 0
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-1 leading-snug whitespace-nowrap">
                  Layanan Bebas Biaya
                </div>
              </div>

              <div className="px-3 sm:px-6 group/metric">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground whitespace-nowrap">
                  5 Lingkungan
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-1 leading-snug whitespace-nowrap">
                  Kearifan Mapalus
                </div>
              </div>

              <div className="pl-3 sm:pl-6 group/metric">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground tabular-nums whitespace-nowrap">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-1 leading-snug whitespace-nowrap">
                  Realisasi PBB-P2 (Lunas)
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Architectural Passe-Partout Frame (Awwwards Grade)         */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <figure className="w-full max-w-[340px] sm:max-w-[370px] lg:max-w-[390px] group">
              <div className="relative p-3 sm:p-3.5 bg-card rounded-3xl border border-border shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] ring-1 ring-foreground/5 transition-all duration-500 group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)]">
                {/* Photo Frame Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/40 border border-border/80">
                  <Image
                    src="/images/kantor-kelurahan-walian-dua.jpg"
                    alt="Kantor Kelurahan Walian Dua - Rumah Panggung Kayu Tradisional Minahasa"
                    fill
                    priority
                    sizes="(max-width: 640px) 340px, 390px"
                    className="object-cover object-[50%_60%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Minimalist Top Location Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-zinc-950/75 backdrop-blur-md text-[10px] font-semibold text-white tracking-wider uppercase shadow-xs">
                    Walian Dua &bull; 910 mdpl
                  </div>
                </div>

                {/* Frame Bottom Legend / Caption */}
                <div className="mt-3 px-1.5 pb-0.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-foreground tracking-tight">Kantor Kelurahan Walian Dua</p>
                    <p className="text-[11px] text-muted-foreground">Rumah Panggung Kayu Minahasa</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Pelayanan Aktif
                    </span>
                  </div>
                </div>
              </div>
            </figure>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
