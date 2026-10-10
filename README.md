# Portal Resmi & Sistem Pelayanan Publik Kelurahan Walian Dua

Portal layanan informasi publik dan sistem administrasi kelurahan berbasis web modern untuk Kelurahan Walian Dua, Kota Tomohon, Sulawesi Utara.

---

## 🚀 Fitur Unggulan

- **Portal Publik (Civic Portal)**:
  - Profil kelurahan, visi misi, dan struktur aparatur kelurahan.
  - Direktori informasi layanan administrasi kependudukan & perizinan.
  - Galeri kegiatan masyarakat dan pengumuman resmi berkala.
  - Formulir Halo Lurah (pengaduan & aspirasi warga) terhubung langsung ke WhatsApp resmi Lurah.
  - Desain responsif, accessible, dan ramah mobile berstandar UI/UX modern.

- **Admin Dashboard**:
  - Panel kontrol manajemen aparatur, galeri warga, layanan publik, dan pengumuman warga.
  - Proteksi autentikasi berbasis HMAC-SHA256 session token dengan cookies HTTP-only, secure, samesite strict.
  - Middleware / Proxy route protection untuk route `/admin/*` dan mutasi `/api/admin/*`.
  - Rate limiting berbasis sliding window di level endpoint autentikasi dan API.
  - Sanitasi file upload dengan verifikasi MIME magic bytes (PNG, JPEG, WebP).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library UI**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [@base-ui/react](https://base-ui.com/), [Lucide React](https://lucide.dev/)
- **Database**: [Supabase PostgreSQL](https://supabase.com/) dengan Row Level Security (RLS)
- **Deployment**: [Vercel](https://vercel.com/)

---

## ⚙️ Konfigurasi Environment Variables

Sebelum menjalankan aplikasi secara lokal atau melakukan deploy ke Vercel, pastikan konfigurasi variabel lingkungan berikut telah disiapkan:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Authentication & Security
SESSION_SECRET=your_super_strong_random_session_secret_32_characters_minimum
ADMIN_SALT=your_admin_password_salt_hex_string
```

---

## 💻 Panduan Pengembangan Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/kresando/WalianDua.git
   cd WalianDua
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Setup environment variables**:
   ```bash
   cp .env.example .env.local
   # Isi kredensial Supabase dan Secret pada file .env.local
   ```

4. **Jalankan development server**:
   ```bash
   pnpm dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

5. **Build test**:
   ```bash
   pnpm build
   ```

---

## 🚢 Panduan Deploy ke Vercel

1. Buka dashboard [Vercel](https://vercel.com/) dan import repository `kresando/WalianDua`.
2. Pada bagian **Environment Variables**, tambahkan 5 variabel lingkungan berikut:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SESSION_SECRET`
   - `ADMIN_SALT`
3. Klik **Deploy**. Vercel akan otomatis melakukan cloning cabang `main` dan menjalankan build Turbopack Next.js.
