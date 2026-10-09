"use client"

import * as React from "react"
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Search,
  Clock,
  Coins,
  CheckCircle2,
  Check,
  AlertCircle,
  Globe,
  ListOrdered,
  FileCheck,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect } from "@/components/ui/native-select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { LayananPublikRecord } from "@/lib/db/schema"

const CATEGORIES = [
  { id: "all", label: "Semua Kategori" },
  { id: "kependudukan", label: "Kependudukan" },
  { id: "usaha", label: "Usaha / UMKM" },
  { id: "sosial", label: "Sosial & Bantuan" },
  { id: "pertanahan", label: "Pertanahan" },
  { id: "perizinan", label: "Perizinan" },
]

export default function LayananAdminPage() {
  const [list, setList] = React.useState<LayananPublikRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<LayananPublikRecord | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Delete Alert Dialog State
  const [itemToDelete, setItemToDelete] = React.useState<LayananPublikRecord | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Form State
  const [form, setForm] = React.useState({
    code: "",
    title: "",
    category: "kependudukan" as "kependudukan" | "usaha" | "sosial" | "pertanahan" | "perizinan",
    description: "",
    processing_time: "1 Hari Kerja",
    cost: "Gratis (Rp 0)",
    requirementsText: "",
    flowText: "",
    is_online_available: true,
    sort_order: 0,
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/layanan")
      const json = await res.json()
      if (json.data) {
        setList(json.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const openCreateModal = () => {
    setEditingItem(null)
    setForm({
      code: "",
      title: "",
      category: "kependudukan",
      description: "",
      processing_time: "1 Hari Kerja",
      cost: "Gratis (Rp 0)",
      requirementsText: "KTP Asli / Fotokopi Pemohon\nKartu Keluarga (KK) Tomohon\nSurat Pengantar Kepala Lingkungan (Pala)",
      flowText: "Warga mengajukan permohonan\nVerifikasi dokumen oleh staf\nPenandatanganan oleh Lurah\nPenyerahan surat resmi",
      is_online_available: true,
      sort_order: list.length,
    })
    setIsModalOpen(true)
    setMessage(null)
  }

  const openEditModal = (item: LayananPublikRecord) => {
    setEditingItem(item)
    setForm({
      code: item.code,
      title: item.title,
      category: item.category,
      description: item.description,
      processing_time: item.processing_time,
      cost: item.cost,
      requirementsText: item.requirements.join("\n"),
      flowText: item.flow.join("\n"),
      is_online_available: item.is_online_available,
      sort_order: item.sort_order,
    })
    setIsModalOpen(true)
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    const requirements = form.requirementsText
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean)

    const flow = form.flowText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)

    const payload = {
      code: form.code,
      title: form.title,
      category: form.category,
      description: form.description,
      processing_time: form.processing_time,
      cost: form.cost,
      requirements,
      flow,
      is_online_available: form.is_online_available,
      sort_order: form.sort_order,
    }

    try {
      const url = editingItem
        ? `/api/admin/layanan/${editingItem.id}`
        : "/api/admin/layanan"
      const method = editingItem ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || "Gagal menyimpan layanan")
      }

      setMessage({
        type: "success",
        text: editingItem
          ? "Layanan publik berhasil diperbarui!"
          : "Layanan publik baru berhasil ditambahkan!",
      })

      setIsModalOpen(false)
      loadData()
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Terjadi kesalahan",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/layanan/${itemToDelete.id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Gagal menghapus")
      }
      setMessage({
        type: "success",
        text: `Layanan "${itemToDelete.title}" berhasil dihapus.`,
      })
      setItemToDelete(null)
      loadData()
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menghapus layanan",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredList = React.useMemo(() => {
    return list.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [list, selectedCategory, searchQuery])

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Standar Layanan Publik & Surat
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Atur persyaratan berkas, alur proses SOP, estimasi waktu pengerjaan, dan biaya Rp 0 (Gratis).
          </p>
        </div>

        <Button onClick={openCreateModal} className="h-10 text-xs font-semibold gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          <span>Tambah Layanan Baru</span>
        </Button>
      </div>

      {/* Feedback Alert */}
      {message && (
        <Alert
          variant={message.type === "error" ? "destructive" : "default"}
          className={`border ${
            message.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
              : ""
          }`}
        >
          {message.type === "success" ? (
            <Check className="size-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <AlertDescription className="text-xs font-medium">
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* 2. Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-foreground text-background shadow-2xs"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari surat (SKU, SKTM, KTP)..."
            className="pl-9 h-9 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* 3. Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-12 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <Empty className="py-16 border border-dashed border-border rounded-2xl bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText className="size-5" />
            </EmptyMedia>
            <EmptyTitle className="text-sm font-semibold">
              Tidak Ada Layanan Dokumen
            </EmptyTitle>
            <EmptyDescription className="text-xs text-muted-foreground">
              {searchQuery
                ? `Tidak ditemukan layanan dengan kata kunci "${searchQuery}".`
                : "Belum ada data layanan publik untuk kategori yang dipilih."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl border-border bg-card shadow-xs hover:border-foreground/30 transition-all flex flex-col justify-between"
            >
              <CardHeader className="p-5 sm:p-6 pb-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        {item.code}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-semibold capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-foreground">
                      {item.title}
                    </CardTitle>
                  </div>

                  {item.is_online_available && (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 text-[10px] gap-1 shrink-0">
                      <Globe className="size-3" />
                      <span>Online</span>
                    </Badge>
                  )}
                </div>

                <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-5 sm:px-6 py-2 space-y-3">
                {/* Cost & Processing metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/40 p-2.5 rounded-xl border border-border/60">
                    <span className="text-[10px] text-muted-foreground block font-medium">Estimasi Waktu:</span>
                    <strong className="text-foreground text-xs flex items-center gap-1 mt-0.5">
                      <Clock className="size-3 text-muted-foreground" />
                      {item.processing_time}
                    </strong>
                  </div>
                  <div className="bg-muted/40 p-2.5 rounded-xl border border-border/60">
                    <span className="text-[10px] text-muted-foreground block font-medium">Biaya Pelayanan:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1 mt-0.5">
                      <Coins className="size-3" />
                      {item.cost}
                    </strong>
                  </div>
                </div>

                {/* Requirements preview */}
                <div className="text-xs space-y-1">
                  <span className="text-[11px] font-semibold text-muted-foreground block">
                    Persyaratan Utama ({item.requirements.length}):
                  </span>
                  <ul className="space-y-1 text-muted-foreground text-[11px]">
                    {item.requirements.slice(0, 3).map((r, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{r}</span>
                      </li>
                    ))}
                    {item.requirements.length > 3 && (
                      <li className="text-[10px] text-muted-foreground/75 italic">
                        +{item.requirements.length - 3} syarat lainnya
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="px-5 sm:px-6 py-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                <span className="text-[11px] text-muted-foreground">
                  Urutan: #{item.sort_order}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="min-h-[38px] text-xs font-semibold gap-1.5"
                  >
                    <Edit2 className="size-3.5" />
                    <span>Edit</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setItemToDelete(item)}
                    className="min-h-[38px] text-xs font-semibold gap-1.5 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Hapus</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* 4. Create / Edit Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingItem ? "Edit Layanan Surat" : "Tambah Layanan Surat Baru"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Standar operasional prosedur (SOP) surat dan rincian berkas persyaratan warga.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="code" className="text-xs font-semibold">
                  Kode Surat (Unik) *
                </Label>
                <Input
                  id="code"
                  required
                  value={form.code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      code: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    })
                  }
                  placeholder="sku / domisili / sktm"
                  className="font-mono text-xs sm:text-sm h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Kategori Layanan *
                </Label>
                <NativeSelect
                  id="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as typeof form.category,
                    })
                  }
                  className="h-9 text-xs sm:text-sm"
                >
                  <option value="kependudukan">Kependudukan</option>
                  <option value="usaha">Usaha & Ekonomi</option>
                  <option value="sosial">Sosial & Kesejahteraan</option>
                  <option value="pertanahan">Pertanahan</option>
                  <option value="perizinan">Perizinan</option>
                </NativeSelect>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold">
                Nama Resmi Dokumen / Surat *
              </Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Contoh: Surat Keterangan Usaha (SKU)"
                className="h-9 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="proc_time" className="text-xs font-semibold">
                  Estimasi Waktu Pengerjaan *
                </Label>
                <Input
                  id="proc_time"
                  required
                  value={form.processing_time}
                  onChange={(e) => setForm({ ...form, processing_time: e.target.value })}
                  placeholder="1 Hari Kerja"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cost" className="text-xs font-semibold">
                  Biaya Pelayanan *
                </Label>
                <Input
                  id="cost"
                  required
                  value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: e.target.value })}
                  placeholder="Gratis (Rp 0)"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-xs font-semibold">
                Deskripsi / Fungsi Surat *
              </Label>
              <Textarea
                id="desc"
                rows={2}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Penjelasan fungsi dan peruntukan surat bagi warga..."
                className="text-xs leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reqs" className="text-xs font-semibold">
                Daftar Persyaratan (Satu baris per syarat) *
              </Label>
              <Textarea
                id="reqs"
                rows={4}
                required
                value={form.requirementsText}
                onChange={(e) => setForm({ ...form, requirementsText: e.target.value })}
                placeholder="KTP Asli / Fotokopi Pemohon&#10;Kartu Keluarga (KK)&#10;Surat Pengantar Kepala Lingkungan"
                className="text-xs leading-relaxed font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="flow" className="text-xs font-semibold">
                Alur Proses Pengurusan (Satu baris per tahap)
              </Label>
              <Textarea
                id="flow"
                rows={3}
                value={form.flowText}
                onChange={(e) => setForm({ ...form, flowText: e.target.value })}
                placeholder="Warga menyerahkan berkas ke loket&#10;Pemeriksaan berkas staf kelurahan&#10;Penandatanganan Lurah&#10;Surat resmi diserahkan"
                className="text-xs leading-relaxed font-mono"
              />
            </div>

            {/* Online Available Switch (Bug Fix) */}
            <div className="p-3.5 rounded-xl border border-border bg-muted/30 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="is_online" className="text-xs font-semibold cursor-pointer">
                  Tersedia Konsultasi / Pengurusan Online
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Jika aktif, warga dapat berkonsultasi syarat via tautan formulir Halo Lurah / WhatsApp.
                </p>
              </div>
              <Switch
                id="is_online"
                checked={form.is_online_available}
                onCheckedChange={(checked) => setForm({ ...form, is_online_available: checked })}
              />
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={submitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Menyimpan..." : editingItem ? "Simpan Perubahan" : "Terbitkan Layanan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5. Delete Alert Dialog */}
      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold">
              Hapus Layanan Publik?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Anda akan menghapus layanan &ldquo;{itemToDelete?.title}&rdquo;. Data persyaratan surat ini tidak akan lagi tampil di halaman publik warga.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Layanan"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
