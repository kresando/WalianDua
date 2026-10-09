import { NextResponse } from "next/server"
import { getAllLayanan, createLayanan } from "@/lib/db/repositories/layanan-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET() {
  try {
    const data = await getAllLayanan()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Fetch layanan error:", error)
    return NextResponse.json({ error: "Gagal memuat layanan publik" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    if (!body.code || !body.title || !body.category) {
      return NextResponse.json(
        { error: "Kode layanan, judul, dan kategori wajib diisi" },
        { status: 400 }
      )
    }

    const created = await createLayanan({
      code: body.code,
      title: body.title,
      category: body.category,
      description: body.description || "",
      processing_time: body.processing_time || "1 Hari Kerja",
      cost: body.cost || "Gratis (Rp 0)",
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      flow: Array.isArray(body.flow) ? body.flow : [],
      is_online_available: Boolean(body.is_online_available),
      sort_order: Number(body.sort_order) || 0,
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error("Create layanan error:", error)
    return NextResponse.json({ error: "Gagal menambahkan layanan publik" }, { status: 500 })
  }
}
