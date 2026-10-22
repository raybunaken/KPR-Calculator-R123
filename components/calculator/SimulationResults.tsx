"use client";

import { useState, useMemo } from "react";
import {
  TrendingDown,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Award,
  AlertCircle,
  Filter,
  ArrowUpDown,
  Layers,
  Search,
  Clock,
  Calendar,
  Briefcase,
  Zap,
  MapPin,
  ShieldCheck,
  BookOpen,
  Sparkles,
} from "lucide-react";
import type { SimulationResult, LoanInput, BankRAC } from "@/lib/types";
import { BANK_COLORS } from "@/lib/types";
import {
  formatIDR,
  formatIDRFull,
  formatPercent,
  extractRateTiers,
} from "@/lib/calculator";
import { getBankRac, getBankTacticalGuide } from "@/lib/rac-data";
import AmortizationTable from "./AmortizationTable";
import RacModal from "./RacModal";

function parseDateScore(dStr?: string): number {
  if (!dStr) return 0;
  const iso = Date.parse(dStr);
  if (!isNaN(iso)) return iso;

  const monthMap: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    mei: 4,
    may: 4,
    jun: 5,
    jul: 6,
    agu: 7,
    aug: 7,
    sep: 8,
    okt: 9,
    oct: 9,
    nov: 10,
    des: 11,
    dec: 11,
  };
  const parts = dStr.toLowerCase().replace(/,/g, "").split(/\s+/);
  let day = 1;
  let month = 0;
  let year = 2026;

  for (const part of parts) {
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
      if (num > 1000) year = num;
      else day = num;
    } else if (monthMap[part.slice(0, 3)] !== undefined) {
      month = monthMap[part.slice(0, 3)];
    }
  }
  return new Date(year, month, day).getTime();
}

type SortKey =
  | "cicilan_fix"
  | "total_all"
  | "savings"
  | "total_bunga"
  | "masaFix"
  | "updated_desc";
type ViewMode = "eligible" | "all";

interface SimulationResultsProps {
  results: SimulationResult[];
  input: LoanInput;
  racList?: BankRAC[];
}

