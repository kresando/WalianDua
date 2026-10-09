import { NextResponse } from "next/server"
import { getAdminByUsername } from "@/lib/db/repositories/admin-user-repo"
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/auth"
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter"

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request)

    // Check rate limit: 5 login attempts per 15 minutes (900 seconds)
    const rateCheck = rateLimiter.check(clientIp, "admin-login", {
      maxRequests: 5,
      windowSeconds: 900,
    })

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan login gagal. Silakan coba kembali dalam ${rateCheck.retryAfterSeconds} detik.`,
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
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi" },
        { status: 400 }
      )
    }

    const user = await getAdminByUsername(username)

    if (!user) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      )
    }

    const isMatch = verifyPassword(password, user.password_hash)
    if (!isMatch) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      )
    }

    // Reset rate limit on successful authentication
    rateLimiter.reset(clientIp, "admin-login")

    const token = createSessionToken(user.username)
    const response = NextResponse.json({
      success: true,
      user: {
        username: user.username,
        name: user.name,
        role: user.role,
      },
    })

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat login" },
      { status: 500 }
    )
  }
}
