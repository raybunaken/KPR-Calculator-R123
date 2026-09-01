"use client";

import { useState, useEffect } from "react";
import {
  Calculator,
  ChevronDown,
  Info,
  Wallet,
  Landmark,
  Home,
  ArrowRightLeft,
} from "lucide-react";
import type {
  LoanInput,
  KPRType,
  EmploymentStatus,
  LoanType,
  ReadyDana,
} from "@/lib/types";
import { KPR_TYPE_LABELS, EMPLOYMENT_LABELS, AREA_OPTIONS } from "@/lib/types";
import { formatIDRFull, calculateMonthlyInstallment } from "@/lib/calculator";

interface LoanFormProps {
  onCalculate: (input: LoanInput) => void;
  isCalculating: boolean;
}

const DEFAULT_FORM = {
  kprType: "Take Over" as KPRType,
  loanType: "Bebas" as LoanType,
  employmentStatus: "Karyawan Tetap" as EmploymentStatus,
  area: "Jabodetabek",
  readyDana: "Ya" as ReadyDana,
  propertyPrice: 1_000_000_000,
  dpPercent: 0.15,
  tenorYears: 20,
  monthlyIncome: 30_000_000,
  // Take over defaults
  currentOutstanding: 500_000_000,
  currentRemainingTenorMonths: 120,
  currentMonthlyInstallment: 7_465_537,
  estimatedPenaltyPercent: 0.05,
  topUp: 0,
  // Savings
  calculateSavings: true,
  oldKprType: "Floating" as
    "Floating" | "Fixed -> Floating" | "Berjenjang -> Floating" | "Single Rate",
  oldCurrentRate: "5",
  oldRemainingFixMonths: "12",
  oldTier2Rate: "7",
  oldTier2Months: "24",
  oldFloatingRate: "13",
};

