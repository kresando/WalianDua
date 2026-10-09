import { NextResponse } from "next/server"
import { getAllGaleriWarga, createGaleriWarga } from "@/lib/db/repositories/galeri-warga-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET() {
  try {
    const data = await getAllGaleriWarga()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Fetch galeri warga error:", error)
    return NextResponse.json({ error: "Gagal memuat galeri warga" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    if (!body.title || !body.category || !body.image) {
      return NextResponse.json(
        { error: "Judul kegiatan, kategori, dan foto wajib diisi" },
        { status: 400 }
      )
    }

    const created = await createGaleriWarga({
      title: body.title,
      category: body.category,
      description: body.description || "",
      highlight: body.highlight || null,
      image: body.image,
      author_or_contributor: body.author_or_contributor || null,
      date: body.date || null,
      sort_order: Number(body.sort_order) || 0,
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error("Create galeri warga error:", error)
    return NextResponse.json({ error: "Gagal menambahkan foto galeri warga" }, { status: 500 })
  }
}
