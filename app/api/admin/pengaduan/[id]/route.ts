import { NextResponse } from "next/server"
import { updatePengaduanStatus, deletePengaduan } from "@/lib/db/repositories/pengaduan-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    if (!body.status || !["BARU", "DIPROSES", "SELESAI"].includes(body.status)) {
      return NextResponse.json(
        { error: "Status harus salah satu dari: BARU, DIPROSES, SELESAI" },
        { status: 400 }
      )
    }

    const updated = await updatePengaduanStatus(Number(id), body.status, body.notes)
    if (!updated) {
      return NextResponse.json({ error: "Laporan aduan tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Update pengaduan status error:", error)
    return NextResponse.json({ error: "Gagal memperbarui status laporan" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const success = await deletePengaduan(Number(id))
    if (!success) {
      return NextResponse.json({ error: "Laporan aduan tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Laporan aduan berhasil dihapus" })
  } catch (error) {
    console.error("Delete pengaduan error:", error)
    return NextResponse.json({ error: "Gagal menghapus laporan aduan" }, { status: 500 })
  }
}
