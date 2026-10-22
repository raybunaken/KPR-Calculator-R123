import type { BankRAC } from "./types";

export interface BankTacticalGuide {
  sellingPoints: string;
  karyawanNote: string;
  takeOverNote: string;
  propertyNote: string;
}

export const BANK_TACTICAL_GUIDES: Record<string, BankTacticalGuide> = {
  Muamalat: {
    sellingPoints: "Skema Murni Syariah, angsuran pasti s.d lunas, tanpa denda penalti pelunasan dipercepat.",
    karyawanNote: "Menerima Karyawan Tetap & Kontrak. Bisa joint income suami-istri.",
    takeOverNote: "Take over syariah murni atau take over + top up dana tunai.",
    propertyNote: "Akses jalan depan rumah muat minimal 1 mobil, SHM / SHGB, IMB / PBG lengkap.",
  },
  "CIMB Niaga": {
    sellingPoints: "Program bunga promo sangat kompetitif, approval cepat, tersedia skema konvensional & syariah.",
    karyawanNote: "Karyawan Tetap, Kontrak, & Pengusaha (min 2 tahun usaha berjalan).",
    takeOverNote: "Plafond fleksibel, bisa take over konvensional atau syariah.",
    propertyNote: "Akses jalan minimal 1 mobil, bebas banjir, SHM / SHGB aktif.",
  },
  "CIMB Syariah": {
    sellingPoints: "Akad Syariah kompetitif dengan margin ringan, tanpa denda keterlambatan / penalti riba.",
    karyawanNote: "Karyawan Tetap, Kontrak, & Pengusaha. Fleksibel join income.",
    takeOverNote: "Take over ke akad syariah untuk kepastian angsuran.",
    propertyNote: "Agunan SHM / SHGB, jalan muat mobil.",
  },
  Mandiri: {
    sellingPoints: "Ready Dana Bridging Take Over (Bank talangi pelunasan utang lama), jaringan cabang terbesar.",
    karyawanNote: "Karyawan Tetap, Kontrak, Pengusaha, hingga ASN/TNI/Polri/BUMN.",
    takeOverNote: "Sangat direkomendasikan untuk nasabah yang tidak punya dana tunai untuk menebus sertifikat lama.",
    propertyNote: "Lebar jalan minimal 3 meter (muat 2 mobil), sertifikat SHM / SHGB.",
  },
  Danamon: {
    sellingPoints: "Ready Dana Bridging Take Over, opsi masa fix panjang hingga 10 tahun, appraisal bersahabat.",
    karyawanNote: "Karyawan Tetap, Kontrak, & Pengusaha.",
    takeOverNote: "Siap dana bridging untuk take over, proses split transaksi aman.",
    propertyNote: "Sertifikat SHM / SHGB, lokasi perumahan cluster atau non-cluster layak huni.",
  },
  Permata: {
    sellingPoints: "Ready Dana Bridging Take Over, proses terdigitalisasi, tersedia opsi konven & syariah.",
    karyawanNote: "Karyawan Tetap, Kontrak, & Pengusaha.",
    takeOverNote: "Mendukung dana talangan take over murni dan top up.",
    propertyNote: "Jalan depan rumah muat mobil, SHM / SHGB.",
  },
  BTN: {
    sellingPoints: "Spesialis KPR nomor 1 di Indonesia, DP mulai 5%, kebijakan profil nasabah paling fleksibel.",
    karyawanNote: "Karyawan Tetap, Kontrak, Pengusaha, TNI/Polri, pekerja informal.",
    takeOverNote: "Program promo take over khusus dengan bunga fix rate bersahabat.",
    propertyNote: "Menerima perumahan cluster maupun non-cluster di seluruh Indonesia.",
  },
  BSI: {
    sellingPoints: "Bank Syariah BUMN terbesar, angsuran transparan dan tetap, bebas penalti pelunasan.",
    karyawanNote: "Khusus Karyawan Tetap (Jika nasabah Karyawan Kontrak/Pengusaha, sarankan via Join Income pasangan).",
    takeOverNote: "Take over syariah untuk meringankan cicilan lama.",
    propertyNote: "Lokasi bebas sengketa, tidak dekat SUTET / kuburan / sungai besar.",
  },
  UOB: {
    sellingPoints: "Bunga promo fix menarik untuk properti primary & secondary, layanan nasabah premium.",
    karyawanNote: "Karyawan Tetap, Kontrak (perusahaan terdaftar), & Pengusaha.",
    takeOverNote: "Take over nasabah properti residensial.",
    propertyNote: "Akses jalan minimal 2 mobil, area Jabodetabek, Bandung, Surabaya.",
  },
  Maybank: {
    sellingPoints: "Ready Dana Bridging Take Over, opsi skema Single Rate flat sampai lunas.",
    karyawanNote: "Karyawan Tetap, Kontrak, & Pengusaha.",
    takeOverNote: "Bank menyediakan fasilitas pelunasan take over.",
    propertyNote: "SHM / SHGB, jalan muat mobil.",
  },
  INA: {
    sellingPoints: "Ready Dana Bridging Take Over, fleksibel untuk take over kilat.",
    karyawanNote: "Karyawan Tetap, Kontrak, & Pengusaha.",
    takeOverNote: "Bisa talangan pelunasan take over.",
    propertyNote: "Agunan SHM / SHGB, DP minimal 20%.",
  },
  OCBC: {
    sellingPoints: "Ready Dana Bridging Take Over, fitur KPR Kendali hemat bunga dengan saldo tabungan.",
    karyawanNote: "Karyawan Tetap & Pengusaha.",
    takeOverNote: "Fasilitas pelunasan take over disediakan bank.",
    propertyNote: "SHM / SHGB, Jabodetabek dan kota-kota besar.",
  },
  Sinarmas: {
    sellingPoints: "Skema bunga berjenjang bertahap, fleksibel untuk nasabah wiraswasta / pengusaha.",
    karyawanNote: "Karyawan Tetap & Pengusaha.",
    takeOverNote: "Bisa take over + tambahan modal usaha (top up).",
    propertyNote: "SHM / SHGB layak huni.",
  },
  "KB Bank": {
    sellingPoints: "Dukungan grup finansial global KB Kookmin, bunga bersaing.",
    karyawanNote: "Karyawan Tetap, Kontrak, Pengusaha, TNI/Polri.",
    takeOverNote: "Take over konvensional.",
    propertyNote: "SHM / SHGB.",
  },
  Ganesha: {
    sellingPoints: "Ready Dana Bridging Take Over, fleksibel dan personal.",
    karyawanNote: "Karyawan Tetap & Pengusaha.",
    takeOverNote: "Bank talangi pelunasan take over.",
    propertyNote: "SHM / SHGB di area Jabodetabek dan Jatim.",
  },
  BNI: {
    sellingPoints: "Bank BUMN ternama, suku bunga promo kompetitif, tenor panjang s.d 25-30 tahun.",
    karyawanNote: "Karyawan Tetap, Kontrak, BUMN/ASN, Pengusaha.",
    takeOverNote: "Take over BNI Griya fleksibel.",
    propertyNote: "SHM / SHGB, jalan muat mobil.",
  },
  BRI: {
    sellingPoints: "Bank BUMN jaringan terluas, tenor sangat panjang, proses mudah.",
    karyawanNote: "Karyawan Tetap, ASN, BUMN, Pengusaha.",
    takeOverNote: "Take over KPR BRI.",
    propertyNote: "SHM / SHGB.",
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
    sellingPoints: "Suku bunga kompetitif dengan simulasi resmi dari Bank rekanan Rumah123.",
    karyawanNote: "Menerima Karyawan Tetap & Karyawan Kontrak (tergantung profil).",
    takeOverNote: "Konsultasikan kesiapan dana pelunasan dengan PIC Bank.",
    propertyNote: "Sertifikat SHM / SHGB, akses jalan muat mobil, IMB / PBG lengkap.",
  };
}
