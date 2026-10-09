# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, Turbopack), Tailwind CSS v4, shadcn UI components (@base-ui/react, CVA), motion, TypeScript.

## Users

Warga Kelurahan Walian Dua (warga tetap & pendatang), aparat pemerintah kelurahan/kecamatan Tomohon Selatan, pelaku UMKM florikultura bunga krisan & perkebunan Wawo, dan masyarakat umum yang membutuhkan legalitas dokumen serta informasi publik resmi.

## Product Purpose

Menyediakan portal digital resmi kelurahan yang modern, transparan, dan mudah diakses untuk pengurusan surat mandiri (Rp 0 / bebas pungli), publikasi transparansi kependudukan, informasi potensi wilayah, serta kanal aspirasi cepat "Halo Lurah".

## Positioning

Portal kelurahan berbasis kearifan lokal Minahasa *"Sitou Timou Tumou Tou"* dan semangat gotong royong *Mapalus*, memadukan standar desain modern anti-AI slop dengan kepatuhan tata kelola administrasi pemerintahan daerah Kota Tomohon.

## Operating Context

Diakses melalui smartphone warga dan perangkat desktop untuk memeriksa persyaratan surat sebelum datang ke kantor lurah, menyampaikan pengaduan lewat WhatsApp resmi, atau memantau pengumuman kesehatan dan lingkungan.

## Capabilities and Constraints

- Informasi persyaratan 6 layanan surat inti (SKU, SKTM, SKD, Pengantar KTP/KK, Kematian/Kelahiran, Keterangan Tanah/Waris).
- Komitmen legalitas Rp 0 (Gratis tanpa pungutan liar).
- Kontak cepat WhatsApp "Halo Lurah" yang otomatis memformat laporan warga sekaligus mencatatnya ke database.
- Galeri Warga & Kegiatan Komunitas: Dokumentasi autentik gotong royong Mapalus antar 5 Lingkungan, budidaya bunga krisan, dan dinamika kemasyarakatan.
- Dasbor Admin Terintegrasi (`/admin`): CRUD Aparatur (termasuk foto profil pimpinan Pak Marlon Taroreh & staf), Galeri Warga, SOP Layanan Surat, Pengumuman, dan Aduan Masuk.
- Basis Data Lokal SQLite (`node:sqlite`): Cepat, zero-setup, dan decoupled dengan pattern repositori untuk kesiapan migrasi masa depan (PostgreSQL/MySQL/Supabase).
- Data geografis faktual berlandaskan Perda Kota Tomohon No. 12 Tahun 2008.
- Aksesibilitas WCAG AA (kontras tinggi, responsif ponsel/desktop).

## Brand Commitments

- Nama resmi: Kelurahan Walian Dua, Kecamatan Tomohon Selatan, Kota Tomohon.
- Lambang resmi: Lambang Daerah Kota Tomohon (Burung Manguni, Tawaang, Rumah Adat Minahasa, Pena Emas).
- Falsafah: *Sitou Timou Tumou Tou* & *Mapalus*.

## Evidence on Hand

- Lambang resmi Kota Tomohon (`public/images/logo-tomohon.png`).
- Peta pembagian wilayah kecamatan (`public/images/peta-tomohon.png`).
- Foto lanskap nyata pegunungan Tomohon & Danau Linow Tomohon Selatan (`public/images/`).
- Data agregat BPS Kota Tomohon & Perda No. 12 Tahun 2008.

## Product Principles

1. **Integritas & Transparansi:** Setiap data dan alur layanan disajikan terbuka, akurat, dan tanpa biaya tersembunyi.
2. **Kearifan Lokal yang Bernyawa:** Membawa identitas budaya Minahasa dan kebanggaan Tomohon tanpa klise buatan AI.
3. **Kejelasan Tanpa Beban Kognitif:** Navigasi langsung menuju kebutuhan warga tanpa penumpukan visual atau jargon berbelit.
4. **Kecepatan Akses & Kemudahan:** Responsif, ringan, dan ramah pengguna di perangkat bergerak (mobile-first).

## Accessibility & Inclusion

Memenuhi standar WCAG AA dengan kontras teks tajam (≥4.5:1), tombol kontrol berukuran sentuh minimum 44px, navigasi keyboard yang jelas, dan bahasa Indonesia yang lugas dan inklusif bagi seluruh kalangan warga.
