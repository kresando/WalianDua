import { supabaseAdmin } from "../../supabase/admin"
import { LayananPublikRecord, LayananPublikInput } from "../schema"

function normalizeLayanan(row: Record<string, any>): LayananPublikRecord {
  let reqs = row.requirements
  if (typeof reqs === "string") {
    try {
      reqs = JSON.parse(reqs)
    } catch {
      reqs = []
    }
  } else if (!Array.isArray(reqs)) {
    reqs = []
  }

  let flows = row.flow
  if (typeof flows === "string") {
    try {
      flows = JSON.parse(flows)
    } catch {
      flows = []
    }
  } else if (!Array.isArray(flows)) {
    flows = []
  }

  return {
    id: row.id,
    code: row.code,
    title: row.title,
    category: row.category,
    description: row.description,
    processing_time: row.processing_time,
    cost: row.cost,
    requirements: reqs,
    flow: flows,
    is_online_available: Boolean(row.is_online_available),
    sort_order: row.sort_order ?? 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export async function getAllLayanan(): Promise<LayananPublikRecord[]> {
  const { data, error } = await supabaseAdmin
    .from("layanan_publik")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true })

  if (error) {
    console.error("Error fetching layanan_publik from Supabase:", error)
    return []
  }

  return (data || []).map(normalizeLayanan)
}

export async function getLayananById(id: number): Promise<LayananPublikRecord | null> {
  const { data, error } = await supabaseAdmin
    .from("layanan_publik")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return normalizeLayanan(data)
}

export async function createLayanan(data: LayananPublikInput): Promise<LayananPublikRecord> {
  const insertData = {
    code: data.code,
    title: data.title,
    category: data.category,
    description: data.description,
    processing_time: data.processing_time,
    cost: data.cost || "Gratis (Rp 0)",
    requirements: Array.isArray(data.requirements) ? data.requirements : [],
    flow: Array.isArray(data.flow) ? data.flow : [],
    is_online_available: Boolean(data.is_online_available),
    sort_order: data.sort_order ?? 0,
  }

  const { data: created, error } = await supabaseAdmin
    .from("layanan_publik")
    .insert(insertData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create layanan in Supabase: ${error.message}`)
  }

  return normalizeLayanan(created)
}

export async function updateLayanan(id: number, data: Partial<LayananPublikInput>): Promise<LayananPublikRecord | null> {
  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (data.code !== undefined) updatePayload.code = data.code
  if (data.title !== undefined) updatePayload.title = data.title
  if (data.category !== undefined) updatePayload.category = data.category
  if (data.description !== undefined) updatePayload.description = data.description
  if (data.processing_time !== undefined) updatePayload.processing_time = data.processing_time
  if (data.cost !== undefined) updatePayload.cost = data.cost
  if (data.requirements !== undefined) {
    updatePayload.requirements = Array.isArray(data.requirements) ? data.requirements : []
  }
  if (data.flow !== undefined) {
    updatePayload.flow = Array.isArray(data.flow) ? data.flow : []
  }
  if (data.is_online_available !== undefined) {
    updatePayload.is_online_available = Boolean(data.is_online_available)
  }
  if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order

  const { data: updated, error } = await supabaseAdmin
    .from("layanan_publik")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error updating layanan in Supabase:", error)
    return null
  }

  return updated ? normalizeLayanan(updated) : null
}

export async function deleteLayanan(id: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("layanan_publik")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting layanan in Supabase:", error)
    return false
  }

  return true
}