export default function SimulationResults({
  results,
  input,
  racList = [],
}: SimulationResultsProps) {
  const [sortKey, setSortKey] = useState<SortKey>("cicilan_fix");
  const [viewMode, setViewMode] = useState<ViewMode>("all"); // Default ke all karena RAC dimatikan
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [selectedScheme, setSelectedScheme] = useState<string>("all");
  const [selectedRacFilter, setSelectedRacFilter] = useState<string>("all");
  const [showRacModal, setShowRacModal] = useState(false);
  const [racModalBank, setRacModalBank] = useState<string | null>(null);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const availableBanks = useMemo(
    () => Array.from(new Set(results.map((r) => r.product.bank))).sort(),
    [results],
  );

  const eligibleResults = useMemo(
    () => results.filter((r) => r.isEligible),
    [results],
  );
  const ineligibleResults = useMemo(
    () => results.filter((r) => !r.isEligible),
    [results],
  );

  const displayed = viewMode === "eligible" ? eligibleResults : results;

  const filteredAndSorted = useMemo(() => {
    let list = displayed;

    if (selectedBank !== "all") {
      list = list.filter((r) => r.product.bank === selectedBank);
    }

    if (selectedScheme !== "all") {
      list = list.filter((r) => r.product.jenisBunga === selectedScheme);
    }

    if (selectedRacFilter !== "all" && racList.length > 0) {
      list = list.filter((r) => {
        const rac = getBankRac(r.product.bank, r.product.syariah, racList);
        if (!rac) return true;
        if (selectedRacFilter === "kontrak")
          return rac.statusKaryawan.includes("Karyawan Kontrak");
        if (selectedRacFilter === "bridging")
          return rac.readyDana.includes("Ya");
        if (selectedRacFilter === "dp5")
          return rac.dpMin <= 0.05;
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.product.bank.toLowerCase().includes(q) ||
          r.product.nama.toLowerCase().includes(q),
      );
    }

    return list.sort((a, b) => {
      switch (sortKey) {
        case "cicilan_fix":
          return a.fixPeriodMonthlyInstallment - b.fixPeriodMonthlyInstallment;
        case "total_all":
          return a.totalInstallmentAll - b.totalInstallmentAll;
        case "savings":
          return (b.savings?.totalSaved || 0) - (a.savings?.totalSaved || 0);
        case "total_bunga":
          return a.totalInterest - b.totalInterest;
        case "masaFix":
          return b.product.masaFix - a.product.masaFix;
        case "updated_desc":
          return (
            parseDateScore(b.product.updatedAt) -
            parseDateScore(a.product.updatedAt)
          );
        default:
          return 0;
      }
    });
  }, [displayed, sortKey, searchQuery, selectedBank, selectedScheme, selectedRacFilter, racList]);

  const handleSelect = (code: string) => {
    setSelectedCodes((prev) => {
      if (prev.includes(code)) return prev.filter((c) => c !== code);
      if (prev.length >= 3) {
        alert("Maksimal membandingkan 3 produk");
        return prev;
      }
      return [...prev, code];
    });
  };

  const handleCompare = () => {
    const dataString = encodeURIComponent(JSON.stringify(input));
    const codesString = selectedCodes.join(",");
    window.open(
      `/calculator/compare?codes=${codesString}&data=${dataString}`,
      "_blank",
    );
  };

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
        Tidak ada produk ditemukan untuk kriteria ini.
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {/* Summary bar */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 space-y-3">
        {/* Row 1: Search Bar (Left) + Urutkan (Right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari bank atau nama program KPR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-9.5 pr-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs shrink-0">
            <button
              type="button"
              onClick={() => {
                setRacModalBank(null);
                setShowRacModal(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-[#0B2545] text-white hover:opacity-95 transition-all shadow-2xs cursor-pointer shrink-0"
              title="Buka contekan syarat RAC & kebijakan 15 bank mitra"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-200" />
              <span>Kamus RAC Bank</span>
            </button>

            <span className="font-medium text-gray-500 hidden sm:inline">Urutkan:</span>
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="text-xs font-semibold border border-gray-200 bg-gray-50/80 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] cursor-pointer shadow-2xs"
              >
                <option value="cicilan_fix">Cicilan Fix Terendah</option>
                <option value="updated_desc">Update Bunga Terbaru</option>
                <option value="total_all">Total Bayar Terhemat (Lifetime)</option>
                {input.kprType === "Take Over" && (
                  <option value="savings">Penghematan Terbesar</option>
                )}
                <option value="total_bunga">Total Bunga Terendah</option>
                <option value="masaFix">Masa Fix Terpanjang</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Filter Bank + Filter Skema + Filter RAC Profil + Active Bunga Badge + Reset */}
        <div className="pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-gray-500 shrink-0">
              Filter:
            </span>

            {/* Filter Bank Dropdown */}
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="text-xs font-semibold border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0B2545] cursor-pointer shadow-2xs"
            >
              <option value="all">Semua Bank ({availableBanks.length})</option>
              {availableBanks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Filter Skema Bunga Dropdown */}
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="text-xs font-semibold border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0B2545] cursor-pointer shadow-2xs"
            >
              <option value="all">Semua Skema</option>
              <option value="Single Rate">Flat (Single Rate)</option>
              <option value="Berjenjang">Berjenjang (Step Up)</option>
              <option value="Fixed">Fix • Floating</option>
            </select>

            {/* Quick RAC Profil Filter Dropdown */}
            <select
              value={selectedRacFilter}
              onChange={(e) => setSelectedRacFilter(e.target.value)}
              className="text-xs font-semibold border border-blue-200 bg-blue-50/40 text-blue-900 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-2xs"
              title="Filter cepat kriteria profil nasabah tanpa perlu isi form"
            >
              <option value="all">Semua Profil RAC</option>
              <option value="kontrak">Bisa Karyawan Kontrak</option>
              {input.kprType === "Take Over" && (
                <option value="bridging">Ready Dana Bridging TO</option>
              )}
              <option value="dp5">DP Ringan (5%)</option>
            </select>

            {/* Active Bunga Range Badge */}
            {input.rateRange && input.rateRange !== "all" && (
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shrink-0 flex items-center gap-1">
                <span>Bunga:</span>
                <strong>
                  {input.rateRange === "<3"
                    ? "< 3%"
                    : input.rateRange === "3-4"
                      ? "3% • 4%"
                      : input.rateRange === "4-5"
                        ? "4% • 5%"
                        : "> 5%"}
                </strong>
              </span>
            )}

            {/* Quick Reset Link */}
            {(selectedBank !== "all" ||
              selectedScheme !== "all" ||
              selectedRacFilter !== "all" ||
              searchQuery.trim() !== "") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedBank("all");
                  setSelectedScheme("all");
                  setSelectedRacFilter("all");
                  setSearchQuery("");
                }}
                className="text-[11px] text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer ml-1"
              >
                Reset Filter
              </button>
            )}
          </div>

          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Centang kotak pada kartu untuk membandingkan (maks 3)
          </span>
        </div>
      </div>

      {/* Results list */}
      <div className="space-y-3">
        {filteredAndSorted.map((result, idx) => (
          <ProductCard
            key={result.product.kode}
            result={result}
            rank={idx + 1}
            isExpanded={expandedProduct === result.product.kode}
            onToggle={() =>
              setExpandedProduct(
                expandedProduct === result.product.kode
                  ? null
                  : result.product.kode,
              )
            }
            input={input}
            isSelected={selectedCodes.includes(result.product.kode)}
            onSelect={() => handleSelect(result.product.kode)}
            racList={racList}
            onOpenRacModal={(bank) => {
              setRacModalBank(bank);
              setShowRacModal(true);
            }}
          />
        ))}
        {filteredAndSorted.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 p-6 space-y-2 text-gray-500">
            <p className="text-sm font-semibold text-gray-800">
              Tidak ada produk yang sesuai dengan kombinasi filter ini.
            </p>
            <p className="text-xs text-gray-400">
              Coba reset filter bank, skema bunga, atau pilih "Semua" pada form di sebelah kiri.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedBank("all");
                  setSelectedScheme("all");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200"
              >
                Reset Filter Bank & Skema
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Advisory Footer Note */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-orange-50/60 rounded-2xl border border-blue-100 p-4 text-center text-xs text-gray-500 space-y-1">
        <p className="font-bold text-gray-800 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
          <span>Disusun Resmi oleh Tim Mortgage Rumah123</span>
        </p>
        <p className="text-[11px] text-gray-500 max-w-xl mx-auto">
          Seluruh data bunga dan program bank disinkronkan langsung oleh Tim
          Mortgage Rumah123. Layanan konsultasi, rekomendasi produk, dan
          pendampingan pengajuan ke bank rekanan 100% bebas biaya.
        </p>
      </div>

      {/* Floating Compare Bar */}
      {selectedCodes.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0B2545] text-white rounded-2xl px-5 py-3 shadow-2xl border border-white/10 flex items-center gap-4 sm:gap-6 z-50 animate-in slide-in-from-bottom-10 fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              {selectedCodes.length} / 3 Produk Dipilih
            </span>
          </div>
          <button
            onClick={handleCompare}
            className="bg-[#10B981] hover:bg-[#059669] text-white font-extrabold py-2 px-5 rounded-xl transition-all shadow-md text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Buka Komparasi & PDF →</span>
          </button>
        </div>
      )}

      {/* RAC Cheat-sheet Modal */}
      <RacModal
        isOpen={showRacModal}
        onClose={() => setShowRacModal(false)}
        racList={racList}
        initialBank={racModalBank}
      />
    </div>
  );
}

