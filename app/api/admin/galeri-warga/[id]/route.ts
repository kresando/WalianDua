import { NextResponse } from "next/server"
import { getGaleriWargaById, updateGaleriWarga, deleteGaleriWarga } from "@/lib/db/repositories/galeri-warga-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await getGaleriWargaById(Number(id))
    if (!item) {
      return NextResponse.json({ error: "Item galeri warga tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ data: item })
  } catch (error) {
    console.error("Get galeri warga error:", error)
    return NextResponse.json({ error: "Gagal memuat detail galeri warga" }, { status: 500 })
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

    const updated = await updateGaleriWarga(Number(id), {
      title: body.title,
      category: body.category,
      description: body.description,
      highlight: body.highlight,
      image: body.image,
      author_or_contributor: body.author_or_contributor,
      date: body.date,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    })

    if (!updated) {
      return NextResponse.json({ error: "Item galeri warga tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Update galeri warga error:", error)
    return NextResponse.json({ error: "Gagal memperbarui galeri warga" }, { status: 500 })
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
    const success = await deleteGaleriWarga(Number(id))
    if (!success) {
      return NextResponse.json({ error: "Item galeri warga tidak ditemukan" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Foto galeri warga berhasil dihapus" })
  } catch (error) {
    console.error("Delete galeri warga error:", error)
    return NextResponse.json({ error: "Gagal menghapus item galeri warga" }, { status: 500 })
  }
}
