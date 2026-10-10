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
    },
    {
      label: "Kepala Keluarga (KK)",
      value: population.households.toLocaleString("id-ID"),
      unit: "KK",
      detail: "100% rumah tangga berlistrik aktif",
      icon: Home,
    },
    {
      label: "Pembagian Wilayah",
      value: `${population.neighborhoodCount}`,
      unit: "Lingkungan",
      detail: "Dipimpin 5 Kepala Lingkungan (Pala)",
      icon: MapPin,
    },
    {
      label: "Realisasi Pajak PBB-P2",
      value: "100%",
      unit: "Lunas",
      detail: "510 Wajib Pajak (Rp 52,37 Juta)",
      icon: Award,
    },
    {
      label: "Rentang Kendali Warga",
      value: `${distanceEnvironmentToOfficeKm}`,
      unit: "km",
      detail: `± 5 mnt ke kantor lurah • ${distanceToCamatKm} km ke camat`,
      icon: Compass,
    },
  ]

  return (
    <section className="bg-muted/30 border-b border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`flex flex-col p-2.5 rounded-xl transition-all duration-200 hover:bg-muted/60 ${
                  i === STATS.length - 1 ? "col-span-2 md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
                  <Icon className="size-4 shrink-0 text-foreground" />
                  <span className="text-xs font-medium">{stat.label}</span>
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
