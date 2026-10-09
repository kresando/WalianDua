import { supabaseAdmin } from "../../supabase/admin"
import { AparaturRecord, AparaturInput } from "../schema"

export async function getAllAparatur(): Promise<AparaturRecord[]> {
  const { data, error } = await supabaseAdmin
    .from("aparatur")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true })

  if (error) {
    console.error("Error fetching all aparatur from Supabase:", error)
    return []
  }

  return (data || []) as AparaturRecord[]
}

export async function getAparaturById(id: number): Promise<AparaturRecord | null> {
  const { data, error } = await supabaseAdmin
    .from("aparatur")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return data as AparaturRecord
}

export async function createAparatur(data: AparaturInput): Promise<AparaturRecord> {
  const insertData = {
    name: data.name,
    role: data.role,
    title: data.title,
    rank: data.rank || null,
    nip: data.nip || null,
    description: data.description,
    staff: data.staff || null,
    avatar: data.avatar || null,
    unit: data.unit || "Pemerintah Kelurahan",
    sort_order: data.sort_order ?? 0,
  }

  const { data: created, error } = await supabaseAdmin
    .from("aparatur")
    .insert(insertData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create aparatur in Supabase: ${error.message}`)
  }

  return created as AparaturRecord
}

export async function updateAparatur(id: number, data: Partial<AparaturInput>): Promise<AparaturRecord | null> {
  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (data.name !== undefined) updatePayload.name = data.name
  if (data.role !== undefined) updatePayload.role = data.role
  if (data.title !== undefined) updatePayload.title = data.title
  if (data.rank !== undefined) updatePayload.rank = data.rank
  if (data.nip !== undefined) updatePayload.nip = data.nip
  if (data.description !== undefined) updatePayload.description = data.description
  if (data.staff !== undefined) updatePayload.staff = data.staff
  if (data.avatar !== undefined) updatePayload.avatar = data.avatar
  if (data.unit !== undefined) updatePayload.unit = data.unit
  if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order

  const { data: updated, error } = await supabaseAdmin
    .from("aparatur")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error updating aparatur in Supabase:", error)
    return null
  }

  return updated as AparaturRecord | null
}

export async function deleteAparatur(id: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("aparatur")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting aparatur in Supabase:", error)
    return false
  }

  return true
}
