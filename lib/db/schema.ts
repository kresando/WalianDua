export interface AparaturRecord {
  id: number
  name: string
  role: string
  title: string
  rank?: string | null
  nip?: string | null
  description: string
  staff?: string | null
  avatar?: string | null
  unit?: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type AparaturInput = Omit<AparaturRecord, "id" | "created_at" | "updated_at">

export interface GaleriWargaRecord {
  id: number
  title: string
  category: string
  description: string
  highlight?: string | null
  image: string
  author_or_contributor?: string | null
  date?: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type GaleriWargaInput = Omit<GaleriWargaRecord, "id" | "created_at" | "updated_at">

export interface LayananPublikRecord {
  id: number
  code: string
  title: string
  category: "kependudukan" | "usaha" | "sosial" | "pertanahan" | "perizinan"
  description: string
  processing_time: string
  cost: string
  requirements: string[]
  flow: string[]
  is_online_available: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type LayananPublikInput = Omit<LayananPublikRecord, "id" | "created_at" | "updated_at">

export interface PengumumanRecord {
  id: number
  title: string
  category: string
  date: string
  summary: string
  read_time?: string | null
  image?: string | null
  is_pinned: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type PengumumanInput = Omit<PengumumanRecord, "id" | "created_at" | "updated_at">

export interface PengaduanRecord {
  id: number
  name: string
  phone?: string | null
  neighborhood: string
  category: string
  message: string
  status: "BARU" | "DIPROSES" | "SELESAI"
  notes?: string | null
  created_at: string
}

export type PengaduanInput = Omit<PengaduanRecord, "id" | "created_at">

export interface AdminUser {
  id: number
  username: string
  password_hash: string
  name: string
  role: string
  created_at: string
}
