"use client"

import * as React from "react"
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Upload,
  UserCheck,
  Search,
  Check,
  AlertCircle,
  Shield,
  Briefcase,
  IdCard,
  LayoutGrid,
  List,
  MapPin,
  HeartHandshake,
  Landmark,
  X,
  Sparkles,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

import { AparaturRecord } from "@/lib/db/schema"

const ROLE_CATEGORIES = [
  { id: "all", label: "Semua Aparatur" },
  { id: "pimpinan", label: "Pimpinan Kelurahan" },
  { id: "staf", label: "Staf & Seksi" },
  { id: "lingkungan", label: "Kepala Lingkungan (Pala)" },
  { id: "lkk", label: "Lembaga Kemasyarakatan (LKK)" },
]

export default function AparaturAdminPage() {
  const [list, setList] = React.useState<AparaturRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedRole, setSelectedRole] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("grid")
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<AparaturRecord | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Delete Alert Dialog State
  const [itemToDelete, setItemToDelete] = React.useState<AparaturRecord | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Form State
  const [form, setForm] = React.useState({
    name: "",
    role: "",
    title: "",
    rank: "",
    nip: "",
    description: "",
    staff: "",
    avatar: "",
    unit: "Pemerintah Kelurahan",
    sort_order: 0,
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/aparatur")
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
      name: "",
      role: "",
      title: "",
      rank: "",
      nip: "",
      description: "",
      staff: "",
      avatar: "",
      unit: "Pemerintah Kelurahan",
      sort_order: list.length,
    })
    setIsModalOpen(true)
    setMessage(null)
  }

  const openEditModal = (item: AparaturRecord) => {
    setEditingItem(item)
    setForm({
      name: item.name,
      role: item.role,
      title: item.title,
      rank: item.rank || "",
      nip: item.nip || "",
      description: item.description,
      staff: item.staff || "",
      avatar: item.avatar || "",
      unit: item.unit || "Pemerintah Kelurahan",
      sort_order: item.sort_order,
    })
    setIsModalOpen(true)
    setMessage(null)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      const json = await res.json()
      if (json.url) {
        setForm((prev) => ({ ...prev, avatar: json.url }))
      } else {
        setMessage({ type: "error", text: "Gagal mengunggah foto profil" })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan upload" })
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
        ? `/api/admin/aparatur/${editingItem.id}`
        : "/api/admin/aparatur"
      const method = editingItem ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const json = await res.json()

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingItem
            ? "Data aparatur berhasil diperbarui."
            : "Data aparatur baru berhasil ditambahkan.",
        })
        setIsModalOpen(false)
        loadData()
      } else {
        setMessage({ type: "error", text: json.error || "Gagal menyimpan data aparatur." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan jaringan." })
    } finally {
      setSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)

    try {
      const res = await fetch(`/api/admin/aparatur/${itemToDelete.id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setMessage({ type: "success", text: `Data ${itemToDelete.name} berhasil dihapus.` })
        setItemToDelete(null)
        loadData()
      } else {
        setMessage({ type: "error", text: "Gagal menghapus data aparatur." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan koneksi." })
    } finally {
      setIsDeleting(false)
    }
  }

  // Filter & Search logic
  const filteredList = React.useMemo(() => {
    return list.filter((item) => {
      const matchRole =
        selectedRole === "all" ||
        (selectedRole === "pimpinan" && item.title.toLowerCase().includes("lurah")) ||
        (selectedRole === "staf" && (item.title.toLowerCase().includes("seksi") || item.title.toLowerCase().includes("sekretaris") || item.title.toLowerCase().includes("pengelola"))) ||
        (selectedRole === "lingkungan" && (item.title.toLowerCase().includes("lingkungan") || item.role.toLowerCase().includes("lingkungan"))) ||
        (selectedRole === "lkk" && (item.unit?.toLowerCase().includes("lkk") || item.role.toLowerCase().includes("lkk") || item.title.toLowerCase().includes("pkk") || item.title.toLowerCase().includes("karang taruna")))

      const query = searchQuery.trim().toLowerCase()
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        (item.nip && item.nip.includes(query)) ||
        (item.rank && item.rank.toLowerCase().includes(query)) ||
        (item.unit && item.unit.toLowerCase().includes(query))
      return matchRole && matchSearch
    })
  }, [list, selectedRole, searchQuery])

  // Aggregate Metrics for Header
  const metrics = React.useMemo(() => {
    const total = list.length
    const pimpinan = list.filter((i) => i.title.toLowerCase().includes("lurah")).length
    const staf = list.filter((i) => i.title.toLowerCase().includes("seksi") || i.title.toLowerCase().includes("sekretaris") || i.title.toLowerCase().includes("pengelola")).length
    const pala = list.filter((i) => i.title.toLowerCase().includes("lingkungan") || i.role.toLowerCase().includes("lingkungan")).length
    const lkk = list.filter((i) => i.unit?.toLowerCase().includes("lkk") || i.role.toLowerCase().includes("lkk") || i.title.toLowerCase().includes("pkk")).length
    return { total, pimpinan, staf, pala, lkk }
  }, [list])

  return (
    <div className="space-y-6">
      {/* 1. Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Struktur Aparatur & Pamong Warga
            </h1>
            <Badge variant="secondary" className="text-xs font-mono tabular-nums">
              {list.length} Personel
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Kelola profil kepegawaian Lurah, Sekretaris, Kepala Seksi, Kepala Lingkungan (Pala I - IV), dan LKK Kelurahan Walian Dua.
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          className="h-10 text-xs font-semibold gap-2 self-start sm:self-auto shadow-xs"
        >
          <Plus className="size-4" />
          <span>Tambah Aparatur Baru</span>
        </Button>
      </div>

      {/* 2. Quick Metrics KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 rounded-xl border border-border bg-card shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Total Aparatur</span>
            <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground tabular-nums">
              {metrics.total}
            </span>
            <span className="text-[11px] text-muted-foreground">Personel Terdaftar</span>
          </div>
        </Card>

        <Card className="p-4 rounded-xl border border-border bg-card shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Pimpinan & Seksi</span>
            <div className="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Shield className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground tabular-nums">
              {metrics.pimpinan + metrics.staf}
            </span>
            <span className="text-[11px] text-muted-foreground">Struktural Kantor</span>
          </div>
        </Card>

        <Card className="p-4 rounded-xl border border-border bg-card shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Kepala Lingkungan</span>
            <div className="size-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <MapPin className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground tabular-nums">
              {metrics.pala}
            </span>
            <span className="text-[11px] text-muted-foreground">Pala Wilayah I - IV</span>
          </div>
        </Card>

        <Card className="p-4 rounded-xl border border-border bg-card shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Lembaga Warga (LKK)</span>
            <div className="size-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <HeartHandshake className="size-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground tabular-nums">
              {metrics.lkk}
            </span>
            <span className="text-[11px] text-muted-foreground">Mitra Kemasyarakatan</span>
          </div>
        </Card>
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

      {/* 3. Controls: Role Filter Pills, Search Bar, and View Toggle */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 py-1">
        {/* Role Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {ROLE_CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? list.length
                : cat.id === "pimpinan"
                ? metrics.pimpinan
                : cat.id === "staf"
                ? metrics.staf
                : cat.id === "lingkungan"
                ? metrics.pala
                : metrics.lkk

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedRole(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedRole === cat.id
                    ? "bg-foreground text-background shadow-2xs"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                    selectedRole === cat.id
                      ? "bg-background/20 text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right Search & View Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, jabatan, NIP..."
              className="pl-9 pr-8 h-9 text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                aria-label="Bersihkan pencarian"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Switcher Toggle */}
          <div className="flex items-center p-1 rounded-xl border border-border bg-muted/40 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "grid"
                  ? "bg-card text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Tampilan Kartu Profil"
              aria-label="Tampilan Kartu Profil"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "table"
                  ? "bg-card text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Tampilan Tabel Direktori"
              aria-label="Tampilan Tabel Direktori"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Content: Grid View or Table View */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-5 space-y-4 rounded-2xl border-border">
              <div className="flex gap-4 items-center">
                <Skeleton className="size-14 rounded-2xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-14 w-full rounded-xl" />
            </Card>
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <Empty className="py-16 border border-dashed border-border rounded-2xl bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users className="size-6 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle className="text-sm font-semibold">
              Tidak Ada Data Aparatur Ditemukan
            </EmptyTitle>
            <EmptyDescription className="text-xs text-muted-foreground max-w-sm">
              {searchQuery
                ? `Tidak ditemukan profil aparatur dengan kata kunci "${searchQuery}". Coba kata kunci lain atau ubah filter peran.`
                : "Belum ada entri aparatur yang tersimpan untuk kategori peran ini."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : viewMode === "grid" ? (
        /* ========================================================================= */
        /* HIGH-CRAFT BENTO CARD GRID                                                */
        /* ========================================================================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((item) => {
            const hasMetadata = Boolean(item.nip || item.rank || item.staff)
            const isLurah = item.title.toLowerCase().includes("lurah") && !item.title.toLowerCase().includes("seksi")

            return (
              <Card
                key={item.id}
                className="rounded-2xl border border-border bg-card shadow-xs hover:border-foreground/30 hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Header with Top Tag & Order */}
                <CardHeader className="p-5 pb-3 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold tracking-wide ${
                        isLurah
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-muted/50 text-foreground"
                      }`}
                    >
                      {item.role || item.unit || "Kelurahan Walian Dua"}
                    </Badge>
                    <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                      #{item.sort_order}
                    </span>
                  </div>

                  {/* Profile Identity Row with Balanced Sized Avatar */}
                  <div className="flex items-start gap-3.5 pt-1">
                    <Avatar className="size-14 rounded-full shadow-xs shrink-0">
                      {item.avatar && (
                        <AvatarImage
                          src={item.avatar}
                          alt={item.name}
                          className="object-cover object-top"
                        />
                      )}
                      <AvatarFallback className="text-sm font-bold bg-muted text-foreground">
                        {item.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-0.5 min-w-0 flex-1">
                      <CardTitle className="text-base font-bold text-foreground leading-tight tracking-tight line-clamp-2">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 truncate">
                        {item.title}
                      </CardDescription>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.unit || "Pemerintah Kelurahan"}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Card Content with Description & Clean Seamless Metadata (No Nested Frame) */}
                <CardContent className="px-5 py-2 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 min-h-[3.25rem]">
                    {item.description || "Bertanggung jawab atas kelancaran penyelenggaraan urusan pemerintahan, ketertiban, dan pelayanan masyarakat."}
                  </p>

                  {/* Metadata List - Clean, Seamless & Borderless */}
                  <div className="pt-2.5 border-t border-border/50 text-[11px] text-muted-foreground space-y-1.5">
                    {item.nip && (
                      <div className="flex items-center gap-2">
                        <IdCard className="size-3.5 text-muted-foreground/70 shrink-0" />
                        <span className="font-mono text-foreground font-medium tabular-nums truncate">
                          NIP: {item.nip}
                        </span>
                      </div>
                    )}
                    {item.rank && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="size-3.5 text-muted-foreground/70 shrink-0" />
                        <span className="truncate">
                          Pangkat: <strong className="text-foreground font-semibold">{item.rank}</strong>
                        </span>
                      </div>
                    )}
                    {item.staff && (
                      <div className="flex items-center gap-2">
                        <Users className="size-3.5 text-muted-foreground/70 shrink-0" />
                        <span className="truncate">
                          Staf: {item.staff}
                        </span>
                      </div>
                    )}
                    {!hasMetadata && (
                      <div className="flex items-center gap-2 text-muted-foreground/80 py-0.5">
                        <Shield className="size-3.5 text-muted-foreground/60 shrink-0" />
                        <span className="italic">Pamong Kewilayahan / Mitra Warga</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                {/* Card Footer with Order & Accessible Actions */}
                <CardFooter className="px-5 py-3 border-t border-border/50 flex items-center justify-between gap-2 bg-muted/10">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    Urutan ke-{item.sort_order + 1}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(item)}
                      className="h-8 px-2.5 text-xs font-semibold gap-1.5 hover:bg-muted"
                    >
                      <Edit2 className="size-3.5" />
                      <span>Edit</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setItemToDelete(item)}
                      className="h-8 px-2.5 text-xs font-semibold gap-1.5 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Hapus</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        /* ========================================================================= */
        /* HIGH-DENSITY DIRECTORY TABLE VIEW                                         */
        /* ========================================================================= */
        <Card className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-14 text-center font-mono text-xs">#</TableHead>
                <TableHead className="min-w-[220px] text-xs">Nama & Aparatur</TableHead>
                <TableHead className="min-w-[180px] text-xs">Jabatan & Peran</TableHead>
                <TableHead className="min-w-[160px] text-xs">NIP / Pangkat</TableHead>
                <TableHead className="text-xs">Tupoksi / Tanggung Jawab</TableHead>
                <TableHead className="min-w-[130px] text-xs">Staf / Tim</TableHead>
                <TableHead className="w-28 text-right text-xs pr-4">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredList.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/20">
                  <TableCell className="text-center font-mono text-xs text-muted-foreground tabular-nums">
                    #{item.sort_order}
                  </TableCell>

                  {/* Aparatur Identity */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 rounded-full shrink-0">
                        {item.avatar && (
                          <AvatarImage
                            src={item.avatar}
                            alt={item.name}
                            className="object-cover object-top"
                          />
                        )}
                        <AvatarFallback className="text-xs font-bold bg-muted text-foreground">
                          {item.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="font-bold text-foreground text-xs sm:text-sm truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate">
                          {item.unit || "Kelurahan Walian Dua"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Jabatan & Role Badge */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-foreground">
                        {item.title}
                      </div>
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal">
                        {item.role}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* NIP & Rank */}
                  <TableCell>
                    {item.nip || item.rank ? (
                      <div className="space-y-0.5 text-xs">
                        {item.nip && (
                          <div className="font-mono text-muted-foreground tabular-nums text-[11px]">
                            {item.nip}
                          </div>
                        )}
                        {item.rank && (
                          <div className="font-medium text-foreground text-[11px]">
                            {item.rank}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] text-muted-foreground/60 italic">-</span>
                    )}
                  </TableCell>

                  {/* Description */}
                  <TableCell>
                    <p className="text-xs text-muted-foreground line-clamp-2 max-w-md leading-relaxed">
                      {item.description || "-"}
                    </p>
                  </TableCell>

                  {/* Staff */}
                  <TableCell>
                    <span className="text-xs text-foreground">
                      {item.staff || <span className="text-muted-foreground/60 italic">-</span>}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(item)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        title="Edit data"
                      >
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setItemToDelete(item)}
                        className="h-8 w-8 p-0 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                        title="Hapus data"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* 5. Create / Edit Form Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <UserCheck className="size-4 text-emerald-600" />
              <span>{editingItem ? "Edit Data Aparatur" : "Tambah Aparatur Baru"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Lengkapi informasi identitas kedinasan, pangkat, dan tupoksi pelayanan masyarakat Walian Dua.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Foto Profil Preview & Upload Box */}
            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
              <Label className="text-xs font-semibold">Foto Profil Resmi</Label>
              <div className="flex items-center gap-4">
                <Avatar className="size-16 rounded-full shadow-xs shrink-0">
                  {form.avatar && (
                    <AvatarImage src={form.avatar} alt={form.name} className="object-cover object-top" />
                  )}
                  <AvatarFallback className="text-xs font-bold bg-muted text-foreground">
                    {form.name ? form.name.slice(0, 2).toUpperCase() : "AP"}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2 flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="text-xs h-9 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={form.avatar}
                    onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                    placeholder="Atau masukkan URL gambar (/images/...)"
                    className="text-xs h-8 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Nama & Jabatan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Nama Lengkap & Gelar *
                </Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Marlon Jhon Taroreh, A.Md.Kep."
                  className="h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs font-semibold">
                  Jabatan Kedinasan *
                </Label>
                <Input
                  id="title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Lurah Walian Dua / Sekretaris Kelurahan"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Kategori Peran & Unit Kerja */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-semibold">
                  Kategori Peran *
                </Label>
                <Input
                  id="role"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Pimpinan / Sekretariat / Seksi / Lingkungan I / LKK"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="unit" className="text-xs font-semibold">
                  Unit Organisasi / Lembaga
                </Label>
                <Input
                  id="unit"
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  placeholder="Pemerintah Kelurahan / TP-PKK"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* NIP, Pangkat & Urutan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="nip" className="text-xs font-semibold">
                  NIP (Khusus ASN/PNS)
                </Label>
                <Input
                  id="nip"
                  value={form.nip}
                  onChange={(e) => setForm({ ...form, nip: e.target.value })}
                  placeholder="19780101..."
                  className="font-mono text-xs sm:text-sm h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rank" className="text-xs font-semibold">
                  Pangkat & Golongan
                </Label>
                <Input
                  id="rank"
                  value={form.rank}
                  onChange={(e) => setForm({ ...form, rank: e.target.value })}
                  placeholder="Penata Muda / III-a"
                  className="h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sort" className="text-xs font-semibold">
                  Urutan Tampilan
                </Label>
                <Input
                  id="sort"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                  className="font-mono text-xs sm:text-sm h-9"
                />
              </div>
            </div>

            {/* Tupoksi / Deskripsi */}
            <div className="space-y-1.5">
              <Label htmlFor="desc" className="text-xs font-semibold">
                Tupoksi / Ringkasan Tanggung Jawab *
              </Label>
              <Textarea
                id="desc"
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Penjelasan kewenangan, tugas pokok, koordinasi urusan, dan pelayanan warga..."
                className="text-xs leading-relaxed"
              />
            </div>

            {/* Staf Pendamping */}
            <div className="space-y-1.5">
              <Label htmlFor="staff" className="text-xs font-semibold">
                Staf Bawahan / Anggota Tim (Opsional)
              </Label>
              <Input
                id="staff"
                value={form.staff}
                onChange={(e) => setForm({ ...form, staff: e.target.value })}
                placeholder="Contoh: David Wajongkere (Staf Administrasi)"
                className="h-9 text-xs sm:text-sm"
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
                {submitting ? "Menyimpan..." : editingItem ? "Simpan Perubahan" : "Terbitkan Data Aparatur"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 6. Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold">
              Hapus Data Aparatur?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Anda akan menghapus profil kepegawaian &ldquo;{itemToDelete?.name}&rdquo; ({itemToDelete?.title}). Data ini tidak akan lagi tampil di halaman publik portal kelurahan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Data"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
