import * as React from "react"
import Image from "next/image"
import { ExternalLink, ShieldCheck } from "lucide-react"
import { KELURAHAN_DATA } from "@/lib/data/kelurahan-data"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border py-12 lg:py-16 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-border">
          {/* Identity Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-11 flex items-center justify-center p-1 rounded-lg border border-border bg-muted/40">
                <Image
                  src="/images/logo-tomohon.png"
                  alt="Lambang Kota Tomohon"
                  width={36}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Pemerintah Kota Tomohon
                </span>
                <span className="text-base font-extrabold tracking-tight text-foreground">
                  Kelurahan Walian Dua
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Situs resmi pemerintahan Kelurahan Walian Dua, Kecamatan Tomohon Selatan, Kota Tomohon, Provinsi Sulawesi Utara. Diresmikan pada 29 Agustus 2008 oleh Walikota Tomohon Pertama pasca UU No. 10 Tahun 2003.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="italic font-serif">&ldquo;Sitou Timou Tumou Tou&rdquo;</span>
              <span>— Manusia hidup untuk memanusiakan sesama.</span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#beranda" className="text-muted-foreground hover:text-foreground transition-colors">
                  Beranda Utama
                </a>
              </li>
              <li>
                <a href="#pengumuman" className="text-muted-foreground hover:text-foreground transition-colors">
                  Agenda & Pengumuman
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Layanan Surat Mandiri
                </a>
              </li>
              <li>
                <a href="#profil" className="text-muted-foreground hover:text-foreground transition-colors">
                  Profil & Wilayah Administrasi
                </a>
              </li>
              <li>
                <a href="#aparatur" className="text-muted-foreground hover:text-foreground transition-colors">
                  Struktur Aparatur Kelurahan
                </a>
              </li>
              <li>
                <a href="#potensi" className="text-muted-foreground hover:text-foreground transition-colors">
                  Potensi & Florikultura
                </a>
              </li>
              <li>
                <a href="#galeri-warga" className="text-muted-foreground hover:text-foreground transition-colors">
                  Galeri Kegiatan Warga
                </a>
              </li>
            </ul>
          </div>

          {/* Public Services Fast Link */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#layanan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Surat Keterangan Usaha (SKU)
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Surat Keterangan Tidak Mampu (SKTM)
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Surat Keterangan Domisili
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pengantar KTP & Kartu Keluarga
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Keterangan Kematian & Kelahiran
                </a>
              </li>
              <li>
                <a href="#pengaduan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Aspirasi & Lapor Lurah
                </a>
              </li>
            </ul>
          </div>

          {/* External Government Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Tautan Terkait
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://tomohon.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Portal Pemkot Tomohon
                  <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://tomohonkota.bps.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  BPS Kota Tomohon
                  <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sulutprov.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pemprov Sulawesi Utara
                  <ExternalLink className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} Pemerintah Kelurahan Walian Dua, Kecamatan Tomohon Selatan, Kota Tomohon.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[11px]">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Portal Informasi Publik Resmi
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
