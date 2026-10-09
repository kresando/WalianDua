"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Camera,
  FileText,
  Bell,
  MessageSquare,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  ChevronRight,
  User,
  Home,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Ringkasan Dasbor", icon: LayoutDashboard },
  { href: "/admin/aparatur", label: "Aparatur & Pamong", icon: Users },
  { href: "/admin/galeri-warga", label: "Galeri Warga", icon: Camera },
  { href: "/admin/layanan", label: "Layanan Publik", icon: FileText },
  { href: "/admin/pengumuman", label: "Pengumuman", icon: Bell },
  { href: "/admin/pengaduan", label: "Aspirasi & Laporan", icon: MessageSquare },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [adminUser, setAdminUser] = React.useState<{ name: string; username: string } | null>(null)
  const [loadingAuth, setLoadingAuth] = React.useState(true)

  React.useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) {
          router.push("/admin/login")
          return
        }
        const data = await res.json()
        setAdminUser(data.user)
      } catch {
        router.push("/admin/login")
      } finally {
        setLoadingAuth(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (e) {
      console.error("Logout failed:", e)
    }
  }

  // Determine current active page label for breadcrumbs
  const currentNavItem = NAV_ITEMS.find((item) => item.href === pathname)
  const isRootDashboard = pathname === "/admin"

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="size-10 rounded-xl bg-foreground text-background flex items-center justify-center animate-pulse">
          <ShieldCheck className="size-5" />
        </div>
        <div className="space-y-2 text-center">
          <Skeleton className="h-4 w-40 mx-auto" />
          <Skeleton className="h-3 w-28 mx-auto" />
        </div>
      </div>
    )
  }

  const renderNavLinks = (onNavigate?: () => void) => (
    <nav className="p-3 space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onNavigate?.()}
            className={`flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? "bg-foreground text-background shadow-xs font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`size-4 ${isActive ? "text-background" : "text-muted-foreground"}`} />
              <span>{item.label}</span>
            </div>
            {isActive && <ChevronRight className="size-3.5 text-background/80" />}
          </Link>
        )
      })}
    </nav>
  )

  const renderSidebarContent = (onNavigate?: () => void) => (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="size-10 rounded-xl bg-foreground text-background flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight block text-foreground">
              Walian Dua
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              Panel Kelola Kelurahan
            </span>
          </div>
        </div>

        {/* Links */}
        {renderNavLinks(onNavigate)}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border space-y-3">
        {adminUser && (
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/50">
            <Avatar className="size-8">
              <AvatarFallback className="text-[11px] font-bold bg-foreground text-background">
                {adminUser.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-muted-foreground block truncate">
                Petugas Aktif:
              </span>
              <strong className="text-xs text-foreground block truncate">
                {adminUser.name}
              </strong>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="size-3.5" />
            <span>Lihat Web Warga</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
          >
            <LogOut className="size-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-muted/20 flex antialiased text-foreground">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 bg-card border-r border-border flex-col shrink-0 sticky top-0 h-screen z-30">
        {renderSidebarContent()}
      </aside>

      {/* Main Body Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Admin Header Bar */}
        <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-md border-b border-border px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Sheet Trigger */}
            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-9 shrink-0"
                      aria-label="Buka Menu Navigasi"
                    />
                  }
                >
                  <Menu className="size-4" />
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 bg-card">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigasi Dasbor Kelurahan</SheetTitle>
                  </SheetHeader>
                  {renderSidebarContent(() => setMobileOpen(false))}
                </SheetContent>
              </Sheet>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb className="hidden sm:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin" className="flex items-center gap-1.5 text-xs font-medium">
                    <Home className="size-3.5" />
                    <span>Dasbor</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isRootDashboard && currentNavItem && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-xs font-semibold">
                        {currentNavItem.label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>

            {/* Mobile Title View */}
            <span className="sm:hidden text-xs font-bold truncate">
              {currentNavItem ? currentNavItem.label : "Dasbor Walian Dua"}
            </span>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted/60 transition-colors"
            >
              <ExternalLink className="size-3.5" />
              <span>Lihat Portal Publik</span>
            </Link>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted/80 text-left h-auto min-h-[40px]"
                  />
                }
              >
                <Avatar className="size-8">
                  <AvatarFallback className="text-[11px] font-bold bg-foreground text-background">
                    {adminUser ? adminUser.name.slice(0, 2).toUpperCase() : "WD"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold leading-tight text-foreground truncate max-w-[120px]">
                    {adminUser?.name || "Administrator"}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight">
                    Pamong Praja
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-2 py-1.5">
                    <span className="text-xs font-bold block text-foreground">
                      {adminUser?.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-normal">
                      @{adminUser?.username} • Kelurahan Walian Dua
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => window.open("/", "_blank")}
                  className="flex items-center gap-2 text-xs cursor-pointer"
                >
                  <ExternalLink className="size-3.5" />
                  <span>Buka Web Kelurahan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                >
                  <LogOut className="size-3.5" />
                  <span>Keluar Sistem</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
