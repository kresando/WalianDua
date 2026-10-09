import { supabaseAdmin } from "../../supabase/admin"
import { PengumumanRecord, PengumumanInput } from "../schema"

function normalizePengumuman(row: Record<string, any>): PengumumanRecord {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    date: row.date,
    summary: row.summary,
    read_time: row.read_time ?? null,
    image: row.image ?? null,
    is_pinned: Boolean(row.is_pinned),
    sort_order: row.sort_order ?? 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export async function getAllPengumuman(): Promise<PengumumanRecord[]> {
  const { data, error } = await supabaseAdmin
    .from("pengumuman")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("id", { ascending: false })

  if (error) {
    console.error("Error fetching pengumuman from Supabase:", error)
    return []
  }

  return (data || []).map(normalizePengumuman)
}

export async function getPengumumanById(id: number): Promise<PengumumanRecord | null> {
  const { data, error } = await supabaseAdmin
    .from("pengumuman")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return normalizePengumuman(data)
}

export async function createPengumuman(data: PengumumanInput): Promise<PengumumanRecord> {
  const insertData = {
    title: data.title,
    category: data.category,
    date: data.date,
    summary: data.summary,
    read_time: data.read_time || null,
    image: data.image || null,
    is_pinned: Boolean(data.is_pinned),
    sort_order: data.sort_order ?? 0,
  }

  const { data: created, error } = await supabaseAdmin
    .from("pengumuman")
    .insert(insertData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create pengumuman in Supabase: ${error.message}`)
  }

  return normalizePengumuman(created)
}

export async function updatePengumuman(id: number, data: Partial<PengumumanInput>): Promise<PengumumanRecord | null> {
  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (data.title !== undefined) updatePayload.title = data.title
  if (data.category !== undefined) updatePayload.category = data.category
  if (data.date !== undefined) updatePayload.date = data.date
  if (data.summary !== undefined) updatePayload.summary = data.summary
  if (data.read_time !== undefined) updatePayload.read_time = data.read_time
  if (data.image !== undefined) updatePayload.image = data.image
  if (data.is_pinned !== undefined) updatePayload.is_pinned = Boolean(data.is_pinned)
  if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order

  const { data: updated, error } = await supabaseAdmin
    .from("pengumuman")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error updating pengumuman in Supabase:", error)
    return null
  }

  return updated ? normalizePengumuman(updated) : null
}

export async function deletePengumuman(id: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("pengumuman")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting pengumuman in Supabase:", error)
    return false
  }

  return true
}
