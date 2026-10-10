"use client"

import * as React from "react"
import { HelpCircle, Phone, ArrowUpRight, ShieldCheck, Clock, FileCheck } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"

const FAQ_ITEMS = [
  {
    id: "biaya",
    question: "Berapa biaya pengurusan administrasi dan surat di Kantor Kelurahan Walian Dua?",
    answer:
      "Semua pengurusan administrasi kependudukan, surat pengantar, rekomendasi usaha, dan surat keterangan di Kantor Kelurahan Walian Dua adalah Rp 0 (GRATIS). Pemerintah Kelurahan Walian Dua berkomitmen penuh mewujudkan zona integritas bebas dari pungutan liar (pungli) dan gratifikasi.",
    badge: "Gratis Rp 0",
  },
  {
    id: "durasi",
    question: "Berapa lama estimasi waktu penyelesaian surat keterangan?",
    answer:
      "Untuk surat keterangan reguler (seperti Keterangan Domisili, SKTM, Keterangan Usaha, Keterangan Kematian/Kelahiran) membutuhkan waktu rata-rata 15 hingga 30 menit apabila berkas persyaratan lengkap dan pejabat berwenang (Lurah / Sekretaris Kelurahan) berada di tempat. Untuk permohonan yang memerlukan verifikasi lapangan atau peninjauan batas, estimasi maksimal adalah 1x24 jam kerja.",
    badge: "15-30 Menit",
  },
  {
    id: "syarat-utama",
    question: "Dokumen apa saja yang wajib dibawa saat mengurus surat?",
    answer:
      "Persyaratan mendasar yang wajib disertakan untuk seluruh layanan kelurahan adalah: (1) KTP-el pemohon asli dan fotokopi, (2) Kartu Keluarga (KK) yang memuat nama pemohon, serta (3) Surat Pengantar dari Kepala Lingkungan (Pala) Lingkungan I, II, III, IV, atau V sesuai domisili tempat tinggal Anda.",
    badge: "KTP, KK & Pala",
  },
  {
    id: "wakil",
    question: "Apakah pengurusan surat dapat diwakilkan oleh orang lain?",
    answer:
      "Pengurusan surat dapat diwakilkan oleh anggota keluarga yang tercantum dalam satu Kartu Keluarga (KK) yang sama dengan membawa KTP-el asli pemohon dan KTP-el perwakilan. Apabila diwakilkan oleh pihak di luar Kartu Keluarga, wajib melampirkan Surat Kuasa tertulis bermeterai Rp 10.000.",
    badge: "Ketentuan Kuasa",
  },
  {
    id: "pengaduan",
    question: "Bagaimana cara menyampaikan pengaduan fasilitas umum atau ketertiban warga?",
    answer:
      "Pengaduan terkait lampu jalan padam, drainase tersumbat, ketertiban lingkungan, atau layanan staf dapat disampaikan langsung secara transparan melalui layanan online 'Halo Lurah' pada website ini (terhubung via WhatsApp resmi) atau dilaporkan langsung kepada Kepala Lingkungan dan Babinsa/Bhabinkamtibmas Kelurahan Walian Dua.",
    badge: "Kanal Halo Lurah",
  },
  {
    id: "jam-kerja",
    question: "Kapan jam operasional pelayanan tatap muka di Kantor Kelurahan?",
    answer:
      "Kantor Kelurahan Walian Dua melayani masyarakat setiap hari kerja: Senin hingga Jumat, pukul 08.00 s/d 16.00 WITA. Untuk situasi darurat kependudukan atau pelaporan bencana alam di luar jam kerja, warga dapat menghubungi hotline darurat Kelurahan atau Kepala Lingkungan setempat.",
    badge: "Senin - Jumat (WITA)",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 border-b border-border bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Informasi praktis seputar tata cara birokrasi, estimasi waktu proses, ketentuan biaya, dan mekanisme penyampaian aspirasi warga di Kelurahan Walian Dua.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Highlight, Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Assistance Card */}
          <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-foreground mb-6">
                <HelpCircle className="size-5" />
              </div>

              <h3 className="text-lg font-bold tracking-tight text-foreground">
                Butuh bantuan informasi spesifik?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Staf pamong praja Kelurahan Walian Dua siap mendampingi kebutuhan administrasi Anda secara cepat dan ramah.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Jaminan pelayanan bersih tanpa pungutan liar.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-muted-foreground">
                  <Clock className="size-4 text-foreground shrink-0 mt-0.5" />
                  <span>Pelayanan cepat di loket terpadu kantor lurah.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-muted-foreground">
                  <FileCheck className="size-4 text-foreground shrink-0 mt-0.5" />
                  <span>Panduan berkas lengkap dan terstandarisasi.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <a
                href="https://wa.me/6285172340386?text=Halo%20Kelurahan%20Walian%20Dua,%20saya%20memiliki%20pertanyaan%20mengenai%20pelayanan%20kelurahan"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  size: "sm",
                  className: "w-full justify-center text-xs h-10 font-semibold gap-2 bg-foreground text-background hover:bg-foreground/90",
                })}
              >
                <Phone className="size-3.5" />
                Konsultasi via WhatsApp
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:col-span-8">
            <Accordion className="w-full divide-y divide-border rounded-2xl border border-border bg-card px-6 py-2">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="py-2 border-b-0">
                  <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                    <span className="pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                    <p>{item.answer}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center text-[10px] font-semibold text-foreground bg-muted px-2 py-0.5 rounded border border-border">
                        {item.badge}
                      </span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
