import type { BankRAC } from "./types";

export interface BankTacticalGuide {
  keunggulan: string;
  minIncomeKaryawanText: string;
  minIncomePengusahaText: string;
  karyawanNote: string;
  usahaNote: string;
  takeOverNote: string;
  propertyNote: string;
  areaCoverNote: string;
  personaNasabah: string;
  sellingPoints: string;
}

export const BANK_TACTICAL_GUIDES: Record<string, BankTacticalGuide> = {
  Muamalat: {
    keunggulan: "Skema Murni Syariah (Murabahah & MMQ), angsuran pasti flat s.d lunas tanpa bunga floating, bebas biaya denda penalti pelunasan dipercepat.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 10.000.000 / bln (mutasi 6 bln)",
    karyawanNote: "Menerima Karyawan Tetap (min 1 th) & Karyawan Kontrak (min 2 th berkelanjutan). Sangat ramah join income resmi suami-istri.",
    usahaNote: "Pengusaha / wirausaha dipertimbangkan dengan mutasi rekening tabungan 6 bulan terakhir yang aktif dan sehat.",
    takeOverNote: "Take over syariah murni atau take over + top up dana tunai. Plafon mulai Rp 100 Jt. Tersedia opsi pelunasan take over.",
    propertyNote: "Akses jalan minimal 1 mobil leluasa (lebar 3 meter), SHM / SHGB aktif, IMB / PBG lengkap.",
    areaCoverNote: "Jabodetabek, Jawa Barat, Jawa Tengah, Jawa Timur, Bandung, Medan, Pekanbaru, Lampung, Riau, Cikarang, Kalimantan, Sulawesi.",
    personaNasabah: "Nasabah yang anti-riba, menghindari penalti pelunasan, atau menginginkan kepastian cicilan yang tidak pernah naik sama sekali.",
    sellingPoints: "Angsuran Syariah pasti s.d lunas, tanpa floating rate, bebas denda pelunasan dipercepat kapan saja.",
  },
  Mandiri: {
    keunggulan: "Ready Dana Bridging Take Over (Bank melunasi hutang di bank lama, sertifikat ditebus oleh Mandiri). Prioritas khusus ASN, TNI/Polri, dan BUMN.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln (Rp 3 Jt untuk payroll Mandiri / ASN)",
    minIncomePengusahaText: "Rp 25.000.000 / bln (min 2 th berjalan)",
    karyawanNote: "Menerima Karyawan Tetap, Karyawan Kontrak BUMN/PNS, ASN/TNI/Polri. Join income suami-istri otomatis menambah batas DSR.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan usaha aktif minimal 2-3 tahun, mutasi rekening 6 bulan + legalitas NIB/SIUP.",
    takeOverNote: "Plafon TO mulai Rp 100 Jt. Bank menalangi pelunasan (bridging) langsung ke bank asal, nasabah TIDAK perlu cari pinjaman dana tunai untuk menebus sertifikat.",
    propertyNote: "Lebar jalan depan wajib minimal 3 meter (bisa papasan 2 mobil). Sertifikat SHM atau SHGB (sisa berlaku > 5 th). Tidak dekat makam (<50m), SUTET, atau rel KA.",
    areaCoverNote: "Jabodetabek, Jawa Barat, Jawa Tengah, Jawa Timur, Bandung, Bali, Padang, Cikarang.",
    personaNasabah: "Nasabah take over yang tidak punya uang tunai untuk melunasi sisa pinjaman lama, serta pegawai BUMN/PNS yang cari proses cepat.",
    sellingPoints: "Bank talangi pelunasan hutang lama (Ready Dana Bridging), proses aman, plafon fleksibel mulai Rp 100 Jt.",
  },
  "CIMB Niaga": {
    keunggulan: "Suku bunga promo fix terendah di pasar dengan tenor fleksibel s.d 25 tahun. Proses approval cepat (SLA 3-5 hari kerja) via sistem digital.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln (min 2 th berjalan)",
    karyawanNote: "Karyawan Tetap (min 1 th) & Karyawan Kontrak (min 2 th masa kerja continuous di perusahaan bonafide). Join income diakomodasi.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan rekam jejak keuangan dan mutasi usaha teratur minimal 2 tahun.",
    takeOverNote: "Plafon TO mulai Rp 200 Jt. Opsi Take Over Murni atau Take Over + Top Up untuk renovasi/investasi. Penilaian agunan transparan.",
    propertyNote: "Akses jalan depan minimal 1 mobil leluasa (row 3.5 meter), lingkungan bebas banjir, SHM / SHGB on-hand di bank asal.",
    areaCoverNote: "Cakupan Nasional: Jabodetabek, Jawa, Bali, Bandung, Medan, Pekanbaru, Lampung, Riau, Kalimantan, Sulawesi.",
    personaNasabah: "Nasabah yang mencari suku bunga promo paling hemat (Promo Affluent) dan menginginkan proses appraisal cepat.",
    sellingPoints: "Bunga promo super kompetitif, pilihan tenor panjang s.d 25 th, approval cepat dan transparan.",
  },
  "CIMB Syariah": {
    keunggulan: "Akad Syariah modern dengan margin kompetitif setara promo konvensional CIMB, bebas denda keterlambatan / penalti riba.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Menerima Karyawan Tetap & Kontrak (perusahaan bonafide). Joint income suami-istri fleksibel.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan mutasi buku tabungan 6 bulan rapi.",
    takeOverNote: "Take over hijrah dari bank konven ke syariah (Refinancing Syariah) mulai Rp 200 Jt. DP minimal 10%.",
    propertyNote: "Agunan SHM / SHGB aktif, akses jalan muat mobil, IMB / PBG lengkap.",
    areaCoverNote: "Jabodetabek, Jawa Barat, Jawa Tengah, Jawa Timur, Padang, Medan, Lampung, Cikarang, Kalimantan.",
    personaNasabah: "Nasabah bank konvensional yang cicilannya membengkak akibat bunga floating dan ingin hijrah ke syariah dengan bunga ringan.",
    sellingPoints: "Hijrah ke Syariah tanpa penalti riba, margin setara konven, cicilan lebih tenang dan transparan.",
  },
  BTN: {
    keunggulan: "Spesialis KPR nomor 1 di Indonesia dengan DP termurah (mulai 5%). Paling toleran terhadap profil nasabah, profesi informal, hingga rumah lelang/non-cluster.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 15.000.000 / bln (Sangat ramah UMKM)",
    karyawanNote: "Karyawan Tetap, Kontrak (tanpa syarat minimal tahun ketat jika profil baik), TNI/Polri, ASN, hingga pekerja profesional/informal.",
    usahaNote: "Min. Income Pengusaha hanya Rp 15 Jt (paling rendah dibanding bank lain yang mensyaratkan Rp 25 Jt).",
    takeOverNote: "Plafon TO sangat fleksibel tanpa minimal plafon ketat (bisa di bawah Rp 200 Jt). Promo Take Over bunga ringan periode berjalan.",
    propertyNote: "Paling fleksibel: Menerima rumah di dalam gang (akses motor tertentu), perumahan non-cluster, maupun perkampungan berkembang.",
    areaCoverNote: "Seluruh wilayah Indonesia (Jaringan cabang terluas se-Indonesia).",
    personaNasabah: "Nasabah dengan DP minim, karyawan kontrak, pekerja informal, atau nasabah yang agunannya ditolak bank swasta lain karena akses jalan.",
    sellingPoints: "DP mulai 5%, kriteria profesi paling mudah tembus, menerima perumahan cluster maupun non-cluster.",
  },
  BSI: {
    keunggulan: "Bank Syariah BUMN terbesar. Bebas fluktuasi bunga acuan BI, margin kompetitif, tanpa biaya denda penalti jika dilunasi di tengah jalan.",
    minIncomeKaryawanText: "Rp 8.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "KHUSUS Karyawan Tetap. (Karyawan Kontrak / Pengusaha HANYA bisa diproses melalui skema Join Income dengan pasangan karyawan tetap).",
    usahaNote: "Pengusaha min. Rp 25 Jt dan wajib melampirkan mutasi rekening koran usaha 6 bulan + bukti legalitas resmi.",
    takeOverNote: "Plafon TO mulai Rp 200 Jt. DP super ringan mulai 5%. Menerima take over murni dan refinancing multiguna syariah.",
    propertyNote: "Ketentuan ketat: Lokasi agunan tidak boleh dekat SUTET (<20 meter), tidak dekat area pemakaman, dan tidak di bantaran sungai. SHM/SHGB.",
    areaCoverNote: "Jabodetabek, Jawa Barat, Jawa Timur, dan kota-kota besar lainnya.",
    personaNasabah: "Karyawan tetap berpenghasilan stabil di atas Rp 8 Jt yang menginginkan akad syariah dari institusi perbankan BUMN.",
    sellingPoints: "BUMN Syariah terpercaya, DP mulai 5%, angsuran transparan dan bebas denda penalti pelunasan.",
  },
  Permata: {
    keunggulan: "Ready Dana Bridging Take Over (Bank talangi pelunasan sertifikat), proses approval terdigitalisasi serba cepat (Permata e-KPR), ada konven & syariah.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 15.000.000 / bln (Lebih ringan dari rata-rata)",
    karyawanNote: "Karyawan Tetap (min 1 th) & Karyawan Kontrak (min 2 th). Join income pasangan suami-istri sangat direkomendasikan.",
    usahaNote: "Min. Income Pengusaha Rp 15 Jt (jauh lebih mudah ditembus dibanding bank lain yang mensyaratkan Rp 25 Jt).",
    takeOverNote: "Plafon TO mulai Rp 250 Jt. Bank siap menalangi pelunasan sertifikat lama ke bank asal. Fitur top up dana tunai sangat mudah disetujui.",
    propertyNote: "Akses jalan depan minimal 1 mobil leluasa (row 3 meter). Sertifikat SHM atau SHGB aktif.",
    areaCoverNote: "Jabodetabek, Bandung, Jawa Timur, dan kota-kota satellite.",
    personaNasabah: "Wiraswasta/pengusaha dengan omset moderat (Rp 15-20 Jt) atau nasabah take over yang butuh dana talangan pelunasan tanpa ribet.",
    sellingPoints: "Ready Dana Bridging Take Over, syarat pengusaha cuma Rp 15 Jt, approval digital modern.",
  },
  Danamon: {
    keunggulan: "Ready Dana Bridging Take Over, opsi masa bunga fixed super panjang (hingga 10 tahun), proses appraisal agunan sangat objektif dan bersahabat.",
    minIncomeKaryawanText: "Rp 8.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Karyawan Tetap (min 1 th) & Kontrak (min 2 th). Bisa join income suami-istri.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan rekening koran usaha 6 bulan dan legalitas usaha valid (NIB/SIUP).",
    takeOverNote: "Plafon TO mulai Rp 500 Jt (khusus segmen menengah atas). Siap talangan pelunasan take over secara aman dengan split transaksi notaris.",
    propertyNote: "Perumahan cluster maupun non-cluster layak huni, akses jalan muat mobil, SHM / SHGB aktif.",
    areaCoverNote: "Jabodetabek, Jawa Barat, Jawa Tengah, Jawa Timur.",
    personaNasabah: "Nasabah plafon menengah ke atas (>= Rp 500 Jt) yang mencari masa bunga fixed panjang (10 th) agar terbebas dari kecemasan bunga naik.",
    sellingPoints: "Ready Dana Bridging, opsi masa bunga fixed hingga 10 tahun, appraisal fair dan plafon maksimal.",
  },
  Maybank: {
    keunggulan: "Menawarkan skema KPR Single Rate (Satu bunga tetap flat sampai lunas tanpa pernah masuk floating). Ready Dana Bridging Take Over.",
    minIncomeKaryawanText: "Rp 8.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Karyawan Tetap & Kontrak di perusahaan bonafide / multinasional. Join income diutamakan.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan rekam jejak bisnis stabil minimal 2 tahun.",
    takeOverNote: "Plafon TO minimal Rp 750 Jt (Segmen Affluent / Premium). Bank talangi pelunasan utang ke bank lama.",
    propertyNote: "Kawasan perumahan tertata, jalan depan muat 2 mobil, lingkungan bebas banjir, sertifikat SHM / SHGB.",
    areaCoverNote: "Jabodetabek, Jawa Barat, Jawa Tengah, Jawa Timur, Medan.",
    personaNasabah: "Nasabah mapan (plafon >= Rp 750 Jt) yang anti-ribet dengan bunga floating dan ingin cicilan pasti sama persis dari hari pertama sampai lunas.",
    sellingPoints: "Skema Single Rate flat s.d lunas, Ready Dana Bridging Take Over, layanan prioritas kelas atas.",
  },
  UOB: {
    keunggulan: "Bunga promo fix sangat tajam untuk segmen menengah atas. Tim processing responsif dengan standar layanan perbankan regional Asia Tenggara.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Karyawan Tetap & Kontrak (perusahaan terdaftar). Join income suami-istri.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan mutasi rekening 6 bulan aktif.",
    takeOverNote: "Plafon TO mulai Rp 200 Jt. Proses take over konvensional terstruktur.",
    propertyNote: "Lebar jalan depan minimal 2 mobil (row 3.5 meter). Lokasi agunan prima di perumahan tertata, SHM / SHGB.",
    areaCoverNote: "Jabodetabek, Bandung, Jawa Timur (Surabaya sekitarnya).",
    personaNasabah: "Nasabah yang membeli atau menjaminkan properti di perumahan berkelas yang menginginkan bunga promo kompetitif dan service prima.",
    sellingPoints: "Bunga promo fix sangat tajam, approval cepat untuk agunan prima, standar layanan regional.",
  },
  OCBC: {
    keunggulan: "Fitur unik KPR Kendali (Saldo tabungan nasabah otomatis memotong pokok hutang KPR setiap hari, memangkas total beban bunga dan mempercepat lunas). Ready Dana Bridging.",
    minIncomeKaryawanText: "Rp 15.000.000 / bln (Khusus nasabah mapan / prioritas)",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Hanya Karyawan Tetap & Pengusaha (tidak menerima karyawan kontrak reguler). Dikhususkan untuk nasabah established.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan perputaran dana cashflow usaha yang aktif.",
    takeOverNote: "Plafon TO mulai Rp 250 Jt. Bank siap menalangi pelunasan take over ke bank lama.",
    propertyNote: "Agunan SHM / SHGB di perumahan berkualitas, jalan muat 2 mobil. Khusus wilayah Jabodetabek.",
    areaCoverNote: "Jabodetabek.",
    personaNasabah: "Pengusaha atau profesional dengan tabungan/dana mengendap besar agar bisa memanfaatkan fitur KPR Kendali untuk memangkas bunga hingga mendekati 0%.",
    sellingPoints: "KPR Kendali potong bunga pakai saldo tabungan, Ready Dana Bridging, fasilitas perbankan premium.",
  },
  Sinarmas: {
    keunggulan: "Spesialis bunga berjenjang bertahap (step-up rate), cicilan menyesuaikan pertumbuhan karir/omset usaha. Sangat terbuka untuk Take Over + Top Up modal usaha.",
    minIncomeKaryawanText: "Rp 8.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Hanya Karyawan Tetap & Pengusaha (tidak menerima karyawan kontrak).",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt. Analis kredit sangat fleksibel memahami laporan keuangan usaha wirausaha.",
    takeOverNote: "Plafon TO mulai Rp 500 Jt. Sangat direkomendasikan jika nasabah butuh tambahan dana segar (Top Up) untuk modal ekspansi.",
    propertyNote: "Agunan SHM / SHGB, akses jalan muat mobil, kondisi rumah layak huni.",
    areaCoverNote: "Jabodetabek dan Jawa Timur.",
    personaNasabah: "Pengusaha atau eksekutif yang butuh take over sekaligus mencairkan dana segar (top up) ratusan juta untuk modal bisnis.",
    sellingPoints: "Skema bunga berjenjang bertahap, persetujuan top up dana tunai fleksibel, solusi tepat untuk wirausaha.",
  },
  "KB Bank": {
    keunggulan: "Didukung konglomerasi finansial terkemuka Korea Selatan (KB Financial Group). Kebijakan profil nasabah terbuka termasuk ASN, TNI/Polri, dan BUMN.",
    minIncomeKaryawanText: "Rp 8.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Karyawan Tetap, Kontrak, Pengusaha, TNI/Polri, ASN/BUMN. Join income diakomodasi.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt dengan legalitas operasional usaha jelas.",
    takeOverNote: "Plafon TO mulai Rp 350 Jt. Take over konvensional terstruktur.",
    propertyNote: "SHM / SHGB aktif, akses jalan muat mobil, IMB / PBG lengkap.",
    areaCoverNote: "Jabodetabek dan Medan.",
    personaNasabah: "Nasabah korporasi rekanan grup KB atau nasabah yang membutuhkan alternatif pembiayaan bank swasta berskala internasional.",
    sellingPoints: "Dukungan grup finansial global, terbuka untuk TNI/Polri dan karyawan kontrak, suku bunga bersaing.",
  },
  INA: {
    keunggulan: "Ready Dana Bridging Take Over dengan alur birokrasi perbankan yang ringkas dan waktu persetujuan yang relatif cepat.",
    minIncomeKaryawanText: "Rp 8.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Menerima Karyawan Tetap, Karyawan Kontrak, & Pengusaha.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt.",
    takeOverNote: "Plafon TO mulai Rp 350 Jt. Bank siap menalangi pelunasan take over. DP minimal 20%.",
    propertyNote: "Agunan SHM / SHGB, jalan muat mobil, agunan tidak sengketa.",
    areaCoverNote: "Jabodetabek dan Bandung.",
    personaNasabah: "Nasabah take over di area Jabodetabek/Bandung yang membutuhkan proses persetujuan cepat dengan dana bridging bank.",
    sellingPoints: "Ready Dana Bridging Take Over, birokrasi cepat dan tidak rumit, solusi praktis take over.",
  },
  Ganesha: {
    keunggulan: "Ready Dana Bridging Take Over dengan pendekatan verifikasi kredit yang sangat personal, komunikatif, dan solutif.",
    minIncomeKaryawanText: "Rp 10.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Hanya Karyawan Tetap & Pengusaha.",
    usahaNote: "Min. Income Pengusaha Rp 25 Jt.",
    takeOverNote: "Plafon TO mulai Rp 100 Jt (sangat bersahabat untuk take over plafon kecil). Bank siap talangi pelunasan.",
    propertyNote: "Sertifikat SHM / SHGB aktif, jalan muat mobil.",
    areaCoverNote: "Jabodetabek dan Jawa Timur.",
    personaNasabah: "Nasabah take over plafon Rp 100-300 Jt yang butuh dana talangan bridging dan komunikasi fleksibel dengan pihak bank.",
    sellingPoints: "Ready Dana Bridging mulai Rp 100 Jt, penanganan kredit personal dan fleksibel.",
  },
  BNI: {
    keunggulan: "Bank BUMN papan atas dengan reputasi teruji. Suku bunga promo BNI Griya kompetitif dengan pilihan tenor panjang hingga 25-30 tahun.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 20.000.000 / bln",
    karyawanNote: "Karyawan Tetap, Karyawan Kontrak BUMN/ASN, Pegawai Negeri, dan Pengusaha. Prioritas khusus nasabah payroll BNI.",
    usahaNote: "Min. Income Pengusaha Rp 20 Jt dengan mutasi rekening koran 6 bulan terakhir.",
    takeOverNote: "Take over BNI Griya fleksibel, bisa take over murni atau take over + top up biaya renovasi.",
    propertyNote: "SHM / SHGB, akses jalan muat mobil, perumahan cluster maupun non-cluster.",
    areaCoverNote: "Seluruh wilayah Indonesia.",
    personaNasabah: "Pegawai BUMN, ASN, atau nasabah umum yang mencari KPR BUMN dengan tenor maksimal s.d 30 tahun.",
    sellingPoints: "Tenor panjang hingga 30 tahun, reputasi BUMN terpercaya, proses mudah untuk nasabah payroll.",
  },
  BRI: {
    keunggulan: "Bank BUMN dengan jaringan terluas di Indonesia. Syarat pengajuan fleksibel dan proses KPR BRI mudah diakses di seluruh pelosok tanah air.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 20.000.000 / bln",
    karyawanNote: "Karyawan Tetap, ASN, BUMN, TNI/Polri, serta Pengusaha UMKM.",
    usahaNote: "Min. Income Pengusaha Rp 20 Jt dengan pencatatan usaha aktif.",
    takeOverNote: "Take over KPR BRI dengan proses verifikasi bersahabat.",
    propertyNote: "Agunan SHM / SHGB aktif di seluruh Indonesia.",
    areaCoverNote: "Seluruh wilayah Indonesia.",
    personaNasabah: "Nasabah di daerah second-tier / luar pulau atau nasabah payroll BRI yang membutuhkan pembiayaan rumah dengan proses dekat.",
    sellingPoints: "Jaringan cabang terluas, tenor panjang, persyaratan mudah dan dekat dengan nasabah.",
  },
};

