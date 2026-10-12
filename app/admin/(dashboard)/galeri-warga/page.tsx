"use client"

import * as React from "react"
import Image from "next/image"
import {
  Camera,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Search,
  Check,
  AlertCircle,
  Users,
  Calendar,
  Sparkles,
  Tag,
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
import { AspectRatio } from "@/components/ui/aspect-ratio"
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

import { GaleriWargaRecord } from "@/lib/db/schema"

const CATEGORIES = [
  { id: "all", label: "Semua Kategori" },
  { id: "Gotong Royong Mapalus", label: "Gotong Royong Mapalus" },
  { id: "Hortikultura & Krisan", label: "Hortikultura & Krisan" },
  { id: "Kegiatan PKK & Posyandu", label: "Kegiatan PKK & Posyandu" },
  { id: "Seni & Budaya Minahasa", label: "Seni & Budaya Minahasa" },
]

export default function GaleriWargaAdminPage() {
  const [list, setList] = React.useState<GaleriWargaRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<GaleriWargaRecord | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Delete Alert Dialog State
  const [itemToDelete, setItemToDelete] = React.useState<GaleriWargaRecord | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Form State
  const [form, setForm] = React.useState({
    title: "",
    category: "Gotong Royong Mapalus",
    description: "",
    highlight: "",
    image: "",
    author_or_contributor: "",
    date: "",
    sort_order: 0,
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/galeri-warga")
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
      title: "",
      category: "Gotong Royong Mapalus",
      description: "",
      highlight: "",
      image: "",
      author_or_contributor: "",
      date: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
      sort_order: list.length,
    })
    setIsModalOpen(true)
    setMessage(null)
  }

  const openEditModal = (item: GaleriWargaRecord) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      highlight: item.highlight || "",
      image: item.image,
      author_or_contributor: item.author_or_contributor || "",
      date: item.date || "",
      sort_order: item.sort_order,
    })
    setIsModalOpen(true)
    setMessage(null)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      })
      const json = await res.json()
      if (res.ok && json.url) {
        setForm((prev) => ({ ...prev, image: json.url }))
        setMessage({ type: "success", text: "Foto dokumentasi berhasil diunggah!" })
      } else {
        setMessage({ type: "error", text: json.error || "Gagal mengunggah foto" })
      }
    } catch {
      setMessage({ type: "error", text: "Terjadi kesalahan saat unggah foto" })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const url = editingItem
        ? `/api/admin/galeri-warga/${editingItem.id}`
        : "/api/admin/galeri-warga"
      const method = editingItem ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || "Gagal menyimpan dokumentasi")
      }

      setMessage({
        type: "success",
        text: editingItem
          ? "Dokumentasi foto berhasil diperbarui!"
          : "Foto galeri baru berhasil ditambahkan!",
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
      const res = await fetch(`/api/admin/galeri-warga/${itemToDelete.id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Gagal menghapus foto")
      }
      setMessage({
        type: "success",
        text: `Foto "${itemToDelete.title}" berhasil dihapus.`,
      })
      setItemToDelete(null)
      loadData()
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menghapus",
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
        (item.author_or_contributor &&
          item.author_or_contributor.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCategory && matchSearch
    })
  }, [list, selectedCategory, searchQuery])

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Galeri Warga & Dokumentasi Kegiatan
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Publikasikan foto kegiatan Mapalus gotong royong, kelompok tani krisan, Posyandu, dan festival budaya.
          </p>
        </div>

        <Button onClick={openCreateModal} className="h-10 text-xs font-semibold gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          <span>Unggah Foto Baru</span>
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

      {/* 2. Controls: Filter Categories & Search Bar */}
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
            placeholder="Cari judul dokumentasi atau warga..."
            className="pl-9 h-9 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* 3. Photos Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="aspect-16/10 w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <Empty className="py-16 border border-dashed border-border rounded-2xl bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Camera className="size-5" />
            </EmptyMedia>
            <EmptyTitle className="text-sm font-semibold">
              Tidak Ada Dokumentasi Foto
            </EmptyTitle>
            <EmptyDescription className="text-xs text-muted-foreground">
              {searchQuery
                ? `Tidak ditemukan foto dengan kata kunci "${searchQuery}".`
                : "Belum ada foto kegiatan warga untuk kategori yang dipilih."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl border-border bg-card shadow-xs hover:border-foreground/30 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                <AspectRatio ratio={16 / 10} className="bg-muted relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="bg-background/90 backdrop-blur-md text-foreground font-semibold text-[10px] shadow-xs">
                      {item.category}
                    </Badge>
                  </div>
                </AspectRatio>

                <CardHeader className="p-5 pb-2">
                  <CardTitle className="text-base font-bold text-foreground leading-snug">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-1">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                {item.highlight && (
                  <CardContent className="px-5 py-2">
                    <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-flex items-center gap-1.5">
                      <Sparkles className="size-3" />
                      <span>{item.highlight}</span>
                    </div>
                  </CardContent>
                )}
              </div>

              <CardFooter className="px-5 py-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
                <div className="flex flex-col text-[11px] text-muted-foreground min-w-0">
                  {item.author_or_contributor && (
                    <span className="truncate">Oleh: <strong className="text-foreground">{item.author_or_contributor}</strong></span>
                  )}
                  {item.date && <span className="tabular-nums">{item.date}</span>}
                </div>

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

      {/* 4. Upload / Edit Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingItem ? "Edit Dokumentasi Warga" : "Tambah Dokumentasi Baru"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Dokumentasi gotong royong Mapalus, kegiatan Posyandu, dan potensi Kelurahan Walian Dua.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold">
                Judul Foto / Kegiatan *
              </Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Contoh: Kerja Bakti Mapalus Perbaikan Saluran Lingkungan III"
                className="h-9 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Kategori Kegiatan *
                </Label>
                <NativeSelect
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-9 text-xs sm:text-sm"
                >
                  <option value="Gotong Royong Mapalus">Gotong Royong Mapalus</option>
                  <option value="Hortikultura & Krisan">Hortikultura & Krisan</option>
                  <option value="Kegiatan PKK & Posyandu">Kegiatan PKK & Posyandu</option>
                  <option value="Seni & Budaya Minahasa">Seni & Budaya Minahasa</option>
                </NativeSelect>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-xs font-semibold">
                  Waktu Pelaksanaan (Bulan / Tahun)
                </Label>
                <Input
                  id="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="Oktober 2026"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Image Upload & Preview */}
            <div className="space-y-2 p-3.5 rounded-xl border border-border bg-muted/30">
              <Label className="text-xs font-semibold">Unggah Berkas Gambar *</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="text-xs h-9"
                />
                <Input
                  type="text"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Atau masukkan path gambar (/images/...)"
                  className="text-xs h-8 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-xs font-semibold">
                Deskripsi Narasi Foto *
              </Label>
              <Textarea
                id="desc"
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Ceritakan latar belakang kegiatan, peran warga, dan lokasi pelaksanaan..."
                className="text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="highlight" className="text-xs font-semibold">
                  Lencana Highlight (Opsional)
                </Label>
                <Input
                  id="highlight"
                  value={form.highlight}
                  onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                  placeholder="Mapalus 5 Lingkungan / Panen Raya"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="author" className="text-xs font-semibold">
                  Kontributor / Pelaksana
                </Label>
                <Input
                  id="author"
                  value={form.author_or_contributor}
                  onChange={(e) => setForm({ ...form, author_or_contributor: e.target.value })}
                  placeholder="Warga Lingkungan II / Poktan Bunga"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
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
                {submitting ? "Menyimpan..." : editingItem ? "Simpan Perubahan" : "Terbitkan Foto"}
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
              Hapus Foto Dokumentasi?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Anda akan menghapus foto &ldquo;{itemToDelete?.title}&rdquo;. Dokumentasi ini tidak akan lagi tampil di galeri publik warga.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Foto"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
