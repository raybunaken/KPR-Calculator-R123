"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Scale,
  PiggyBank,
  BarChart3,
  Table as TableIcon,
  ArrowDown,
  Calendar,
  TrendingUp,
  Layers,
  Info,
  Printer,
  SlidersHorizontal,
  Eye,
  EyeOff,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  Download,
  ImageIcon,
  Share2,
} from "lucide-react";
import Link from "next/link";
import type { BankProduct, LoanInput, SimulationResult } from "@/lib/types";
import { BANK_COLORS } from "@/lib/types";
import {
  simulateProduct,
  formatIDRFull,
  formatPercent,
  extractRateTiers,
} from "@/lib/calculator";
import AmortizationTable from "@/components/calculator/AmortizationTable";
import Rumah123Logo from "@/components/ui/Rumah123Logo";

function CompareContent() {
  const searchParams = useSearchParams();
  const codesParam = searchParams.get("codes");
  const dataParam = searchParams.get("data");

  const [products, setProducts] = useState<BankProduct[]>([]);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [input, setInput] = useState<LoanInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const imageExportRef = useRef<HTMLDivElement>(null);

  const [visibility, setVisibility] = useState({
    showParams: true,
    showBenefitMatrix: true,
    showCards: true,
    showBadges: true,
    showAmortizationWeb: true,
    showUnifiedSchedulePrint: true,
    showFullAmortizationPrint: false,
    maskBankNames: true,
  });

  const handleDownloadImage = async () => {
    if (!imageExportRef.current) return;
    try {
      setIsExportingImage(true);
      const { toPng } = await import("html-to-image");
      const el = imageExportRef.current;

      const dataUrl = await toPng(el, {
        quality: 0.98,
        pixelRatio: 2, // 2x high resolution for crystal clear WhatsApp sharing
        backgroundColor: "#ffffff",
        width: 794,
        height: el.scrollHeight || el.offsetHeight,
        cacheBust: true,
      });

      const link = document.createElement("a");
      const kprName = (input?.kprType || "KPR").replace(/\s+/g, "_");
      link.download = `Simulasi_KPR_Rumah123_${kprName}_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
      alert("Gagal mengunduh gambar. Silakan coba kembali atau gunakan tombol Cetak PDF.");
    } finally {
      setIsExportingImage(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      if (!codesParam || !dataParam) {
        setLoading(false);
        return;
      }

      try {
        const codes = codesParam.split(",");
        const parsedInput = JSON.parse(
          decodeURIComponent(dataParam),
        ) as LoanInput;
        setInput(parsedInput);

        const res = await fetch("/api/products");
        const data = await res.json();
        const allProducts: BankProduct[] = data.products;

        const selectedProducts = allProducts.filter((p) =>
          codes.includes(p.kode),
        );

        // Buat urutan sesuai dengan urutan `codes` (yang di-select dari UI)
        selectedProducts.sort(
          (a, b) => codes.indexOf(a.kode) - codes.indexOf(b.kode),
        );
        setProducts(selectedProducts);

        const simulationResults = selectedProducts.map((p) =>
          simulateProduct(p, parsedInput),
        );
        setResults(simulationResults);
      } catch (err) {
        console.error("Failed to load comparison data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [codesParam, dataParam]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (results.length === 0 || !input) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
        <Scale className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700">
          Data Perbandingan Tidak Ditemukan
        </h3>
        <p className="text-gray-500">
          Silakan kembali ke kalkulator dan pilih produk lagi.
        </p>
        <Link
          href="/calculator"
          className="inline-block mt-4 text-blue-600 font-medium hover:underline"
        >
          Kembali ke Kalkulator
        </Link>
      </div>
    );
  }

  // Calculate comparative extremes
  const minFixMonthly = Math.min(
    ...results.map((r) => r.fixPeriodMonthlyInstallment),
  );
  const minTotalPayment = Math.min(
    ...results.map((r) => r.totalInstallmentAll),
  );
  const maxMasaFix = Math.max(...results.map((r) => r.product.masaFix));
  const minMasaFix = Math.min(...results.map((r) => r.product.masaFix));
  const minFloating = Math.min(...results.map((r) => r.floatingRate));
  const maxFloating = Math.max(...results.map((r) => r.floatingRate));
  const maxSavings = results.some((r) => r.savings && r.savings.totalSaved > 0)
    ? Math.max(...results.map((r) => r.savings?.totalSaved || 0))
    : 0;

  const activeResult = results[activeTab] || results[0];

  return (
    <div className="mt-6 print:mt-2 space-y-6 print:space-y-4">
      {/* Telemarketer Visibility Control Toolbar (Web-Only) */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 print:hidden space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 border border-blue-100">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm">
                Pengaturan Bagian Tampilan & Cetak PDF (Telemarketer)
              </h3>
              <p className="text-[11px] text-gray-500">
                Sembunyikan atau tampilkan seksi tertentu agar tampilan tidak
                terlalu mendetail ke nasabah.
              </p>
            </div>
          </div>

          {/* Quick Presets & Export Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() =>
                setVisibility({
                  showParams: true,
                  showBenefitMatrix: true,
                  showCards: true,
                  showBadges: false,
                  showAmortizationWeb: false,
                  showUnifiedSchedulePrint: true,
                  showFullAmortizationPrint: false,
                  maskBankNames: true,
                })
              }
              className="text-xs px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-800 font-bold hover:bg-orange-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Laporan PDF Singkat (1 Lembar Ringkasan Komparasi)"
            >
              <EyeOff className="w-3.5 h-3.5 text-orange-700" />
              <span>Preset 1 Lembar</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setVisibility({
                  showParams: true,
                  showBenefitMatrix: true,
                  showCards: true,
                  showBadges: true,
                  showAmortizationWeb: true,
                  showUnifiedSchedulePrint: true,
                  showFullAmortizationPrint: true,
                  maskBankNames: true,
                })
              }
              className="text-xs px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Laporan PDF Full (Ringkasan + Lembar Detail Lengkap per Bank)"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Preset Lengkap</span>
            </button>

            <div className="w-px h-5 bg-gray-200 hidden sm:block" />

            {/* Direct Download Foto (PNG) */}
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isExportingImage}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-[#00A86B] hover:bg-[#00915C] active:bg-[#007A4D] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              title="Download Gambar PNG Resolusi Tinggi untuk Kirim ke WhatsApp"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingImage ? "Membuat Foto..." : "Download Foto (PNG)"}</span>
            </button>

            {/* Direct Print PDF */}
            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#081c35] active:bg-[#061528] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Cetak atau Simpan sebagai PDF A4"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak PDF (A4)</span>
            </button>
          </div>
        </div>

        {/* Checkbox Toggles per Section */}
        <div className="pt-2.5 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-orange-50/60 border border-orange-200 select-none bg-orange-50/40">
            <input
              type="checkbox"
              checked={visibility.maskBankNames}
              onChange={(e) =>
                setVisibility((v) => ({
                  ...v,
                  maskBankNames: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
            />
            <span className="font-bold text-orange-950">
              Sembunyikan Bank (Opsi 1, 2, 3)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-100 select-none">
            <input
              type="checkbox"
              checked={visibility.showBenefitMatrix}
              onChange={(e) =>
                setVisibility((v) => ({
                  ...v,
                  showBenefitMatrix: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
            />
            <span className="font-medium text-gray-700">Matriks Benefit</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-100 select-none">
            <input
              type="checkbox"
              checked={visibility.showCards}
              onChange={(e) =>
                setVisibility((v) => ({ ...v, showCards: e.target.checked }))
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
            />
            <span className="font-medium text-gray-700">Kartu Komparasi</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-100 select-none">
            <input
              type="checkbox"
              checked={visibility.showBadges}
              onChange={(e) =>
                setVisibility((v) => ({ ...v, showBadges: e.target.checked }))
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
            />
            <span className="font-medium text-gray-700">Label Rekomendasi</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-100 select-none">
            <input
              type="checkbox"
              checked={visibility.showAmortizationWeb}
              onChange={(e) =>
                setVisibility((v) => ({
                  ...v,
                  showAmortizationWeb: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
            />
            <span className="font-medium text-gray-700">
              Jadwal & Grafik (Web)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-100 select-none">
            <input
              type="checkbox"
              checked={visibility.showUnifiedSchedulePrint}
              onChange={(e) =>
                setVisibility((v) => ({
                  ...v,
                  showUnifiedSchedulePrint: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
            />
            <span className="font-medium text-gray-700">
              Tabel Tahunan (PDF)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-100 select-none">
            <input
              type="checkbox"
              checked={visibility.showFullAmortizationPrint}
              onChange={(e) =>
                setVisibility((v) => ({
                  ...v,
                  showFullAmortizationPrint: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
            />
            <span className="font-medium text-gray-700">
              Detail Lengkap Bank (PDF)
            </span>
          </label>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. WEB VIEW CONTAINER (Hidden during print) */}
      {/* ============================================================ */}
      <div className="space-y-6 print:hidden">
        {/* Parameter Summary Bar */}
        {visibility.showParams && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-gray-900 text-base">
                  Komparasi {results.length} Program KPR Pilihan
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Perbandingan simulasi angsuran, suku bunga, dan total biaya
                  hingga lunas.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full">
                  {input.kprType}
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                  Tenor {input.tenorYears} Tahun
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-4 text-xs">
              <div>
                <span className="text-gray-400 font-medium block mb-1">
                  Total Plafond KPR
                </span>
                <span className="text-sm font-bold text-blue-700">
                  {formatIDRFull(input.plafond + (input.topUp || 0))}
                </span>
              </div>
              {input.kprType === "Take Over" && (
                <>
                  <div>
                    <span className="text-gray-400 font-medium block mb-1">
                      Outstanding Saat Ini
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {formatIDRFull(input.currentOutstanding || 0)}
                    </span>
                  </div>
                  {input.topUp && input.topUp > 0 ? (
                    <div>
                      <span className="text-gray-400 font-medium block mb-1">
                        Top Up Dana
                      </span>
                      <span className="text-sm font-bold text-emerald-600">
                        +{formatIDRFull(input.topUp)}
                      </span>
                    </div>
                  ) : null}
                  <div>
                    <span className="text-gray-400 font-medium block mb-1">
                      Biaya Take Over (5%)
                    </span>
                    {input.readyDana === "Tidak" ? (
                      <span className="text-sm font-bold text-blue-600">
                        {formatIDRFull((input.currentOutstanding || 0) * 0.05)}{" "}
                        <span className="text-[10px] text-gray-400 font-normal">
                          (Masuk Plafond)
                        </span>
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-orange-600">
                        {formatIDRFull((input.currentOutstanding || 0) * 0.05)}{" "}
                        <span className="text-[10px] text-gray-400 font-normal">
                          (Siapkan Cash)
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium block mb-1">
                      Cicilan Saat Ini
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                      {formatIDRFull(input.currentMonthlyInstallment || 0)}/bln
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Take Over Benefit Summary Matrix (Web) */}
        {visibility.showBenefitMatrix &&
          input.kprType === "Take Over" &&
          results.some((r) => r.savings) && (
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-emerald-600" />
                    <span>Take Over Benefit Summary</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Perbandingan simulasi total angsuran jika nasabah tetap
                    bertahan di bank lama vs pindah ke program KPR baru.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
                  Analisa Penghematan
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100/80 text-gray-600 border-b border-gray-200 text-[11px]">
                      <th className="p-2.5 text-left font-bold rounded-l-lg">
                        Program Bank Pilihan
                      </th>
                      <th className="p-2.5 text-right font-medium">
                        Cicilan Awal / Bln
                      </th>
                      <th className="p-2.5 text-right font-medium">
                        Est. Total Jika Tidak Pindah
                      </th>
                      <th className="p-2.5 text-right font-medium">
                        Est. Total Jika Pindah
                      </th>
                      <th className="p-2.5 text-right font-medium">
                        Biaya Take Over (5%)
                      </th>
                      <th className="p-2.5 text-right font-bold text-emerald-900 rounded-r-lg">
                        Total Penghematan Biaya
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.map((res, i) => {
                      const s = res.savings;
                      if (!s) return null;
                      const isSaved = s.totalSaved > 0;
                      return (
                        <tr
                          key={res.product.kode}
                          className="hover:bg-gray-50/60 transition-colors"
                        >
                          <td className="p-2.5">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white shrink-0"
                                style={{
                                  backgroundColor:
                                    BANK_COLORS[res.product.bank] || "#3B82F6",
                                }}
                              >
                                Opsi {i + 1}
                              </span>
                              <div>
                                <span className="font-bold text-gray-900 block">
                                  {visibility.maskBankNames
                                    ? `Opsi ${i + 1}`
                                    : res.product.bank}
                                </span>
                                <span className="text-[11px] text-gray-500 truncate max-w-[200px] block">
                                  {visibility.maskBankNames
                                    ? `Program KPR Opsi ${i + 1}`
                                    : res.product.nama}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-2.5 text-right font-bold text-gray-900">
                            {formatIDRFull(res.fixPeriodMonthlyInstallment)}
                          </td>
                          <td className="p-2.5 text-right text-gray-600 font-medium">
                            {formatIDRFull(s.oldTotalPayment)}
                          </td>
                          <td className="p-2.5 text-right font-semibold text-blue-700">
                            {formatIDRFull(s.newTotalPayment)}
                          </td>
                          <td className="p-2.5 text-right text-orange-700">
                            {formatIDRFull(s.takeOverFee)}
                          </td>
                          <td className="p-2.5 text-right">
                            <span
                              className={`inline-block font-extrabold px-2.5 py-1 rounded-lg text-xs ${
                                isSaved
                                  ? "text-emerald-800 bg-emerald-100 border border-emerald-300"
                                  : "text-gray-700 bg-gray-100"
                              }`}
                            >
                              {isSaved
                                ? `Hemat ${formatIDRFull(s.totalSaved)}`
                                : `+${formatIDRFull(Math.abs(s.totalSaved))} (Selisih)`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* 3 Comparison Columns (Web) */}
        {visibility.showCards && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {results.map((res, idx) => {
              const { product } = res;
              const bankColor = BANK_COLORS[product.bank] || "#3B82F6";

              const isLowestFix =
                res.fixPeriodMonthlyInstallment === minFixMonthly;
              const isLowestTotal = res.totalInstallmentAll === minTotalPayment;
              const isMostSaved =
                maxSavings > 0 && res.savings?.totalSaved === maxSavings;
              const isLongestFix =
                res.product.masaFix === maxMasaFix && maxMasaFix > minMasaFix;
              const isLowestFloating =
                res.floatingRate === minFloating && minFloating < maxFloating;

              let bannerTitle: string | null = null;
              let bannerBg = "bg-blue-600";

              if (isLowestFix && (isLowestTotal || isMostSaved)) {
                bannerTitle = "Pilihan Paling Hemat";
                bannerBg = "bg-emerald-600";
              } else if (isMostSaved) {
                bannerTitle = "Total Penghematan Tertinggi";
                bannerBg = "bg-emerald-600";
              } else if (isLowestFix) {
                bannerTitle = "Cicilan Fix Terendah";
                bannerBg = "bg-blue-600";
              } else if (isLowestTotal) {
                bannerTitle = "Total Bayar Terendah";
                bannerBg = "bg-teal-600";
              } else if (isLongestFix) {
                bannerTitle = `Masa Promo Terpanjang (${res.product.masaFix} Tahun)`;
                bannerBg = "bg-indigo-600";
              } else if (isLowestFloating) {
                bannerTitle = "Bunga Floating Terendah";
                bannerBg = "bg-amber-600";
              }

              const hasPositiveSavings =
                res.savings && res.savings.totalSaved > 0;
              const tiers = extractRateTiers(
                res.yearlySchedule,
                product.masaFix,
              );

              return (
                <div
                  key={product.kode}
                  className={`bg-white rounded-2xl border shadow-xs overflow-hidden flex flex-col transition-all relative ${
                    activeTab === idx
                      ? "ring-2 ring-blue-500/25 shadow-md border-blue-400"
                      : "border-gray-200/90"
                  }`}
                >
                  {/* Top Accent Strip with Bank Color */}
                  <div
                    className="h-1.5 w-full"
                    style={{
                      backgroundColor: visibility.maskBankNames
                        ? "#475569"
                        : bankColor,
                    }}
                  />
                  {/* Card Header (100% Symmetrical across all cards) */}
                  <div className="p-5 border-b border-gray-100 bg-white">
                    <div className="flex items-center justify-between gap-2 mb-2 min-h-[26px]">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-md text-white shadow-2xs inline-block"
                        style={{
                          backgroundColor: visibility.maskBankNames
                            ? "#475569"
                            : bankColor,
                        }}
                      >
                        {visibility.maskBankNames
                          ? `Opsi ${idx + 1}`
                          : product.bank}
                      </span>
                      {visibility.showBadges && bannerTitle ? (
                        <span
                          className={`${bannerBg} text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs`}
                        >
                          {bannerTitle}
                        </span>
                      ) : (
                        <span className="h-[20px]" />
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 text-base leading-snug h-[44px] line-clamp-2">
                      {visibility.maskBankNames
                        ? `Program KPR Opsi ${idx + 1}`
                        : product.nama}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-1 font-medium">
                      Kode Produk:{" "}
                      {visibility.maskBankNames
                        ? `OPSI-${idx + 1}`
                        : product.kode}
                    </p>
                  </div>

                  {/* 1. HERO BOX: Headline Penghematan (Clean text, No Icon, No Pill) */}
                  {(() => {
                    const isTakeOver = input.kprType === "Take Over";
                    const oldTenorMonths =
                      input.currentRemainingTenorMonths || 0;
                    const oldTenorYears =
                      oldTenorMonths > 0 ? oldTenorMonths / 12 : 0;
                    const newTenorYears = input.tenorYears || 0;
                    const isExtendedTenor =
                      oldTenorYears > 0 && newTenorYears > oldTenorYears;
                    const monthlyDrop =
                      (input.currentMonthlyInstallment || 0) -
                      res.fixPeriodMonthlyInstallment;
                    const isMonthlyCheaper = monthlyDrop > 0;
                    const hasLifetimeSavings = !!(
                      res.savings && res.savings.totalSaved > 0
                    );

                    // Skenario 1: PERPANJANG TENOR (Cash Flow Relief)
                    if (
                      isTakeOver &&
                      (isExtendedTenor ||
                        (!hasLifetimeSavings && isMonthlyCheaper))
                    ) {
                      return (
                        <div className="px-5 py-4 border-b border-gray-100 bg-white min-h-[82px] flex flex-col justify-center">
                          <span className="text-teal-900 text-xs font-bold uppercase tracking-wider block mb-1">
                            PENURUNAN BEBAN KAS BULANAN
                          </span>
                          <span className="text-2xl sm:text-3xl font-black text-teal-700 tracking-tight block">
                            {monthlyDrop > 0
                              ? `Hemat ${formatIDRFull(monthlyDrop)}/bln`
                              : formatIDRFull(
                                  res.fixPeriodMonthlyInstallment,
                                )}
                          </span>
                        </div>
                      );
                    }

                    // Skenario 2: PEMANGKAS BUNGA (Lifetime Savings)
                    if (isTakeOver && hasLifetimeSavings) {
                      return (
                        <div className="px-5 py-4 border-b border-gray-100 bg-white min-h-[82px] flex flex-col justify-center">
                          <span className="text-emerald-900 text-xs font-bold uppercase tracking-wider block mb-1">
                            TOTAL PENGHEMATAN BIAYA
                          </span>
                          <span className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight block">
                            Hemat {formatIDRFull(res.savings!.totalSaved)}
                          </span>
                        </div>
                      );
                    }

                    // Skenario 4: Regular KPR (Secondary / Primary)
                    return (
                      <div className="px-5 py-4 border-b border-gray-100 bg-white min-h-[82px] flex flex-col justify-center">
                        <span className="text-gray-400 text-xs font-medium block mb-1">
                          {product.jenisBunga === "Single Rate"
                            ? "Cicilan Flat Tetap (s.d Lunas)"
                            : product.jenisBunga === "Berjenjang"
                              ? `Cicilan Awal (Thn 1-${tiers[0]?.endYear || 1})`
                              : `Estimasi Cicilan (Fix ${product.masaFix} Thn)`}
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight block">
                          {formatIDRFull(res.fixPeriodMonthlyInstallment)}
                          <span className="text-xs text-gray-400 font-medium ml-1">
                            /bln
                          </span>
                        </span>
                      </div>
                    );
                  })()}

                  {/* 2. CARD BODY: Benefit Summary -> Bunga -> Cicilan Bawah */}
                  <div className="p-5 flex-1 bg-white space-y-3.5 text-xs flex flex-col justify-between">
                    {/* Benefit Summary Box (Right under Hero) */}
                    {input.kprType === "Take Over" && res.savings && (
                      <div className="p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/40 space-y-2 min-h-[108px] flex flex-col justify-center">
                        <div className="font-bold text-xs pb-1.5 border-b border-emerald-200/60 text-emerald-950">
                          Take Over Benefit Summary
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex justify-between text-gray-600">
                            <span>Est. Total Jika Tidak Pindah:</span>
                            <span className="font-semibold text-gray-900">
                              {formatIDRFull(res.savings.oldTotalPayment)}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Est. Total Jika Pindah:</span>
                            <span className="font-semibold text-blue-700">
                              {formatIDRFull(res.savings.newTotalPayment)}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Est. Biaya Take Over (5%):</span>
                            <span className="font-medium text-orange-700">
                              {formatIDRFull(res.savings.takeOverFee)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rate Structure Breakdown Box */}
                    {product.jenisBunga === "Berjenjang" ? (
                      <div className="p-3.5 bg-orange-50/50 rounded-xl border border-orange-200/80 space-y-2 min-h-[72px] flex flex-col justify-center">
                        <div className="flex items-center justify-between font-bold text-orange-950 text-xs pb-1.5 border-b border-orange-200/60">
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-orange-600" />
                            <span>Rincian Jenjang Suku Bunga:</span>
                          </span>
                        </div>
                        <div className="space-y-1.5 text-[11px]">
                          {tiers.map((t, tIdx) => (
                            <div
                              key={tIdx}
                              className="flex items-center justify-between bg-white/80 px-2.5 py-1.5 rounded-lg border border-orange-100/60"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-gray-700">
                                  Th {t.startYear}
                                  {t.startYear !== t.endYear
                                    ? `-${t.endYear}`
                                    : ""}
                                  :
                                </span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${t.type === "Fix" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}
                                >
                                  {formatPercent(t.rate)}{" "}
                                  {t.type === "Float" ? "Float" : ""}
                                </span>
                              </div>
                              <span className="font-bold text-gray-900">
                                {formatIDRFull(t.monthlyInstallment)}/bln
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : product.jenisBunga === "Single Rate" ? (
                      <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-200/80 space-y-1.5 min-h-[72px] flex flex-col justify-center">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-purple-950 font-bold">
                            Skema Single Rate (Flat s.d Lunas)
                          </span>
                          <span className="font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                            {formatPercent(product.rates[0])}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Suku bunga dan cicilan tetap konstan dari awal hingga
                          tahun ke-{input.tenorYears} tanpa pernah naik ke
                          floating.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100 space-y-1.5 min-h-[72px] flex flex-col justify-center">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-gray-600 font-medium">
                            Bunga Promo Fix (Th 1-{product.masaFix}):
                          </span>
                          <span className="font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-100">
                            {formatPercent(product.rates[0])}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-gray-600 font-medium">
                            Est. Bunga Floating (Th {product.masaFix + 1}+):
                          </span>
                          <span className="font-bold text-orange-700 bg-white px-2 py-0.5 rounded border border-orange-100">
                            {formatPercent(res.floatingRate)} (
                            {formatIDRFull(res.floatingMonthlyInstallment)}/bln)
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Monthly Installment & Savings Bar */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-500 text-[11px] block">
                          Cicilan Baru (Fix {product.masaFix} Thn):
                        </span>
                        <span className="font-bold text-gray-900 text-sm">
                          {formatIDRFull(res.fixPeriodMonthlyInstallment)}
                          <span className="text-xs font-normal text-gray-500">
                            /bln
                          </span>
                        </span>
                      </div>
                      {input.kprType === "Take Over" &&
                        res.savings &&
                        res.savings.monthlySavedFix > 0 && (
                          <div className="text-right">
                            <span className="text-gray-500 text-[11px] block">
                              Hemat per Bulan:
                            </span>
                            <span className="font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px] inline-block">
                              Hemat{" "}
                              {formatIDRFull(res.savings.monthlySavedFix)}
                              /bln
                            </span>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* View Amortization CTA */}
                  <div className="p-4 bg-gray-50/80 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(idx);
                        if (!visibility.showAmortizationWeb) {
                          setVisibility((v) => ({
                            ...v,
                            showAmortizationWeb: true,
                          }));
                        }
                        setTimeout(() => {
                          document
                            .getElementById("amortization-detail-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }, 50);
                      }}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        activeTab === idx && visibility.showAmortizationWeb
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {activeTab === idx && visibility.showAmortizationWeb
                          ? "Sedang Dilihat di Bawah"
                          : "Lihat Jadwal Angsuran ↓"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Master Amortization & Chart Section for Web */}
        {visibility.showAmortizationWeb && (
          <div
            id="amortization-detail-section"
            className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <TableIcon className="w-5 h-5 text-blue-600" />
                  <span>Detail Jadwal Angsuran per Tahun</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Rincian amortisasi pokok, bunga, dan sisa saldo tahunan untuk
                  setiap bank.
                </p>
              </div>

              {/* Bank Tabs */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
                {results.map((r, i) => (
                  <button
                    key={r.product.kode}
                    onClick={() => setActiveTab(i)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === i
                        ? "bg-white text-gray-900 shadow-xs ring-1 ring-black/5"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          BANK_COLORS[r.product.bank] || "#3B82F6",
                      }}
                    />
                    <span>
                      {r.product.bank} - {r.product.nama.slice(0, 18)}...
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Bank Header */}
            <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium">
                  Program Bank Aktif:{" "}
                </span>
                <span className="font-bold text-blue-800 text-sm">
                  {activeResult.product.bank} | {activeResult.product.nama}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Masa Fix:{" "}
                  <strong className="text-gray-900">
                    {activeResult.product.masaFix} Tahun
                  </strong>
                </span>
                <span className="text-gray-600">
                  Rate Promo:{" "}
                  <strong className="text-blue-700">
                    {formatPercent(activeResult.product.rates[0])}
                  </strong>
                </span>
                <span className="text-gray-600">
                  Rate Float:{" "}
                  <strong className="text-orange-600">
                    {formatPercent(activeResult.floatingRate)}
                  </strong>
                </span>
              </div>
            </div>

            {/* Full-width Table */}
            <div>
              <AmortizationTable
                yearlySchedule={activeResult.yearlySchedule}
                masaFix={activeResult.product.masaFix}
              />
            </div>
          </div>
        )}
      </div>      {/* ============================================================ */}
      {/* 2. DEDICATED PRINT-ONLY REPORT (Tele Reference Design - A4) */}
      {/* ============================================================ */}
      <div className="hidden print:block text-slate-900">
        {/* --- PAGE 1: EXECUTIVE SUMMARY & BENEFIT MATRIX (EXACT TELE DESIGN) --- */}
        <div className="print:break-inside-avoid print:page-break-inside-avoid">
          <ReportPage1Content
            results={results}
            input={input}
            visibility={visibility}
          />
        </div>

        {/* --- OPTIONAL PAGES: DETAIL LENGKAP 1 BANK PER HALAMAN --- */}
        {visibility.showFullAmortizationPrint &&
          results.map((r, i) => (
            <div
              key={r.product.kode}
              className="print:break-before-page space-y-3 text-black"
            >
              {/* Top Advisory Document Brand Strip */}
              <div className="flex items-center justify-between text-[8px] text-gray-500 pb-1 border-b border-gray-300">
                <div className="flex items-center gap-1.5">
                  <Rumah123Logo
                    variant="full"
                    withTagline={false}
                    size="sm"
                    className="scale-75 origin-left grayscale"
                  />
                  <span className="font-semibold text-black">
                    Rumah123 Mortgage | Laporan Detail Bank
                  </span>
                </div>
                <span>Disiapkan oleh Tim Mortgage Rumah123</span>
              </div>

              {/* Bank Header */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-black text-white">
                    Opsi {i + 1}
                  </span>
                  <div>
                    <h2 className="font-bold text-black text-sm">
                      {visibility.maskBankNames
                        ? `Program KPR Opsi ${i + 1}`
                        : r.product.nama}
                    </h2>
                    <span className="text-[9px] text-gray-600">
                      Kode Produk:{" "}
                      {visibility.maskBankNames
                        ? `OPSI-${i + 1}`
                        : r.product.kode}{" "}
                      | Skema: {r.product.jenisBunga} (Fix {r.product.masaFix}{" "}
                      Tahun)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-black font-bold bg-gray-100 px-2 py-0.5 rounded border border-gray-400">
                    Halaman Detail Opsi {i + 1}
                  </span>
                </div>
              </div>

              {/* 4 Key Stats Highlight Cards Full Width */}
              {(() => {
                const isTakeOver = input.kprType === "Take Over";
                const topUp = input.topUp || 0;
                const oldTenorMonths = input.currentRemainingTenorMonths || 0;
                const oldTenorYears =
                  oldTenorMonths > 0 ? oldTenorMonths / 12 : 0;
                const newTenorYears = input.tenorYears || 0;
                const isExtendedTenor =
                  oldTenorYears > 0 && newTenorYears > oldTenorYears;
                const monthlyDrop =
                  (input.currentMonthlyInstallment || 0) -
                  r.fixPeriodMonthlyInstallment;
                const hasLifetimeSavings = !!(
                  r.savings && r.savings.totalSaved > 0
                );

                return (
                  <div className="grid grid-cols-4 gap-2.5">
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-400">
                      <span className="text-[8.5px] text-gray-600 block">
                        Estimasi Cicilan Awal
                      </span>
                      <span className="text-sm font-extrabold text-black">
                        {formatIDRFull(r.fixPeriodMonthlyInstallment)}
                        <span className="text-[8.5px] font-normal text-gray-600">
                          /bln
                        </span>
                      </span>
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-400">
                      <span className="text-[8.5px] text-gray-600 block">
                        {isTakeOver && isExtendedTenor
                          ? "Beban Kas Berkurang"
                          : "Hemat per Bulan (Awal)"}
                      </span>
                      <span className="text-sm font-extrabold text-black">
                        {isTakeOver
                          ? monthlyDrop > 0
                            ? `Hemat ${formatIDRFull(monthlyDrop)}/bln`
                            : "Rp 0"
                          : "-"}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-400">
                      <span className="text-[8.5px] text-gray-600 block">
                        Total Angsuran ({input.tenorYears}th)
                      </span>
                      <span className="text-sm font-bold text-black">
                        {formatIDRFull(r.totalInstallmentAll)}
                      </span>
                    </div>

                    <div className="bg-gray-100 p-2.5 rounded-lg border border-gray-400">
                      <span className="text-[8.5px] font-bold block text-black">
                        {topUp > 0
                          ? "Dana Tunai Cair (Top Up)"
                          : hasLifetimeSavings
                            ? "Total Penghematan Net"
                            : `Tenor Baru (${newTenorYears} Th)`}
                      </span>
                      <span className="text-sm font-extrabold text-black">
                        {topUp > 0
                          ? `+${formatIDRFull(topUp)}`
                          : hasLifetimeSavings
                            ? formatIDRFull(r.savings!.totalSaved)
                            : `Arus Kas Longgar`}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Step Up or Rate Structure details */}
              {r.product.jenisBunga === "Berjenjang" && (
                <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-400 space-y-1.5">
                  <span className="text-[9.5px] font-bold text-black block">
                    Rincian Jenjang Suku Bunga Step-Up:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-[8.5px]">
                    {extractRateTiers(r.yearlySchedule, r.product.masaFix).map(
                      (t, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-1.5 rounded border border-gray-300 flex justify-between items-center"
                        >
                          <span>
                            Th {t.startYear}-{t.endYear} (
                            {formatPercent(t.rate)}):
                          </span>
                          <strong className="text-black">
                            {formatIDRFull(t.monthlyInstallment)}/bln
                          </strong>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Full Amortization Schedule Table Full Width */}
              <div className="bg-white rounded-lg border border-gray-400 p-3 space-y-1.5">
                <h3 className="text-[9.5px] font-bold text-black">
                  Tabel Amortisasi Lengkap (Pokok, Bunga, Sisa Saldo):
                </h3>
                <AmortizationTable
                  yearlySchedule={r.yearlySchedule}
                  masaFix={r.product.masaFix}
                  showAll={true}
                />
              </div>

              {/* Bank Page Footer */}
              <div className="pt-2 border-t border-gray-300 flex items-center justify-between text-[7.5px] text-gray-500">
                <div className="flex items-center gap-2">
                  <Rumah123Logo
                    variant="full"
                    withTagline={true}
                    size="sm"
                    className="grayscale"
                  />
                </div>
                <span>
                  Dokumen Resmi Tim Mortgage Rumah123 | Suku bunga & ketentuan
                  mengacu pada kebijakan bank
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* ============================================================ */}
      {/* 3. OFF-SCREEN HIGH-RES CONTAINER FOR WHATSAPP IMAGE EXPORT */}
      {/* ============================================================ */}
      <div
        style={{
          position: "relative",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div
          ref={imageExportRef}
          style={{
            width: "794px",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
          className="p-3 bg-white text-slate-900"
        >
          <ReportPage1Content
            results={results}
            input={input}
            visibility={visibility}
          />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Dedicated Page 1 Report Component (Shared between Print & Image Export)
// ----------------------------------------------------------------------
function ReportPage1Content({
  results,
  input,
  visibility,
}: {
  results: SimulationResult[];
  input: LoanInput;
  visibility: any;
}) {
  return (
    <div className="space-y-3 print:space-y-2.5 bg-white text-slate-900">
      {/* Top Dark Navy Hero Banner with Decorative Curved Accents */}
      <div className="bg-[#0B2545] rounded-xl p-4 text-white relative overflow-hidden shadow-xs">
        {/* Decorative Curved Wave/Circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-teal-400/20 pointer-events-none" />
        <div className="absolute top-1 -right-3 w-28 h-28 rounded-full bg-cyan-300/25 pointer-events-none" />

        <div className="relative z-10 space-y-2.5">
          {/* Header Top Row: Official Logo & Report Badge */}
          <div className="flex items-center justify-between pb-1 border-b border-white/15">
            <Rumah123Logo variant="white" size="sm" />
            <div className="text-right text-[8px] text-slate-300">
              <span className="inline-flex items-center gap-1 font-bold text-white bg-white/15 px-2 py-0.5 rounded border border-white/20">
                <ShieldCheck className="w-2.5 h-2.5 text-teal-300 inline" /> Official Mortgage Report
              </span>
            </div>
          </div>

          {/* Document Title */}
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
              Mortgage Comparison Report
            </h1>
            <p className="text-[8px] text-blue-200/90 font-medium">
              Disiapkan khusus oleh Tim Mortgage Rumah123 untuk Nasabah •{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* 3 Parameter Stats in Dark Banner */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/15 text-xs">
            <div className="pr-2">
              <span className="text-[8px] text-blue-200 font-semibold block uppercase tracking-wider">
                Total Plafond
              </span>
              <span className="text-sm font-extrabold text-white block mt-0.5">
                {formatIDRFull(input.plafond + (input.topUp || 0))}
              </span>
            </div>
            <div className="border-l border-white/20 px-2.5">
              <span className="text-[8px] text-blue-200 font-semibold block uppercase tracking-wider">
                {input.kprType === "Take Over"
                  ? "Est. Biaya Take Over (5%)"
                  : "Uang Muka (DP)"}
              </span>
              <span className="text-sm font-extrabold text-white block mt-0.5">
                {input.kprType === "Take Over"
                  ? formatIDRFull((input.currentOutstanding || 0) * 0.05)
                  : `${formatIDRFull(((input.propertyPrice || 0) * (input.dpPercent || 0)) / 100)} (${input.dpPercent || 0}%)`}
              </span>
            </div>
            <div className="border-l border-white/20 pl-2.5">
              <span className="text-[8px] text-blue-200 font-semibold block uppercase tracking-wider">
                {input.kprType === "Take Over"
                  ? "Current Monthly Installment"
                  : "Tenor Pinjaman"}
              </span>
              <span className="text-sm font-extrabold text-white block mt-0.5">
                {input.kprType === "Take Over"
                  ? `${formatIDRFull(input.currentMonthlyInstallment || 0)}/bln`
                  : `${input.tenorYears} Tahun`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Option Hero Cards (Middle Section) */}
      <div className="grid grid-cols-3 gap-3">
        {results.map((res, idx) => {
          const s = res.savings;
          const isSaved = s && s.totalSaved > 0;
          const monthlySaved =
            (input.currentMonthlyInstallment || 0) -
            res.fixPeriodMonthlyInstallment;
          const isMonthlyCheaper = monthlySaved > 0;

          const optionTitle = visibility.maskBankNames
            ? `Option ${idx + 1}`
            : `Option ${idx + 1} (${res.product.bank})`;
          const rateDisplay = formatPercent(res.product.rates[0]);

          let savingsLabel = "Total Kewajiban Angsuran";
          let savingsValue = formatIDRFull(res.totalInstallmentAll);

          if (input.kprType === "Take Over" && s) {
            if (isSaved) {
              savingsLabel = "Total Net savings";
              savingsValue = `Hemat ${formatIDRFull(s.totalSaved)}`;
            } else if (isMonthlyCheaper) {
              savingsLabel = "Hemat Beban Bulanan";
              savingsValue = `Hemat ${formatIDRFull(monthlySaved)}/bln`;
            } else {
              savingsLabel = "Total Net savings";
              savingsValue = `+${formatIDRFull(Math.abs(s.totalSaved))}`;
            }
          }

          return (
            <div
              key={res.product.kode}
              className="bg-white rounded-xl border border-slate-300 shadow-xs overflow-hidden flex flex-col"
            >
              {/* Top Gray Tab */}
              <div className="bg-slate-200/90 py-1 px-3 text-center border-b border-slate-300">
                <span className="font-bold text-slate-800 text-[10px]">
                  {optionTitle}
                </span>
              </div>

              {/* Card Content Body */}
              <div className="p-3 text-center space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Promo interest rate
                  </span>
                  <span className="text-2xl font-black text-[#0B2545] tracking-tight block mt-0.5">
                    {rateDisplay}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-1.5">
                  <span className="text-[8px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Initial monthly payment
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 block mt-0.5">
                    {formatIDRFull(res.fixPeriodMonthlyInstallment)}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-1.5">
                  <span className="text-[8px] text-slate-500 font-semibold block uppercase tracking-wider mb-1">
                    {savingsLabel}
                  </span>
                  <div className="bg-[#00A86B] text-white font-extrabold text-[9px] py-1 px-2.5 rounded-full inline-block shadow-2xs">
                    {savingsValue}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table (Bottom Section) */}
      <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-xs">
        <table className="w-full text-[8.5px] border-collapse">
          <thead>
            <tr className="bg-[#0B2545] text-white text-[8px] uppercase tracking-wider font-bold">
              <th className="px-3 py-1.5 text-left w-[28%] border-r border-blue-900/60">
                Parameter / Name
              </th>
              {results.map((r, i) => (
                <th
                  key={r.product.kode}
                  className="px-2.5 py-1.5 text-right w-[24%] border-r border-blue-900/60 last:border-r-0"
                >
                  {visibility.maskBankNames ? `Option ${i + 1}` : r.product.bank}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {/* Row 1: Plafond */}
            <tr className="even:bg-slate-50/70">
              <td className="px-3 py-1 font-semibold text-slate-700 border-r border-slate-200">
                Plafond
              </td>
              {results.map((r) => (
                <td
                  key={r.product.kode}
                  className="px-2.5 py-1 text-right font-medium text-slate-900 border-r border-slate-200 last:border-r-0"
                >
                  {formatIDRFull(input.plafond)}
                </td>
              ))}
            </tr>

            {/* Row 2: Total Plafond Baru */}
            <tr className="even:bg-slate-50/70">
              <td className="px-3 py-1 font-semibold text-slate-700 border-r border-slate-200">
                Total Plafond Baru
              </td>
              {results.map((r) => (
                <td
                  key={r.product.kode}
                  className="px-2.5 py-1 text-right font-bold text-slate-900 border-r border-slate-200 last:border-r-0"
                >
                  {formatIDRFull(input.plafond + (input.topUp || 0))}
                </td>
              ))}
            </tr>

            {/* Row 3: Biaya Take Over (5%) */}
            {input.kprType === "Take Over" && (
              <tr className="even:bg-slate-50/70">
                <td className="px-3 py-1 font-semibold text-slate-700 border-r border-slate-200">
                  Est. Biaya Take Over (5%)
                </td>
                {results.map((r) => (
                  <td
                    key={r.product.kode}
                    className="px-2.5 py-1 text-right font-medium text-amber-800 border-r border-slate-200 last:border-r-0"
                  >
                    {formatIDRFull((input.currentOutstanding || 0) * 0.05)}
                  </td>
                ))}
              </tr>
            )}

            {/* Row 4: Current Monthly Installment */}
            {input.kprType === "Take Over" && (
              <tr className="even:bg-slate-50/70">
                <td className="px-3 py-1 font-semibold text-slate-700 border-r border-slate-200">
                  Current Monthly Installment
                </td>
                {results.map((r) => (
                  <td
                    key={r.product.kode}
                    className="px-2.5 py-1 text-right font-semibold text-slate-900 border-r border-slate-200 last:border-r-0"
                  >
                    {formatIDRFull(input.currentMonthlyInstallment || 0)}/bln
                  </td>
                ))}
              </tr>
            )}

            {/* Row 5: Promo Interest Rates */}
            <tr className="even:bg-slate-50/70">
              <td className="px-3 py-1 font-semibold text-slate-700 border-r border-slate-200">
                Promo Interest Rates
              </td>
              {results.map((r) => (
                <td
                  key={r.product.kode}
                  className="px-2.5 py-1 text-right font-bold text-[#0B2545] border-r border-slate-200 last:border-r-0"
                >
                  {formatPercent(r.product.rates[0])}{" "}
                  <span className="text-[7.5px] font-normal text-slate-500">
                    (
                    {r.product.jenisBunga === "Berjenjang"
                      ? "Step-Up"
                      : r.product.jenisBunga === "Single Rate"
                        ? "Flat"
                        : `Fix ${r.product.masaFix} Th`}
                    )
                  </span>
                </td>
              ))}
            </tr>

            {/* Row 6: Initial Monthly Payment */}
            <tr className="even:bg-slate-50/70">
              <td className="px-3 py-1 font-semibold text-slate-700 border-r border-slate-200">
                Initial Monthly Payment
              </td>
              {results.map((r) => (
                <td
                  key={r.product.kode}
                  className="px-2.5 py-1 text-right font-extrabold text-slate-900 border-r border-slate-200 last:border-r-0"
                >
                  {formatIDRFull(r.fixPeriodMonthlyInstallment)}
                </td>
              ))}
            </tr>

            {/* Row 7: Est. Total Jika Pindah / Total Bayar */}
            <tr className="even:bg-slate-50/70">
              <td className="px-3 py-1 font-semibold text-slate-700 border-r border-slate-200">
                {input.kprType === "Take Over"
                  ? "Est. Total Jika Pindah"
                  : `Total Bayar (${input.tenorYears} Th)`}
              </td>
              {results.map((r) => {
                const s = r.savings;
                return (
                  <td
                    key={r.product.kode}
                    className="px-2.5 py-1 text-right font-medium text-slate-800 border-r border-slate-200 last:border-r-0"
                  >
                    {input.kprType === "Take Over" && s
                      ? formatIDRFull(s.newTotalPayment)
                      : formatIDRFull(r.totalInstallmentAll)}
                  </td>
                );
              })}
            </tr>

            {/* Row 8: Total Net Savings / Hemat Bulanan (Highlight Row) */}
            <tr className="bg-slate-100 font-extrabold text-[#0B2545] border-t-2 border-slate-300">
              <td className="px-3 py-1.5 uppercase tracking-wide text-[9px] border-r border-slate-300">
                {input.kprType === "Take Over" &&
                results.some((r) => r.savings && r.savings.totalSaved > 0)
                  ? "Total Net Savings"
                  : input.kprType === "Take Over"
                    ? "Hemat Beban Bulanan"
                    : "Total Bayar"}
              </td>
              {results.map((r) => {
                const s = r.savings;
                const isSaved = s && s.totalSaved > 0;
                const monthlySaved =
                  (input.currentMonthlyInstallment || 0) -
                  r.fixPeriodMonthlyInstallment;
                const isMonthlyCheaper = monthlySaved > 0;

                let displaySavings = formatIDRFull(r.totalInstallmentAll);
                if (input.kprType === "Take Over" && s) {
                  if (isSaved) {
                    displaySavings = `Hemat ${formatIDRFull(s.totalSaved)}`;
                  } else if (isMonthlyCheaper) {
                    displaySavings = `Hemat ${formatIDRFull(monthlySaved)}/bln`;
                  } else {
                    displaySavings = `+${formatIDRFull(Math.abs(s.totalSaved))}`;
                  }
                }

                return (
                  <td
                    key={r.product.kode}
                    className="px-2.5 py-1.5 text-right font-black text-[9.5px] border-r border-slate-300 last:border-r-0 text-emerald-800"
                  >
                    {displaySavings}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 2: Side-by-Side Annual Schedule Table (If enabled) */}
      {visibility.showUnifiedSchedulePrint && (
        <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-xs">
          <div className="px-3 py-1 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-[9px]">
              Perbandingan Jadwal Angsuran Tahunan (Side-by-Side 3 Opsi Program)
            </h3>
            <span className="text-[7px] font-medium text-slate-500">
              Simulasi s.d Lunas
            </span>
          </div>

          <table className="w-full text-[8px] border-collapse">
            <thead>
              <tr className="bg-slate-200 text-slate-900 border-b border-slate-300 font-bold">
                <th className="p-1 text-left border-r border-slate-300 w-12">
                  Tahun
                </th>
                {results.map((r, i) => (
                  <th
                    key={r.product.kode}
                    className="p-1 text-center border-r border-slate-300 last:border-r-0"
                    colSpan={2}
                  >
                    <div className="font-bold text-slate-900 text-[8.5px]">
                      {visibility.maskBankNames ? `Option ${i + 1}` : r.product.bank}
                    </div>
                    <span className="text-[7px] text-slate-500 font-normal block truncate max-w-[130px] mx-auto">
                      {visibility.maskBankNames
                        ? `Program KPR Opsi ${i + 1}`
                        : r.product.nama}
                    </span>
                  </th>
                ))}
              </tr>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-300 text-[7px] font-semibold">
                <th className="p-0.5 text-left border-r border-slate-300">
                  Periode
                </th>
                {results.map((r) => (
                  <React.Fragment key={r.product.kode}>
                    <th className="p-0.5 text-right border-r border-slate-200">
                      Bunga
                    </th>
                    <th className="p-0.5 text-right border-r border-slate-300 last:border-r-0">
                      Cicilan/Bln
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(() => {
                const isLongTenor = input.tenorYears > 10;
                const maxRows = 9;
                const visibleCount = isLongTenor ? maxRows : Math.min(input.tenorYears, 10);

                return (
                  <>
                    {Array.from({ length: visibleCount }).map((_, yIdx) => {
                      const year = yIdx + 1;
                      return (
                        <tr key={year} className="even:bg-slate-50/70">
                          <td className="p-0.5 font-bold text-slate-900 border-r border-slate-300">
                            Thn {year}
                          </td>
                          {results.map((r) => {
                            const schedule = r.yearlySchedule[yIdx];
                            if (!schedule) {
                              return (
                                <td
                                  key={r.product.kode}
                                  colSpan={2}
                                  className="p-0.5 text-center text-slate-400 border-r border-slate-300"
                                >
                                  -
                                </td>
                              );
                            }
                            return (
                              <React.Fragment key={r.product.kode}>
                                <td className="p-0.5 text-right font-semibold text-slate-800 border-r border-slate-200">
                                  {formatPercent(schedule.rate)}
                                </td>
                                <td className="p-0.5 text-right font-bold text-slate-900 border-r border-slate-300 last:border-r-0">
                                  {formatIDRFull(schedule.monthlyInstallment)}
                                </td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })}

                    {isLongTenor && (
                      <tr className="bg-amber-50/60 font-semibold text-slate-900 border-t border-slate-300">
                        <td className="p-0.5 font-bold text-slate-800 border-r border-slate-300 text-[7px]">
                          Thn {maxRows + 1}-{input.tenorYears} (Float)
                        </td>
                        {results.map((r) => {
                          const lastSchedule = r.yearlySchedule[r.yearlySchedule.length - 1];
                          return (
                            <React.Fragment key={r.product.kode}>
                              <td className="p-0.5 text-right font-bold text-amber-900 border-r border-slate-200">
                                {formatPercent(r.floatingRate)}
                              </td>
                              <td className="p-0.5 text-right font-bold text-slate-900 border-r border-slate-300 last:border-r-0">
                                {formatIDRFull(lastSchedule?.monthlyInstallment || 0)}
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    )}
                  </>
                );
              })()}
            </tbody>
            <tfoot>
              <tr className="bg-slate-200 font-bold border-t border-slate-300 text-[8px]">
                <td className="p-1 text-slate-900 border-r border-slate-300">
                  Total Bayar
                </td>
                {results.map((r) => (
                  <td
                    key={r.product.kode}
                    colSpan={2}
                    className="p-1 text-right text-slate-900 font-extrabold border-r border-slate-300 last:border-r-0"
                  >
                    {formatIDRFull(r.totalInstallmentAll)}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Official NOTE & 6 Biaya Bank */}
      <div className="bg-slate-50 rounded-xl border border-slate-300 p-2 space-y-1 text-[7.5px] text-slate-700 print:break-inside-avoid shadow-2xs">
        <div className="flex items-center justify-between pb-0.5 border-b border-slate-200">
          <span className="font-extrabold text-[#0B2545] text-[8px] tracking-wide uppercase flex items-center gap-1">
            <Info className="w-2.5 h-2.5 text-[#0B2545]" />
            <span>NOTE / CATATAN PENTING:</span>
          </span>
          <span className="text-[7px] text-slate-500 font-medium">
            Ketentuan Resmi Perbankan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 leading-tight">
          <div className="space-y-0.5">
            <div className="flex items-start gap-1">
              <span className="text-[#FF5A00] font-bold shrink-0">•</span>
              <span>
                Tabel angsuran diatas hanya berupa <strong>simulasi</strong>
                , suku bunga fixed dan floating bisa berubah sesuai
                ketentuan Bank.
              </span>
            </div>
            <div className="flex items-start gap-1">
              <span className="text-[#FF5A00] font-bold shrink-0">•</span>
              <span>
                Ketentuan suku bunga floating mengacu pada kebijakan
                masing-masing bank rekanan.
              </span>
            </div>
          </div>

          <div className="bg-white p-1 rounded-lg border border-slate-200 space-y-0.5">
            <span className="font-bold text-slate-800 block text-[7px]">
              Estimasi Biaya Bank yang Dikeluarkan:
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px] text-slate-600">
              <div>1. Biaya Appraisal (dimuka)</div>
              <div>4. Biaya Asuransi Jiwa</div>
              <div>2. Biaya Provisi 1% Plafond</div>
              <div>5. Biaya Asuransi Kebakaran</div>
              <div>3. Biaya Administrasi Bank</div>
              <div>6. Biaya Notaris & APHT</div>
            </div>
          </div>
        </div>

        {/* Official Rumah123 Footer Strip with Logo */}
        <div className="pt-1 border-t border-slate-200 flex items-center justify-between">
          <Rumah123Logo variant="full" withTagline={true} size="sm" />
          <div className="text-right text-[7px] text-slate-400">
            <span className="font-semibold text-slate-700">
              Rumah123 Mortgage
            </span>{" "}
            | Dokumen Simulasi Resmi | www.rumah123.com/kpr
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 print:bg-white print:pb-0">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/calculator"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Kembali</span>
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
            {/* Cetak / Simpan PDF CTA */}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-[#00438F] hover:bg-[#003366] active:bg-[#092147] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              title="Cetak atau Simpan sebagai PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <CompareContent />
        </Suspense>
      </div>
    </div>
  );
}