export function getBankRac(
  bankName: string,
  isSyariah?: boolean,
  racList?: BankRAC[],
): BankRAC | undefined {
  if (!racList || racList.length === 0) return undefined;
  const bClean = bankName.trim().toLowerCase();

  if (isSyariah && bClean.includes("cimb")) {
    return racList.find((r) => r.bank.toLowerCase().includes("cimb syariah"));
  }

  return racList.find((r) => {
    const rClean = r.bank.toLowerCase();
    if (rClean === bClean) return true;
    if (bClean === "cimb" && rClean.includes("cimb niaga")) return true;
    if (bClean === "kb" && rClean.includes("kb bank")) return true;
    if (rClean.includes(bClean) || bClean.includes(rClean)) return true;
    return false;
  });
}

export function getBankTacticalGuide(bankName: string): BankTacticalGuide {
  if (BANK_TACTICAL_GUIDES[bankName]) {
    return BANK_TACTICAL_GUIDES[bankName];
  }

  const bClean = bankName.trim().toLowerCase();
  for (const [key, val] of Object.entries(BANK_TACTICAL_GUIDES)) {
    if (key.toLowerCase().includes(bClean) || bClean.includes(key.toLowerCase())) {
      return val;
    }
  }

  return {
    keunggulan: "Suku bunga kompetitif dengan simulasi resmi dari bank rekanan Rumah123.",
    minIncomeKaryawanText: "Rp 5.000.000 / bln",
    minIncomePengusahaText: "Rp 25.000.000 / bln",
    karyawanNote: "Menerima Karyawan Tetap & Karyawan Kontrak (tergantung verifikasi profil nasabah).",
    usahaNote: "Usaha aktif minimal 2 tahun dengan mutasi rekening 6 bulan terakhir.",
    takeOverNote: "Konsultasikan kesiapan dana pelunasan dan sertifikat dengan analis bank terkait.",
    propertyNote: "Sertifikat SHM / SHGB, akses jalan muat mobil, IMB / PBG lengkap.",
    areaCoverNote: "Jabodetabek dan kota-kota besar.",
    personaNasabah: "Nasabah yang mencari produk pembiayaan KPR terpercaya dari bank mitra Rumah123.",
    sellingPoints: "Program suku bunga promo resmi terdaftar di database Rumah123.",
  };
}
