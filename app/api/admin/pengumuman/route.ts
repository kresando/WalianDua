import { NextResponse } from "next/server"
import { getAllPengumuman, createPengumuman } from "@/lib/db/repositories/pengumuman-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET() {
  try {
    const data = await getAllPengumuman()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Fetch pengumuman error:", error)
    return NextResponse.json({ error: "Gagal memuat pengumuman" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    if (!body.title || !body.category || !body.summary) {
      return NextResponse.json(
        { error: "Judul, kategori, dan ringkasan pengumuman wajib diisi" },
        { status: 400 }
      )
    }

    const created = await createPengumuman({
      title: body.title,
      category: body.category,
      date: body.date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      summary: body.summary,
      read_time: body.read_time || "2 min baca",
      image: body.image || null,
      is_pinned: Boolean(body.is_pinned),
      sort_order: Number(body.sort_order) || 0,
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error("Create pengumuman error:", error)
    return NextResponse.json({ error: "Gagal menambahkan pengumuman" }, { status: 500 })
  }
}
