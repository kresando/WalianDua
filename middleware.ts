import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "walian_admin_session"

// Public API endpoints under /api/admin that do not require authentication for GET requests
const PUBLIC_GET_ADMIN_APIS = [
  "/api/admin/aparatur",
  "/api/admin/galeri-warga",
  "/api/admin/layanan",
  "/api/admin/pengumuman",
]

/**
 * Validates HMAC-SHA256 signature using Web Crypto API compatible across Edge and Node runtimes
 */
async function verifyTokenWebCrypto(token: string, secret: string): Promise<{ username: string } | null> {
  try {
    const parts = token.split(".")
    if (parts.length !== 2) return null
    const [payloadB64, signatureB64] = parts

    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    )

    // Base64URL decoding
    const base64 = signatureB64.replace(/-/g, "+").replace(/_/g, "/")
    const pad = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4))
    const rawSig = Uint8Array.from(atob(base64 + pad), (c) => c.charCodeAt(0))

    const dataToVerify = encoder.encode(payloadB64)
    const isValid = await crypto.subtle.verify("HMAC", key, rawSig, dataToVerify)
    if (!isValid) return null

    // Decode and parse payload
    const payloadStr = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
    const payload = JSON.parse(payloadStr)

    if (typeof payload.exp !== "number" || Date.now() > payload.exp) {
      return null
    }

    if (typeof payload.username !== "string") {
      return null
    }

    return { username: payload.username }
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const secret = process.env.SESSION_SECRET || "walian_dua_secret_jwt_key_95439"

  // 1. Allow login page unconditionally
  if (pathname === "/admin/login") {
    // If user is already authenticated, redirect them directly to dashboard
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
    if (token) {
      const valid = await verifyTokenWebCrypto(token, secret)
      if (valid) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
    }
    return NextResponse.next()
  }

  // 2. Protect Admin Dashboard Pages (/admin, /admin/aparatur, etc.)
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }

    const verified = await verifyTokenWebCrypto(token, secret)
    if (!verified) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      const res = NextResponse.redirect(loginUrl)
      // Clear invalid cookie
      res.cookies.delete(SESSION_COOKIE_NAME)
      return res
    }

    return NextResponse.next()
  }

  // 3. Protect Admin API Routes (/api/admin/*)
  if (pathname.startsWith("/api/admin")) {
    // A. Public catalog read endpoints (GET /api/admin/aparatur, etc.)
    if (request.method === "GET") {
      const isPublicGet = PUBLIC_GET_ADMIN_APIS.some(
        (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
      )
      if (isPublicGet) {
        return NextResponse.next()
      }
    }

    // C. All other admin operations (MUTATIONS or sensitive GETs) REQUIRE valid session
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 })
    }

    const verified = await verifyTokenWebCrypto(token, secret)
    if (!verified) {
      return NextResponse.json({ error: "Session invalid or expired" }, { status: 401 })
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
}
