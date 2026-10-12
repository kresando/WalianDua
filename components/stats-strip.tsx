import * as React from "react"
import { Users, Home, MapPin, Award, Compass } from "lucide-react"
import { KELURAHAN_DATA } from "@/lib/data/kelurahan-data"

export function StatsStrip() {
  const { population, distanceToCamatKm, distanceEnvironmentToOfficeKm } = KELURAHAN_DATA

  const STATS = [
    {
      label: "Jumlah Penduduk",
      value: population.total.toLocaleString("id-ID"),
      unit: "Jiwa",
      detail: `${population.male.toLocaleString("id-ID")} Laki-laki • ${population.female.toLocaleString("id-ID")} Perempuan`,
      icon: Users,
      badgeClass: "bg-primary/10 text-primary",
    },
    {
      label: "Kepala Keluarga (KK)",
      value: population.households.toLocaleString("id-ID"),
      unit: "KK",
      detail: "100% rumah tangga berlistrik aktif",
      icon: Home,
      badgeClass: "bg-primary/10 text-primary",
    },
    {
      label: "Pembagian Wilayah",
      value: `${population.neighborhoodCount}`,
      unit: "Lingkungan",
      detail: "Dipimpin 5 Kepala Lingkungan (Pala)",
      icon: MapPin,
      badgeClass: "bg-primary/10 text-primary",
    },
    {
      label: "Realisasi Pajak PBB-P2",
      value: "100%",
      unit: "Lunas",
      detail: "510 Wajib Pajak (Rp 52,37 Juta)",
      icon: Award,
      badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    },
    {
      label: "Rentang Kendali Warga",
      value: `${distanceEnvironmentToOfficeKm}`,
      unit: "km",
      detail: `± 5 mnt ke kantor lurah • ${distanceToCamatKm} km ke camat`,
      icon: Compass,
      badgeClass: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    },
  ]

  return (
    <section className="bg-secondary/35 border-b border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`flex flex-col p-3 rounded-xl transition-all duration-200 hover:bg-card/80 hover:shadow-2xs ${
                  i === STATS.length - 1 ? "col-span-2 md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${stat.badgeClass}`}>
                    <Icon className="size-4" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">{stat.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5 font-bold tracking-tight text-foreground">
                  <span className="text-2xl sm:text-3xl tabular-nums font-extrabold">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    {stat.unit}
                  </span>
                </div>
                <span className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                  {stat.detail}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
