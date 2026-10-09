import { supabaseAdmin } from "../../supabase/admin"
import { AdminUser } from "../schema"

export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .eq("username", username)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return data as AdminUser
}

export async function getAdminProfile(username: string): Promise<Omit<AdminUser, "password_hash"> | null> {
  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, username, name, role, created_at")
    .eq("username", username)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return data as Omit<AdminUser, "password_hash">
}
