import * as React from "react"
import Link from "next/link"
import {
  Users,
  Camera,
  FileText,
  Bell,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"

import { getAllAparatur } from "@/lib/db/repositories/aparatur-repo"
import { getAllGaleriWarga } from "@/lib/db/repositories/galeri-warga-repo"
import { getAllLayanan } from "@/lib/db/repositories/layanan-repo"
import { getAllPengumuman } from "@/lib/db/repositories/pengumuman-repo"
import { getAllPengaduan } from "@/lib/db/repositories/pengaduan-repo"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const [aparaturList, galeriList, layananList, pengumumanList, pengaduanList] = await Promise.all([
    getAllAparatur(),
    getAllGaleriWarga(),
    getAllLayanan(),
    getAllPengumuman(),
    getAllPengaduan(),
  ])

  const pendingAduan = pengaduanList.filter((a) => a.status === "BARU").length

  return (
    <div className="space-y-8">
      {/* 1. Civic Hero Header Card */}
      <Card className="rounded-2xl border-border bg-card shadow-xs">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                  Pusat Kendali Administrasi Terpadu
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Pemerintah Kelurahan Walian Dua
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kecamatan Tomohon Selatan, Kota Tomohon. Kelola struktur aparatur, dokumentasi kearifan Mapalus, legalitas dokumen kependudukan, serta tindak lanjut aspirasi warga secara transparan dan terukur.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <Link
                href="/admin/pengaduan"
                className={buttonVariants({
                  size: "sm",
                  className: "h-9 font-semibold text-xs gap-2 justify-center",
                })}
              >
                <MessageSquare className="size-3.5" />
                <span>Cek Aduan Masuk ({pendingAduan})</span>
              </Link>
              <Link
                href="/"
                target="_blank"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "h-9 font-medium text-xs gap-2 justify-center",
                })}
              >
                <ExternalLink className="size-3.5" />
                <span>Lihat Web Kelurahan</span>
              </Link>
            </div>
          </div>

          {/* Operational Status Sub-bar */}
          <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <span>
                Wilayah Administrasi: <strong className="text-foreground">Kode 71.73.01.1011</strong> • 4 Lingkungan (Pala I - IV)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 font-medium text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Sistem Operasional Aktif
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Key Metrics Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Aparatur */}
        <Link href="/admin/aparatur" className="group">
          <Card className="rounded-2xl transition-all duration-200 hover:border-foreground/40 hover:shadow-sm">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-muted-foreground mb-3">
                <Users className="size-5 group-hover:text-foreground transition-colors" />
                <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-foreground tabular-nums block">
                  {aparaturList.length}
                </span>
                <span className="text-xs font-semibold text-muted-foreground mt-1 block">
                  Aparatur & Pamong
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Galeri Warga */}
        <Link href="/admin/galeri-warga" className="group">
          <Card className="rounded-2xl transition-all duration-200 hover:border-foreground/40 hover:shadow-sm">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-muted-foreground mb-3">
                <Camera className="size-5 group-hover:text-foreground transition-colors" />
                <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-foreground tabular-nums block">
                  {galeriList.length}
                </span>
                <span className="text-xs font-semibold text-muted-foreground mt-1 block">
                  Galeri Foto Warga
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Layanan Publik */}
        <Link href="/admin/layanan" className="group">
          <Card className="rounded-2xl transition-all duration-200 hover:border-foreground/40 hover:shadow-sm">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-muted-foreground mb-3">
                <FileText className="size-5 group-hover:text-foreground transition-colors" />
                <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-foreground tabular-nums block">
                  {layananList.length}
                </span>
                <span className="text-xs font-semibold text-muted-foreground mt-1 block">
                  Layanan Dokumen
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Pengumuman */}
        <Link href="/admin/pengumuman" className="group">
          <Card className="rounded-2xl transition-all duration-200 hover:border-foreground/40 hover:shadow-sm">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-muted-foreground mb-3">
                <Bell className="size-5 group-hover:text-foreground transition-colors" />
                <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-3xl font-extrabold text-foreground tabular-nums block">
                  {pengumumanList.length}
                </span>
                <span className="text-xs font-semibold text-muted-foreground mt-1 block">
                  Pengumuman Warga
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Aduan Warga */}
        <Link href="/admin/pengaduan" className="group">
          <Card className="rounded-2xl transition-all duration-200 hover:border-foreground/40 hover:shadow-sm">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between text-muted-foreground mb-3">
                <MessageSquare className="size-5 group-hover:text-foreground transition-colors" />
                {pendingAduan > 0 ? (
                  <Badge variant="outline" className="px-1.5 py-0.2 text-[10px] font-bold border-amber-500/40 text-amber-700 dark:text-amber-300 bg-amber-500/10">
                    {pendingAduan} Baru
                  </Badge>
                ) : (
                  <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <div>
                <span className="text-3xl font-extrabold text-foreground tabular-nums block">
                  {pengaduanList.length}
                </span>
                <span className="text-xs font-semibold text-muted-foreground mt-1 block">
                  Aspirasi & Aduan
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 3. Quick Action Shortcuts */}
      <Card className="rounded-2xl border-border bg-card">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Aksi Cepat Pengelolaan Data
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Pintasan langsung ke modul pembaruan informasi publik kelurahan
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/admin/aparatur"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-background hover:bg-muted/60 transition-colors text-xs font-semibold group"
            >
              <div className="size-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                <Plus className="size-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-foreground truncate group-hover:underline">
                  Kelola Aparatur
                </span>
                <span className="text-[11px] text-muted-foreground truncate block">
                  Profil Lurah & Staf
                </span>
              </div>
            </Link>

            <Link
              href="/admin/galeri-warga"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-background hover:bg-muted/60 transition-colors text-xs font-semibold group"
            >
              <div className="size-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                <Camera className="size-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-foreground truncate group-hover:underline">
                  Unggah Galeri Warga
                </span>
                <span className="text-[11px] text-muted-foreground truncate block">
                  Dokumentasi Mapalus
                </span>
              </div>
            </Link>

            <Link
              href="/admin/layanan"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-background hover:bg-muted/60 transition-colors text-xs font-semibold group"
            >
              <div className="size-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                <FileText className="size-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-foreground truncate group-hover:underline">
                  Kelola Syarat Dokumen
                </span>
                <span className="text-[11px] text-muted-foreground truncate block">
                  SKU, Domisili, SKTM
                </span>
              </div>
            </Link>

            <Link
              href="/admin/pengumuman"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-background hover:bg-muted/60 transition-colors text-xs font-semibold group"
            >
              <div className="size-9 rounded-lg bg-foreground text-background flex items-center justify-center shrink-0">
                <Bell className="size-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-foreground truncate group-hover:underline">
                  Terbitkan Pengumuman
                </span>
                <span className="text-[11px] text-muted-foreground truncate block">
                  Pajak, Posyandu & Warta
                </span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 4. Recent Citizen Aspirations Table */}
      <Card className="rounded-2xl border-border bg-card">
        <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              Aspirasi & Laporan Warga Terbaru
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Laporan masuk dari kanal Halo Lurah Walian Dua yang memerlukan pemantauan
            </CardDescription>
          </div>
          <Link
            href="/admin/pengaduan"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "text-xs font-semibold gap-1.5 h-8",
            })}
          >
            <span>Buka Semua</span>
            <ArrowRight className="size-3" />
          </Link>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {pengaduanList.length === 0 ? (
            <Empty className="py-12 border border-dashed border-border rounded-xl">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageSquare className="size-5" />
                </EmptyMedia>
                <EmptyTitle className="text-sm font-semibold">
                  Belum Ada Laporan Warga
                </EmptyTitle>
                <EmptyDescription className="text-xs text-muted-foreground">
                  Semua aduan dan aspirasi warga yang dikirim melalui formulir online akan otomatis tercatat di sini.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Nama Pelapor</TableHead>
                  <TableHead className="w-[120px]">Lingkungan</TableHead>
                  <TableHead className="w-[140px]">Kategori</TableHead>
                  <TableHead>Isi Pesan Laporan</TableHead>
                  <TableHead className="w-[110px] text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pengaduanList.slice(0, 5).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold text-foreground">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {item.neighborhood}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-medium">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-sm truncate">
                      {item.message}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold ${
                          item.status === "SELESAI"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                            : item.status === "DIPROSES"
                            ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
