import { supabaseAdmin } from "../../supabase/admin"
import { PengaduanRecord, PengaduanInput } from "../schema"

export async function getAllPengaduan(): Promise<PengaduanRecord[]> {
  const { data, error } = await supabaseAdmin
    .from("pengaduan")
    .select("*")
    .order("id", { ascending: false })

  if (error) {
    console.error("Error fetching pengaduan from Supabase:", error)
    return []
  }

  return (data || []) as PengaduanRecord[]
}

export async function getPengaduanById(id: number): Promise<PengaduanRecord | null> {
  const { data, error } = await supabaseAdmin
    .from("pengaduan")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return data as PengaduanRecord
}

export async function createPengaduan(data: PengaduanInput): Promise<PengaduanRecord> {
  const insertData = {
    name: data.name,
    phone: data.phone || null,
    neighborhood: data.neighborhood,
    category: data.category,
    message: data.message,
    status: data.status || "BARU",
    notes: data.notes || null,
  }

  const { data: created, error } = await supabaseAdmin
    .from("pengaduan")
    .insert(insertData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create pengaduan in Supabase: ${error.message}`)
  }

  return created as PengaduanRecord
}

export async function updatePengaduanStatus(
  id: number,
  status: "BARU" | "DIPROSES" | "SELESAI",
  notes?: string
): Promise<PengaduanRecord | null> {
  const updatePayload: Record<string, unknown> = {
    status,
  }

  if (notes !== undefined) {
    updatePayload.notes = notes || null
  }

  const { data: updated, error } = await supabaseAdmin
    .from("pengaduan")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error updating pengaduan in Supabase:", error)
    return null
  }

  return updated as PengaduanRecord | null
}

export async function deletePengaduan(id: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("pengaduan")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting pengaduan in Supabase:", error)
    return false
  }

  return true
}
