import { DatabaseSync } from "node:sqlite"
import path from "node:path"
import fs from "node:fs"
import { APARATUR_KELURAHAN, LAYANAN_PUBLIK } from "../data/kelurahan-data"
import { hashPassword } from "../auth/auth"

let databaseInstance: DatabaseSync | null = null

export function getDatabase(): DatabaseSync {
  if (databaseInstance) {
    return databaseInstance
  }

  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  const dbPath = path.join(dataDir, "walian_dua.db")
  const db = new DatabaseSync(dbPath)

  // Enable WAL mode for high concurrency and performance
  db.exec("PRAGMA journal_mode = WAL;")
  db.exec("PRAGMA foreign_keys = ON;")

  // Initialize Tables
  initTables(db)
  // Seed Initial Data if empty
  seedDatabase(db)

  databaseInstance = db
  return databaseInstance
}

function initTables(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS aparatur (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      title TEXT NOT NULL,
      rank TEXT,
      nip TEXT,
      description TEXT NOT NULL,
      staff TEXT,
      avatar TEXT,
      unit TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS galeri_warga (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      highlight TEXT,
      image TEXT NOT NULL,
      author_or_contributor TEXT,
      date TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS layanan_publik (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      processing_time TEXT NOT NULL,
      cost TEXT NOT NULL DEFAULT 'Gratis (Rp 0)',
      requirements TEXT NOT NULL,
      flow TEXT NOT NULL,
      is_online_available INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pengumuman (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      summary TEXT NOT NULL,
      read_time TEXT,
      image TEXT,
      is_pinned INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pengaduan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      neighborhood TEXT NOT NULL,
      category TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'BARU',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

function seedDatabase(db: DatabaseSync) {
  // 1. Seed Admin User
  const adminCount = (db.prepare("SELECT COUNT(*) as count FROM admin_users").get() as { count: number }).count
  if (adminCount === 0) {
    const insertAdmin = db.prepare(`
      INSERT INTO admin_users (username, password_hash, name, role)
      VALUES (?, ?, ?, ?)
    `)
    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || "admin123"
    const pwdHash = hashPassword(initialPassword)
    insertAdmin.run("admin", pwdHash, "Administrator Kelurahan Walian Dua", "superadmin")
  }

  // 2. Seed Aparatur
  const aparaturCount = (db.prepare("SELECT COUNT(*) as count FROM aparatur").get() as { count: number }).count
  if (aparaturCount === 0) {
    const insertAparatur = db.prepare(`
      INSERT INTO aparatur (name, role, title, rank, nip, description, staff, avatar, unit, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    APARATUR_KELURAHAN.forEach((person, idx) => {
      insertAparatur.run(
        person.name,
        person.role,
        person.title,
        person.rank || null,
        person.nip || null,
        person.description,
        person.staff || null,
        person.avatar || null,
        person.unit || "Pemerintah Kelurahan",
        idx
      )
    })
  }

  // 3. Seed Galeri Warga (Replacing the old Potensi with dynamic Community & Citizen Activity Gallery)
  const galeriCount = (db.prepare("SELECT COUNT(*) as count FROM galeri_warga").get() as { count: number }).count
  if (galeriCount === 0) {
    const insertGaleri = db.prepare(`
      INSERT INTO galeri_warga (title, category, description, highlight, image, author_or_contributor, date, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const initialCitizenGalleries = [
      {
        title: "Kerja Bakti Mapalus: Perangkat, Linmas & Tim Ukur Kelurahan Walian Dua",
        category: "Gotong Royong Mapalus",
        description: "Aksi gotong royong terpadu pembersihan lingkungan, perapihan rumput, penataan jalan pemukiman, dan pengukuran wilayah bersama jajaran perangkat, Linmas, dan warga.",
        highlight: "Mapalus Linmas & Tim Ukur",
        image: "/images/galeri-kerja-bakti-mapalus.jpg",
        author_or_contributor: "Perangkat, Linmas & Warga",
        date: "Dokumentasi Resmi",
        sort_order: 0,
      },
      {
        title: "Gerakan Menanam & Kebun Pertanian Sayur Mandiri Warga",
        category: "Pertanian & Perkebunan",
        description: "Kegiatan swadaya warga bergotong royong mengolah bedeng perkebunan dan menanam daun bawang serta aneka sayuran segar demi ketahanan pangan lokal Walian Dua.",
        highlight: "Ketahanan Pangan Warga",
        image: "/images/galeri-pertanian-sayur-warga.jpg",
        author_or_contributor: "Kelompok Tani & Warga Swadaya",
        date: "Kegiatan Gotong Royong",
        sort_order: 1,
      },
      {
        title: "Sinergi Kerja Bersama, Bersama Bekerja untuk Walian Dua Hebat",
        category: "Pelayanan Warga",
        description: "Satu tujuan, satu semangat untuk hasil yang hebat! Komitmen jajaran aparatur pemerintah kelurahan memberikan pelayanan administrasi cepat, ramah, dan transparan.",
        highlight: "Satu Semangat • Bersama Bisa",
        image: "/images/galeri-kerja-bersama-banner.jpg",
        author_or_contributor: "Pemerintah Kelurahan Walian Dua",
        date: "Komitmen Pelayanan",
        sort_order: 2,
      },
      {
        title: "Bakti Gotong Royong Mapalus Bersama Warga Lingkungan II",
        category: "Gotong Royong Mapalus",
        description: "Kegiatan rutin pembersihan saluran drainase dan sanitasi lingkungan menyambut musim hujan bersama kepala lingkungan dan tokoh masyarakat.",
        highlight: "Lingkungan II • Mapalus Sejati",
        image: "/images/warga-komunitas.jpg",
        author_or_contributor: "Pamong Lingkungan II & Pemuda",
        date: "Maret 2026",
        sort_order: 0,
      },
      {
        title: "Budidaya & Panen Bunga Krisan Kelompok Petani Bunga Wawo",
        category: "Hortikultura & Florikultura",
        description: "Petani bunga krisan binaan kelurahan di lereng Wawo mempersiapkan suplai bunga segar berkualitas tinggi untuk agenda tahunan Kota Tomohon.",
        highlight: "Petani Bunga Wawo",
        image: "/images/bunga-tomohon.jpg",
        author_or_contributor: "Kelompok Tani Bunga Riri & Kulo",
        date: "Februari 2026",
        sort_order: 1,
      },
      {
        title: "Pelayanan Terpadu & Pendampingan Administrasi Warga Ramah Lansia",
        category: "Pelayanan Warga",
        description: "Petugas kelurahan memberikan asistensi langsung pengisian formulir dan verifikasi dokumen kependudukan di ruang pelayanan kantor lurah.",
        highlight: "Ruang Pelayanan Bebas Pungli",
        image: "/images/pelayanan-kantor.jpg",
        author_or_contributor: "Staf Seksi Pelayanan Walian Dua",
        date: "Januari 2026",
        sort_order: 2,
      },
    ]

    initialCitizenGalleries.forEach((item) => {
      insertGaleri.run(
        item.title,
        item.category,
        item.description,
        item.highlight,
        item.image,
        item.author_or_contributor,
        item.date,
        item.sort_order
      )
    })
  }

  // 4. Seed Layanan Publik
  const layananCount = (db.prepare("SELECT COUNT(*) as count FROM layanan_publik").get() as { count: number }).count
  if (layananCount === 0) {
    const insertLayanan = db.prepare(`
      INSERT INTO layanan_publik (code, title, category, description, processing_time, cost, requirements, flow, is_online_available, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    LAYANAN_PUBLIK.forEach((srv, idx) => {
      insertLayanan.run(
        srv.id,
        srv.title,
        srv.category,
        srv.description,
        srv.processingTime,
        srv.cost,
        JSON.stringify(srv.requirements),
        JSON.stringify(srv.flow),
        srv.isOnlineAvailable ? 1 : 0,
        idx
      )
    })
  }

  // 5. Seed Pengumuman
  const pengumumanCount = (db.prepare("SELECT COUNT(*) as count FROM pengumuman").get() as { count: number }).count
  if (pengumumanCount === 0) {
    const insertPengumuman = db.prepare(`
      INSERT INTO pengumuman (title, category, date, summary, read_time, image, is_pinned, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const initialNews = [
      {
        title: "Kerja Bakti Mapalus: Pembersihan Drainase & Normalisasi Saluran Wawo",
        category: "Kesiapsiagaan & Lingkungan",
        date: "Sabtu Pekan Berjalan • 07:30 WITA",
        summary: "Mengantisipasi curah hujan tinggi di lereng perbukitan, seluruh warga bersama Kepala Lingkungan (Pala I s/d V) dihimbau berpartisipasi dalam kerja bakti gotong royong pembersihan saluran air.",
        read_time: "2 min baca",
        image: "/images/warga-komunitas.jpg",
        is_pinned: 1,
      },
      {
        title: "Jadwal Posyandu Siklus Hidup (ILP) Balita, Remaja & Lansia Walian Dua",
        category: "Kesehatan Warga",
        date: "Rabu Pekan Ke-2 Setiap Bulan",
        summary: "Pelayanan penimbangan balita, imunisasi dasar lengkap, pemeriksaan gula darah serta tensi gratis bagi lansia bertempat di Balai Pertemuan Lingkungan II.",
        read_time: "3 min baca",
        image: null,
        is_pinned: 0,
      },
      {
        title: "Apresiasi Kepatuhan PBB-P2 100%: Terima Kasih Warga Walian Dua",
        category: "Pajak & Pembangunan",
        date: "Realisasi Tahunan Terverifikasi",
        summary: "Pemerintah Kelurahan Walian Dua menyampaikan penghargaan setinggi-tingginya kepada seluruh wajib pajak atas kontribusi nyata pembangunan sarana publik dan infrastruktur kelurahan.",
        read_time: "2 min baca",
        image: null,
        is_pinned: 0,
      },
    ]

    initialNews.forEach((news, idx) => {
      insertPengumuman.run(
        news.title,
        news.category,
        news.date,
        news.summary,
        news.read_time,
        news.image,
        news.is_pinned,
        idx
      )
    })
  }

  // 6. Seed Sample Pengaduan
  const aduanCount = (db.prepare("SELECT COUNT(*) as count FROM pengaduan").get() as { count: number }).count
  if (aduanCount === 0) {
    const insertAduan = db.prepare(`
      INSERT INTO pengaduan (name, phone, neighborhood, category, message, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    insertAduan.run(
      "Hesky Supit",
      "081234567890",
      "Lingkungan III",
      "Layanan Dokumen",
      "Mohon konfirmasi jadwal layanan surat domisili usaha saat jam operasional kantor kelurahan.",
      "SELESAI",
      "Telah dijawab melalui WhatsApp oleh Kasi Pemerintahan."
    )
    insertAduan.run(
      "Maria Polii",
      "082198765432",
      "Lingkungan I",
      "Infrastruktur & Lingkungan",
      "Penerangan lampu jalan dekat tikungan lorong gereja perlu perbaikan bohlam.",
      "DIPROSES",
      "Dikoordinasikan dengan Kepala Lingkungan I."
    )
    insertAduan.run(
      "Jantje Mongi",
      "085240112233",
      "Lingkungan IV",
      "Ketertiban & Keamanan",
      "Usulan koordinasi ronda malam LINMAS di area perbatasan perkebunan Wawo.",
      "BARU",
      null
    )
  }
}
