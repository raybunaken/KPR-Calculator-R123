// lib/calculator.ts
// Core KPR amortization calculation engine

import type {
  BankProduct,
  LoanInput,
  SimulationResult,
  YearlyAmortization,
} from "./types";

/**
 * Calculate monthly installment using annuity formula:
 * M = P * r(1+r)^n / ((1+r)^n - 1)
 */
export function calculateMonthlyInstallment(
  principal: number,
  annualRate: number,
  tenorMonths: number,
): number {
  if (principal <= 0 || tenorMonths <= 0) return 0;
  if (annualRate === 0) return principal / tenorMonths;
  const r = annualRate / 12;
  const n = tenorMonths;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

/**
 * Main simulation for a single product with tiered/berjenjang rate support
 */
export function simulateProduct(
  product: BankProduct,
  input: LoanInput,
): SimulationResult {
  const plafond = input.plafond + (input.topUp || 0);
  const tenorYears = input.tenorYears;

  // Build rate schedule: one rate per year for full tenor
  const rateSchedule: number[] = [];
  for (let y = 0; y < tenorYears; y++) {
    if (y < product.rates.length) {
      rateSchedule.push(product.rates[y]);
    } else {
      // Beyond defined rates → floating (last rate)
      rateSchedule.push(product.rates[product.rates.length - 1]);
    }
  }

  const floatingRate = rateSchedule[rateSchedule.length - 1];
  const yearlySchedule: YearlyAmortization[] = [];
  let currentOutstanding = plafond;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let fixPeriodMonthlyInstallment = 0;
  let floatingMonthlyInstallment = 0;
  let totalInstallmentFixPeriod = 0;
  let totalInstallmentAll = 0;

  let y = 0;
  while (y < tenorYears && currentOutstanding > 1) {
    const currentRate = rateSchedule[y];

    // Find end of this same-rate period
    let periodEnd = y;
    while (
      periodEnd < tenorYears - 1 &&
      rateSchedule[periodEnd + 1] === currentRate
    ) {
      periodEnd++;
    }
    const periodYears = periodEnd - y + 1;
    const remainingTenorMonths = (tenorYears - y) * 12;

    // Calculate installment based on current outstanding & remaining tenor
    const monthlyInstallment = calculateMonthlyInstallment(
      currentOutstanding,
      currentRate,
      remainingTenorMonths,
    );

    if (y === 0) fixPeriodMonthlyInstallment = monthlyInstallment;
    if (y + periodYears >= tenorYears)
      floatingMonthlyInstallment = monthlyInstallment;

    // Process each year in this rate period
    for (let py = 0; py < periodYears; py++) {
      if (currentOutstanding <= 1) break;
      const yearOutstandingStart = currentOutstanding;
      let yearInterest = 0;
      let yearPrincipal = 0;
      const r = currentRate / 12;

      for (let m = 0; m < 12; m++) {
        if (currentOutstanding <= 1) break;
        const interestPayment = currentOutstanding * r;
        const principalPayment = Math.min(
          monthlyInstallment - interestPayment,
          currentOutstanding,
        );
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;
        currentOutstanding -= principalPayment;
      }

      const yearTotal = monthlyInstallment * 12;
      totalInterestPaid += yearInterest;
      totalPrincipalPaid += yearPrincipal;
      totalInstallmentAll += yearTotal;

      const yearNum = y + py + 1;
      if (yearNum <= product.masaFix) {
        totalInstallmentFixPeriod += yearTotal;
      }

      yearlySchedule.push({
        year: yearNum,
        rate: currentRate,
        monthlyInstallment,
        outstandingStart: yearOutstandingStart,
        outstandingEnd: Math.max(0, currentOutstanding),
        totalInterestPaid: yearInterest,
        totalPrincipalPaid: yearPrincipal,
        totalPaid: yearTotal,
      });
    }

    y += periodYears;
  }

  let savings: SimulationResult["savings"] = undefined;

  if (
    input.calculateSavings &&
    input.kprType === "Take Over" &&
    input.currentOutstanding &&
    input.currentRemainingTenorMonths &&
    input.currentMonthlyInstallment &&
    input.oldKpr
  ) {
    const remainingTenor = input.currentRemainingTenorMonths;
    const oldInst = input.currentMonthlyInstallment;

    let oldTotalPayment = 0;
    let oldFloatingInst: number | undefined = undefined;

    if (input.oldKpr.type === "Single Rate") {
      oldTotalPayment = oldInst * remainingTenor;
    } else if (input.oldKpr.type === "Floating") {
      const floatRate = input.oldKpr.floatingRate || 0.13;
      oldFloatingInst = calculateMonthlyInstallment(
        input.currentOutstanding,
        floatRate,
        remainingTenor,
      );
      oldTotalPayment = oldFloatingInst * remainingTenor;
    } else if (input.oldKpr.type === "Fixed -> Floating") {
      let balance = input.currentOutstanding;
      const fixMonths = input.oldKpr.remainingFixMonths || 0;
      const fixRate = input.oldKpr.currentRate || 0.05;

      const actualFixMonths = Math.min(fixMonths, remainingTenor);
      oldTotalPayment += oldInst * actualFixMonths;

      for (let i = 0; i < actualFixMonths; i++) {
        const interest = balance * (fixRate / 12);
        const principal = oldInst - interest;
        balance -= principal;
      }

      const floatMonths = remainingTenor - actualFixMonths;
      if (floatMonths > 0) {
        const floatRate = input.oldKpr.floatingRate || 0.13;
        oldFloatingInst = calculateMonthlyInstallment(
          balance,
          floatRate,
          floatMonths,
        );
        oldTotalPayment += oldFloatingInst * floatMonths;
      }
    } else if (input.oldKpr.type === "Berjenjang -> Floating") {
      let balance = input.currentOutstanding;
      const fix1Months = input.oldKpr.remainingFixMonths || 0;
      const fix1Rate = input.oldKpr.currentRate || 0.05;
      const tier2Months = input.oldKpr.tier2Months || 0;
      const tier2Rate = input.oldKpr.tier2Rate || 0.07;
      const floatRate = input.oldKpr.floatingRate || 0.13;

      let currentMonth = 0;

      // Phase 1: Tier 1 (Current Rate)
      const actualFix1 = Math.min(fix1Months, remainingTenor);
      oldTotalPayment += oldInst * actualFix1;
      for (let i = 0; i < actualFix1; i++) {
        const interest = balance * (fix1Rate / 12);
        balance -= oldInst - interest;
      }
      currentMonth += actualFix1;

      // Phase 2: Tier 2
      if (currentMonth < remainingTenor && tier2Months > 0) {
        const actualTier2 = Math.min(
          tier2Months,
          remainingTenor - currentMonth,
        );
        const tier2Inst = calculateMonthlyInstallment(
          balance,
          tier2Rate,
          remainingTenor - currentMonth,
        );
        oldTotalPayment += tier2Inst * actualTier2;
        for (let i = 0; i < actualTier2; i++) {
          const interest = balance * (tier2Rate / 12);
          balance -= tier2Inst - interest;
        }
        currentMonth += actualTier2;
      }

      // Phase 3: Floating
      if (currentMonth < remainingTenor) {
        const floatMonths = remainingTenor - currentMonth;
        oldFloatingInst = calculateMonthlyInstallment(
          balance,
          floatRate,
          floatMonths,
        );
        oldTotalPayment += oldFloatingInst * floatMonths;
      }
    }

    // New total out of pocket
    // If readyDana == 'Tidak', biayaTakeOver is in plafond, so it's already in totalInstallmentAll (with interest!)
    // If readyDana == 'Ya', biayaTakeOver is paid cash out of pocket now.
    const biayaTakeOver = input.currentOutstanding * 0.05;
    const newTotalPayment =
      totalInstallmentAll + (input.readyDana === "Ya" ? biayaTakeOver : 0);

    savings = {
      oldTotalPayment,
      newTotalPayment,
      grossSavings: oldTotalPayment - totalInstallmentAll,
      takeOverFee: biayaTakeOver,
      totalSaved: oldTotalPayment - newTotalPayment,
      monthlySavedFix:
        (input.oldKpr.type === "Floating"
          ? oldFloatingInst || oldInst
          : oldInst) - fixPeriodMonthlyInstallment,
      oldFloatingInstallment: oldFloatingInst,
    };
  }

  return {
    product,
    tenorYears,
    plafond,
    fixPeriodMonthlyInstallment,
    floatingMonthlyInstallment,
    floatingRate,
    totalInstallmentFixPeriod,
    totalInstallmentAll,
    totalInterest: totalInterestPaid,
    totalPrincipal: totalPrincipalPaid,
    yearlySchedule,
    isEligible: true,
    ineligibilityReasons: [],
    savings,
  };
}

/** Format currency in IDR (Short for large numbers, exact for detailed views) */
export function formatIDR(amount: number): string {
  if (amount >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "");
    return `Rp ${val} M`;
  }
  if (amount >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(2).replace(/\.?0+$/, "");
    return `Rp ${val} Jt`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format currency full */
export function formatIDRFull(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format percentage without loss of precision */
export function formatPercent(rate: number, decimals = 2): string {
  if (rate === undefined || rate === null || isNaN(rate)) return "0%";
  const val = rate * 100;
  const str = parseFloat(val.toFixed(decimals)).toString();
  return `${str}%`;
}

/** Parse IDR string to number */
export function parseIDR(value: string): number {
  return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
}

/** Maximum installment based on 35% of income rule */
export function maxInstallmentFromIncome(monthlyIncome: number): number {
  return monthlyIncome * 0.35;
}

/** Minimum income needed for a given installment */
export function minIncomeForInstallment(monthlyInstallment: number): number {
  return monthlyInstallment / 0.35;
}

/** cn helper for tailwind class merging */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RateTier {
  startYear: number;
  endYear: number;
  rate: number;
  monthlyInstallment: number;
  type: "Fix" | "Float";
}

/** Extract distinct rate tiers and installments from yearly schedule */
export function extractRateTiers(
  yearlySchedule: YearlyAmortization[],
  masaFix: number,
): RateTier[] {
  if (!yearlySchedule || yearlySchedule.length === 0) return [];
  const tiers: RateTier[] = [];

  let currentTier: RateTier = {
    startYear: yearlySchedule[0].year,
    endYear: yearlySchedule[0].year,
    rate: yearlySchedule[0].rate,
    monthlyInstallment: yearlySchedule[0].monthlyInstallment,
    type: yearlySchedule[0].year <= masaFix ? "Fix" : "Float",
  };

  for (let i = 1; i < yearlySchedule.length; i++) {
    const row = yearlySchedule[i];
    const isFix = row.year <= masaFix;
    const sameRate = Math.abs(row.rate - currentTier.rate) < 0.0001;
    const sameType =
      (isFix && currentTier.type === "Fix") ||
      (!isFix && currentTier.type === "Float");

    if (sameRate && sameType) {
      currentTier.endYear = row.year;
    } else {
      tiers.push(currentTier);
      currentTier = {
        startYear: row.year,
        endYear: row.year,
        rate: row.rate,
        monthlyInstallment: row.monthlyInstallment,
        type: isFix ? "Fix" : "Float",
      };
    }
  }
  tiers.push(currentTier);
  return tiers;
}
