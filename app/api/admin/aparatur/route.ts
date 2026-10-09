import { NextResponse } from "next/server"
import { getAllAparatur, createAparatur } from "@/lib/db/repositories/aparatur-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"

export async function GET() {
  try {
    const data = await getAllAparatur()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Fetch aparatur error:", error)
    return NextResponse.json({ error: "Gagal memuat data aparatur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    if (!body.name || !body.role || !body.title) {
      return NextResponse.json(
        { error: "Nama, peran (role), dan jabatan (title) wajib diisi" },
        { status: 400 }
      )
    }

    const created = await createAparatur({
      name: body.name,
      role: body.role,
      title: body.title,
      rank: body.rank || null,
      nip: body.nip || null,
      description: body.description || "",
      staff: body.staff || null,
      avatar: body.avatar || null,
      unit: body.unit || "Pemerintah Kelurahan",
      sort_order: Number(body.sort_order) || 0,
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error("Create aparatur error:", error)
    return NextResponse.json({ error: "Gagal menambahkan aparatur" }, { status: 500 })
  }
}
