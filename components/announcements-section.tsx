import { Calendar, CheckCircle2, AlertTriangle, Award, HeartPulse } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ANNOUNCEMENTS = [
  {
    id: "1",
    tag: "Kesiapsiagaan & Lingkungan",
    badgeVariant: "default" as const,
    title: "Kerja Bakti Mapalus: Pembersihan Drainase & Normalisasi Saluran Wawo",
    date: "Sabtu Pekan Berjalan • 07:30 WITA",
    summary:
      "Mengantisipasi curah hujan tinggi di lereng perbukitan, seluruh warga bersama Kepala Lingkungan (Pala I s/d V) dihimbau berpartisipasi dalam kerja bakti gotong royong pembersihan saluran air.",
    priority: "Penting",
    icon: AlertTriangle,
  },
  {
    id: "2",
    tag: "Kesehatan Warga",
    badgeVariant: "secondary" as const,
    title: "Jadwal Posyandu Siklus Hidup (ILP) Balita, Remaja & Lansia Walian Dua",
    date: "Rabu Pekan Ke-2 Setiap Bulan",
    summary:
      "Pelayanan penimbangan balita, imunisasi dasar lengkap, pemeriksaan gula darah serta tensi gratis bagi lansia bertempat di Balai Pertemuan Lingkungan II.",
    priority: "Rutin",
    icon: HeartPulse,
  },
  {
    id: "3",
    tag: "Prestasi & Perpajakan",
    badgeVariant: "outline" as const,
    title: "Capaian 100% Lunas Pelunasan PBB-P2 Kelurahan Walian Dua",
    date: "Realisasi Penuh Rp 52.373.581",
    summary:
      "Pemerintah Kelurahan Walian Dua menyampaikan apresiasi mendalam kepada seluruh wajib pajak di 5 Lingkungan atas capaian realisasi penerimaan PBB-P2 sebesar 100% (Rp 52.373.581 lunas) tepat waktu.",
    priority: "Prestasi 100%",
    icon: Award,
  },
]

export function AnnouncementsSection() {
  return (
    <section id="pengumuman" className="py-16 md:py-24 border-b border-border bg-muted/10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Agenda & Pengumuman Warga
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Informasi terkini kegiatan sosial, jadwal layanan kesehatan terpadu, dan himbauan ketentraman masyarakat Kelurahan Walian Dua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ANNOUNCEMENTS.map((item) => {
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-foreground/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                      {item.tag}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] font-bold">
                      {item.priority}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3.5 shrink-0" />
                    <span>{item.date}</span>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                  <CheckCircle2 className="size-3.5 shrink-0" />
                  <span>Dikoordinasikan oleh Perangkat Kelurahan</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
