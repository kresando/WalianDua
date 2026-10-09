import { NextResponse } from "next/server"
import { getLayananById, updateLayanan, deleteLayanan } from "@/lib/db/repositories/layanan-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await getLayananById(Number(id))
    if (!item) {
      return NextResponse.json({ error: "Layanan tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ data: item })
  } catch (error) {
    console.error("Get layanan error:", error)
    return NextResponse.json({ error: "Gagal memuat detail layanan" }, { status: 500 })
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

    const updated = await updateLayanan(Number(id), {
      code: body.code,
      title: body.title,
      category: body.category,
      description: body.description,
      processing_time: body.processing_time,
      cost: body.cost,
      requirements: Array.isArray(body.requirements) ? body.requirements : undefined,
      flow: Array.isArray(body.flow) ? body.flow : undefined,
      is_online_available: body.is_online_available !== undefined ? Boolean(body.is_online_available) : undefined,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    })

    if (!updated) {
      return NextResponse.json({ error: "Layanan tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Update layanan error:", error)
    return NextResponse.json({ error: "Gagal memperbarui layanan" }, { status: 500 })
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
    const success = await deleteLayanan(Number(id))
    if (!success) {
      return NextResponse.json({ error: "Layanan tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Layanan berhasil dihapus" })
  } catch (error) {
    console.error("Delete layanan error:", error)
    return NextResponse.json({ error: "Gagal menghapus layanan" }, { status: 500 })
  }
}
