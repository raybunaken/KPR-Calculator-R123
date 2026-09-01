# KPR Calculator Web - Rumah123

Simulasi KPR interaktif berbasis web, menggantikan Google Sheets Calculator.

## Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** - styling
- **Recharts** - grafik amortisasi interaktif  
- **Google Sheets API** - source of truth data bunga bank
- **Vercel** - deployment (free tier)

## Struktur Project

```
kpr-web/
├── app/
│   ├── page.tsx              # Landing page
│   ├── calculator/page.tsx   # Halaman kalkulator
│   └── api/products/route.ts # API endpoint data bank (cached ISR)
├── components/calculator/
│   ├── LoanForm.tsx          # Form input nasabah
│   ├── SimulationResults.tsx # Hasil simulasi + perbandingan
│   ├── AmortizationChart.tsx # Grafik cicilan per tahun
│   └── AmortizationTable.tsx # Tabel amortisasi detail
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── calculator.ts         # Engine hitung amortisasi
│   ├── rac.ts                # Eligibility checker per bank
│   └── sheets.ts             # Google Sheets API client
└── data/
    └── bank-products.json    # Static fallback data (490 produk)
```

## Setup Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables** — buat file `.env.local`:
   ```
   GOOGLE_SERVICE_ACCOUNT_JSON=<isi JSON service account lengkap>
   GOOGLE_SPREADSHEET_ID=1GQZAg6iJG3PRim8gts4MfElafZ4uu2Fx5bUojVabWPY
   ```

3. **Run dev server**
   ```bash
   npm run dev
   ```
   Buka http://localhost:3000

## Deploy ke Vercel

### Langkah 1: Push ke GitHub
```bash
git add .
git commit -m "KPR Calculator MVP"
git remote add origin https://github.com/[username]/kpr-calculator
git push -u origin main
```

### Langkah 2: Import di Vercel
1. Buka https://vercel.com/new
2. Import repository dari GitHub
3. **Set environment variables** di Vercel dashboard:
   - `GOOGLE_SERVICE_ACCOUNT_JSON` — paste isi file JSON service account (satu baris)
   - `GOOGLE_SPREADSHEET_ID` — `1GQZAg6iJG3PRim8gts4MfElafZ4uu2Fx5bUojVabWPY`
4. Deploy!

> ⚠️ **Penting**: Jangan commit `.env.local` ke Git. File ini sudah ada di `.gitignore`.

## Update Data Bunga

Data bunga bank diambil **langsung dari Google Sheets** dan di-cache selama 1 jam di Vercel.

**Cara update bunga:**
1. Buka Google Sheets "Calculator KPR Rumah123 2026"
2. Update sheet `INDEX` kolom bunga (kolom N dst)
3. Web akan otomatis pickup perubahan dalam maks. 1 jam
4. Atau force refresh dengan trigger redeploy di Vercel

## Fitur Kalkulator

### Input
- Tipe KPR: Primary, Secondary, Take Over, Multiguna
- Jenis: Konvensional / Syariah
- Harga properti + DP slider
- Tenor 5–30 tahun
- Status karyawan + income (untuk validasi 35% rule)
- Area (untuk eligibility per bank)
- Ready Dana

### Take Over
- Input sisa outstanding + cicilan saat ini
- Kalkulasi estimasi penalti
- Perbandingan total angsuran vs bank lama

### Output
- Ranking produk termurah (eligible vs tidak eligible)
- Cicilan fixed period & floating per bulan
- Total angsuran selama tenor
- Total bunga yang dibayar
- Grafik cicilan per tahun (Recharts)
- Tabel amortisasi detail per tahun

## Lisensi
Internal tool Rumah123 — tidak untuk distribusi publik.
