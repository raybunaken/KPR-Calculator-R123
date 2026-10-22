"use client";

import { useState, useMemo } from "react";
import {
  X,
  Search,
  Briefcase,
  Zap,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Building2,
  AlertCircle,
  Sparkles,
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

export default function RacModal({
  isOpen,
  onClose,
  racList,
  initialBank,
}: RacModalProps) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "kontrak" | "bridging" | "dp5">("all");

  const filteredList = useMemo(() => {
    let list = racList || [];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.bank.toLowerCase().includes(q));
    }

    if (filterType === "kontrak") {
      list = list.filter((r) => r.statusKaryawan.includes("Karyawan Kontrak"));
    } else if (filterType === "bridging") {
      list = list.filter((r) => r.readyDana.includes("Ya"));
    } else if (filterType === "dp5") {
      list = list.filter((r) => r.dpMin <= 0.05);
    }

    return list;
  }, [racList, search, filterType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-[#0B2545] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                Kamus RAC Bank & Kriteria Internal Telemarketing
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Contekan cepat kriteria penerimaan, dana bridging take over, DP minimal, dan area cover
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
        <div className="p-4 border-b border-gray-100 bg-gray-50/70 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama bank..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545]"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto text-xs">
            <span className="text-[11px] font-semibold text-gray-500 mr-1">
              Filter Cepat:
            </span>
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
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
              className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
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
              className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                filterType === "bridging"
                  ? "bg-teal-700 text-white"
                  : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-50"
              }`}
            >
              Ready Dana Bridging
            </button>
            <button
              type="button"
              onClick={() => setFilterType("dp5")}
              className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-colors ${
                filterType === "dp5"
                  ? "bg-amber-700 text-white"
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              DP 5%
            </button>
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5 bg-gray-50/30">
          {filteredList.map((rac) => {
            const bankColor = BANK_COLORS[rac.bank] || "#3B82F6";
            const guide = getBankTacticalGuide(rac.bank);
            const isHighlight = initialBank && initialBank.toLowerCase().includes(rac.bank.toLowerCase());

            return (
              <div
                key={rac.bank}
                className={`bg-white rounded-xl border p-4 transition-all shadow-2xs ${
                  isHighlight
                    ? "border-blue-400 ring-2 ring-blue-100 bg-blue-50/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Bank Header + Micro Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-extrabold px-2.5 py-1 rounded-md text-white shadow-2xs"
                      style={{ backgroundColor: bankColor }}
                    >
                      {rac.bank}
                    </span>
                    <span className="text-xs font-bold text-gray-800">
                      DP Min: {Math.round(rac.dpMin * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap text-xs">
                    {/* Status Pekerjaan Pill */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
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
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                        rac.readyDana.includes("Ya")
                          ? "bg-teal-50 text-teal-800 border-teal-200"
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

                {/* 3 Grid Pillars */}
                <div className="grid sm:grid-cols-3 gap-3 pt-3 text-xs">
                  {/* Pillar 1: Pekerjaan & Usia */}
                  <div className="bg-gray-50/80 rounded-lg p-2.5 border border-gray-100">
                    <p className="font-bold text-gray-800 flex items-center gap-1 text-[11px] mb-1">
                      <Briefcase className="w-3 h-3 text-gray-500" />
                      <span>Profil Pekerjaan</span>
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      {guide.karyawanNote}
                    </p>
                  </div>

                  {/* Pillar 2: Take Over & Bridging */}
                  <div className="bg-gray-50/80 rounded-lg p-2.5 border border-gray-100">
                    <p className="font-bold text-gray-800 flex items-center gap-1 text-[11px] mb-1">
                      <Zap className="w-3 h-3 text-teal-600" />
                      <span>Ketentuan Take Over</span>
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      {guide.takeOverNote}
                    </p>
                  </div>

                  {/* Pillar 3: Agunan & Area */}
                  <div className="bg-gray-50/80 rounded-lg p-2.5 border border-gray-100">
                    <p className="font-bold text-gray-800 flex items-center gap-1 text-[11px] mb-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>Agunan & Wilayah</span>
                    </p>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      {guide.propertyNote}
                    </p>
                  </div>
                </div>

                {/* Selling Points for Telemarketers */}
                <div className="mt-2.5 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-lg p-2.5 border border-blue-100/80 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-900 leading-snug">
                    <strong className="font-bold">Tips Pitching ke Nasabah:</strong>{" "}
                    {guide.sellingPoints}
                  </p>
                </div>
              </div>
            );
          })}

          {filteredList.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-xs">
              Tidak ada bank yang sesuai dengan kata kunci pencarian.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span className="text-[11px]">
            *Data RAC disinkronkan langsung dari kebijakan perbankan mitra Rumah123
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0B2545] text-white font-bold hover:bg-[#133E6E] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
