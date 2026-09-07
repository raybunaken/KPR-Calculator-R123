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
    <div
      className="relative w-full h-[282mm] max-h-[282mm] overflow-hidden bg-[#0B2545] text-white print:break-inside-avoid print:page-break-inside-avoid print:break-after-page rounded-2xl shadow-xs print:rounded-none print:shadow-none select-none"
      style={{
        backgroundImage: "url('/hpn-cover-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Bottom Personalized Section positioned matching official brief */}
      <div className="absolute left-[10.3%] right-[9.5%] top-[80%]">
        <div className="w-full h-[1.5px] bg-white mb-5" />
        <p className="text-white text-sm font-medium tracking-wide">
          Dokumen ini untuk:
        </p>
        <p className="text-[#ffc233] text-2xl font-bold tracking-wide mt-1 drop-shadow-sm">
          {displayCustomer}
        </p>
        <p className="text-[#ffc233] text-xs font-medium tracking-wide mt-3">
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
    <div
      className="relative w-full h-[282mm] max-h-[282mm] overflow-hidden bg-[#0B2545] text-white print:break-inside-avoid print:page-break-inside-avoid print:break-before-page rounded-2xl shadow-xs print:rounded-none print:shadow-none select-none"
      style={{
        backgroundImage: "url('/hpn-backcover-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Centered Bottom Contact PIC Section matching official brief */}
      <div className="absolute left-6 right-6 top-[87%] text-center">
        <p className="text-white text-sm font-medium tracking-wide">
          Hubungi Mortgage Team Rumah123 Sekarang!
        </p>
        <p className="text-white text-2xl font-bold tracking-wide mt-1.5 drop-shadow-sm">
          {displayPic} • {displayPhone}
        </p>
      </div>
    </div>
  );
}
