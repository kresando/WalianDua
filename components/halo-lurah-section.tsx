"use client"

import * as React from "react"
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2
} from "lucide-react"
import { KELURAHAN_DATA } from "@/lib/data/kelurahan-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect } from "@/components/ui/native-select"

export function HaloLurahSection() {
  const { contact } = KELURAHAN_DATA

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    neighborhood: "Lingkungan I",
    category: "Layanan Dokumen",
    message: "",
  })
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.message.trim()) return

    // Save report to Supabase backend API
    fetch("/api/admin/pengaduan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).catch((err) => console.error("Error saving aduan to DB:", err))

    // Construct direct WhatsApp message
    const waText = encodeURIComponent(
      `*Laporan / Aspirasi Warga Walian Dua*\n` +
      `Nama: ${formData.name}\n` +
      `No. Kontak: ${formData.phone || "-"}\n` +
      `Wilayah: ${formData.neighborhood}\n` +
      `Kategori: ${formData.category}\n` +
      `Isi Laporan: ${formData.message}`
    )

    // Open WhatsApp in new tab
    window.open(`https://wa.me/6281244556677?text=${waText}`, "_blank")
    setSubmitted(true)
  }

  return (
    <section id="pengaduan" className="py-16 md:py-24 border-b border-border bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Halo Lurah & Kontak Pelayanan
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Masyarakat dapat menyampaikan aduan, usulan pemeliharaan lingkungan, atau pertanyaan seputar pelayanan administrasi secara langsung dan transparan.
            </p>

            {/* Office Info Cards */}
            <div className="mt-8 space-y-3.5">
              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3.5">
                <MapPin className="size-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-foreground block">
                    Alamat Kantor Kelurahan
                  </strong>
                  <span className="text-xs text-muted-foreground leading-relaxed mt-0.5 block">
                    {contact.address}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3.5">
                <Clock className="size-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-foreground block">
                    Waktu Jam Pelayanan
                  </strong>
                  <span className="text-xs text-muted-foreground leading-relaxed mt-0.5 block">
                    {contact.officeHours}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3.5">
                <Phone className="size-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-foreground block">
                    Telepon & WhatsApp Hotline
                  </strong>
                  <span className="text-xs text-muted-foreground leading-relaxed block mt-0.5">
                    WhatsApp: {contact.whatsapp} (Cepat Tanggap)
                  </span>
                  <span className="text-xs text-muted-foreground leading-relaxed block">
                    Telepon Kantor: {contact.phone}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3.5">
                <Mail className="size-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-foreground block">
                    Surat Elektronik Resmi
                  </strong>
                  <span className="text-xs text-muted-foreground font-mono mt-0.5 block">
                    {contact.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive "Halo Lurah" Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border pb-4 mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Phone className="size-4 text-emerald-600" />
                  Formulir Aspirasi & Lapor Warga
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Pesan Anda akan otomatis terformat rapi dan diteruskan ke kontak pengaduan WhatsApp Kelurahan Walian Dua.
                </p>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 text-xs mb-6 flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Pesan Berhasil Disiapkan!</strong>
                    <span>Tautan WhatsApp telah dibuka. Petugas piket kelurahan akan segera merespon laporan Anda pada jam kerja.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="citizen-name" className="text-xs font-semibold text-foreground">
                      Nama Lengkap Pelapor *
                    </Label>
                    <Input
                      id="citizen-name"
                      type="text"
                      required
                      placeholder="Contoh: Toar Tumundo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-10 text-xs sm:text-sm bg-muted/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="citizen-phone" className="text-xs font-semibold text-foreground">
                      Nomor Telepon / WhatsApp
                    </Label>
                    <Input
                      id="citizen-phone"
                      type="tel"
                      placeholder="Contoh: 08123456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-10 text-xs sm:text-sm bg-muted/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="citizen-neighborhood" className="text-xs font-semibold text-foreground">
                      Asal Lingkungan
                    </Label>
                    <NativeSelect
                      id="citizen-neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full [&>select]:h-10 [&>select]:text-xs sm:[&>select]:text-sm bg-muted/20"
                    >
                      <option value="Lingkungan I">Lingkungan I</option>
                      <option value="Lingkungan II">Lingkungan II</option>
                      <option value="Lingkungan III">Lingkungan III</option>
                      <option value="Lingkungan IV">Lingkungan IV</option>
                      <option value="Lingkungan V">Lingkungan V</option>
                      <option value="Warga Luar Walian Dua">Warga Luar / Umum</option>
                    </NativeSelect>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="citizen-category" className="text-xs font-semibold text-foreground">
                      Kategori Laporan
                    </Label>
                    <NativeSelect
                      id="citizen-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full [&>select]:h-10 [&>select]:text-xs sm:[&>select]:text-sm bg-muted/20"
                    >
                      <option value="Layanan Dokumen">Layanan Dokumen / Surat</option>
                      <option value="Drainase & Kebersihan">Drainase & Kebersihan</option>
                      <option value="Penerangan / Lampu Jalan">Penerangan / Lampu Jalan</option>
                      <option value="Bantuan Sosial">Bantuan Sosial & Kesejahteraan</option>
                      <option value="Ketentraman & Linmas">Ketentraman Lingkungan</option>
                      <option value="Aspirasi / Lainnya">Aspirasi / Saran Umum</option>
                    </NativeSelect>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="citizen-message" className="text-xs font-semibold text-foreground">
                    Isi Laporan / Aduan / Pertanyaan *
                  </Label>
                  <Textarea
                    id="citizen-message"
                    required
                    rows={4}
                    placeholder="Tuliskan keterangan detail laporan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-24 text-xs sm:text-sm bg-muted/20 leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto h-11 px-6 text-xs font-semibold gap-2 bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all"
                  >
                    <Send className="size-3.5" />
                    Kirim via WhatsApp Kelurahan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
