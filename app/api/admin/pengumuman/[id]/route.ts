import { NextResponse } from "next/server"
import { getPengumumanById, updatePengumuman, deletePengumuman } from "@/lib/db/repositories/pengumuman-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await getPengumumanById(Number(id))
    if (!item) {
      return NextResponse.json({ error: "Pengumuman tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ data: item })
  } catch (error) {
    console.error("Get pengumuman error:", error)
    return NextResponse.json({ error: "Gagal memuat detail pengumuman" }, { status: 500 })
  }
}

export async function PUT(
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

    const updated = await updatePengumuman(Number(id), {
      title: body.title,
      category: body.category,
      date: body.date,
      summary: body.summary,
      read_time: body.read_time,
      image: body.image,
      is_pinned: body.is_pinned !== undefined ? Boolean(body.is_pinned) : undefined,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    })

    if (!updated) {
      return NextResponse.json({ error: "Pengumuman tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Update pengumuman error:", error)
    return NextResponse.json({ error: "Gagal memperbarui pengumuman" }, { status: 500 })
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
    const success = await deletePengumuman(Number(id))
    if (!success) {
      return NextResponse.json({ error: "Pengumuman tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Pengumuman berhasil dihapus" })
  } catch (error) {
    console.error("Delete pengumuman error:", error)
    return NextResponse.json({ error: "Gagal menghapus pengumuman" }, { status: 500 })
  }
}
