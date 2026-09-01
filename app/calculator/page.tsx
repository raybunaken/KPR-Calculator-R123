"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Building2,
  ChevronLeft,
  Landmark,
  PiggyBank,
  Scale,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import LoanForm from "@/components/calculator/LoanForm";
import SimulationResults from "@/components/calculator/SimulationResults";
import Rumah123Logo from "@/components/ui/Rumah123Logo";
import { simulateProduct } from "@/lib/calculator";
import { filterProducts } from "@/lib/rac";
import type {
  LoanInput,
  SimulationResult,
  BankProduct,
  BankRAC,
} from "@/lib/types";
import bankData from "@/data/bank-products.json";

// Normalize tipe strings from the sheet data
function normalizeTipe(tipe: string): string {
  const t = tipe.trim().toLowerCase();
  if (t === "kpr primary" || t === "primary") return "KPR Primary";
  if (t === "kpr secondary" || t === "secondary") return "KPR Secondary";
  if (t === "take over") return "Take Over";
  if (t === "multiguna") return "Multiguna";
  return tipe;
}

const products: BankProduct[] = (bankData.products as BankProduct[]).map(
  (p) => ({
    ...p,
    tipe: normalizeTipe(p.tipe) as BankProduct["tipe"],
  }),
);

const racList: BankRAC[] = bankData.rac as BankRAC[];

export default function CalculatorPage() {
  const [loanInput, setLoanInput] = useState<LoanInput | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo<SimulationResult[]>(() => {
    if (!loanInput) return [];

    const filtered = filterProducts(products, racList, loanInput);

    return filtered.map((product) => {
      const result = simulateProduct(product, loanInput);
      return {
        ...result,
        isEligible: product.eligible,
        ineligibilityReasons: product.reasons,
      };
    });
  }, [loanInput]);

  const handleCalculate = useCallback((input: LoanInput) => {
    setIsCalculating(true);
    // Small delay for UX feedback
    setTimeout(() => {
      setLoanInput(input);
      setIsCalculating(false);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Beranda</span>
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <Link
              href="/calculator"
              className="hover:opacity-95 transition-opacity"
            >
              <Rumah123Logo withTagline={true} />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {loanInput && (
              <span className="text-xs text-gray-400 font-medium">
                {results.filter((r) => r.isEligible).length} opsi eligible
              </span>
            )}
            <Link
              href="/admin/products"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5"
              title="Buka Portal Manajemen Bunga Bank"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Kelola Bunga</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[400px_1fr] gap-6 items-start">
          {/* Left: Form */}
          <div className="lg:sticky lg:top-[4.5rem]">
            <LoanForm
              onCalculate={handleCalculate}
              isCalculating={isCalculating}
            />
          </div>

          {/* Right: Results */}
          <div className="min-w-0">
            {!loanInput ? (
              <EmptyState />
            ) : isCalculating ? (
              <LoadingState />
            ) : (
              <SimulationResults results={results} input={loanInput} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-8 lg:p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
      <div className="w-16 h-16 bg-[#0B2545]/5 rounded-2xl flex items-center justify-center mb-5 border border-[#0B2545]/15 text-[#0B2545] shadow-xs">
        <Building2 className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-extrabold text-gray-900 mb-2">
        Siap Hitung Simulasi KPR
      </h3>
      <p className="text-gray-500 text-sm max-w-md mb-8 leading-relaxed">
        Pilih tipe KPR dan sesuaikan parameter di panel sebelah kiri, lalu klik{" "}
        <span className="font-bold text-[#0B2545]">
          "Hitung Simulasi KPR"
        </span>{" "}
        untuk membandingkan puluhan program bank sekaligus.
      </p>

      {/* Feature Highlights */}
      <div className="grid sm:grid-cols-3 gap-4 w-full max-w-lg text-left">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[#0B2545] text-xs font-bold mb-1 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-[#0B2545]" />
            <span>400+ Program</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Katalog suku bunga bank terupdate lengkap
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[#00A86B] text-xs font-bold mb-1 flex items-center gap-1.5">
            <PiggyBank className="w-3.5 h-3.5 text-[#00A86B]" />
            <span>Hemat Jutaan</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Hitung otomatis potensi hemat KPR lama vs baru
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-teal-700 text-xs font-bold mb-1 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-teal-600" />
            <span>Komparasi 3 Bank</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Bandingkan 3 produk pilihan secara side-by-side
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs flex flex-col items-center justify-center min-h-[500px] text-center p-8">
      <div className="w-12 h-12 border-4 border-[#0B2545] border-t-transparent rounded-full animate-spin mb-4" />
      <h4 className="font-bold text-gray-900 text-base mb-1">
        Sedang Mengkalkulasi...
      </h4>
      <p className="text-gray-400 text-xs">
        Mencocokkan suku bunga dan menyusun jadwal angsuran
      </p>
    </div>
  );
}