export default function LoanForm({
  onCalculate,
  isCalculating,
}: LoanFormProps) {
  const [form, setForm] = useState(DEFAULT_FORM);

  const isTO = form.kprType === "Take Over";
  const dpAmount = form.propertyPrice * form.dpPercent;
  const biayaTakeOver = isTO ? form.currentOutstanding * 0.05 : 0;
  const basePlafondTO =
    form.currentOutstanding + (form.readyDana === "Tidak" ? biayaTakeOver : 0);

  const plafond = isTO ? basePlafondTO : form.propertyPrice - dpAmount;

  const mathFloatingInstallment = calculateMonthlyInstallment(
    form.currentOutstanding,
    (parseFloat(form.oldFloatingRate) || 13) / 100,
    form.currentRemainingTenorMonths,
  );

  // Auto-sync currentMonthlyInstallment if oldKprType is "Floating"
  useEffect(() => {
    if (isTO && form.calculateSavings && form.oldKprType === "Floating") {
      const rate = (parseFloat(form.oldFloatingRate) || 13) / 100;
      if (form.currentOutstanding > 0 && form.currentRemainingTenorMonths > 0) {
        const autoInst = calculateMonthlyInstallment(
          form.currentOutstanding,
          rate,
          form.currentRemainingTenorMonths,
        );
        setForm((f) => ({
          ...f,
          currentMonthlyInstallment: Math.round(autoInst),
        }));
      }
    }
  }, [
    isTO,
    form.calculateSavings,
    form.oldKprType,
    form.currentOutstanding,
    form.currentRemainingTenorMonths,
    form.oldFloatingRate,
  ]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: LoanInput = {
      employmentStatus: form.employmentStatus,
      monthlyIncome: form.monthlyIncome,
      kprType: form.kprType,
      loanType: form.loanType,
      propertyPrice: form.propertyPrice,
      dpPercent: form.dpPercent,
      plafond: plafond,
      topUp: isTO ? form.topUp : 0,
      tenorYears: form.tenorYears,
      area: form.area,
      readyDana: form.readyDana,
      ...(isTO && {
        currentOutstanding: form.currentOutstanding,
        currentRemainingTenorMonths: form.currentRemainingTenorMonths,
        currentMonthlyInstallment:
          form.calculateSavings && form.oldKprType === "Floating"
            ? Math.round(mathFloatingInstallment)
            : form.currentMonthlyInstallment,
        estimatedPenaltyPercent: form.estimatedPenaltyPercent,
        calculateSavings: form.calculateSavings,
        oldKpr: form.calculateSavings
          ? {
              type: form.oldKprType,
              currentRate: (parseFloat(form.oldCurrentRate) || 0) / 100,
              remainingFixMonths: parseInt(form.oldRemainingFixMonths) || 0,
              tier2Rate:
                form.oldKprType === "Berjenjang -> Floating"
                  ? (parseFloat(form.oldTier2Rate) || 0) / 100
                  : undefined,
              tier2Months:
                form.oldKprType === "Berjenjang -> Floating"
                  ? parseInt(form.oldTier2Months) || 0
                  : undefined,
              floatingRate: (parseFloat(form.oldFloatingRate) || 0) / 100,
            }
          : undefined,
      }),
    };
    onCalculate(input);
  }

  // Hanya tampilkan Secondary dan Take Over
  const visibleKprTypes: KPRType[] = ["KPR Secondary", "Take Over"];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col lg:max-h-[calc(100vh-5.5rem)]"
    >
      {/* Header (Pinned) with Dark Navy and Subtle Teal Curve */}
      <div className="bg-[#0B2545] px-5 py-3.5 shrink-0 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-teal-400/20 pointer-events-none" />
        <div className="flex items-center justify-between text-white relative z-10">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-teal-300" />
            <div>
              <h2 className="font-bold text-xs sm:text-sm leading-tight text-white">
                Parameter Simulasi
              </h2>
              <p className="text-[10px] text-blue-200">
                by Tim Mortgage Rumah123
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-white/15 border border-white/20 text-white px-2 py-0.5 rounded-full font-bold">
            {form.kprType}
          </span>
        </div>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4.5 overscroll-contain">
        {/* Tipe KPR */}
        <div>
          <Label>Tipe KPR</Label>
          <div className="grid grid-cols-2 gap-2">
            {visibleKprTypes.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setForm((f) => ({ ...f, kprType: k }))}
                className={`p-2.5 rounded-xl border transition-all text-xs font-medium flex items-center justify-center gap-2 ${
                  form.kprType === k
                    ? "border-[#0B2545] bg-[#0B2545]/5 text-[#0B2545] font-bold shadow-xs ring-1 ring-[#0B2545]/15"
                    : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {k === "KPR Secondary" && (
                  <Home className="w-4 h-4 text-[#0B2545]" />
                )}
                {k === "Take Over" && (
                  <ArrowRightLeft className="w-4 h-4 text-[#0B2545]" />
                )}
                <span>{KPR_TYPE_LABELS[k]}</span>
              </button>
            ))}
          </div>
        </div>

        <Divider />

        {/* KPR Normal: harga & DP */}
        {!isTO && (
          <>
            <div>
              <Label>Harga Properti</Label>
              <CurrencyInput
                value={form.propertyPrice}
                onChange={(v) => setForm((f) => ({ ...f, propertyPrice: v }))}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>Down Payment (DP)</Label>
                <span className="text-blue-600 font-semibold text-sm">
                  {(form.dpPercent * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={form.dpPercent * 100}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    dpPercent: parseInt(e.target.value) / 100,
                  }))
                }
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5%</span>
                <span className="text-gray-600 font-medium">
                  {formatIDRFull(dpAmount)}
                </span>
                <span>50%</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-gray-500">Plafond KPR: </span>
                <span className="font-semibold text-gray-800">
                  {formatIDRFull(plafond)}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Take Over fields */}
        {isTO && (
          <>
            <div>
              <Label>Sisa Outstanding (Hutang Saat Ini)</Label>
              <CurrencyInput
                value={form.currentOutstanding}
                onChange={(v) =>
                  setForm((f) => ({ ...f, currentOutstanding: v }))
                }
              />
            </div>

            {/* Top Up Field */}
            <div>
              <Label>Top Up Dana (Opsional)</Label>
              <CurrencyInput
                value={form.topUp}
                onChange={(v) => setForm((f) => ({ ...f, topUp: v }))}
              />
            </div>

            {/* Ready Dana for Biaya Take Over */}
            <div>
              <Label>Status Dana (Biaya Take Over 5%)</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {(["Ya", "Tidak"] as ReadyDana[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, readyDana: r }))}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      form.readyDana === r
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-2xs"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {r === "Ya" ? (
                      <>
                        <Wallet className="w-3.5 h-3.5" /> Ready Dana (Cash)
                      </>
                    ) : (
                      <>
                        <Landmark className="w-3.5 h-3.5" /> Masuk ke Plafond
                      </>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2.5 p-3 bg-blue-50/40 rounded-xl border border-blue-100/70 text-xs space-y-1.5">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Biaya Take Over (5%):</span>
                  <span className="font-semibold text-orange-600">
                    {formatIDRFull(biayaTakeOver)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-blue-100/60">
                  <span className="text-gray-600 font-medium">
                    Total Plafond Baru:
                  </span>
                  <span className="font-bold text-blue-700">
                    {formatIDRFull(basePlafondTO + form.topUp)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label>Cicilan Saat Ini</Label>
                  {isTO && form.calculateSavings && form.oldKprType === "Floating" && (
                    <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                      Auto ({form.oldFloatingRate || "13"}%)
                    </span>
                  )}
                </div>
                <CurrencyInput
                  value={form.currentMonthlyInstallment}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, currentMonthlyInstallment: v }))
                  }
                />
              </div>
              <div>
                <Label>Sisa Tenor (Bulan)</Label>
                <input
                  type="number"
                  min={1}
                  max={360}
                  value={
                    form.currentRemainingTenorMonths === 0
                      ? ""
                      : form.currentRemainingTenorMonths
                  }
                  onChange={(e) => {
                    const rawVal = e.target.value;
                    const months =
                      rawVal === "" ? 0 : parseInt(rawVal, 10) || 0;
                    const years = Math.max(1, Math.round(months / 12));
                    setForm((f) => ({
                      ...f,
                      currentRemainingTenorMonths: months,
                      tenorYears: years,
                    }));
                  }}
                  className={inputCls}
                  placeholder="Contoh: 120"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>Est. Penalti Pelunasan</Label>
                <span className="text-orange-600 font-semibold text-xs bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                  {(form.estimatedPenaltyPercent * 100).toFixed(0)}% (
                  {formatIDRFull(
                    form.currentOutstanding * form.estimatedPenaltyPercent,
                  )}
                  )
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={form.estimatedPenaltyPercent * 100}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    estimatedPenaltyPercent: parseInt(e.target.value) / 100,
                  }))
                }
                className="w-full accent-orange-500 mt-1"
              />
            </div>

            {/* Savings Calculation Section */}
            <div
              className={`p-4 rounded-xl border transition-all ${form.calculateSavings ? "bg-blue-50/40 border-blue-200" : "bg-gray-50/70 border-gray-200"}`}
            >
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.calculateSavings}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      calculateSavings: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer accent-blue-600"
                />
                <div>
                  <span className="font-semibold text-gray-800 text-xs">
                    Hitung Detail Penghematan
                  </span>
                  <p className="text-[11px] text-gray-500">
                    Bandingkan total bayar lama vs bank baru
                  </p>
                </div>
              </label>

              {form.calculateSavings && (
                <div className="mt-3.5 pt-3.5 border-t border-blue-100 space-y-3.5 animate-in fade-in slide-in-from-top-1">
                  <div>
                    <Label>Skema Bunga Bank Lama</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-1">
                      {[
                        { id: "Floating", label: "Sudah Floating" },
                        { id: "Fixed -> Floating", label: "Promo (Fix)" },
                        { id: "Berjenjang -> Floating", label: "Berjenjang" },
                        { id: "Single Rate", label: "Flat (Tetap)" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            setForm((f) => ({ ...f, oldKprType: t.id as any }))
                          }
                          className={`p-2 rounded-lg border text-[11px] transition-all font-medium text-center ${
                            form.oldKprType === t.id
                              ? "border-blue-500 bg-white text-blue-700 font-bold shadow-xs ring-1 ring-blue-500"
                              : "border-gray-200 bg-white/70 text-gray-600 hover:bg-white"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 1. Sudah Floating: Manual Floating Rate Input */}
                  {form.oldKprType === "Floating" && (
                    <div className="space-y-2.5">
                      <div>
                        <Label>Suku Bunga Floating Saat Ini (%)</Label>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={form.oldFloatingRate}
                          onChange={(e) => {
                            const newRate = e.target.value;
                            const newMathInst = calculateMonthlyInstallment(
                              form.currentOutstanding,
                              (parseFloat(newRate) || 13) / 100,
                              form.currentRemainingTenorMonths,
                            );
                            setForm((f) => ({
                              ...f,
                              oldFloatingRate: newRate,
                              currentMonthlyInstallment:
                                Math.round(newMathInst),
                            }));
                          }}
                          className={`${inputCls} px-2.5 py-1.5`}
                          placeholder="Contoh: 11, 12, atau 13.5"
                        />
                      </div>
                      <div className="text-[11px] text-blue-900 bg-white p-2.5 rounded-lg border border-blue-100/80 leading-relaxed flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span>Estimasi Cicilan Bank Lama:</span>
                          <span className="font-extrabold text-blue-700">
                            {formatIDRFull(Math.round(mathFloatingInstallment))}
                            /bln
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500">
                          Dihitung otomatis dari sisa hutang{" "}
                          {formatIDRFull(form.currentOutstanding)} (
                          {form.currentRemainingTenorMonths} bulan) pada bunga{" "}
                          {form.oldFloatingRate || "13"}%.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 2. Promo (Fix) Mau Habis */}
                  {form.oldKprType === "Fixed -> Floating" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Sisa Fix (Bln)</Label>
                        <input
                          type="number"
                          min={1}
                          max={360}
                          value={form.oldRemainingFixMonths}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldRemainingFixMonths: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                      <div>
                        <Label>Bunga Saat Ini (%)</Label>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={form.oldCurrentRate}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldCurrentRate: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                      <div className="col-span-2 pt-1 border-t border-blue-100/80">
                        <Label>Est. Bunga Floating Nanti (%)</Label>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={form.oldFloatingRate}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldFloatingRate: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. Berjenjang (Step-Up) */}
                  {form.oldKprType === "Berjenjang -> Floating" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Sisa Fix (Bln)</Label>
                        <input
                          type="number"
                          min={1}
                          max={360}
                          value={form.oldRemainingFixMonths}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldRemainingFixMonths: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                      <div>
                        <Label>Bunga Saat Ini (%)</Label>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={form.oldCurrentRate}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldCurrentRate: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                      <div className="col-span-2 pt-1 border-t border-blue-100/80">
                        <span className="text-[11px] font-semibold text-blue-800">
                          Jenjang Selanjutnya (Tier 2)
                        </span>
                      </div>
                      <div>
                        <Label>Durasi (Bln)</Label>
                        <input
                          type="number"
                          min={1}
                          max={360}
                          value={form.oldTier2Months}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldTier2Months: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                      <div>
                        <Label>Bunga Tier 2 (%)</Label>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={form.oldTier2Rate}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldTier2Rate: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                      <div className="col-span-2 pt-1 border-t border-blue-100/80">
                        <Label>Est. Bunga Floating Nanti (%)</Label>
                        <input
                          type="number"
                          step="0.01"
                          min={0}
                          value={form.oldFloatingRate}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              oldFloatingRate: e.target.value,
                            }))
                          }
                          className={`${inputCls} px-2.5 py-1.5`}
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. Flat / Single Rate */}
                  {form.oldKprType === "Single Rate" && (
                    <div className="text-[11px] text-blue-700 bg-white p-2.5 rounded-lg border border-blue-100/80 leading-relaxed">
                      Cicilan saat ini (
                      {formatIDRFull(form.currentMonthlyInstallment)}) akan
                      disimulasikan flat hingga sisa tenor habis tanpa lonjakan
                      floating.
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <Divider />

        {/* Tenor */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label>Tenor KPR Baru</Label>
            <div className="flex items-center gap-2">
              {isTO &&
                form.currentRemainingTenorMonths > 0 &&
                form.tenorYears !==
                  Math.round(form.currentRemainingTenorMonths / 12) && (
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        tenorYears: Math.max(
                          1,
                          Math.round(form.currentRemainingTenorMonths / 12),
                        ),
                      }))
                    }
                    className="text-[10px] text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded font-medium border border-blue-200"
                    title="Klik untuk menyamakan tenor dengan sisa pinjaman lama"
                  >
                    Samakan ({Math.round(form.currentRemainingTenorMonths / 12)}{" "}
                    th)
                  </button>
                )}
              <span className="text-blue-600 font-semibold text-sm">
                {form.tenorYears} tahun
              </span>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={form.tenorYears}
            onChange={(e) =>
              setForm((f) => ({ ...f, tenorYears: parseInt(e.target.value) }))
            }
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            {[5, 10, 15, 20, 25, 30].map((t) => (
              <span key={t}>{t}th</span>
            ))}
          </div>
        </div>
      </div>

      {/* Submit (Pinned Bottom) */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-10">
        <button
          type="submit"
          disabled={isCalculating}
          className="w-full bg-[#0B2545] hover:bg-[#071E3D] active:bg-[#041226] disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow cursor-pointer"
        >
          {isCalculating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Menghitung...</span>
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 text-teal-300" />
              <span>Hitung Simulasi KPR</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-gray-700 mb-1.5">{children}</p>;
}

function Divider() {
  return <hr className="border-gray-100" />;
}

const inputCls =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545] transition-all";

function CurrencyInput({
  value,
  onChange,
  placeholder = "0",
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  const displayValue = value ? new Intl.NumberFormat("id-ID").format(value) : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    if (!rawVal) {
      onChange(0);
      return;
    }
    const parsed = parseInt(rawVal, 10);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium select-none pointer-events-none">
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        className={`${inputCls} pl-10`}
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} appearance-none pr-8`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
