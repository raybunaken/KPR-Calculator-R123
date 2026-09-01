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
} from "lucide-react";
import type { SimulationResult, LoanInput } from "@/lib/types";
import { BANK_COLORS } from "@/lib/types";
import {
  formatIDR,
  formatIDRFull,
  formatPercent,
  extractRateTiers,
} from "@/lib/calculator";
import AmortizationTable from "./AmortizationTable";

type SortKey = "cicilan_fix" | "total_all" | "total_bunga" | "masaFix";
type ViewMode = "eligible" | "all";

interface SimulationResultsProps {
  results: SimulationResult[];
  input: LoanInput;
}

export default function SimulationResults({
  results,
  input,
}: SimulationResultsProps) {
  const [sortKey, setSortKey] = useState<SortKey>("cicilan_fix");
  const [viewMode, setViewMode] = useState<ViewMode>("all"); // Default ke all karena RAC dimatikan
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

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
        case "total_bunga":
          return a.totalInterest - b.totalInterest;
        case "masaFix":
          return b.product.masaFix - a.product.masaFix;
        default:
          return 0;
      }
    });
  }, [displayed, sortKey, searchQuery]);

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
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs px-5 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari bank atau nama program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs text-gray-500">
            <span className="hidden lg:inline text-gray-400 text-[11px]">
              Centang kotak pada kartu untuk membandingkan (maks 3)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-gray-600">Urutkan:</span>
              <div className="flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="text-xs font-semibold border border-gray-200 bg-gray-50/80 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] cursor-pointer"
                >
                  <option value="cicilan_fix">Cicilan Fix Terendah</option>
                  <option value="total_all">Total Angsuran Terendah</option>
                  <option value="total_bunga">Total Bunga Terendah</option>
                  <option value="masaFix">Masa Fix Terpanjang</option>
                </select>
              </div>
            </div>
          </div>
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
          />
        ))}
        {filteredAndSorted.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Pencarian tidak menemukan produk.
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
}: {
  result: SimulationResult;
  input: LoanInput;
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { product, isEligible, ineligibilityReasons } = result;
  const bankColor = BANK_COLORS[product.bank] || "#3B82F6";
  const isTop3 = rank <= 3 && isEligible;
  const tiers = extractRateTiers(result.yearlySchedule, product.masaFix);

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
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              {product.jenisBunga === "Single Rate"
                ? `Flat s.d Lunas · Tenor ${result.tenorYears} th · Kode: ${product.kode}`
                : `Promo ${product.masaFix} th · Tenor ${result.tenorYears} th · Kode: ${product.kode}`}
            </p>
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
                    <p className="text-[10.5px] text-teal-700 font-bold mt-0.5">
                      Tenor {newTenorYears} Th (Kas Longgar)
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

          {input.kprType === "Take Over" && (
            <div className="inline-flex items-center gap-1.5 text-orange-800 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200 text-[11px] font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>
                Est. Biaya Take Over (5%):{" "}
                <strong className="font-bold text-orange-900">
                  {formatIDR(
                    input.currentOutstanding
                      ? input.currentOutstanding * 0.05
                      : 0,
                  )}
                </strong>
                {input.readyDana === "Ya" && " (Siapkan Cash)"}
              </span>
            </div>
          )}
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

      {/* 5. Expanded Amortization Detail */}
      {isExpanded && isEligible && (
        <div className="border-t border-gray-200 bg-white p-5 space-y-4">
          <AmortizationTable
            yearlySchedule={result.yearlySchedule}
            masaFix={product.masaFix}
          />
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
