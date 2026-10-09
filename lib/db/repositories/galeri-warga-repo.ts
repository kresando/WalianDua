import { supabaseAdmin } from "../../supabase/admin"
import { GaleriWargaRecord, GaleriWargaInput } from "../schema"

export async function getAllGaleriWarga(): Promise<GaleriWargaRecord[]> {
  const { data, error } = await supabaseAdmin
    .from("galeri_warga")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: false })

  if (error) {
    console.error("Error fetching galeri_warga from Supabase:", error)
    return []
  }

  return (data || []) as GaleriWargaRecord[]
}

export async function getGaleriWargaById(id: number): Promise<GaleriWargaRecord | null> {
  const { data, error } = await supabaseAdmin
    .from("galeri_warga")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return data as GaleriWargaRecord
}

export async function createGaleriWarga(data: GaleriWargaInput): Promise<GaleriWargaRecord> {
  const insertData = {
    title: data.title,
    category: data.category,
    description: data.description,
    highlight: data.highlight || null,
    image: data.image,
    author_or_contributor: data.author_or_contributor || null,
    date: data.date || null,
    sort_order: data.sort_order ?? 0,
  }

  const { data: created, error } = await supabaseAdmin
    .from("galeri_warga")
    .insert(insertData)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create galeri_warga in Supabase: ${error.message}`)
  }

  return created as GaleriWargaRecord
}

export async function updateGaleriWarga(id: number, data: Partial<GaleriWargaInput>): Promise<GaleriWargaRecord | null> {
  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (data.title !== undefined) updatePayload.title = data.title
  if (data.category !== undefined) updatePayload.category = data.category
  if (data.description !== undefined) updatePayload.description = data.description
  if (data.highlight !== undefined) updatePayload.highlight = data.highlight
  if (data.image !== undefined) updatePayload.image = data.image
  if (data.author_or_contributor !== undefined) updatePayload.author_or_contributor = data.author_or_contributor
  if (data.date !== undefined) updatePayload.date = data.date
  if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order

  const { data: updated, error } = await supabaseAdmin
    .from("galeri_warga")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) {
    console.error("Error updating galeri_warga in Supabase:", error)
    return null
  }

  return updated as GaleriWargaRecord | null
}

export async function deleteGaleriWarga(id: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("galeri_warga")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting galeri_warga in Supabase:", error)
    return false
  }

  return true
}
