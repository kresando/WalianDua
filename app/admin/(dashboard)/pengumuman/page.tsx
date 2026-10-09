"use client"

import * as React from "react"
import Image from "next/image"
import {
  Bell,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Pin,
  Calendar,
  Search,
  Check,
  AlertCircle,
  Clock,
  Megaphone,
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

import { PengumumanRecord } from "@/lib/db/schema"

const CATEGORIES = [
  { id: "all", label: "Semua Pengumuman" },
  { id: "Pelayanan", label: "Pelayanan & Administrasi" },
  { id: "Pajak & Keuangan", label: "Pajak & Retribusi (PBB-P2)" },
  { id: "Kesehatan", label: "Kesehatan & Posyandu" },
  { id: "Infrastruktur", label: "Infrastruktur & Lingkungan" },
]

export default function PengumumanAdminPage() {
  const [list, setList] = React.useState<PengumumanRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<PengumumanRecord | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Delete Alert Dialog State
  const [itemToDelete, setItemToDelete] = React.useState<PengumumanRecord | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Form State
  const [form, setForm] = React.useState({
    title: "",
    category: "Pelayanan",
    date: "",
    summary: "",
    read_time: "2 min baca",
    image: "",
    is_pinned: false,
    sort_order: 0,
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/pengumuman")
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
      category: "Pelayanan",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      summary: "",
      read_time: "2 min baca",
      image: "",
      is_pinned: false,
      sort_order: list.length,
    })
    setIsModalOpen(true)
    setMessage(null)
  }

  const openEditModal = (item: PengumumanRecord) => {
    setEditingItem(item)
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      summary: item.summary,
      read_time: item.read_time || "2 min baca",
      image: item.image || "",
      is_pinned: item.is_pinned,
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
        setMessage({ type: "success", text: "Foto pengumuman berhasil diunggah!" })
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
        ? `/api/admin/pengumuman/${editingItem.id}`
        : "/api/admin/pengumuman"
      const method = editingItem ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || "Gagal menyimpan pengumuman")
      }

      setMessage({
        type: "success",
        text: editingItem
          ? "Pengumuman berhasil diperbarui!"
          : "Pengumuman baru berhasil diterbitkan!",
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
      const res = await fetch(`/api/admin/pengumuman/${itemToDelete.id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Gagal menghapus")
      }
      setMessage({
        type: "success",
        text: `Pengumuman "${itemToDelete.title}" berhasil dihapus.`,
      })
      setItemToDelete(null)
      loadData()
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menghapus pengumuman",
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
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [list, selectedCategory, searchQuery])

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Papan Pengumuman & Warta Warga
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Publikasikan informasi penting mengenai jadwal Posyandu ILP, jatuh tempo PBB-P2, dan himbauan kamtibmas.
          </p>
        </div>

        <Button onClick={openCreateModal} className="h-10 text-xs font-semibold gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          <span>Buat Pengumuman Baru</span>
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

        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul pengumuman atau warta..."
            className="pl-9 h-9 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* 3. Announcements List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-24" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <Empty className="py-16 border border-dashed border-border rounded-2xl bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Megaphone className="size-5" />
            </EmptyMedia>
            <EmptyTitle className="text-sm font-semibold">
              Tidak Ada Pengumuman
            </EmptyTitle>
            <EmptyDescription className="text-xs text-muted-foreground">
              {searchQuery
                ? `Tidak ditemukan warta dengan kata kunci "${searchQuery}".`
                : "Belum ada pengumuman untuk kategori yang dipilih."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="space-y-4">
          {filteredList.map((item) => (
            <Card
              key={item.id}
              className={`rounded-2xl border-border bg-card shadow-xs hover:border-foreground/30 transition-all ${
                item.is_pinned ? "border-amber-500/40 bg-amber-500/5 dark:bg-amber-500/10" : ""
              }`}
            >
              <CardHeader className="p-5 sm:p-6 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-[10px] font-semibold">
                      {item.category}
                    </Badge>

                    {item.is_pinned && (
                      <Badge variant="outline" className="text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 gap-1">
                        <Pin className="size-3" />
                        <span>Disematkan (Pinned)</span>
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {item.date}
                    </span>
                    {item.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {item.read_time}
                      </span>
                    )}
                  </div>
                </div>

                <CardTitle className="text-base sm:text-lg font-bold text-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-5 sm:px-6 py-2">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
              </CardContent>

              <CardFooter className="px-5 sm:px-6 py-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
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

      {/* 4. Form Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingItem ? "Edit Pengumuman Warga" : "Buat Pengumuman Baru"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Informasi publik yang akan ditayangkan pada papan pengumuman resmi website kelurahan.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold">
                Judul Pengumuman *
              </Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Contoh: Jadwal Pelayanan Posyandu Integrasi Layanan Primer (ILP)"
                className="h-9 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Kategori Warta *
                </Label>
                <NativeSelect
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-9 text-xs sm:text-sm"
                >
                  <option value="Pelayanan">Pelayanan & Administrasi</option>
                  <option value="Pajak & Keuangan">Pajak & Keuangan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Infrastruktur">Infrastruktur & Lingkungan</option>
                </NativeSelect>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-xs font-semibold">
                  Tanggal Pengumuman *
                </Label>
                <Input
                  id="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="Contoh: 12 Oktober 2026"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="summary" className="text-xs font-semibold">
                Isi Ringkasan Pengumuman *
              </Label>
              <Textarea
                id="summary"
                rows={4}
                required
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                placeholder="Tuliskan isi pengumuman secara rinci, jadwal kegiatan, persyaratan yang perlu dibawa warga..."
                className="text-xs leading-relaxed"
              />
            </div>

            {/* Optional Banner Image */}
            <div className="space-y-2 p-3.5 rounded-xl border border-border bg-muted/30">
              <Label className="text-xs font-semibold">Gambar Pendukung (Opsional)</Label>
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
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Atau URL gambar (/images/...)"
                  className="text-xs h-8 font-mono"
                />
              </div>
            </div>

            {/* Pinned Switch */}
            <div className="p-3.5 rounded-xl border border-border bg-muted/30 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <Label htmlFor="is_pinned" className="text-xs font-semibold cursor-pointer">
                  Sematkan di Baris Teratas (Pinned)
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Pengumuman penting akan ditandai lencana khusus dan selalu tampil paling atas.
                </p>
              </div>
              <Switch
                id="is_pinned"
                checked={form.is_pinned}
                onCheckedChange={(checked) => setForm({ ...form, is_pinned: checked })}
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
                {submitting ? "Menyimpan..." : editingItem ? "Simpan Perubahan" : "Terbitkan Pengumuman"}
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
              Hapus Pengumuman?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Anda akan menghapus pengumuman &ldquo;{itemToDelete?.title}&rdquo;. Warta ini tidak akan lagi tampil di halaman pengumuman warga.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Pengumuman"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
