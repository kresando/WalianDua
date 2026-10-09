/**
 * Robust in-memory sliding window rate limiter for Next.js App Router API routes.
 * Tracks client IP requests and enforces maximum attempt limits per time window.
 */

interface RateLimitRecord {
  timestamps: number[]
}

interface RateLimitConfig {
  /** Maximum number of allowed requests in the window */
  maxRequests: number
  /** Time window in seconds */
  windowSeconds: number
}

class MemoryRateLimiter {
  private store: Map<string, RateLimitRecord> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Periodically clean up stale entries every 5 minutes
    if (typeof setInterval !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000)
      if (this.cleanupInterval.unref) {
        this.cleanupInterval.unref()
      }
    }
  }

  /**
   * Check if a client IP is within the rate limit.
   */
  public check(
    ip: string,
    action: string,
    config: RateLimitConfig
  ): {
    allowed: boolean
    limit: number
    remaining: number
    retryAfterSeconds: number
  } {
    const key = `${action}:${ip}`
    const now = Date.now()
    const windowMs = config.windowSeconds * 1000
    const windowStart = now - windowMs

    const record = this.store.get(key) || { timestamps: [] }

    // Filter out timestamps outside the active sliding window
    const recentTimestamps = record.timestamps.filter((ts) => ts > windowStart)

    if (recentTimestamps.length >= config.maxRequests) {
      const oldestInWindow = recentTimestamps[0]
      const retryAfterSeconds = Math.max(1, Math.ceil((oldestInWindow + windowMs - now) / 1000))
      return {
        allowed: false,
        limit: config.maxRequests,
        remaining: 0,
        retryAfterSeconds,
      }
    }

    // Record the current attempt
    recentTimestamps.push(now)
    this.store.set(key, { timestamps: recentTimestamps })

    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - recentTimestamps.length,
      retryAfterSeconds: 0,
    }
  }

  /**
   * Reset rate limit for an IP upon successful action (e.g., successful login)
   */
  public reset(ip: string, action: string) {
    const key = `${action}:${ip}`
    this.store.delete(key)
  }

  private cleanup() {
    const now = Date.now()
    const maxWindowMs = 60 * 60 * 1000 // 1 hour max retention
    for (const [key, record] of this.store.entries()) {
      const active = record.timestamps.filter((ts) => ts > now - maxWindowMs)
      if (active.length === 0) {
        this.store.delete(key)
      } else {
        this.store.set(key, { timestamps: active })
      }
    }
  }
}

export const rateLimiter = new MemoryRateLimiter()

/**
 * Helper to safely extract client IP from Next.js request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  const realIp = request.headers.get("x-real-ip")
  if (realIp) {
    return realIp.trim()
  }
  return "127.0.0.1"
}
