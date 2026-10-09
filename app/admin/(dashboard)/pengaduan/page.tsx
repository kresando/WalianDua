"use client"

import * as React from "react"
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Phone,
  Search,
  Check,
  Edit3,
  Calendar,
  User,
  MapPin,
  ExternalLink,
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

import { PengaduanRecord } from "@/lib/db/schema"

export default function PengaduanAdminPage() {
  const [list, setList] = React.useState<PengaduanRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [filter, setFilter] = React.useState<"SEMUA" | "BARU" | "DIPROSES" | "SELESAI">("SEMUA")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Dialog State for Follow-up / Notes
  const [actionItem, setActionItem] = React.useState<PengaduanRecord | null>(null)
  const [statusVal, setStatusVal] = React.useState<"BARU" | "DIPROSES" | "SELESAI">("BARU")
  const [notesVal, setNotesVal] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  // Delete Alert Dialog State
  const [deleteId, setDeleteId] = React.useState<number | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/pengaduan")
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

  const openActionDialog = (item: PengaduanRecord) => {
    setActionItem(item)
    setStatusVal(item.status)
    setNotesVal(item.notes || "")
  }

  const handleSaveAction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!actionItem) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/pengaduan/${actionItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusVal, notes: notesVal }),
      })
      if (!res.ok) throw new Error("Gagal memperbarui status dan catatan")

      setMessage({
        type: "success",
        text: `Status laporan #${actionItem.id} berhasil diubah ke ${statusVal} dengan catatan kelurahan.`,
      })
      setActionItem(null)
      loadData()
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Terjadi kesalahan sistem",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/pengaduan/${deleteId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Gagal menghapus laporan")
      setMessage({ type: "success", text: `Laporan aduan #${deleteId} berhasil dihapus.` })
      setDeleteId(null)
      loadData()
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menghapus laporan",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredList = React.useMemo(() => {
    return list.filter((item) => {
      const matchesFilter = filter === "SEMUA" || item.status === filter
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.phone && item.phone.includes(searchQuery)) ||
        item.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [list, filter, searchQuery])

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Aspirasi & Laporan Warga (Halo Lurah)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Pantau dan tindak lanjuti laporan pelayanan, fasilitas publik, dan ketertiban lingkungan Walian Dua.
          </p>
        </div>
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

      {/* 2. Controls: Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card">
        {/* Status Tabs */}
        <Tabs
          value={filter}
          onValueChange={(val) => setFilter(val as typeof filter)}
          className="w-full md:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full md:w-auto h-9">
            <TabsTrigger value="SEMUA" className="text-xs font-semibold">
              Semua ({list.length})
            </TabsTrigger>
            <TabsTrigger value="BARU" className="text-xs font-semibold">
              Baru ({list.filter((a) => a.status === "BARU").length})
            </TabsTrigger>
            <TabsTrigger value="DIPROSES" className="text-xs font-semibold">
              Diproses ({list.filter((a) => a.status === "DIPROSES").length})
            </TabsTrigger>
            <TabsTrigger value="SELESAI" className="text-xs font-semibold">
              Selesai ({list.filter((a) => a.status === "SELESAI").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search Field */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, nomor HP, atau isi pesan..."
            className="pl-9 h-9 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* 3. Reports List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-28" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <Empty className="py-16 border border-dashed border-border rounded-2xl bg-card">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquare className="size-5" />
            </EmptyMedia>
            <EmptyTitle className="text-sm font-semibold">
              Tidak Ada Laporan Warga
            </EmptyTitle>
            <EmptyDescription className="text-xs text-muted-foreground">
              {searchQuery
                ? `Tidak ditemukan laporan yang cocok dengan kata kunci "${searchQuery}".`
                : `Belum ada aspirasi warga dengan status ${filter}.`}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="space-y-4">
          {filteredList.map((item) => {
            const cleanPhone = item.phone ? item.phone.replace(/[^0-9]/g, "") : null
            const waUrl = cleanPhone
              ? `https://wa.me/${cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone}?text=Halo%20Bpk/Ibu%20${encodeURIComponent(item.name)},%20Pemerintah%20Kelurahan%20Walian%20Dua%20menindaklanjuti%20laporan%20Anda:%20"${encodeURIComponent(item.message.slice(0, 80))}..."`
              : null

            return (
              <Card
                key={item.id}
                className="rounded-2xl border-border bg-card shadow-xs hover:border-foreground/30 transition-all duration-200"
              >
                <CardHeader className="p-5 sm:p-6 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-base text-foreground">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-3" />
                        {item.neighborhood}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-semibold">
                        {item.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold px-2.5 py-0.5 ${
                          item.status === "SELESAI"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                            : item.status === "DIPROSES"
                            ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 sm:px-6 py-2 space-y-3">
                  {/* Message Quote */}
                  <div className="bg-muted/40 p-4 rounded-xl border border-border/70 text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                    &ldquo;{item.message}&rdquo;
                  </div>

                  {/* Kelurahan Notes if present */}
                  {item.notes && (
                    <div className="text-xs bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-lg border-l-3 border-emerald-600 text-foreground space-y-1">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-[11px]">
                        Catatan Tindak Lanjut Kelurahan:
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.notes}
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="px-5 sm:px-6 py-4 pt-3 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 text-muted-foreground text-[11px] tabular-nums">
                    {item.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="size-3" />
                        <strong className="text-foreground">{item.phone}</strong>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-2xs"
                      >
                        <Phone className="size-3.5" />
                        <span>Balas WhatsApp</span>
                      </a>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openActionDialog(item)}
                      className="min-h-[38px] text-xs font-semibold gap-1.5"
                    >
                      <Edit3 className="size-3.5" />
                      <span>Tindak Lanjut & Catatan</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                      className="size-9 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive shrink-0"
                      title="Hapus Laporan"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      {/* 4. Follow-up Dialog Modal */}
      <Dialog open={!!actionItem} onOpenChange={(open) => !open && setActionItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Tindak Lanjut Laporan #{actionItem?.id}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Perbarui status aduan warga dan tambahkan catatan investigasi/koordinasi kelurahan.
            </DialogDescription>
          </DialogHeader>

          {actionItem && (
            <form onSubmit={handleSaveAction} className="space-y-4 py-2">
              <div className="text-xs bg-muted/40 p-3 rounded-lg border border-border">
                <span className="font-semibold block text-foreground">
                  Pelapor: {actionItem.name} ({actionItem.neighborhood})
                </span>
                <p className="text-muted-foreground truncate mt-0.5">
                  &ldquo;{actionItem.message}&rdquo;
                </p>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Status Tindak Lanjut *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(["BARU", "DIPROSES", "SELESAI"] as const).map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setStatusVal(st)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        statusVal === st
                          ? st === "SELESAI"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : st === "DIPROSES"
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Input */}
              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs font-semibold">
                  Catatan Tindak Lanjut Kelurahan
                </Label>
                <Textarea
                  id="notes"
                  rows={3}
                  value={notesVal}
                  onChange={(e) => setNotesVal(e.target.value)}
                  placeholder="Contoh: Sudah dikoordinasikan dengan Kepala Lingkungan II, lampu jalan telah diganti oleh dinas terkait..."
                  className="text-xs leading-relaxed"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActionItem(null)}
                  disabled={submitting}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Menyimpan..." : "Simpan Tindak Lanjut"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 5. Delete Alert Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold">
              Hapus Laporan Aduan Warga?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Data laporan aduan #{deleteId} akan dihapus secara permanen dari basis data administrasi kelurahan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Laporan"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
