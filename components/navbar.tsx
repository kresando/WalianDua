"use client"

import * as React from "react"
import Image from "next/image"
import { LayoutGroup } from "framer-motion"
import {
  Home,
  FileText,
  Landmark,
  Users,
  HelpCircle,
  Phone,
  ChevronDown,
  Check,
} from "lucide-react"

import type { NotchItemData } from "@/components/ui/adaptive-notch-navigation-bar"
import {
  NotchItem,
  NotchLeftWing,
  NotchRightWing,
  NotchCornerLeftWing,
  NotchCornerRightWing,
} from "@/components/ui/adaptive-notch-navigation-bar"

const NAV_ITEMS: NotchItemData[] = [
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "layanan", label: "Layanan Warga", icon: FileText },
  { id: "profil", label: "Profil & Wilayah", icon: Landmark },
  { id: "galeri-warga", label: "Galeri Warga", icon: Users },
  { id: "faq", label: "Tanya Jawab", icon: HelpCircle },
]

export function Navbar() {
  const [activeId, setActiveId] = React.useState<string>("beranda")
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Scroll spy & scroll elevation detection
  React.useEffect(() => {
    const sectionIds = ["beranda", "layanan", "profil", "galeri-warga", "faq"]

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const scrollPosition = window.scrollY + 140

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveId(id)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleSelect = (id: string) => {
    setActiveId(id)
    setIsDropdownOpen(false)

    const element = document.getElementById(id)
    if (element) {
      const notchHeight = 72
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = Math.max(0, elementPosition - notchHeight)

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const activeItem =
    NAV_ITEMS.find((item) => item.id === activeId) || NAV_ITEMS[0]

  return (
    <>
      {/* Mobile Backdrop Blur when notch menu is open */}
      {isDropdownOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsDropdownOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs xl:hidden"
        />
      )}

      {/* Top Scrim Veil: Smoothly prevents content from bleeding through notch gaps when scrolling */}
      {/* Desktop Scrim */}
      <div
        aria-hidden="true"
        className={`hidden lg:block fixed top-0 left-0 right-0 h-20 pointer-events-none z-40 transition-opacity duration-300 bg-gradient-to-b from-white via-white via-60% to-transparent ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Mobile Top Header Mask: Completely masks text when scrolling on mobile */}
      <div
        aria-hidden="true"
        className={`lg:hidden fixed top-0 left-0 right-0 h-16 pointer-events-none z-40 transition-all duration-200 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md border-b border-zinc-200/80 shadow-xs opacity-100"
            : "bg-gradient-to-b from-white via-white/80 to-transparent opacity-90"
        }`}
      />

      {/* Floating Notch Bar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
        {/* ========================================================================= */}
        {/* DESKTOP VIEW (>= 1024px / lg): 3-NOTCH ISLAND SYSTEM                      */}
        {/* ========================================================================= */}

        {/* 1. Left Logo Notch */}
        <aside
          aria-label="Brand logo notch"
          className={`hidden lg:flex absolute left-0 top-0 z-50 h-14 px-5 xl:px-6 select-none items-center bg-white/95 backdrop-blur-md text-zinc-900 rounded-br-[24px] pointer-events-auto border-b border-r transition-all duration-300 ease-out ${
            isScrolled
              ? "border-zinc-300/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]"
              : "border-zinc-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
          }`}
        >
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault()
              handleSelect("beranda")
            }}
            className="flex items-center gap-3 group"
          >
            <Image
              src="/images/logo-tomohon.png"
              alt="Lambang Kota Tomohon"
              width={26}
              height={30}
              className="w-auto h-[30px] object-contain shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold leading-tight">
                Kota Tomohon
              </span>
              <span className="text-sm font-bold text-zinc-950 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                Walian Dua
              </span>
            </div>
          </a>

          <NotchRightWing position="top" className="text-white size-3.5 md:size-5" />
          <NotchCornerLeftWing position="top" className="text-white size-3.5 md:size-5" />
        </aside>

        {/* 2. Center Menu Notch */}
        <header
          role="tablist"
          aria-orientation="horizontal"
          className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 z-50 h-14 px-4 xl:px-5 bg-white/95 backdrop-blur-md text-zinc-900 select-none rounded-b-[24px] pointer-events-auto border-b border-x transition-all duration-300 ease-out items-center ${
            isScrolled
              ? "border-zinc-300/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]"
              : "border-zinc-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
          }`}
        >
          <NotchLeftWing position="top" className="text-white size-3.5 md:size-5" />
          <NotchRightWing position="top" className="text-white size-3.5 md:size-5" />

          <LayoutGroup id="walian-navbar-notch">
            <div className="flex items-center gap-1 xl:gap-1.5">
              {NAV_ITEMS.map((item) => (
                <NotchItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  badge={item.badge}
                  variant="light"
                  isActive={item.id === activeId}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </LayoutGroup>
        </header>

        {/* 3. Right Action Notch */}
        <aside
          aria-label="Action notch"
          className={`hidden lg:flex absolute right-0 top-0 z-50 h-14 px-5 xl:px-6 select-none items-center bg-white/95 backdrop-blur-md text-zinc-900 rounded-bl-[24px] pointer-events-auto border-b border-l transition-all duration-300 ease-out ${
            isScrolled
              ? "border-zinc-300/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]"
              : "border-zinc-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]"
          }`}
        >
          <NotchLeftWing position="top" className="text-white size-3.5 md:size-5" />
          <NotchCornerRightWing position="top" className="text-white size-3.5 md:size-5" />

          <div className="flex items-center gap-3 xl:gap-3.5">
            <a
              href="#layanan"
              onClick={(e) => {
                e.preventDefault()
                handleSelect("layanan")
              }}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1.5"
            >
              <FileText className="size-3.5 text-zinc-500" />
              <span>Cek Syarat</span>
            </a>

            <div className="h-4 w-px bg-zinc-200" />

            <a
              href="https://wa.me/6281244556677?text=Halo%20Pemerintah%20Kelurahan%20Walian%20Dua,%20saya%20ingin%20bertanya%20mengenai%20layanan%20kelurahan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 xl:px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-xs"
            >
              <Phone className="size-3.5 text-white" />
              <span>Halo Lurah</span>
            </a>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* TABLET & MOBILE VIEW (< 1024px / lg): SINGLE COMPACT NOTCH ISLAND         */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className={`lg:hidden absolute top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col bg-white text-zinc-900 select-none rounded-b-[20px] pointer-events-auto px-3 sm:px-4 border-b border-x transition-all duration-300 ease-out w-[94vw] max-w-md sm:w-auto ${
            isScrolled
              ? "border-zinc-300/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]"
              : "border-zinc-200/80 shadow-lg"
          }`}
        >
          <NotchLeftWing position="top" className="text-white size-3 sm:size-4" />
          <NotchRightWing position="top" className="text-white size-3 sm:size-4" />

          {/* Unified Horizontal Bar */}
          <div className="flex h-13 items-center justify-between gap-3 sm:gap-4 py-1">
            {/* Left Logo */}
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault()
                handleSelect("beranda")
              }}
              className="flex shrink-0 items-center gap-2"
            >
              <Image
                src="/images/logo-tomohon.png"
                alt="Lambang Kota Tomohon"
                width={18}
                height={22}
                className="w-auto h-[22px] object-contain"
              />
              <span className="text-xs font-bold text-zinc-950 tracking-tight">
                Walian Dua
              </span>
            </a>

            {/* Center Dropdown Page Trigger */}
            <button
              type="button"
              aria-expanded={isDropdownOpen}
              aria-label="Buka menu navigasi"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex h-8.5 items-center justify-center gap-1.5 rounded-full px-2.5 sm:px-3 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors shrink min-w-0"
            >
              {activeItem?.icon && (
                <activeItem.icon className="size-3.5 text-zinc-500 shrink-0" />
              )}
              <span className="truncate max-w-[110px] sm:max-w-none">{activeItem?.label}</span>
              <ChevronDown
                className={`size-3 text-zinc-500 shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Right Quick Halo Lurah Action */}
            <a
              href="https://wa.me/6281244556677?text=Halo%20Pemerintah%20Kelurahan%20Walian%20Dua"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi Halo Lurah WhatsApp"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors"
            >
              <Phone className="size-3.5" />
            </a>
          </div>

          {/* Expandable Dropdown Drawer */}
          <div
            role="listbox"
            className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out w-full ${
              isDropdownOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex w-full flex-col gap-1.5 pt-2 pb-3 border-t border-zinc-200/80 mt-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isSelected = item.id === activeId

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`flex w-full cursor-pointer items-center justify-between min-h-[44px] rounded-xl px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-zinc-950 font-semibold text-white shadow-2xs"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {Icon && (
                          <Icon
                            className={`size-4 shrink-0 ${
                              isSelected ? "text-white" : "text-zinc-500"
                            }`}
                          />
                        )}
                        <span>{item.label}</span>
                      </div>
                      {isSelected && (
                        <Check className="size-4 text-white shrink-0" />
                      )}
                    </button>
                  )
                })}

                <div className="pt-2.5 mt-1 border-t border-zinc-200/80 flex flex-col gap-2">
                  <a
                    href="https://wa.me/6281244556677?text=Halo%20Pemerintah%20Kelurahan%20Walian%20Dua"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full min-h-[44px] py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Phone className="size-4" />
                    <span>Chat WhatsApp Lurah</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
