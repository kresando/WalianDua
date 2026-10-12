"use client"

import * as React from "react"
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Download, 
  X, 
  Move
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface InteractiveMapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InteractiveMapModal({ open, onOpenChange }: InteractiveMapModalProps) {
  const [zoom, setZoom] = React.useState(1)
  const [pan, setPan] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const dragStartRef = React.useRef({ x: 0, y: 0 })
  const touchStartRef = React.useRef({ x: 0, y: 0 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Reset zoom & pan when modal closes/opens
  React.useEffect(() => {
    if (!open) {
      setZoom(1)
      setPan({ x: 0, y: 0 })
      setIsDragging(false)
    }
  }, [open])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.5).toFixed(2)), 4))
  }

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(2)), 1)
      if (next === 1) setPan({ x: 0, y: 0 })
      return next
    })
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1 || e.button !== 0) return
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Wheel zoom handler with passive: false to prevent scrolling the page
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY < 0) {
        setZoom((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 4))
      } else {
        setZoom((prev) => {
          const next = Math.max(Number((prev - 0.25).toFixed(2)), 1)
          if (next === 1) setPan({ x: 0, y: 0 })
          return next
        })
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  // Touch drag support for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return
    setIsDragging(true)
    touchStartRef.current = {
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y,
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 1) return
    setPan({
      x: e.touches[0].clientX - touchStartRef.current.x,
      y: e.touches[0].clientY - touchStartRef.current.y,
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleDoubleClick = () => {
    if (zoom > 1) {
      handleReset()
    } else {
      setZoom(2)
      setPan({ x: 0, y: 0 })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false} 
        style={{ display: "flex", flexDirection: "column", maxHeight: "92vh" }}
        className="flex flex-col w-[96vw] sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl p-0 gap-0 overflow-hidden border border-border bg-card shadow-2xl rounded-2xl focus:outline-none"
      >
        {/* Header */}
        <DialogHeader className="p-4 sm:p-5 border-b border-border bg-muted/30 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="text-sm sm:text-base md:text-lg font-bold text-foreground truncate">
                  Peta Administrasi Resmi Kelurahan Walian Dua
                </DialogTitle>
                <Badge variant="outline" className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 shrink-0">
                  5 Lingkungan
                </Badge>
              </div>
              <DialogDescription className="text-[11px] sm:text-xs text-muted-foreground truncate">
                Skala 1:2.000 • KKT 149 Unsrat 2026 bersama Pemerintah Kota Tomohon
              </DialogDescription>
            </div>

            {/* Explicit, high-visibility Close Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              aria-label="Tutup peta (Esc)"
              className="size-9 rounded-full bg-background hover:bg-muted text-foreground flex items-center justify-center shrink-0 border border-border shadow-2xs transition-colors cursor-pointer"
            >
              <X className="size-4.5" />
              <span className="sr-only">Tutup</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Interactive Map Canvas Container */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
          style={{ height: "62vh", minHeight: "440px", maxHeight: "700px" }}
          className={`relative w-full bg-zinc-100/90 dark:bg-zinc-950/60 overflow-hidden select-none flex items-center justify-center ${
            zoom > 1 
              ? isDragging 
                ? "cursor-grabbing" 
                : "cursor-grab" 
              : "cursor-zoom-in"
          }`}
        >
          {/* Zoomable Image Wrapper */}
          <div 
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 150ms ease-out",
            }}
            className="w-full h-full flex items-center justify-center p-3 pointer-events-none"
          >
            {/* Native <img> with intrinsic ratio scaling */}
            <img
              src="/images/peta-walian-dua-web.webp"
              alt="Peta Administrasi Kelurahan Walian Dua Resolusi Penuh"
              className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none select-none drop-shadow-md rounded-xs"
              draggable={false}
            />
          </div>

          {/* Floating Interactive Control HUD */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-background/95 backdrop-blur-md border border-border shadow-md">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 4}
              title="Perbesar Peta (+)"
              className="size-8 p-0 rounded-lg text-foreground hover:bg-muted cursor-pointer"
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              title="Perkecil Peta (-)"
              className="size-8 p-0 rounded-lg text-foreground hover:bg-muted cursor-pointer"
            >
              <ZoomOut className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
              title="Reset Tampilan (100%)"
              className="size-8 p-0 rounded-lg text-foreground hover:bg-muted cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
            </Button>
            <div className="h-4 w-px bg-border mx-0.5" />
            <span className="text-[11px] font-mono font-semibold px-2 text-foreground tabular-nums select-none">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Interactive Guidance Hint (Desktop) */}
          <div className="hidden sm:flex absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border text-[11px] text-muted-foreground shadow-xs pointer-events-none">
            <Move className="size-3 text-foreground" />
            <span>
              {zoom > 1 
                ? "Klik & tahan kursor untuk menggeser peta" 
                : "Dobel-klik atau gunakan tombol zoom untuk memperbesar"}
            </span>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-3 sm:p-4 border-t border-border bg-muted/20 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">
            Menampilkan batas resmi Lingkungan I–V, jaringan jalan, kantor kelurahan, puskesmas pembantu, dan rumah ibadah.
          </p>

          <div className="flex items-center gap-2 justify-end shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs h-9 px-3.5 cursor-pointer"
            >
              Tutup Peta
            </Button>
            <a
              href="/images/peta-walian-dua.png"
              download="Peta-Administrasi-Kelurahan-Walian-Dua-2026.png"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 h-9 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold transition-colors"
            >
              <Download className="size-3.5" />
              <span>Unduh Master 4K</span>
            </a>
            <a
              href="/images/peta-walian-dua.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 h-9 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors shadow-xs"
            >
              <Maximize2 className="size-3.5" />
              <span>Buka Tab Penuh</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
