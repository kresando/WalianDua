import { NextResponse } from "next/server"
import { getCurrentAdminUser } from "@/lib/auth/auth"
import { getAdminProfile } from "@/lib/db/repositories/admin-user-repo"

export async function GET() {
  const session = await getCurrentAdminUser()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await getAdminProfile(session.username)

  if (!user) {
    return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 })
  }

  return NextResponse.json({ user })
}
