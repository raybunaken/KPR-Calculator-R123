import type { BankRAC } from "./types";

export interface BankDetailedRAC {
  penghasilan: {
    gajiKaryawan: string;
    incomePengusaha: string;
    syaratKaryawanTetap: string;
    syaratKaryawanKontrak: string;
    syaratPengusaha: string;
    joinIncome: string;
  };
  takeOver: {
    skemaBridging: string;
    minPlafondTO: string;
    minSisaTenor: string;
    opsiTopUp: string;
    ketentuanBankAsal: string;
  };
  agunan: {
    aksesJalan: string;
    jenisSertifikat: string;
    dokumenBangunan: string;
    batasanLokasi: string;
    wilayahCover: string[];
  };
  finansial: {
    dpMinimal: string;
    skemaBunga: string;
    penaltiPelunasan: string;
    maksimalTenor: string;
  };
  telemarketing: {
    keunggulanUtama: string;
    personaIdeal: string;
    pitchingScript: string;
    pantangan: string;
  };
}

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
  detail: BankDetailedRAC;
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan (Take Home Pay tercermin di rekening)",
        incomePengusaha: "Minimal Rp 10.000.000 / bulan (Rata-rata mutasi kredit 6 bulan)",
        syaratKaryawanTetap: "Minimal masa kerja 1 tahun di perusahaan saat ini atau total 2 tahun termasuk tempat kerja sebelumnya.",
        syaratKaryawanKontrak: "Bisa diajukan dengan minimal masa kerja continuous 2 tahun di perusahaan skala menengah ke atas.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun, memiliki rekening tabungan aktif 6 bulan terakhir, bukti legalitas usaha (NIB / SKU).",
        joinIncome: "Bisa menggabungkan penghasilan suami & istri resmi untuk menaikkan plafon (maksimal DSR hingga 50-60%).",
      },
      takeOver: {
        skemaBridging: "Tersedia opsi pelunasan take over syariah (bank dapat memfasilitasi pelunasan sesuai hasil analisis appraisal).",
        minPlafondTO: "Rp 100.000.000 (Sangat fleksibel untuk sisa hutang moderat)",
        minSisaTenor: "Minimal sisa pinjaman berjalan 12 bulan di bank asal dengan track record SLIK/BI Checking lancar (Kolektibilitas 1).",
        opsiTopUp: "Tersedia opsi Take Over + Top Up Dana Tunai Syariah untuk kebutuhan renovasi atau modal usaha.",
        ketentuanBankAsal: "Menerima take over dari bank konvensional maupun bank syariah lain.",
      },
      agunan: {
        aksesJalan: "Lebar jalan depan agunan minimal 3 meter (dapat dilalui 1 mobil leluasa).",
        jenisSertifikat: "SHM (Sertifikat Hak Milik) atau SHGB yang masa berlakunya masih panjang (> 5 tahun).",
        dokumenBangunan: "IMB / PBG wajib ada, bukti bayar PBB tahun terakhir, denah bangunan sesuai fisik.",
        batasanLokasi: "Bebas banjir, tidak berada tepat di bawah jalur tegangan tinggi (SUTET), tidak tusuk sate ekstrim.",
        wilayahCover: ["Jabodetabek", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bandung", "Medan", "Pekanbaru", "Lampung", "Riau", "Cikarang", "Kalimantan", "Sulawesi"],
      },
      finansial: {
        dpMinimal: "Mulai dari 5% (Sangat ringan untuk rumah pertama)",
        skemaBunga: "Akad Murabahah (Jual Beli) atau Musyarakah Mutanaqisah (MMQ) dengan margin flat sepanjang tenor.",
        penaltiPelunasan: "Bebas denda penalti pelunasan dipercepat (Sesuai fatwa DSN MUI tanpa biaya denda riba).",
        maksimalTenor: "Hingga 20 tahun untuk KPR Rumah Tinggal.",
      },
      telemarketing: {
        keunggulanUtama: "Cicilan 100% pasti sampai lunas tanpa kejutan bunga floating, bebas denda penalti jika ada rezeki melunasi cepat.",
        personaIdeal: "Nasabah muslim yang ingin hijrah dari bunga floating konvensional yang mencekik, atau pencari rumah pertama yang ingin kepastian budget bulanan.",
        pitchingScript: "'Pak/Bu, di Muamalat skemanya Murni Syariah, jadi cicilannya sudah dipatok pasti dari bulan pertama sampai lunas tanpa resiko bunga naik. Dan kalau nanti ada dana untuk lunasin duluan, sama sekali tidak kena denda penalti.'",
        pantangan: "Jangan ajukan nasabah dengan riwayat kredit macet (Kol 2 ke atas di pinjol/kartu kredit dalam 12 bulan terakhir).",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan (khusus payroll Mandiri & ASN minimal Rp 3.000.000).",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan (Rata-rata mutasi rekening koran 6 bulan terakhir).",
        syaratKaryawanTetap: "Minimal masa kerja 1 tahun di perusahaan saat ini. Perusahaan rekanan Mandiri diproses jalur kilat.",
        syaratKaryawanKontrak: "Khusus Karyawan Kontrak instansi BUMN, Lembaga Pemerintah, atau Rumah Sakit Pemerintah (min 2 tahun).",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun, ada izin legalitas usaha (NIB/SIUP), rekening koran aktif.",
        joinIncome: "Menerima join income suami-istri resmi (keduanya wajib berpenghasilan dan lolos SLIK).",
      },
      takeOver: {
        skemaBridging: "READY DANA BRIDGING: Mandiri langsung melunasi sisa pokok hutang ke bank lama nasabah (Nasabah tidak keluar uang tebusan).",
        minPlafondTO: "Rp 100.000.000 (Salah satu bank dengan batas plafon bridging paling terjangkau).",
        minSisaTenor: "Minimal sisa pinjaman berjalan 12 bulan di bank asal dengan track record cicilan lancar tanpa tunggakan.",
        opsiTopUp: "Sangat direkomendasikan untuk Take Over + Top Up Dana Tunai hingga 80-85% dari nilai taksasi agunan.",
        ketentuanBankAsal: "Menerima take over dari seluruh Bank Umum Konvensional, Bank Syariah, dan BPD terdaftar OJK.",
      },
      agunan: {
        aksesJalan: "Wajib lebar jalan minimal 3 meter (muat 2 mobil berpapasan atau standar mobil + motor berjarak).",
        jenisSertifikat: "SHM atau SHGB atas nama nasabah/pasangan (bisa atas nama developer jika primary rekanan).",
        dokumenBangunan: "IMB / PBG resmi wajib ada, bukti PBB lunas, fisik bangunan 100% jadi.",
        batasanLokasi: "Tidak berada di bantaran kali (<10m), radius makam minimal 50m, radius SUTET minimal 20m.",
        wilayahCover: ["Jabodetabek", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bandung", "Bali", "Padang", "Cikarang"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10% untuk secondary & take over (bisa 5% untuk promo developer rekanan tertentu).",
        skemaBunga: "Pilihan Fix Rate 1, 3, 5, hingga 10 tahun, dilanjutkan suku bunga floating transparan.",
        penaltiPelunasan: "Penalti 2-3% jika dilunasi sebelum masa fixed berakhir; bebas penalti setelah masuk masa floating.",
        maksimalTenor: "Hingga 20 tahun (usia nasabah maksimal 55 tahun untuk karyawan dan 65 tahun untuk pengusaha saat jatuh tempo).",
      },
      telemarketing: {
        keunggulanUtama: "Solusi nomor 1 untuk nasabah yang mau pindah bank tapi tidak punya uang cash untuk tebus sertifikat di bank lama.",
        personaIdeal: "Nasabah take over yang pusing kena bunga floating 13-14% di bank lama dan ingin sertifikat ditebus langsung oleh Bank Mandiri.",
        pitchingScript: "'Pak/Bu, di Bank Mandiri ada fasilitas Dana Bridging. Jadi Bapak/Ibu tidak perlu pusing cari uang ratusan juta buat tebus sertifikat di bank lama, Bank Mandiri yang langsung talangi pelunasan hutangnya.'",
        pantangan: "Jangan diajukan jika lebar jalan depan rumah kurang dari 3 meter atau rumah berada di dalam gang sempit.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Masa kerja minimal 1 tahun di perusahaan saat ini atau total 2 tahun kumulatif.",
        syaratKaryawanKontrak: "Bisa diproses untuk karyawan kontrak minimal 2 tahun berturut-turut di perusahaan berbadan hukum PT.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun, wajib melampirkan rekening koran 6 bulan terakhir dan legalitas NIB.",
        joinIncome: "Mendukung join income suami-istri untuk mendongkrak plafon pinjaman.",
      },
      takeOver: {
        skemaBridging: "Tersedia skema take over konvensional & syariah (bisa difasilitasi bridging untuk nasabah terpilih).",
        minPlafondTO: "Rp 200.000.000.",
        minSisaTenor: "Minimal sisa pinjaman 12 bulan di bank asal dengan riwayat angsuran tertib.",
        opsiTopUp: "Tersedia opsi Top Up dana tunai untuk berbagai kebutuhan nasabah.",
        ketentuanBankAsal: "Menerima take over dari bank rekanan BI/OJK.",
      },
      agunan: {
        aksesJalan: "Akses jalan depan rumah minimal muat 1 mobil leluasa (row 3 - 3.5 meter).",
        jenisSertifikat: "SHM atau SHGB atas nama debitur atau pasangan.",
        dokumenBangunan: "IMB / PBG lengkap dan sesuai dengan kondisi fisik bangunan.",
        batasanLokasi: "Kawasan bebas banjir, bukan area sengketa tanah.",
        wilayahCover: ["Jabodetabek", "Jawa Timur", "Jawa Tengah", "Bandung", "Jawa Barat", "Medan", "Pekanbaru", "Lampung", "Riau", "Kalimantan", "Bali", "Sulawesi"],
      },
      finansial: {
        dpMinimal: "Mulai dari 15% (atau 10% untuk program syariah tertentu).",
        skemaBunga: "Promo Bunga Fix 3, 5, hingga 10 tahun (Tersedia program Affluent Fix Rate terendah).",
        penaltiPelunasan: "Penalti standar industri jika melunasi dalam masa promo fixed.",
        maksimalTenor: "Hingga 25 tahun untuk karyawan.",
      },
      telemarketing: {
        keunggulanUtama: "Rate promo bunga fix sangat rendah dengan varian tenor beragam dan approval cepat.",
        personaIdeal: "Nasabah yang peka terhadap bunga rendah dan ingin menghemat pengeluaran bulanan sebesar-besarnya.",
        pitchingScript: "'Pak/Bu, di CIMB Niaga ada promo bunga fix mulai dari 2.99% - 4.25%, cicilan barunya jauh lebih hemat ratusan ribu sampai jutaan per bulan dibanding bank lain.'",
        pantangan: "Nasabah dengan DP di bawah 15% atau agunan yang berada di area banjir langganan.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Minimal masa kerja 1 tahun di perusahaan saat ini.",
        syaratKaryawanKontrak: "Bisa diajukan jika minimal sudah 2 tahun kontrak berkelanjutan di perusahaan terpercaya.",
        syaratPengusaha: "Minimal 2 tahun usaha berjalan dengan mutasi rekening 6 bulan aktif.",
        joinIncome: "Menerima join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "Menerima pembiayaan take over hijrah dari bank konvensional ke akad syariah.",
        minPlafondTO: "Rp 200.000.000.",
        minSisaTenor: "Minimal sisa pinjaman 1 tahun di bank lama.",
        opsiTopUp: "Tersedia pembiayaan tambahan kebutuhan multiguna syariah.",
        ketentuanBankAsal: "Bisa take over dari bank konvensional maupun bank syariah.",
      },
      agunan: {
        aksesJalan: "Jalan depan agunan minimal muat 1 mobil leluasa.",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG wajib ada.",
        batasanLokasi: "Lokasi layak huni dan bebas sengketa.",
        wilayahCover: ["Jabodetabek", "Jawa Timur", "Jawa Tengah", "Jawa Barat", "Medan", "Pekanbaru", "Lampung", "Riau", "Kalimantan", "Padang", "Cikarang"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10%.",
        skemaBunga: "Akad Musyarakah Mutanaqisah (MMQ) dengan nisbah kompetitif.",
        penaltiPelunasan: "Bebas denda riba keterlambatan / pelunasan.",
        maksimalTenor: "Hingga 25 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Mendapatkan bunga murah setara konvensional tapi dengan ketenangan akad syariah.",
        personaIdeal: "Nasabah bank konvensional yang cicilannya naik tajam karena floating rate dan ingin pindah ke syariah.",
        pitchingScript: "'Pak/Bu, di CIMB Niaga Syariah kita bantu hijrahkan KPR lama Bapak/Ibu ke akad syariah murni dengan margin bunga tetap yang sangat ringan.'",
        pantangan: "Debitur yang agunannya belum memiliki IMB resmi.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan (paling bersahabat untuk first-time buyers).",
        incomePengusaha: "Minimal Rp 15.000.000 / bulan (paling toleran untuk UMKM / wiraswasta).",
        syaratKaryawanTetap: "Minimal masa kerja 1 tahun (beberapa program payroll bisa lebih cepat).",
        syaratKaryawanKontrak: "Karyawan Kontrak BISA DIPROSES dengan mudah asal ada kontinuitas kerja dan mutasi tabungan jelas.",
        syaratPengusaha: "Usaha aktif minimal 1-2 tahun, buku kas/tabungan 6 bulan, surat keterangan usaha (SKU/NIB).",
        joinIncome: "Mendukung join income suami-istri atau orang tua-anak untuk memperbesar kapasitas kredit.",
      },
      takeOver: {
        skemaBridging: "Menerima take over murni dan take over top up (kebijakan pelunasan dapat dikonsultasikan dengan PIC cabang).",
        minPlafondTO: "Tidak ada batasan minimal yang kaku (bisa memproses plafon kecil di bawah Rp 200 Jt).",
        minSisaTenor: "Minimal sisa pinjaman berjalan 6-12 bulan di bank lama.",
        opsiTopUp: "Tersedia fasilitas penambahan plafon (Top Up) untuk renovasi hunian.",
        ketentuanBankAsal: "Menerima take over dari bank mana pun.",
      },
      agunan: {
        aksesJalan: "PALING FLEKSIBEL: Menerima perumahan cluster, non-cluster, hingga perkampungan layak huni.",
        jenisSertifikat: "SHM, SHGB, bahkan unit lelang bank.",
        dokumenBangunan: "IMB / PBG (jika ada catatan kelengkapan bisa dibantu asistensi legal bank).",
        batasanLokasi: "Menjangkau seluruh pelosok daerah di Indonesia.",
        wilayahCover: ["Seluruh Wilayah Indonesia (Jabodetabek, Jawa, Sumatera, Bali, Kalimantan, Sulawesi, Papua)"],
      },
      finansial: {
        dpMinimal: "Mulai dari 5% (Terendah di antara seluruh bank komersial).",
        skemaBunga: "Promo Bunga KPR BTN Gaesss / Promo Khusus Take Over dengan fix rate bersahabat.",
        penaltiPelunasan: "Standar penalti bank BUMN.",
        maksimalTenor: "Hingga 30 tahun (Tenor terpanjang untuk meringankan cicilan bulanan).",
      },
      telemarketing: {
        keunggulanUtama: "DP terendah (5%), syarat profesi paling lentur, tenor terpanjang (30 tahun), dan paling mudah diapprove.",
        personaIdeal: "Nasabah berpenghasilan pas-pasan, pekerja kontrak, atau nasabah yang ditolak bank swasta lain karena DP kurang atau jalan rumah sempit.",
        pitchingScript: "'Pak/Bu, kalau di BTN DP-nya mulai 5% saja dan tenornya bisa ditarik sampai 30 tahun, jadi cicilan per bulannya sangat enteng dan syaratnya paling bersahabat se-Indonesia.'",
        pantangan: "Nasabah yang sedang aktif menunggak kredit (SLIK Kol 3-5).",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 8.000.000 / bulan (Nasabah payroll BSI memiliki limit DSR lebih tinggi).",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "KHUSUS KARYAWAN TETAP dengan masa kerja minimal 1-2 tahun.",
        syaratKaryawanKontrak: "Karyawan Kontrak TIDAK BISA diproses tunggal (Hanya bisa sebagai joint applicant jika pasangan adalah karyawan tetap).",
        syaratPengusaha: "Pengusaha wajib menyertakan rekening koran 6 bulan, laporan laba rugi, dan legalitas usaha lengkap.",
        joinIncome: "Bisa join income suami-istri (salah satu wajib karyawan tetap).",
      },
      takeOver: {
        skemaBridging: "Menerima take over syariah (Mitra Faedah BSI Griya) dengan proses appraisal mandiri.",
        minPlafondTO: "Rp 200.000.000.",
        minSisaTenor: "Minimal sisa pinjaman berjalan 12 bulan.",
        opsiTopUp: "Tersedia pembiayaan top up kebutuhan halal.",
        ketentuanBankAsal: "Bisa dari bank konvensional maupun bank syariah lain.",
      },
      agunan: {
        aksesJalan: "Akses jalan depan rumah minimal 1 mobil (lebar 3 meter).",
        jenisSertifikat: "SHM atau SHGB resmi.",
        dokumenBangunan: "IMB / PBG wajib lengkap.",
        batasanLokasi: "KETAT: Tidak boleh berdekatan dengan SUTET (<20 meter), tidak bersebelahan dengan kuburan/makam, dan tidak di tepi bantaran sungai.",
        wilayahCover: ["Jabodetabek", "Jawa Barat", "Jawa Timur", "Medan", "Semarang", "Surabaya", "Makassar"],
      },
      finansial: {
        dpMinimal: "Mulai dari 5% untuk nasabah fixed income terpilih.",
        skemaBunga: "Akad Murabahah atau Musyarakah Mutanaqisah (MMQ) dengan skema angsuran tetap atau berjenjang syariah.",
        penaltiPelunasan: "BEBAS DENDA PENALTI pelunasan dipercepat (Prinsip Syariah murni).",
        maksimalTenor: "Hingga 20-30 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Kombinasi kekuatan Bank BUMN terbesar dan kepatuhan syariah murni bebas riba/denda.",
        personaIdeal: "Karyawan tetap BUMN, ASN, atau swasta bonafide berpenghasilan Rp 8 Jt ke atas yang mencari KPR Syariah kredibel.",
        pitchingScript: "'Pak/Bu, di BSI Griya selain akadnya syariah resmi bebas penalti pelunasan, DP-nya bisa mulai 5% dan cicilannya sudah pasti dari awal sampai lunas.'",
        pantangan: "Jangan ajukan nasabah karyawan kontrak tunggal atau agunan yang dekat sutet/kuburan.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 15.000.000 / bulan (Salah satu syarat income pengusaha paling terjangkau).",
        syaratKaryawanTetap: "Minimal masa kerja 1 tahun di perusahaan saat ini.",
        syaratKaryawanKontrak: "Karyawan kontrak minimal 2 tahun masa kerja berkelanjutan bisa diajukan.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun, rekening koran 6 bulan, SIUP/NIB atau izin praktek profesi.",
        joinIncome: "Bisa join income suami-istri resmi.",
      },
      takeOver: {
        skemaBridging: "READY DANA BRIDGING: Permata siap menalangi pelunasan hutang lama di bank asal sehingga sertifikat ditebus bank.",
        minPlafondTO: "Rp 250.000.000.",
        minSisaTenor: "Minimal sisa pinjaman berjalan 12 bulan.",
        opsiTopUp: "Top up dana tunai sangat mudah disetujui bersamaan dengan proses take over.",
        ketentuanBankAsal: "Menerima take over dari bank konvensional dan syariah.",
      },
      agunan: {
        aksesJalan: "Lebar jalan minimal 3 meter (muat 1 mobil leluasa).",
        jenisSertifikat: "SHM atau SHGB aktif.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Perumahan cluster atau non-cluster layak huni bebas banjir.",
        wilayahCover: ["Jabodetabek", "Bandung", "Jawa Timur (Surabaya, Sidoarjo, Malang)"],
      },
      finansial: {
        dpMinimal: "Mulai dari 15%.",
        skemaBunga: "Promo Bunga Fix konvensional atau margin Syariah IMBT/MMQ.",
        penaltiPelunasan: "Penalti standar industri perbankan.",
        maksimalTenor: "Hingga 20-25 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Ready dana bridging take over ditambah syarat penghasilan pengusaha yang hanya Rp 15 Juta.",
        personaIdeal: "Pengusaha UMKM berpenghasilan Rp 15-20 Jt atau nasabah take over yang butuh proses digital modern tanpa pusing tebus sertifikat.",
        pitchingScript: "'Pak/Bu, di Permata prosesnya sudah serba digital dan ada fasilitas Dana Bridging, jadi pelunasan bank lama langsung ditalangi Permata tanpa ribet.'",
        pantangan: "Plafon di bawah Rp 250 Juta untuk take over bridging.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 8.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Minimal 1 tahun kerja di perusahaan saat ini atau total 2 tahun.",
        syaratKaryawanKontrak: "Bisa diajukan dengan minimal 2 tahun kontrak berkelanjutan.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun dengan legalitas lengkap.",
        joinIncome: "Menerima join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "READY DANA BRIDGING: Danamon menalangi pelunasan sertifikat ke bank asal melalui perjanjian notariil split disbursement.",
        minPlafondTO: "Rp 500.000.000 (Dikhususkan untuk segmen menengah ke atas).",
        minSisaTenor: "Minimal sisa pinjaman berjalan 12 bulan.",
        opsiTopUp: "Top up dana tunai sangat diakomodasi.",
        ketentuanBankAsal: "Seluruh bank umum terdaftar OJK.",
      },
      agunan: {
        aksesJalan: "Lebar jalan depan minimal muat mobil leluasa (row 3 meter).",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Perumahan cluster atau non-cluster lingkungan rapi.",
        wilayahCover: ["Jabodetabek", "Jawa Barat", "Jawa Tengah", "Jawa Timur"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10%.",
        skemaBunga: "Pilihan bunga fixed terpanjang (Fix 3, 5, 8, hingga 10 tahun).",
        penaltiPelunasan: "Penalti standar berlaku selama masa fixed.",
        maksimalTenor: "Hingga 20 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Masa bunga fixed panjang hingga 10 tahun dan appraisal nilai agunan yang berani bersaing.",
        personaIdeal: "Nasabah pinjaman besar (> Rp 500 Jt) yang ingin kepastian angsuran stabil selama 8-10 tahun ke depan.",
        pitchingScript: "'Pak/Bu, kalau khawatir bunga floating naik-turun, di Danamon ada promo Bunga Fixed sampai 10 tahun dan bank siap talangi pelunasan lama langsung.'",
        pantangan: "Plafon take over di bawah Rp 500 Juta.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 8.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Karyawan tetap di perusahaan swasta nasional, BUMN, atau MNC.",
        syaratKaryawanKontrak: "Karyawan kontrak level managerial / profesional di MNC atau BUMN.",
        syaratPengusaha: "Usaha mapan minimal 2-3 tahun dengan pembukuan audited atau mutasi rekening sangat aktif.",
        joinIncome: "Mendukung join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "READY DANA BRIDGING: Maybank siap menalangi pelunasan hutang lama.",
        minPlafondTO: "Rp 750.000.000 (Segmen Affluent / Properti Premium).",
        minSisaTenor: "Minimal sisa pinjaman 12 bulan.",
        opsiTopUp: "Tersedia penambahan plafon top up.",
        ketentuanBankAsal: "Bank umum rekanan terpercaya.",
      },
      agunan: {
        aksesJalan: "Wajib perumahan tertata, lebar jalan minimal muat 2 mobil (row 3.5m+).",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Bebas banjir, kawasan perumahan menengah ke atas.",
        wilayahCover: ["Jabodetabek", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Medan"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10%.",
        skemaBunga: "SKEMA UNIK: Single Rate (Satu bunga flat tetap sampai lunas tanpa pernah masuk floating).",
        penaltiPelunasan: "Penalti berlaku selama masa perjanjian.",
        maksimalTenor: "Hingga 20 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Skema Single Rate (Flat dari awal sampai akhir tenor lunas), nasabah tidak pernah deg-degan bunga floating naik.",
        personaIdeal: "Nasabah berpenghasilan tinggi dengan plafon pinjaman Rp 750 Jt ke atas yang tidak mau repot memikirkan bunga floating.",
        pitchingScript: "'Pak/Bu, di Maybank ada skema Single Rate yang sangat langka: bunganya flat dipatok sama persis dari bulan ke-1 sampai bulan terakhir lunas, bebas cemas bunga naik.'",
        pantangan: "Plafon di bawah Rp 750 Juta atau agunan di perumahan yang akses jalannya sempit.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Minimal 1 tahun masa kerja di perusahaan saat ini.",
        syaratKaryawanKontrak: "Karyawan kontrak minimal 2 tahun berkelanjutan.",
        syaratPengusaha: "Minimal 2 tahun usaha berjalan aktif.",
        joinIncome: "Mendukung join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "Menerima take over konvensional dengan proses terstruktur.",
        minPlafondTO: "Rp 200.000.000.",
        minSisaTenor: "Minimal 12 bulan sisa hutang berjalan.",
        opsiTopUp: "Tersedia opsi penambahan dana tunai top up.",
        ketentuanBankAsal: "Bank umum terpercaya.",
      },
      agunan: {
        aksesJalan: "Wajib lebar jalan minimal 2 mobil (row 3.5 meter).",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Perumahan cluster atau hunian tertata, bebas banjir.",
        wilayahCover: ["Jabodetabek", "Bandung", "Jawa Timur (Surabaya, Sidoarjo)"],
      },
      finansial: {
        dpMinimal: "Mulai dari 15%.",
        skemaBunga: "Promo bunga fix 1, 2, 3 tahun dengan rate sangat kompetitif.",
        penaltiPelunasan: "Penalti standar berlaku selama masa fixed.",
        maksimalTenor: "Hingga 20-25 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Suku bunga promo fix sangat tajam dan layanan personal bank regional.",
        personaIdeal: "Nasabah yang mencari bunga serendah mungkin untuk properti bernilai bagus di perumahan rapi.",
        pitchingScript: "'Pak/Bu, di UOB bunganya sangat kompetitif untuk properti di kawasan perumahan Bapak/Ibu, proses analisanya sangat responsif.'",
        pantangan: "Lebar jalan depan rumah kurang dari 2 mobil atau lingkungan rawan banjir.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 15.000.000 / bulan (Segmen nasabah mapan).",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Karyawan tetap minimal 2 tahun kerja.",
        syaratKaryawanKontrak: "Tidak menerima karyawan kontrak (Kecuali level direksi/C-level dengan kontrak khusus).",
        syaratPengusaha: "Usaha berjalan minimal 2-3 tahun dengan arus kas harian sehat.",
        joinIncome: "Menerima join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "READY DANA BRIDGING: OCBC siap menalangi pelunasan hutang take over.",
        minPlafondTO: "Rp 250.000.000.",
        minSisaTenor: "Minimal 12 bulan sisa pinjaman.",
        opsiTopUp: "Top up dana tunai sangat diakomodasi.",
        ketentuanBankAsal: "Bank umum rekanan resmi.",
      },
      agunan: {
        aksesJalan: "Lebar jalan depan minimal 2 mobil (row 3.5 meter).",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Perumahan berkualitas tinggi di wilayah Jabodetabek.",
        wilayahCover: ["Jabodetabek"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10%.",
        skemaBunga: "FITUR KPR KENDALI: 80% saldo rekening tabungan diperhitungkan untuk memotong pokok pinjaman dalam perhitungan bunga harian.",
        penaltiPelunasan: "Penalti standar berlaku.",
        maksimalTenor: "Hingga 20-25 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "KPR Kendali: Punya tabungan di rekening? Bunga KPR otomatis terpangkas dan tenor pinjaman jadi lebih cepat lunas tanpa biaya penalti.",
        personaIdeal: "Pengusaha atau eksekutif yang sering menyimpan dana cair / operasional ratusan juta di rekening tabungan.",
        pitchingScript: "'Pak/Bu, kalau di OCBC ada KPR Kendali. Uang tabungan Bapak/Ibu di rekening akan otomatis memotong pokok hutang KPR setiap hari, jadi bunga yang dibayar bisa terpangkas drastis bahkan mendekati nol persen tanpa uangnya terkunci.'",
        pantangan: "Nasabah bergaji di bawah Rp 15 Juta atau karyawan kontrak.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 8.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Karyawan tetap minimal 1 tahun kerja.",
        syaratKaryawanKontrak: "Tidak menerima karyawan kontrak.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun, analisis pembukuan wirausaha sangat fleksibel dan dibantu analis.",
        joinIncome: "Menerima join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "Menerima take over konvensional (bisa difasilitasi pelunasan sesuai appraisal).",
        minPlafondTO: "Rp 500.000.000.",
        minSisaTenor: "Minimal sisa pinjaman 12 bulan.",
        opsiTopUp: "JUARA TOP UP: Sangat fleksibel mencairkan top up dana tunai dalam jumlah besar untuk modal kerja.",
        ketentuanBankAsal: "Bank umum terpercaya.",
      },
      agunan: {
        aksesJalan: "Lebar jalan minimal 3 meter (muat mobil leluasa).",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Perumahan layak huni bebas sengketa.",
        wilayahCover: ["Jabodetabek", "Jawa Timur"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10%.",
        skemaBunga: "Skema Bunga Berjenjang (Step-Up Rate) dari rendah naik bertahap, serta skema Single Rate bebas penalti.",
        penaltiPelunasan: "Tersedia paket khusus bebas penalti pelunasan (Single Rate).",
        maksimalTenor: "Hingga 15-20 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Sangat bersahabat untuk wirausahawan yang butuh pencairan dana tunai tambahan (Top Up) besar saat take over.",
        personaIdeal: "Pengusaha yang ingin pindah bank sekaligus mendapatkan suntikan modal kerja ratusan juta dari agunan rumahnya.",
        pitchingScript: "'Pak/Bu, kalau butuh dana tunai tambahan buat modal usaha, Sinarmas sangat fleksibel untuk Take Over plus Top Up dengan bunga berjenjang yang angsuran awalnya sangat ringan.'",
        pantangan: "Plafon take over di bawah Rp 500 Juta atau karyawan kontrak.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 8.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Minimal 1 tahun kerja di perusahaan saat ini.",
        syaratKaryawanKontrak: "Bisa diajukan dengan minimal 2 tahun kerja continuous.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun dengan legalitas izin usaha resmi.",
        joinIncome: "Menerima join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "Menerima take over konvensional.",
        minPlafondTO: "Rp 350.000.000.",
        minSisaTenor: "Minimal 12 bulan sisa pinjaman.",
        opsiTopUp: "Tersedia opsi top up dana tunai.",
        ketentuanBankAsal: "Bank umum terpercaya.",
      },
      agunan: {
        aksesJalan: "Lebar jalan minimal 3 meter.",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Perumahan cluster atau hunian layak huni.",
        wilayahCover: ["Jabodetabek", "Medan"],
      },
      finansial: {
        dpMinimal: "Mulai dari 15%.",
        skemaBunga: "Promo suku bunga fix kompetitif didukung standar perbankan Korea.",
        penaltiPelunasan: "Penalti standar berlaku.",
        maksimalTenor: "Hingga 20 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Alternatif bank swasta multinasional dengan kriteria profesi fleksibel mencakup TNI/Polri.",
        personaIdeal: "Nasabah rekanan perusahaan multinasional atau anggota TNI/Polri yang mencari alternatif bank di luar BUMN.",
        pitchingScript: "'Pak/Bu, KB Bank didukung oleh KB Financial Group Korea dengan proses verifikasi bersahabat dan bunga bersaing.'",
        pantangan: "Plafon di bawah Rp 350 Juta.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 8.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Minimal 1 tahun kerja.",
        syaratKaryawanKontrak: "Karyawan kontrak minimal 2 tahun.",
        syaratPengusaha: "Minimal 2 tahun usaha berjalan aktif.",
        joinIncome: "Mendukung join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "READY DANA BRIDGING: Bank INA siap memfasilitasi dana talangan pelunasan take over.",
        minPlafondTO: "Rp 350.000.000.",
        minSisaTenor: "Minimal 12 bulan sisa hutang.",
        opsiTopUp: "Tersedia opsi top up.",
        ketentuanBankAsal: "Bank umum resmi.",
      },
      agunan: {
        aksesJalan: "Lebar jalan minimal 3 meter.",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Wilayah Jabodetabek dan Bandung.",
        wilayahCover: ["Jabodetabek", "Bandung"],
      },
      finansial: {
        dpMinimal: "DP minimal 20% (relatif lebih tinggi dari rata-rata).",
        skemaBunga: "Fix rate kompetitif.",
        penaltiPelunasan: "Penalti standar industri.",
        maksimalTenor: "Hingga 15-20 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Proses cepat tanpa birokrasi berbelit-belit dan siap talangan pelunasan bridging take over.",
        personaIdeal: "Nasabah take over di Jabodetabek/Bandung yang butuh persetujuan cepat.",
        pitchingScript: "'Pak/Bu, di Bank INA prosesnya cepat, tidak berbelit, dan bank langsung bantu talangi tebusan sertifikat di bank lama.'",
        pantangan: "Nasabah yang mencari DP di bawah 20%.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 10.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 25.000.000 / bulan.",
        syaratKaryawanTetap: "Karyawan tetap minimal 1 tahun kerja.",
        syaratKaryawanKontrak: "Tidak menerima karyawan kontrak.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun dengan mutasi aktif.",
        joinIncome: "Mendukung join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "READY DANA BRIDGING: Bank Ganesha memfasilitasi pelunasan langsung ke bank lama.",
        minPlafondTO: "Rp 100.000.000 (Sangat ramah untuk take over plafon menengah-kecil).",
        minSisaTenor: "Minimal 12 bulan sisa pinjaman.",
        opsiTopUp: "Tersedia opsi top up dana tunai.",
        ketentuanBankAsal: "Bank umum terpercaya.",
      },
      agunan: {
        aksesJalan: "Lebar jalan minimal muat mobil.",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Jabodetabek dan Jawa Timur (Surabaya sekitarnya).",
        wilayahCover: ["Jabodetabek", "Jawa Timur"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10%.",
        skemaBunga: "Suku bunga kompetitif dengan pendekatan kredit personal.",
        penaltiPelunasan: "Penalti standar berlaku.",
        maksimalTenor: "Hingga 15-20 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Dana bridging tersedia mulai plafon kecil Rp 100 Juta dengan tim analis yang sangat komunikatif.",
        personaIdeal: "Nasabah yang sisa hutangnya di bawah Rp 300 Juta dan butuh dana talangan bridging.",
        pitchingScript: "'Pak/Bu, kalau di bank lain minimal bridging harus Rp 250 Jt - Rp 500 Jt, di Bank Ganesha plafon Rp 100 Jt pun sudah siap ditalangi pelunasannya oleh bank.'",
        pantangan: "Karyawan kontrak atau nasabah dengan gaji di bawah Rp 10 Juta.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan (khusus payroll BNI / ASN minimal Rp 3.000.000).",
        incomePengusaha: "Minimal Rp 20.000.000 / bulan.",
        syaratKaryawanTetap: "Minimal 1 tahun masa kerja di perusahaan saat ini.",
        syaratKaryawanKontrak: "Karyawan Kontrak instansi pemerintah / BUMN / RSUD bisa diproses.",
        syaratPengusaha: "Usaha berjalan minimal 2 tahun dengan mutasi rekening 6 bulan.",
        joinIncome: "Menerima join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "Menerima take over murni dan take over top up.",
        minPlafondTO: "Rp 150.000.000.",
        minSisaTenor: "Minimal sisa pinjaman 12 bulan.",
        opsiTopUp: "Top up dana tunai sangat diakomodasi.",
        ketentuanBankAsal: "Bank umum rekanan resmi.",
      },
      agunan: {
        aksesJalan: "Lebar jalan minimal 3 meter.",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Menjangkau seluruh wilayah Indonesia.",
        wilayahCover: ["Seluruh Wilayah Indonesia"],
      },
      finansial: {
        dpMinimal: "Mulai dari 5% - 10%.",
        skemaBunga: "Promo BNI Griya fix rate menarik.",
        penaltiPelunasan: "Penalti standar berlaku.",
        maksimalTenor: "Hingga 30 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Tenor panjang hingga 30 tahun dan approval sangat mudah bagi nasabah payroll BNI / ASN / BUMN.",
        personaIdeal: "Pegawai instansi pemerintah atau nasabah payroll BNI yang mencari cicilan super murah lewat tenor panjang.",
        pitchingScript: "'Pak/Bu, di BNI Griya tenornya bisa ditarik sampai 30 tahun, jadi cicilan per bulannya sangat terjangkau dengan nama besar bank BUMN.'",
        pantangan: "Agunan di lokasi sengketa tanah.",
      },
    },
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
    detail: {
      penghasilan: {
        gajiKaryawan: "Minimal Rp 5.000.000 / bulan.",
        incomePengusaha: "Minimal Rp 20.000.000 / bulan.",
        syaratKaryawanTetap: "Minimal 1 tahun kerja.",
        syaratKaryawanKontrak: "Karyawan kontrak BUMN/Pemerintah bisa diproses.",
        syaratPengusaha: "Wiraswasta / UMKM binaan BRI sangat dipermudah.",
        joinIncome: "Menerima join income suami-istri.",
      },
      takeOver: {
        skemaBridging: "Menerima take over konvensional.",
        minPlafondTO: "Rp 100.000.000.",
        minSisaTenor: "Minimal 12 bulan sisa hutang.",
        opsiTopUp: "Top up dana tunai tersedia.",
        ketentuanBankAsal: "Bank umum resmi.",
      },
      agunan: {
        aksesJalan: "Akses jalan muat mobil.",
        jenisSertifikat: "SHM atau SHGB.",
        dokumenBangunan: "IMB / PBG lengkap.",
        batasanLokasi: "Seluruh Indonesia.",
        wilayahCover: ["Seluruh Wilayah Indonesia"],
      },
      finansial: {
        dpMinimal: "Mulai dari 10%.",
        skemaBunga: "Suku bunga KPR BRI bersaing.",
        penaltiPelunasan: "Penalti standar berlaku.",
        maksimalTenor: "Hingga 20-25 tahun.",
      },
      telemarketing: {
        keunggulanUtama: "Jaringan kantor cabang sampai ke pelosok kota/kabupaten dan proses verifikasi agunan daerah sangat cepat.",
        personaIdeal: "Nasabah di kota-kota satelit atau luar Jabodetabek yang lebih nyaman berurusan dengan cabang BRI terdekat.",
        pitchingScript: "'Pak/Bu, KPR BRI punya jaringan cabang terluas, jadi pengurusan berkas dan proses akad bisa dilakukan di kantor cabang BRI paling dekat dari domisili Bapak/Ibu.'",
        pantangan: "Nasabah dengan mutasi perbankan pasif.",
      },
    },
  },
};

const DEFAULT_DETAIL: BankDetailedRAC = {
  penghasilan: {
    gajiKaryawan: "Minimal Rp 5.000.000 / bulan",
    incomePengusaha: "Minimal Rp 25.000.000 / bulan",
    syaratKaryawanTetap: "Minimal masa kerja 1 tahun di perusahaan saat ini.",
    syaratKaryawanKontrak: "Menerima karyawan kontrak minimal 2 tahun berkelanjutan.",
    syaratPengusaha: "Usaha berjalan minimal 2 tahun dengan mutasi rekening 6 bulan aktif.",
    joinIncome: "Bisa join income suami-istri resmi.",
  },
  takeOver: {
    skemaBridging: "Menerima take over murni dan top up.",
    minPlafondTO: "Rp 200.000.000.",
    minSisaTenor: "Minimal sisa pinjaman berjalan 12 bulan.",
    opsiTopUp: "Tersedia penambahan plafon top up.",
    ketentuanBankAsal: "Bank umum rekanan resmi.",
  },
  agunan: {
    aksesJalan: "Lebar jalan minimal muat 1 mobil leluasa (row 3 meter).",
    jenisSertifikat: "SHM atau SHGB aktif.",
    dokumenBangunan: "IMB / PBG lengkap.",
    batasanLokasi: "Perumahan cluster atau hunian layak huni bebas banjir.",
    wilayahCover: ["Jabodetabek dan kota-kota besar"],
  },
  finansial: {
    dpMinimal: "Mulai dari 10%.",
    skemaBunga: "Suku bunga promo fix bersaing.",
    penaltiPelunasan: "Penalti standar berlaku selama masa fixed.",
    maksimalTenor: "Hingga 20 tahun.",
  },
  telemarketing: {
    keunggulanUtama: "Suku bunga kompetitif resmi dari bank rekanan Rumah123.",
    personaIdeal: "Nasabah yang mencari produk pembiayaan KPR terpercaya.",
    pitchingScript: "'Pak/Bu, suku bunga promo resmi dari bank rekanan Rumah123 sangat kompetitif dan prosesnya dibantu tim ahli.'",
    pantangan: "Agunan di area rawan sengketa.",
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
    detail: DEFAULT_DETAIL,
  };
}
