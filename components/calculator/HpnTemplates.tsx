import React from "react";

export function HpnCoverPage({
  customerName,
  promoValidUntil,
}: {
  customerName: string;
  promoValidUntil: string;
}) {
  const displayCustomer = customerName.trim() || "[Nama Customer]";
  const displayPromo = promoValidUntil.trim() || "31 Oktober 2026";

  return (
    <div className="relative w-full h-[282mm] max-h-[282mm] overflow-hidden bg-[#0B2545] text-white print:break-inside-avoid print:page-break-inside-avoid print:break-after-page rounded-2xl shadow-xs print:rounded-none print:shadow-none select-none">
      {/* Gambar template resmi langsung dari PDF brief sebagai elemen img DOM agar 100% tercetak dan tidak hilang di print preview browser */}
      <img
        src="/hpn-cover-clean.png"
        alt="Cover HPN 2026"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Teks nama nasabah dan tanggal promo diposisikan presisi pada slot brief dalam 1 blok yang sama sehingga 100% rata kiri sejajar */}
      <div className="absolute left-[10.3%] right-[9.6%] top-[82.5%] z-10 space-y-1.5 text-left">
        <p className="text-white text-sm font-medium tracking-wide">
          Dokumen ini untuk:
        </p>
        <p className="text-[#ffc233] text-2xl font-bold tracking-wide drop-shadow-sm leading-tight">
          {displayCustomer}
        </p>
        <p className="text-[#ffc233] text-xs font-medium tracking-wide pt-1">
          Promo berlaku s/d {displayPromo}
        </p>
      </div>
    </div>
  );
}

export function HpnBackCoverPage({
  picName,
  picPhone,
}: {
  picName: string;
  picPhone: string;
}) {
  const displayPic = picName.trim() || "Sisca";
  const displayPhone = picPhone.trim() || "0822 1234 1234";

  return (
    <div className="relative w-full h-[282mm] max-h-[282mm] overflow-hidden bg-[#0B2545] text-white print:break-inside-avoid print:page-break-inside-avoid print:break-before-page rounded-2xl shadow-xs print:rounded-none print:shadow-none select-none">
      {/* Gambar template penutup resmi langsung dari PDF brief sebagai elemen img DOM */}
      <img
        src="/hpn-backcover-clean.png"
        alt="Back Cover HPN 2026"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Seluruh teks penutup dan kontak PIC berada dalam 1 blok yang sama sehingga 100% simetris terpusat */}
      <div className="absolute left-6 right-6 top-[87.5%] text-center z-10 space-y-2">
        <p className="text-white text-sm font-medium tracking-wide">
          Hubungi Mortgage Team Rumah123 Sekarang!
        </p>
        <p className="text-white text-2xl font-bold tracking-wide drop-shadow-sm leading-none">
          {displayPic} • {displayPhone}
        </p>
      </div>
    </div>
  );
}
