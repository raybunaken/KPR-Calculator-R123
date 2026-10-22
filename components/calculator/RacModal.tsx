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
  Building2,
  CheckCircle2,
  AlertCircle,
  Coins,
  BadgePercent,
  Compass,
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
  return `Rp ${(val / 1_000_000).toLocaleString("id-ID")} Juta`;
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
          guide.personaNasabah.toLowerCase().includes(q)
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
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0B2545] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                Kamus RAC Bank & Panduan Kriteria Telemarketing
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Kriteria lengkap penerimaan nasabah, batas gaji, dana bridging take over, DP, dan agunan per bank
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

        {/* Search & Filter Bar */}
        <div className="p-3.5 border-b border-gray-100 bg-gray-50/80 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama bank atau kota/wilayah (e.g. Bandung)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545]"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto text-xs">
            <span className="text-[11px] font-semibold text-gray-500 mr-0.5">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "all"
                  ? "bg-[#0B2545] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              Semua ({racList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("kontrak")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "kontrak"
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              Bisa Karyawan Kontrak
            </button>
            <button
              type="button"
              onClick={() => setFilterType("bridging")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "bridging"
                  ? "bg-teal-700 text-white"
                  : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-50"
              }`}
            >
              Dana Bridging TO: Siap
            </button>
            <button
              type="button"
              onClick={() => setFilterType("gajiLow")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "gajiLow"
                  ? "bg-indigo-700 text-white"
                  : "bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
              }`}
            >
              Gaji Min Rp 5 Jt
            </button>
            <button
              type="button"
              onClick={() => setFilterType("dp5")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "dp5"
                  ? "bg-amber-700 text-white"
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              DP 5% Ringan
            </button>
            <button
              type="button"
              onClick={() => setFilterType("syariah")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterType === "syariah"
                  ? "bg-purple-700 text-white"
                  : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
              }`}
            >
              Syariah Murni
            </button>
          </div>
        </div>

        {/* Bank List Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain bg-slate-50/50">
          {filteredList.map((rac) => {
            const guide = getBankTacticalGuide(rac.bank);
            const colorClass = BANK_COLORS[rac.bank] || "bg-gray-800 text-white";
            const isSyariah =
              rac.bank.toLowerCase().includes("syariah") ||
              rac.bank.toLowerCase().includes("muamalat") ||
              rac.bank.toLowerCase().includes("bsi");

            return (
              <div
                key={rac.bank}
                className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                {/* Bank Header & Primary Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-2xs ${colorClass}`}
                    >
                      {rac.bank}
                    </span>
                    {isSyariah && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
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
                  </div>
                </div>

                {/* Keunggulan Utama Highlight */}
                <div className="bg-amber-50/60 border border-amber-200/70 rounded-lg px-3 py-2 text-xs flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11.5px] text-amber-950 leading-relaxed">
                    <strong className="font-bold text-amber-900">Keunggulan Utama:</strong>{" "}
                    {guide.keunggulan}
                  </p>
                </div>

                {/* 3 Detailed Columns */}
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  {/* Pillar 1: Pekerjaan & Penghasilan */}
                  <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-200/70 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-gray-800 flex items-center gap-1.5 text-xs mb-1.5 border-b border-gray-200 pb-1">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        <span>Kriteria Penghasilan</span>
                      </p>
                      <div className="space-y-1.5 text-[11px] text-gray-700">
                        <p>
                          <span className="font-semibold text-gray-900">Gaji Karyawan: </span>
                          {guide.minIncomeKaryawanText}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-900">Income Pengusaha: </span>
                          {guide.minIncomePengusahaText}
                        </p>
                        <p className="text-gray-600 leading-snug pt-1 border-t border-gray-100">
                          {guide.karyawanNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: Take Over & Bridging */}
                  <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-200/70 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-gray-800 flex items-center gap-1.5 text-xs mb-1.5 border-b border-gray-200 pb-1">
                        <Zap className="w-3.5 h-3.5 text-teal-600" />
                        <span>Ketentuan Take Over</span>
                      </p>
                      <div className="space-y-1.5 text-[11px] text-gray-700">
                        <p>
                          <span className="font-semibold text-gray-900">Dana Talangan (Bridging): </span>
                          <span className={rac.readyDana.includes("Ya") ? "text-teal-700 font-bold" : "text-gray-600"}>
                            {rac.readyDana.includes("Ya") ? "Tersedia (Bank Lunasi)" : "Wajib Dana Nasabah"}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-900">Min. Plafon TO: </span>
                          {formatJuta(rac.minPlafondTo)}
                        </p>
                        <p className="text-gray-600 leading-snug pt-1 border-t border-gray-100">
                          {guide.takeOverNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3: Agunan & Wilayah Cover */}
                  <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-200/70 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-gray-800 flex items-center gap-1.5 text-xs mb-1.5 border-b border-gray-200 pb-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>Agunan & Area Cover</span>
                      </p>
                      <div className="space-y-1.5 text-[11px] text-gray-700">
                        <p className="text-gray-600 leading-snug">
                          <span className="font-semibold text-gray-900">Akses Agunan: </span>
                          {guide.propertyNote}
                        </p>
                        <p className="text-gray-600 leading-snug pt-1 border-t border-gray-100">
                          <span className="font-semibold text-gray-900">Wilayah: </span>
                          {guide.areaCoverNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pitching & Target Persona for Telemarketing */}
                <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-blue-50/80 rounded-xl p-3 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <Compass className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11.5px] text-blue-950 leading-snug">
                        <strong className="font-bold text-blue-900">Kapan Tawarkan Bank Ini (Persona Nasabah):</strong>{" "}
                        {guide.personaNasabah}
                      </p>
                      <p className="text-[11px] text-blue-800 mt-1">
                        <strong className="font-semibold">Kiat Pitching:</strong> {guide.sellingPoints}
                      </p>
                    </div>
                  </div>
                </div>
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
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span className="text-[11px]">
            *Data RAC disinkronkan langsung dari kebijakan perbankan mitra resmi Rumah123
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
