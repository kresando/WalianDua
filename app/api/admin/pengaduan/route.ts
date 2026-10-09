import { NextResponse } from "next/server"
import { getAllPengaduan, createPengaduan } from "@/lib/db/repositories/pengaduan-repo"
import { getCurrentAdminUser } from "@/lib/auth/auth"
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter"

function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return ""
  return input
    .replace(/[<>]/g, "") // Strip potential HTML tags
    .trim()
    .slice(0, maxLength)
}

export async function GET() {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await getAllPengaduan()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Fetch pengaduan error:", error)
    return NextResponse.json({ error: "Gagal memuat aduan warga" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request)

    // Rate limit public submissions: max 5 requests per 10 minutes (600 seconds)
    const rateCheck = rateLimiter.check(clientIp, "submit-pengaduan", {
      maxRequests: 5,
      windowSeconds: 600,
    })

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak pengiriman laporan. Silakan coba kembali dalam ${rateCheck.retryAfterSeconds} detik.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds),
          },
        }
      )
    }

    const body = await request.json()

    const rawName = sanitizeString(body.name, 100)
    const rawNeighborhood = sanitizeString(body.neighborhood, 50)
    const rawCategory = sanitizeString(body.category || "Layanan Dokumen", 50)
    const rawPhone = sanitizeString(body.phone, 25)
    const rawMessage = sanitizeString(body.message, 2000)

    if (!rawName || rawName.length < 2) {
      return NextResponse.json(
        { error: "Nama pelapor wajib diisi (minimal 2 karakter)" },
        { status: 400 }
      )
    }

    if (!rawNeighborhood) {
      return NextResponse.json(
        { error: "Wilayah lingkungan wajib dipilih" },
        { status: 400 }
      )
    }

    if (!rawMessage || rawMessage.length < 5) {
      return NextResponse.json(
        { error: "Isi laporan wajib diisi secara jelas (minimal 5 karakter)" },
        { status: 400 }
      )
    }

    const created = await createPengaduan({
      name: rawName,
      phone: rawPhone || null,
      neighborhood: rawNeighborhood,
      category: rawCategory,
      message: rawMessage,
      status: "BARU",
      notes: null,
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error("Create pengaduan error:", error)
    return NextResponse.json({ error: "Gagal menyimpan laporan warga" }, { status: 500 })
  }
}
