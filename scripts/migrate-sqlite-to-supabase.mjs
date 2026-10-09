import { DatabaseSync } from "node:sqlite"
import { createClient } from "@supabase/supabase-js"
import path from "node:path"
import fs from "node:fs"

// Read .env.local manually
const envPath = path.join(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8")
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIdx = trimmed.indexOf("=")
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) {
        process.env[key] = val
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const personalAccessToken = process.env.SUPABASE_ACCESS_TOKEN
const projectRef = process.env.SUPABASE_PROJECT_REF

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment!")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)
const dbPath = path.join(process.cwd(), "data", "walian_dua.db")

if (!fs.existsSync(dbPath)) {
  console.error(`SQLite database not found at ${dbPath}`)
  process.exit(1)
}

const sqlite = new DatabaseSync(dbPath)

async function runSqlQuery(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${personalAccessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: sql })
  })
  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Failed to run SQL: ${errText}`)
  }
  return res.json()
}

async function migrate() {
  console.log("🚀 Starting data migration from SQLite to Supabase...")

  // 1. admin_users
  const adminUsers = sqlite.prepare("SELECT * FROM admin_users").all()
  console.log(`📦 Found ${adminUsers.length} admin_users in SQLite`)
  if (adminUsers.length > 0) {
    const { error } = await supabase.from("admin_users").upsert(adminUsers, { onConflict: "id" })
    if (error) console.error("Error migrating admin_users:", error)
    else console.log("✅ admin_users migrated successfully")
  }

  // 2. aparatur
  const aparatur = sqlite.prepare("SELECT * FROM aparatur").all()
  console.log(`📦 Found ${aparatur.length} aparatur in SQLite`)
  if (aparatur.length > 0) {
    const { error } = await supabase.from("aparatur").upsert(aparatur, { onConflict: "id" })
    if (error) console.error("Error migrating aparatur:", error)
    else console.log("✅ aparatur migrated successfully")
  }

  // 3. galeri_warga
  const galeri = sqlite.prepare("SELECT * FROM galeri_warga").all()
  console.log(`📦 Found ${galeri.length} galeri_warga in SQLite`)
  if (galeri.length > 0) {
    const { error } = await supabase.from("galeri_warga").upsert(galeri, { onConflict: "id" })
    if (error) console.error("Error migrating galeri_warga:", error)
    else console.log("✅ galeri_warga migrated successfully")
  }

  // 4. layanan_publik
  const layananRaw = sqlite.prepare("SELECT * FROM layanan_publik").all()
  console.log(`📦 Found ${layananRaw.length} layanan_publik in SQLite`)
  if (layananRaw.length > 0) {
    const layananFormatted = layananRaw.map((row) => {
      let reqs = []
      let flows = []
      try { reqs = JSON.parse(row.requirements) } catch { reqs = [] }
      try { flows = JSON.parse(row.flow) } catch { flows = [] }
      return {
        ...row,
        requirements: reqs,
        flow: flows,
        is_online_available: Boolean(row.is_online_available)
      }
    })
    const { error } = await supabase.from("layanan_publik").upsert(layananFormatted, { onConflict: "id" })
    if (error) console.error("Error migrating layanan_publik:", error)
    else console.log("✅ layanan_publik migrated successfully")
  }

  // 5. pengumuman
  const pengumumanRaw = sqlite.prepare("SELECT * FROM pengumuman").all()
  console.log(`📦 Found ${pengumumanRaw.length} pengumuman in SQLite`)
  if (pengumumanRaw.length > 0) {
    const pengumumanFormatted = pengumumanRaw.map((row) => ({
      ...row,
      is_pinned: Boolean(row.is_pinned)
    }))
    const { error } = await supabase.from("pengumuman").upsert(pengumumanFormatted, { onConflict: "id" })
    if (error) console.error("Error migrating pengumuman:", error)
    else console.log("✅ pengumuman migrated successfully")
  }

  // 6. pengaduan
  const pengaduan = sqlite.prepare("SELECT * FROM pengaduan").all()
  console.log(`📦 Found ${pengaduan.length} pengaduan in SQLite`)
  if (pengaduan.length > 0) {
    const { error } = await supabase.from("pengaduan").upsert(pengaduan, { onConflict: "id" })
    if (error) console.error("Error migrating pengaduan:", error)
    else console.log("✅ pengaduan migrated successfully")
  }

  // Sync PostgreSQL Identity Sequences
  console.log("🔄 Synchronizing PostgreSQL auto-increment sequences...")
  const tables = ["admin_users", "aparatur", "galeri_warga", "layanan_publik", "pengumuman", "pengaduan"]
  for (const table of tables) {
    const seqSql = `
      SELECT setval(pg_get_serial_sequence('public.${table}', 'id'), COALESCE((SELECT MAX(id) FROM public.${table}), 1), true);
    `
    await runSqlQuery(seqSql)
    console.log(`  ✓ Sequence synchronized for ${table}`)
  }

  console.log("🎉 All data migrated and sequences synchronized successfully!")
}

migrate().catch(console.error)