function ProductCard({
  result,
  input,
  rank,
  isExpanded,
  onToggle,
  isSelected,
  onSelect,
  racList,
  onOpenRacModal,
}: {
  result: SimulationResult;
  input: LoanInput;
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
  isSelected: boolean;
  onSelect: () => void;
  racList?: BankRAC[];
  onOpenRacModal: (bank: string) => void;
}) {
  const { product, isEligible, ineligibilityReasons } = result;
  const bankColor = BANK_COLORS[product.bank] || "#3B82F6";
  const isTop3 = rank <= 3 && isEligible;
  const tiers = extractRateTiers(result.yearlySchedule, product.masaFix);
  const [expandedTab, setExpandedTab] = useState<"amortisasi" | "rac">("amortisasi");
  const rac = getBankRac(product.bank, product.syariah, racList);
  const guide = getBankTacticalGuide(product.bank);

  return (
    <div
      className={`bg-white rounded-2xl border shadow-xs overflow-hidden transition-all duration-150 ${
        isSelected
          ? "border-[#0B2545] ring-2 ring-[#0B2545]/20 bg-[#0B2545]/5"
          : isEligible
            ? isTop3
              ? "border-blue-200 shadow-sm"
              : "border-gray-200/80 hover:border-gray-300"
            : "border-gray-200/60 opacity-60"
      }`}
    >
      {/* 1. Main Header Row */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
        {/* Left: Checkbox + Rank + Bank Tag + Program Name */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Compare Checkbox & Rank */}
          <div
            className="flex items-center gap-2.5 shrink-0 pt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 h-4 rounded border-gray-300 text-[#0B2545] focus:ring-[#0B2545] cursor-pointer accent-[#0B2545]"
              title="Centang untuk membandingkan"
            />
            <div
              className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                !isEligible
                  ? "bg-gray-100 text-gray-400"
                  : rank === 1
                    ? "bg-amber-100 text-amber-900 border border-amber-300/80"
                    : rank === 2
                      ? "bg-slate-100 text-slate-700 border border-slate-300/80"
                      : rank === 3
                        ? "bg-orange-100 text-orange-800 border border-orange-300/80"
                        : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}
            >
              {!isEligible ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                `#${rank}`
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0 cursor-pointer" onClick={onToggle}>
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-md text-white shadow-2xs"
                style={{ backgroundColor: bankColor }}
              >
                {product.bank}
              </span>
              {product.jenisBunga === "Berjenjang" && (
                <span className="text-[11px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-medium">
                  Berjenjang (Step-Up)
                </span>
              )}
              {product.jenisBunga === "Single Rate" && (
                <span className="text-[11px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md font-medium">
                  Single Rate (Flat)
                </span>
              )}
              {product.jenisBunga === "Fixed" && (
                <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium">
                  Fixed
                </span>
              )}
              {product.syariah && (
                <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-medium">
                  Syariah
                </span>
              )}
            </div>

            <h4
              className="text-sm sm:text-base font-bold text-gray-900 leading-snug break-words"
              title={product.nama}
            >
              {product.nama}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 font-medium flex items-center gap-1.5 flex-wrap">
              <span>
                {product.jenisBunga === "Single Rate"
                  ? `Flat s.d Lunas · Tenor ${result.tenorYears} th`
                  : `Promo ${product.masaFix} th · Tenor ${result.tenorYears} th`}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 shadow-2xs">
                <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Terakhir Update: {product.updatedAt || "Terbaru"}</span>
              </span>
            </p>

            {/* RAC Micro-Badges (Zero-click reference for telemarketer) */}
            {rac && (
              <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[11px]">
                {/* 1. Status Pekerjaan */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold border ${
                    rac.statusKaryawan.includes("Karyawan Kontrak")
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}
                  title={`Status Pekerjaan: ${rac.statusKaryawan.join(", ")}`}
                >
                  <Briefcase className="w-3 h-3 text-current" />
                  <span>
                    {rac.statusKaryawan.includes("Karyawan Kontrak")
                      ? "Tetap & Kontrak"
                      : "Hanya Tetap"}
                  </span>
                </span>

                {/* 2. Dana Talangan Take Over */}
                {input.kprType === "Take Over" && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold border ${
                      rac.readyDana.includes("Ya")
                        ? "bg-teal-50 text-teal-800 border-teal-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                    title={
                      rac.readyDana.includes("Ya")
                        ? "Bank menyediakan fasilitas pelunasan / bridging take over"
                        : "Nasabah wajib menyediakan dana pelunasan sendiri"
                    }
                  >
                    <Zap className="w-3 h-3 text-teal-600" />
                    <span>
                      {rac.readyDana.includes("Ya")
                        ? "Dana Bridging: Siap"
                        : "Dana Sendiri"}
                    </span>
                  </span>
                )}

                {/* 3. Min DP */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <span>Min DP {Math.round(rac.dpMin * 100)}%</span>
                </span>

                {/* 4. Area Cover */}
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium bg-slate-50 text-slate-700 border border-slate-200"
                  title={`Cakupan Wilayah: ${rac.area.join(", ")}`}
                >
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>
                    {rac.area.length > 5
                      ? "Cover Nasional"
                      : rac.area.slice(0, 2).join(", ")}
                  </span>
                </span>

                {/* Quick Link to Modal */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenRacModal(product.bank);
                  }}
                  className="text-blue-600 hover:text-blue-800 underline font-semibold text-[11px] ml-0.5 cursor-pointer inline-flex items-center gap-0.5"
                >
                  <span>Syarat Bank ↗</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Cicilan & Expand Toggle */}
        <div
          className="flex items-center gap-3 shrink-0 cursor-pointer pl-3 border-l border-gray-100"
          onClick={onToggle}
        >
          <div className="text-right">
            {(() => {
              const isTakeOver = input.kprType === "Take Over";
              const oldTenorMonths = input.currentRemainingTenorMonths || 0;
              const oldTenorYears =
                oldTenorMonths > 0 ? oldTenorMonths / 12 : 0;
              const newTenorYears = input.tenorYears || 0;
              const isExtendedTenor =
                oldTenorYears > 0 && newTenorYears > oldTenorYears;
              const monthlyDrop =
                (input.currentMonthlyInstallment || 0) -
                result.fixPeriodMonthlyInstallment;
              const isMonthlyCheaper = monthlyDrop > 0;
              const hasLifetimeSavings = !!(
                result.savings && result.savings.totalSaved > 0
              );

              // 1. EXTENDED TENOR (Cash Flow Relief)
              if (
                isTakeOver &&
                (isExtendedTenor || (!hasLifetimeSavings && isMonthlyCheaper))
              ) {
                return (
                  <>
                    <div className="flex items-baseline justify-end gap-1 text-teal-700">
                      <span className="text-base sm:text-lg font-black tracking-tight">
                        {monthlyDrop > 0
                          ? `Hemat ${formatIDRFull(monthlyDrop)}/bln`
                          : formatIDRFull(result.fixPeriodMonthlyInstallment)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Cicilan Baru:{" "}
                      <strong className="text-gray-800 font-bold">
                        {formatIDRFull(result.fixPeriodMonthlyInstallment)}/bln
                      </strong>
                    </p>
                  </>
                );
              }

              // 2. LIFETIME SAVINGS
              if (isTakeOver && hasLifetimeSavings) {
                return (
                  <>
                    <div className="flex items-baseline justify-end gap-1 text-emerald-700">
                      <span className="text-base sm:text-lg font-black tracking-tight">
                        Hemat {formatIDR(result.savings!.totalSaved)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Cicilan:{" "}
                      <strong className="text-gray-800 font-bold">
                        {formatIDRFull(result.fixPeriodMonthlyInstallment)}/bln
                      </strong>
                    </p>
                    {result.savings!.monthlySavedFix > 0 && (
                      <p className="text-[10.5px] text-emerald-700 font-bold mt-0.5">
                        Hemat {formatIDRFull(result.savings!.monthlySavedFix)}/bln
                      </p>
                    )}
                  </>
                );
              }

              // 3. REGULAR KPR / TAKE OVER STANDARD
              return (
                <>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                      {formatIDRFull(result.fixPeriodMonthlyInstallment)}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      /bln
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {product.jenisBunga === "Single Rate"
                      ? "Cicilan Flat Tetap"
                      : product.jenisBunga === "Berjenjang"
                        ? `Cicilan Awal (Thn 1-${tiers[0]?.endYear || 1})`
                        : `Cicilan Fix (${product.masaFix} Thn)`}
                  </p>
                  {isEligible &&
                    product.jenisBunga === "Berjenjang" &&
                    tiers.length > 1 && (
                      <p className="text-[11px] text-orange-600 font-semibold mt-0.5">
                        Naik Th {tiers[1].startYear}:{" "}
                        {formatIDRFull(tiers[1].monthlyInstallment)}/bln
                      </p>
                    )}
                  {isEligible &&
                    product.jenisBunga === "Fixed" &&
                    result.fixPeriodMonthlyInstallment !==
                      result.floatingMonthlyInstallment && (
                      <p className="text-[11px] text-orange-600 font-medium mt-0.5">
                        Floating:{" "}
                        {formatIDRFull(result.floatingMonthlyInstallment)}/bln
                      </p>
                    )}
                </>
              );
            })()}
          </div>

          <div className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Savings Highlight (Full width strip) */}
      {result.savings && result.savings.totalSaved > 0 && (
        <div
          className="bg-emerald-50/80 border-y border-emerald-100/90 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-emerald-100/50 transition-colors"
          onClick={onToggle}
        >
          <div className="flex items-center gap-2 text-emerald-900">
            <p className="text-xs sm:text-sm font-bold">
              Total Estimasi Penghematan: {formatIDR(result.savings.totalSaved)}
            </p>
          </div>
          <span className="text-xs text-emerald-800 font-bold bg-white border border-emerald-300 px-2.5 py-1 rounded-lg shadow-2xs">
            Hemat {formatIDRFull(result.savings.monthlySavedFix)}/bln (Masa Fix)
          </span>
        </div>
      )}

      {/* 3. Bottom Key Stats Strip */}
      {isEligible && (
        <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100/90 flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs">
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            <StatPill
              label="Total Angsuran"
              value={formatIDR(result.totalInstallmentAll)}
            />
            <StatPill
              label="Total Bunga"
              value={formatIDR(result.totalInterest)}
              accent
            />
            {product.jenisBunga === "Berjenjang" ? (
              <StatPill
                label="Skema Suku Bunga"
                value={`Berjenjang (${tiers.map((t) => formatPercent(t.rate)).join(" → ")})`}
                accent
              />
            ) : product.jenisBunga === "Single Rate" ? (
              <StatPill
                label="Suku Bunga"
                value={`${formatPercent(product.rates[0])} Flat Tetap`}
              />
            ) : (
              <>
                <StatPill
                  label="Rate Fix"
                  value={formatPercent(product.rates[0])}
                />
                <StatPill
                  label="Rate Float"
                  value={formatPercent(result.floatingRate)}
                  accent
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* 4. Ineligibility reasons */}
      {!isEligible && ineligibilityReasons.length > 0 && (
        <div className="p-3 bg-red-50/50 border-t border-red-100 flex flex-wrap gap-1.5">
          {ineligibilityReasons.map((r, i) => (
            <span
              key={i}
              className="text-xs bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-medium"
            >
              {r}
            </span>
          ))}
        </div>
      )}

      {/* 5. Expanded Section (Amortisasi + Pedoman RAC) */}
      {isExpanded && isEligible && (
        <div className="border-t border-gray-200 bg-white p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setExpandedTab("amortisasi")}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  expandedTab === "amortisasi"
                    ? "bg-[#0B2545] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Jadwal Angsuran (Amortisasi)
              </button>
              <button
                type="button"
                onClick={() => setExpandedTab("rac")}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  expandedTab === "rac"
                    ? "bg-blue-700 text-white shadow-2xs"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pedoman RAC & Kriteria {product.bank}</span>
              </button>
            </div>
            <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
              Contekan Taktis Telemarketer
            </span>
          </div>

          {expandedTab === "amortisasi" ? (
            <AmortizationTable
              yearlySchedule={result.yearlySchedule}
              masaFix={product.masaFix}
            />
          ) : (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {/* 1. Status Pekerjaan */}
                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-200/80">
                  <p className="font-bold text-gray-800 flex items-center gap-1.5 text-xs mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>Profil Pekerjaan & Usia</span>
                  </p>
                  <p className="text-gray-600 leading-relaxed text-[11px]">
                    {guide.karyawanNote}
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-200/60 text-[10px] text-gray-400">
                    Batas usia lunas: Karyawan maks 55-65 th, Pengusaha maks 65-70 th.
                  </div>
                </div>

                {/* 2. Take Over & Bridging */}
                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-200/80">
                  <p className="font-bold text-gray-800 flex items-center gap-1.5 text-xs mb-1.5">
                    <Zap className="w-3.5 h-3.5 text-teal-600" />
                    <span>Ketentuan Take Over</span>
                  </p>
                  <p className="text-gray-600 leading-relaxed text-[11px]">
                    {guide.takeOverNote}
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-200/60 text-[10px] text-gray-400">
                    Kesiapan dana talangan: {rac?.readyDana.includes("Ya") ? "Tersedia dari Bank" : "Wajib Dana Sendiri"}.
                  </div>
                </div>

                {/* 3. Agunan & Wilayah */}
                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-200/80">
                  <p className="font-bold text-gray-800 flex items-center gap-1.5 text-xs mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-600" />
                    <span>Agunan & Wilayah Cover</span>
                  </p>
                  <p className="text-gray-600 leading-relaxed text-[11px]">
                    {guide.propertyNote}
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-200/60 text-[10px] text-gray-400 truncate" title={rac?.area.join(", ")}>
                    Wilayah: {rac ? rac.area.slice(0, 4).join(", ") + "..." : "Nasional"}
                  </div>
                </div>
              </div>

              {/* Pitching Tips Banner */}
              <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200/80 rounded-xl p-3 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-blue-900 block text-xs">
                    Poin Keunggulan Bank untuk Disampaikan ke Nasabah:
                  </span>
                  <p className="text-blue-800 text-[11px] mt-0.5 leading-relaxed">
                    "{guide.sellingPoints}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] text-gray-400 font-medium">{label}</p>
      <p
        className={`text-xs sm:text-sm font-bold ${accent ? "text-blue-700" : "text-gray-800"}`}
      >
        {value}
      </p>
    </div>
  );
}
