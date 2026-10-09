import { NextResponse } from "next/server"
import { getCurrentAdminUser } from "@/lib/auth/auth"
import path from "node:path"
import fs from "node:fs/promises"
import crypto from "node:crypto"

/**
 * Validates binary magic numbers (file signatures) to prevent MIME spoofing,
 * Polyglot files, and Stored XSS attacks (e.g. SVG/HTML disguised as images).
 */
function detectSafeImageType(buffer: Buffer): { ext: string; mime: string } | null {
  if (buffer.length < 12) return null

  // JPEG signature: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: ".jpg", mime: "image/jpeg" }
  }

  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { ext: ".png", mime: "image/png" }
  }

  // WebP signature: RIFF....WEBP (52 49 46 46 .... 57 45 42 50)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { ext: ".webp", mime: "image/webp" }
  }

  // GIF signature: GIF87a or GIF89a (47 49 46 38)
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    return { ext: ".gif", mime: "image/gif" }
  }

  return null
}

export async function POST(request: Request) {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 })
    }

    // Enforce strict file size limit (5MB)
    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran berkas melebihi batas maksimal 5MB" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Deep binary magic bytes inspection (do NOT trust client-sent file.type or file.name)
    const detected = detectSafeImageType(buffer)
    if (!detected) {
      return NextResponse.json(
        {
          error: "Format berkas tidak valid atau berbahaya. Hanya gambar JPG, PNG, dan WEBP asli yang diizinkan.",
        },
        { status: 400 }
      )
    }

    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads")
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate cryptographically random, collision-resistant UUID filename to prevent path traversal
    const uniqueId = crypto.randomUUID().replace(/-/g, "")
    const safeFileName = `upload_${uniqueId}${detected.ext}`
    const filePath = path.join(uploadsDir, safeFileName)

    await fs.writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/images/uploads/${safeFileName}`,
      mimeType: detected.mime,
      size: file.size,
    })
  } catch (error) {
    console.error("Secure upload error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan internal saat memproses unggahan berkas" },
      { status: 500 }
    )
  }
}
