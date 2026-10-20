# MASTER CONTEXT & HANDOVER GUIDE (MIGRASI ANTIGRAVITY)

Dokumen ini berisi rangkuman lengkap arsitektur sistem, database, deployment, dan riwayat pekerjaan terakhir untuk melanjutkan sesi Antigravity di laptop baru tanpa kehilangan konteks.

---

## 1. Identitas Proyek & Struktur Direktori

### A. Aplikasi Kalkulator KPR (Web App)
* **Path di Laptop**: `D:\KPR CALCULATOR\kpr-web`
* **Tech Stack**: Next.js 16.3.1 (App Router, Turbopack), TypeScript, Tailwind CSS, Lucide Icons.
* **Data Sumber Suku Bunga**: `data/bank-products.json` (638 produk KPR dari 17+ bank rekanan).
* **GitHub Repository**: `https://github.com/raybunaken/KPR-Calculator-R123.git` (Branch: `main`)
* **Production URLs (Vercel)**:
  * `https://kpr-r123.vercel.app`
  * `https://kpr-calculator-r123.vercel.app`
* **Vercel Scope**: `rayssas-projects-8ce61970`

### B. Big Data KPR & MCP Server
* **Path di Laptop**: `D:\Big data Kpr`
* **MCP Server Script**: `src/mcp_server.py`
* **Fungsi**: Skrip analitik data KPR leads, sinkronisasi suku bunga, dan server MCP tools (`kpr-intelligence`).

---

## 2. Kredensial & Konfigurasi Lingkungan

### A. Database Neon PostgreSQL
* **Connection String**:
  `postgresql://neondb_owner:npg_JATU5LedIE4q@ep-withered-tree-azk1k9ro-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
* **Tabel Utama**:
  * `kpr_bank_products`: Menyimpan katalog seluruh produk KPR bank (kolom: `kode`, `bank`, `tipe`, `nama`, `min_plafond`, `max_plafond`, `dp_min`, `min_tenor`, `max_tenor`, `masa_fix`, `rates`, `syariah`, `jenis_bunga`, `updated_at`).
  * `kpr_bank_updates`: Menyimpan label tanggal update per bank (kolom: `bank`, `update_date`, `updated_at`).
  * `kpr_leads`: Data leads dan pipeline KPR.

### B. Deployment Vercel
* Perintah deploy production:
  ```bash
  npx vercel --prod --yes --scope rayssas-projects-8ce61970
  npx vercel alias set <deployment-url> kpr-r123.vercel.app --scope rayssas-projects-8ce61970
  npx vercel alias set <deployment-url> kpr-calculator-r123.vercel.app --scope rayssas-projects-8ce61970
  ```

---

## 3. Aturan & Preferensi User (Strict Guidelines)
* **DILARANG MENGGUNAKAN EM DASH (`—` atau `-` sebagai tanda baca pemisah)**. Gunakan titik dua (`:`), garis tegak vertikal (`|`), atau bullet (`•`).
* **DILARANG MENGGUNAKAN EMOJI / EMOTES** dalam teks percakapan maupun kode.
* **Gunakan Bahasa Indonesia** yang profesional, lugas, dan rapi dalam setiap respon.
* **Prinsip Update Bunga**: *"Timpa yang sudah ada jika sama persis. Jika berbeda sedikit (nama skema, tenor, promo baru), wajib buat nama atau kode produk baru"*.
* **Buat tautan file yang dapat diklik** menggunakan format markdown link `file://`.

---

## 4. Status Pekerjaan Terakhir (Live & Verified)

1. **Pembaruan Suku Bunga Bank Sinarmas (Tahun Baru Punya Rumah Baru)**:
   * Brosur resmi periode 1 Januari s.d. 31 Maret 2026 telah 100% diproses.
   * Total produk Sinarmas aktif: **42 produk** (21 produk lama diperbarui + 21 produk skema baru ditambahkan dengan kode `99SS277` s.d. `99SS297`).
   * Telah disinkronkan ke `bank-products.json` dan tabel Neon DB `kpr_bank_products` & `kpr_bank_updates` (`Sinarmas: 19 Okt 2026`).

2. **Fitur Tanggal Terakhir Diperbarui per Program (Live)**:
   * **Database & JSON**: Field `updatedAt` telah ditambahkan ke seluruh 638 produk KPR di `data/bank-products.json` dengan fallback otomatis ke `bungaUpdates[bank]`.
   * **Portal Admin (`/admin/products`)**:
     * Kolom tabel baru "Update Terakhir" dengan badge warna visual berdasarkan kebaruan (hijau untuk <=30 hari, biru untuk <=90 hari).
     * Filter urutan baru: *Update Terbaru ↓* dan *Update Terlama ↑*.
     * Metrik header: *Update Terkini (30 Hari)*.
     * Modal tambah/edit produk dengan input tanggal update otomatis.
   * **Kartu Hasil Simulasi Kalkulator (`/calculator`)**:
     * Bagian `Kode: ...` pada subtitle di setiap kartu produk telah diganti menjadi badge hijau: `Terakhir Update: [tanggal]`.
     * Dropdown urutan kartu dilengkapi opsi: `Update Bunga Terbaru`.

---

## 5. Cara Melanjutkan Sesi di Laptop Baru

### Opsi A (Paling Mudah: Salin Folder & Restore Antigravity):
1. Ekstrak file zip migrasi `BACKUP_MIGRASI_ANTIGRAVITY.zip` ke laptop baru.
2. Tempatkan folder proyek di path:
   * `D:\KPR CALCULATOR`
   * `D:\Big data Kpr`
3. Salin isi folder `antigravity_mcp` ke `%USERPROFILE%\.gemini\antigravity\mcp`
4. Salin isi folder `antigravity_brain` ke `%USERPROFILE%\.gemini\antigravity\brain\bf196e7f-ec1f-4db9-a2ec-ada3828cf360`
5. Buka Antigravity di laptop baru, buka workspace `D:\KPR CALCULATOR`, dan Antigravity akan langsung mengenali seluruh sesi sebelumnya.

### Opsi B (Buka Chat Baru di Laptop Baru):
1. Buka workspace `D:\KPR CALCULATOR` di Antigravity pada laptop baru.
2. Buka chat baru, ketik instruksi berikut ke agen Antigravity:
   > *"Tolong baca file D:\KPR CALCULATOR\MASTER_CONTEXT_RESUME.md dan lanjutkan session sebelumnya. Pahami aturan penulisan tanpa em dash/emoji, koneksi Neon DB, Vercel scope, dan status update terakhir."*
3. Agen akan langsung membaca dokumen ini dan memahami seluruh konteks tanpa perlu dijelaskan ulang dari awal.
