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
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-[-0.03em] text-foreground leading-[1.15] sm:leading-[1.08] text-balance"
            >
              Harmonis, Berdaya, dan Transparan di Kelurahan Walian Dua
            </motion.h1>

            {/* Cultural Narrative Subheading */}
            <motion.p
              variants={FADE_UP}
              className="mt-4 sm:mt-6 text-xs sm:text-base lg:text-lg text-zinc-600 leading-relaxed max-w-xl"
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
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <a
                href="#layanan"
                className="inline-flex items-center justify-center h-11 sm:h-12 px-6 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all gap-2 shadow-sm group text-center"
              >
                <span>Lihat Layanan Surat Warga</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#profil"
                className="inline-flex items-center justify-center h-11 sm:h-12 px-6 rounded-xl border border-border bg-card text-foreground text-xs sm:text-sm font-medium hover:bg-secondary/60 hover:text-secondary-foreground active:scale-[0.98] transition-all shadow-2xs text-center"
              >
                Profil Wilayah & Potensi
              </a>
            </motion.div>

            {/* Typographic Civic Metrics Strip (3 Symmetrical Columns, No Collision on 320px) */}
            <motion.div
              variants={FADE_UP}
              className="mt-8 sm:mt-12 pt-6 sm:pt-7 border-t border-border/80 grid grid-cols-3 gap-2 sm:gap-6 divide-x divide-border/80"
            >
              {/* Metric 1 */}
              <div className="pr-1.5 sm:pr-6 group/metric min-w-0 overflow-hidden">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground tabular-nums">
                    Rp 0
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Gratis
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1 leading-snug">
                  Layanan Bebas Biaya
                </div>
              </div>

              {/* Metric 2 */}
              <div className="px-1.5 sm:px-6 group/metric min-w-0 overflow-hidden">
                <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  <span className="tabular-nums">5 </span>
                  <span className="text-xs sm:text-2xl lg:text-3xl font-bold block sm:inline">
                    Lingkungan
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1 leading-snug">
                  Kearifan Mapalus
                </div>
              </div>

              {/* Metric 3 */}
              <div className="pl-1.5 sm:pl-6 group/metric min-w-0 overflow-hidden">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground tabular-nums">
                    100%
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    Lunas
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1 leading-snug">
                  Realisasi PBB-P2
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
