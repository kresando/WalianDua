"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, User, ArrowLeft, Loader2, AlertCircle } from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Gagal masuk ke sistem")
      }

      router.push("/admin")
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Terjadi kesalahan sistem")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center p-4 sm:p-6 antialiased">
      <div className="w-full max-w-md space-y-4">
        {/* Back Link to Public Website */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Halaman Warga</span>
        </Link>

        {/* Secure Login Card */}
        <Card className="rounded-2xl shadow-sm border-border bg-card">
          <CardHeader className="space-y-2 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                  Panel Kelola Kelurahan
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Walian Dua • Tomohon Selatan
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 pb-6 space-y-4">
            {error && (
              <Alert variant="destructive" className="py-2.5">
                <AlertCircle className="size-4" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-semibold text-foreground">
                  Nama Pengguna (Username)
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username admin"
                    className="h-10 pr-9 text-xs sm:text-sm"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                  Kata Sandi (Password)
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-10 pr-9 text-xs sm:text-sm"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-xs font-bold tracking-wide uppercase mt-2 gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Memverifikasi Sesi...</span>
                  </>
                ) : (
                  <span>Masuk ke Panel Kelola</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer info */}
        <p className="text-center text-xs text-muted-foreground">
          Pemerintah Kelurahan Walian Dua &copy; 2026
        </p>
      </div>
    </div>
  )
}
