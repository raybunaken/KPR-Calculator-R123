"use client";

import { useState, useMemo } from "react";
import {
  X,
  Search,
  Briefcase,
  Zap,
  MapPin,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Coins,
  BadgePercent,
  CheckCircle2,
  AlertTriangle,
  Compass,
  FileText,
  CreditCard,
  Building,
} from "lucide-react";
import type { BankRAC } from "@/lib/types";
import { BANK_COLORS } from "@/lib/types";
import { getBankTacticalGuide } from "@/lib/rac-data";

interface RacModalProps {
  isOpen: boolean;
  onClose: () => void;
  racList: BankRAC[];
  initialBank?: string | null;
}

function formatJuta(val: number): string {
  if (!val || val === 0) return "Fleksibel / Sesuai Promo";
  return `Rp ${(val / 1_000_000).toLocaleString("id-ID")} Jt`;
}

export default function RacModal({
  isOpen,
  onClose,
  racList,
  initialBank,
}: RacModalProps) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "kontrak" | "bridging" | "dp5" | "gajiLow" | "syariah"
  >("all");
  const [expandedBank, setExpandedBank] = useState<string | null>(initialBank || null);

  const toggleExpand = (bank: string) => {
    setExpandedBank((prev) => (prev === bank ? null : bank));
  };

  const filteredList = useMemo(() => {
    let list = racList || [];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => {
        const guide = getBankTacticalGuide(r.bank);
        return (
          r.bank.toLowerCase().includes(q) ||
          r.area.some((a) => a.toLowerCase().includes(q)) ||
          guide.areaCoverNote.toLowerCase().includes(q) ||
          guide.personaNasabah.toLowerCase().includes(q) ||
          guide.detail.agunan.wilayahCover.some((w) => w.toLowerCase().includes(q))
        );
      });
    }

    if (filterType === "kontrak") {
      list = list.filter((r) => r.statusKaryawan.includes("Karyawan Kontrak"));
    } else if (filterType === "bridging") {
      list = list.filter((r) => r.readyDana.includes("Ya"));
    } else if (filterType === "dp5") {
      list = list.filter((r) => r.dpMin <= 0.05);
    } else if (filterType === "gajiLow") {
      list = list.filter((r) => r.minIncomeKaryawan <= 5_000_000);
    } else if (filterType === "syariah") {
      list = list.filter(
        (r) =>
          r.bank.toLowerCase().includes("syariah") ||
          r.bank.toLowerCase().includes("muamalat") ||
          r.bank.toLowerCase().includes("bsi"),
      );
    }

    return list;
  }, [racList, search, filterType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0B2545] text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                Kamus RAC Bank & Panduan Kriteria Telemarketing
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Contekan resmi kriteria penerimaan, dana bridging take over, DP minimal, dan agunan per bank
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tidy Search & Filter Section */}
        <div className="p-3.5 border-b border-gray-100 bg-gray-50/90 space-y-2.5 shrink-0">
          {/* Row 1: Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari bank, kota/wilayah (e.g. Bandung, Surabaya), atau kriteria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-24 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] shadow-2xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-md"
              >
                Reset
              </button>
            )}
          </div>

          {/* Row 2: Neatly Aligned Filter Pills with Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0 mr-1">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === "all"
                  ? "bg-[#0B2545] text-white shadow-xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              Semua ({racList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("kontrak")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === "kontrak"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              Bisa Karyawan Kontrak
            </button>
            <button
              type="button"
              onClick={() => setFilterType("bridging")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === "bridging"
                  ? "bg-teal-700 text-white shadow-xs"
                  : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-50"
              }`}
            >
              Dana Bridging TO: Siap
            </button>
            <button
              type="button"
              onClick={() => setFilterType("gajiLow")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === "gajiLow"
                  ? "bg-indigo-700 text-white shadow-xs"
                  : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
              }`}
            >
              Gaji Min Rp 5 Jt
            </button>
            <button
              type="button"
              onClick={() => setFilterType("dp5")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === "dp5"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              DP 5% Ringan
            </button>
            <button
              type="button"
              onClick={() => setFilterType("syariah")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === "syariah"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
              }`}
            >
              Syariah Murni
            </button>
          </div>
        </div>

        {/* Bank List Container */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 overscroll-contain bg-slate-50/60">
          {filteredList.map((rac) => {
            const guide = getBankTacticalGuide(rac.bank);
            const bankColor = BANK_COLORS[rac.bank] || "#0B2545";
            const isMaybank = rac.bank.toLowerCase().includes("maybank");
            const textColor = isMaybank ? "#000000" : "#FFFFFF";
            const isSyariah =
              rac.bank.toLowerCase().includes("syariah") ||
              rac.bank.toLowerCase().includes("muamalat") ||
              rac.bank.toLowerCase().includes("bsi");
            const isExpanded = expandedBank === rac.bank;

            return (
              <div
                key={rac.bank}
                className="bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Header Card (Clickable to Toggle Drill-Down) */}
                <div
                  onClick={() => toggleExpand(rac.bank)}
                  className="p-4 cursor-pointer hover:bg-gray-50/60 transition-colors select-none"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    {/* Bank Brand Tag (Vibrant brand color like calculator) */}
                    <div className="flex items-center gap-2">
                      <span
                        style={{ backgroundColor: bankColor, color: textColor }}
                        className="text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-xs shrink-0"
                      >
                        {rac.bank}
                      </span>
                      {isSyariah && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                          Prinsip Syariah
                        </span>
                      )}
                    </div>

                    {/* Quantitative Metric Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap text-xs">
                      {/* Min Gaji Karyawan */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                        <Coins className="w-3 h-3 text-blue-600" />
                        <span>Min. Gaji: Rp {(rac.minIncomeKaryawan / 1_000_000).toLocaleString("id-ID")} Jt</span>
                      </span>

                      {/* DP Min */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <BadgePercent className="w-3 h-3 text-amber-600" />
                        <span>DP Min: {(rac.dpMin * 100).toFixed(0)}%</span>
                      </span>

                      {/* Min Plafond Take Over */}
                      {rac.minPlafondTo > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                          <span>Plafon TO: Min. Rp {(rac.minPlafondTo / 1_000_000).toLocaleString("id-ID")} Jt</span>
                        </span>
                      )}

                      {/* Status Pekerjaan Pill */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
                          rac.statusKaryawan.includes("Karyawan Kontrak")
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-blue-50 text-blue-800 border-blue-200"
                        }`}
                      >
                        <Briefcase className="w-3 h-3" />
                        <span>
                          {rac.statusKaryawan.includes("Karyawan Kontrak")
                            ? "Bisa Tetap & Kontrak"
                            : "Hanya Karyawan Tetap"}
                        </span>
                      </span>

                      {/* Bridging Pill */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
                          rac.readyDana.includes("Ya")
                            ? "bg-teal-50 text-teal-800 border-teal-200 font-bold"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        <Zap className="w-3 h-3 text-teal-600" />
                        <span>
                          {rac.readyDana.includes("Ya")
                            ? "Dana Bridging TO: Siap"
                            : "Wajib Dana Sendiri"}
                        </span>
                      </span>

                      {/* Toggle Button Icon */}
                      <div className="ml-1 pl-2 border-l border-gray-200 flex items-center text-gray-400">
                        {isExpanded ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                            Tutup Detail <ChevronUp className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-md border border-gray-300">
                            Drill Down RAC <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Keunggulan Utama Highlight */}
                  <div className="mt-3 bg-amber-50/70 border border-amber-200/80 rounded-lg px-3 py-2 text-xs flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[11.5px] text-amber-950 leading-relaxed">
                      <strong className="font-bold text-amber-900">Keunggulan Utama:</strong>{" "}
                      {guide.keunggulan}
                    </p>
                  </div>
                </div>

                {/* Summary Row (Always Visible as Quick Glances) */}
                <div className="px-4 pb-3 grid sm:grid-cols-3 gap-2.5 text-xs border-b border-gray-100">
                  <div className="bg-gray-50/90 rounded-lg p-2.5 border border-gray-200/60">
                    <p className="font-bold text-gray-800 text-[11px] mb-1 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-blue-600" />
                      <span>Ringkasan Penghasilan</span>
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Gaji: {guide.minIncomeKaryawanText} | Usaha: {guide.minIncomePengusahaText}
                    </p>
                  </div>

                  <div className="bg-gray-50/90 rounded-lg p-2.5 border border-gray-200/60">
                    <p className="font-bold text-gray-800 text-[11px] mb-1 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-teal-600" />
                      <span>Ringkasan Take Over</span>
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Bridging: {rac.readyDana.includes("Ya") ? "Tersedia (Bank Lunasi)" : "Dana Sendiri"} | Min TO: {formatJuta(rac.minPlafondTo)}
                    </p>
                  </div>

                  <div className="bg-gray-50/90 rounded-lg p-2.5 border border-gray-200/60">
                    <p className="font-bold text-gray-800 text-[11px] mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>Ringkasan Agunan</span>
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug truncate">
                      {guide.propertyNote}
                    </p>
                  </div>
                </div>

                {/* DRILL DOWN EXPANDED SECTION (Divided by Detailed Categories/Points) */}
                {isExpanded && (
                  <div className="bg-slate-50/80 p-4 border-t border-gray-200/80 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span>Kamus RAC Terperinci: Bank {rac.bank}</span>
                      </h4>
                      <span className="text-[11px] text-gray-500 font-medium">
                        Klik kartu untuk menutup kembali
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3.5 text-xs">
                      {/* Kategori 1: Penghasilan & Pekerjaan */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-2xs space-y-2">
                        <div className="flex items-center gap-1.5 text-blue-900 font-bold border-b border-gray-100 pb-1.5">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                          <span>1. Kriteria Penghasilan & Pekerjaan</span>
                        </div>
                        <ul className="space-y-1.5 text-[11.5px] text-gray-700">
                          <li>
                            <strong className="text-gray-900">• Gaji Karyawan:</strong> {guide.detail.penghasilan.gajiKaryawan}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Income Pengusaha:</strong> {guide.detail.penghasilan.incomePengusaha}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Syarat Karyawan Tetap:</strong> {guide.detail.penghasilan.syaratKaryawanTetap}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Syarat Karyawan Kontrak:</strong> {guide.detail.penghasilan.syaratKaryawanKontrak}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Syarat Pengusaha:</strong> {guide.detail.penghasilan.syaratPengusaha}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Ketentuan Join Income:</strong> {guide.detail.penghasilan.joinIncome}
                          </li>
                        </ul>
                      </div>

                      {/* Kategori 2: Ketentuan Take Over & Dana Bridging */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-2xs space-y-2">
                        <div className="flex items-center gap-1.5 text-teal-900 font-bold border-b border-gray-100 pb-1.5">
                          <Zap className="w-4 h-4 text-teal-600" />
                          <span>2. Ketentuan Take Over & Bridging</span>
                        </div>
                        <ul className="space-y-1.5 text-[11.5px] text-gray-700">
                          <li>
                            <strong className="text-gray-900">• Skema Bridging / Talangan:</strong> {guide.detail.takeOver.skemaBridging}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Batas Minimal Plafon TO:</strong> {guide.detail.takeOver.minPlafondTO}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Minimal Sisa Tenor Berjalan:</strong> {guide.detail.takeOver.minSisaTenor}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Opsi Top Up Dana Tunai:</strong> {guide.detail.takeOver.opsiTopUp}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Ketentuan Bank Asal:</strong> {guide.detail.takeOver.ketentuanBankAsal}
                          </li>
                        </ul>
                      </div>

                      {/* Kategori 3: Agunan, Legalitas & Wilayah Cover */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-2xs space-y-2">
                        <div className="flex items-center gap-1.5 text-rose-900 font-bold border-b border-gray-100 pb-1.5">
                          <MapPin className="w-4 h-4 text-rose-600" />
                          <span>3. Agunan & Cakupan Wilayah</span>
                        </div>
                        <ul className="space-y-1.5 text-[11.5px] text-gray-700">
                          <li>
                            <strong className="text-gray-900">• Akses Jalan Depan Rumah:</strong> {guide.detail.agunan.aksesJalan}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Sertifikat Agunan:</strong> {guide.detail.agunan.jenisSertifikat}
                          </li>
                          <li>
                            <strong className="text-gray-900">• IMB / PBG & PBB:</strong> {guide.detail.agunan.dokumenBangunan}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Batasan Lokasi:</strong> {guide.detail.agunan.batasanLokasi}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Wilayah Cakupan (Coverage Area):</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {guide.detail.agunan.wilayahCover.map((w) => (
                                <span
                                  key={w}
                                  className="bg-gray-100 text-gray-800 text-[10.5px] px-2 py-0.5 rounded font-medium border border-gray-200"
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* Kategori 4: Finansial & Ketentuan Kredit */}
                      <div className="bg-white rounded-xl p-3.5 border border-gray-200 shadow-2xs space-y-2">
                        <div className="flex items-center gap-1.5 text-indigo-900 font-bold border-b border-gray-100 pb-1.5">
                          <CreditCard className="w-4 h-4 text-indigo-600" />
                          <span>4. Parameter Finansial & Kredit</span>
                        </div>
                        <ul className="space-y-1.5 text-[11.5px] text-gray-700">
                          <li>
                            <strong className="text-gray-900">• DP Minimal:</strong> {guide.detail.finansial.dpMinimal}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Skema Bunga / Akad:</strong> {guide.detail.finansial.skemaBunga}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Ketentuan Penalti Pelunasan:</strong> {guide.detail.finansial.penaltiPelunasan}
                          </li>
                          <li>
                            <strong className="text-gray-900">• Maksimal Tenor Pinjaman:</strong> {guide.detail.finansial.maksimalTenor}
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Kategori 5: Panduan Taktis Telemarketing */}
                    <div className="bg-gradient-to-r from-blue-900 to-[#0B2545] text-white rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-teal-300 font-bold border-b border-blue-800/80 pb-1.5">
                        <Compass className="w-4 h-4 text-teal-300" />
                        <span>5. Panduan Taktis Telemarketing (Persona & Pitching)</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-[11.5px] text-blue-100">
                        <div>
                          <p className="font-bold text-white mb-0.5">• Persona Nasabah Ideal:</p>
                          <p className="leading-snug">{guide.detail.telemarketing.personaIdeal}</p>
                          <p className="font-bold text-rose-300 mt-2 mb-0.5">• Hal yang Perlu Dihindari (Pantangan):</p>
                          <p className="leading-snug text-rose-200">{guide.detail.telemarketing.pantangan}</p>
                        </div>
                        <div>
                          <p className="font-bold text-white mb-0.5">• Script / Kiat Pitching:</p>
                          <p className="leading-relaxed bg-white/10 p-2.5 rounded-lg border border-white/10 italic text-teal-100">
                            {guide.detail.telemarketing.pitchingScript}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredList.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-xs">
              Tidak ada bank yang sesuai dengan filter atau kata kunci pencarian.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span className="text-[11px]">
            *Klik setiap kartu bank untuk membuka drill-down kriteria terperinci
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-[#0B2545] text-white font-bold hover:bg-[#133E6E] transition-colors cursor-pointer shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
