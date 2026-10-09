import crypto from "node:crypto"
import { cookies } from "next/headers"

const ADMIN_SALT = process.env.ADMIN_SALT || "walian_dua_salt_2026_tomohon"
const SESSION_COOKIE_NAME = "walian_admin_session"
const SESSION_SECRET = process.env.SESSION_SECRET || "walian_dua_secret_jwt_key_95439"

/**
 * Derives a secure password hash using PBKDF2-HMAC-SHA512.
 */
export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, ADMIN_SALT, 10000, 64, "sha512").toString("hex")
}

/**
 * Constant-time password verification to prevent timing attack vulnerabilities.
 * Safely guards against buffer length mismatch exceptions.
 */
export function verifyPassword(password: string, hash: string): boolean {
  try {
    const computed = hashPassword(password)
    const bufComputed = Buffer.from(computed, "hex")
    const bufHash = Buffer.from(hash, "hex")

    if (bufComputed.length !== bufHash.length) {
      return false
    }

    return crypto.timingSafeEqual(bufComputed, bufHash)
  } catch {
    return false
  }
}

/**
 * Signs and creates a cryptographically authenticated session token (HMAC-SHA256).
 */
export function createSessionToken(username: string): string {
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  }
  const serialized = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(serialized)
    .digest("base64url")
  return `${serialized}.${signature}`
}

/**
 * Constant-time verification of session tokens and expiry validation.
 */
export function verifySessionToken(token: string): { username: string } | null {
  try {
    const [payloadB64, signature] = token.split(".")
    if (!payloadB64 || !signature) return null

    const expectedSig = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadB64)
      .digest("base64url")

    const bufSig = Buffer.from(signature)
    const bufExpected = Buffer.from(expectedSig)

    if (bufSig.length !== bufExpected.length) {
      return null
    }

    if (!crypto.timingSafeEqual(bufSig, bufExpected)) {
      return null
    }

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"))
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

export async function getCurrentAdminUser(): Promise<{ username: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export { SESSION_COOKIE_NAME }
