import { NextResponse } from "next/server"
import { getAparaturById, updateAparatur, deleteAparatur } from "@/lib/db/repositories/aparatur-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await getAparaturById(Number(id))
    if (!item) {
      return NextResponse.json({ error: "Data aparatur tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ data: item })
  } catch (error) {
    console.error("Get aparatur error:", error)
    return NextResponse.json({ error: "Gagal memuat detail aparatur" }, { status: 500 })
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

    const updated = await updateAparatur(Number(id), {
      name: body.name,
      role: body.role,
      title: body.title,
      rank: body.rank,
      nip: body.nip,
      description: body.description,
      staff: body.staff,
      avatar: body.avatar,
      unit: body.unit,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    })

    if (!updated) {
      return NextResponse.json({ error: "Data aparatur tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Update aparatur error:", error)
    return NextResponse.json({ error: "Gagal memperbarui data aparatur" }, { status: 500 })
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
    const success = await deleteAparatur(Number(id))
    if (!success) {
      return NextResponse.json({ error: "Data aparatur tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Aparatur berhasil dihapus" })
  } catch (error) {
    console.error("Delete aparatur error:", error)
    return NextResponse.json({ error: "Gagal menghapus data aparatur" }, { status: 500 })
  }
}
