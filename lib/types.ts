// lib/types.ts
// TypeScript type definitions for KPR Calculator

export type KPRType =
  "KPR Primary" | "KPR Secondary" | "Take Over" | "Multiguna";
export type EmploymentStatus =
  "Karyawan Tetap" | "Karyawan Kontrak" | "Pengusaha" | "TNI/Polri";
export type LoanType = "Syariah" | "Bebas";
export type ReadyDana = "Ya" | "Tidak";

export interface BankProduct {
  no: number;
  bank: string;
  tipe: KPRType;
  kode: string;
  nama: string;
  minPlafond: number;
  maxPlafond: number;
  dpMin: number; // as decimal, e.g. 0.10 = 10%
  minTenor: number; // in years
  maxTenor: number; // in years
  masaFix: number; // fixed rate period in years
  rates: number[]; // annual interest rates per year (decimal), e.g. [0.0399, 0.0399, 0.0399, 0.11, ...]
  syariah: boolean;
  jenisBunga: "Fixed" | "Berjenjang" | "Single Rate";
}

export interface BankRAC {
  bank: string;
  tipeKpr: string[];
  area: string[];
  minIncomeKaryawan: number;
  minIncomePengusaha: number;
  statusKaryawan: string[];
  jenisKpr: string[];
  dpMin: number;
  readyDana: string[];
  minPlafondKpm: number;
  minPlafondTo: number;
}

export interface LoanInput {
  nama?: string;
  employmentStatus: EmploymentStatus;
  monthlyIncome: number;
  kprType: KPRType;
  loanType: LoanType;
  propertyPrice: number;
  dpPercent: number;
  plafond: number;
  topUp?: number;
  tenorYears: number;
  area: string;
  readyDana: ReadyDana;
  // Take Over specific
  currentOutstanding?: number;
  currentMonthlyInstallment?: number;
  currentTotalTenorMonths?: number;
  currentRemainingTenorMonths?: number;
  estimatedPenaltyPercent?: number;
  estimatedTakeOverCost?: number;
  // Savings fields
  calculateSavings?: boolean;
  oldKpr?: {
    type:
      | "Single Rate"
      | "Floating"
      | "Fixed -> Floating"
      | "Berjenjang -> Floating";
    currentRate?: number;
    remainingFixMonths?: number;
    tier2Rate?: number;
    tier2Months?: number;
    floatingRate?: number;
  };
}

export interface YearlyAmortization {
  year: number;
  rate: number;
  monthlyInstallment: number;
  outstandingStart: number;
  outstandingEnd: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalPaid: number;
}

export interface SimulationResult {
  product: BankProduct;
  tenorYears: number;
  plafond: number;
  fixPeriodMonthlyInstallment: number;
  floatingMonthlyInstallment: number;
  floatingRate: number;
  totalInstallmentFixPeriod: number;
  totalInstallmentAll: number;
  totalInterest: number;
  totalPrincipal: number;
  yearlySchedule: YearlyAmortization[];
  takeOverSavings?: number;
  totalPlafondBaru?: number;
  estimatedTakeOverCost?: number;
  isEligible: boolean;
  ineligibilityReasons: string[];
  savings?: {
    oldTotalPayment: number;
    newTotalPayment: number;
    grossSavings: number;
    takeOverFee: number;
    totalSaved: number;
    monthlySavedFix: number;
    oldFloatingInstallment?: number;
  };
}

export const AREA_OPTIONS = [
  "Jabodetabek",
  "Jawa Timur",
  "Jawa Tengah",
  "Jawa Barat",
  "Bandung",
  "Medan",
  "Pekanbaru",
  "Lampung",
  "Riau",
  "Kalimantan",
  "Bali",
  "Sulawesi",
  "Padang",
  "Cikarang",
] as const;

export type Area = (typeof AREA_OPTIONS)[number];

export const KPR_TYPE_LABELS: Record<KPRType, string> = {
  "KPR Primary": "Primary",
  "KPR Secondary": "Secondary",
  "Take Over": "Take Over",
  Multiguna: "Multiguna",
};

export const EMPLOYMENT_LABELS: Record<EmploymentStatus, string> = {
  "Karyawan Tetap": "Karyawan Tetap",
  "Karyawan Kontrak": "Karyawan Kontrak",
  Pengusaha: "Wiraswasta / Pengusaha",
  "TNI/Polri": "TNI / Polri",
};

export const BANK_COLORS: Record<string, string> = {
  UOB: "#EE3524",
  Maybank: "#FECC00",
  Danamon: "#F37021",
  CIMB: "#7B0099",
  "CIMB Syariah": "#7B0099",
  BSI: "#00875A",
  BTN: "#00529B",
  BNI: "#FF6200",
  BRI: "#003087",
  Permata: "#00B140",
  Mandiri: "#003087",
  OCBC: "#E31E24",
  Muamalat: "#00843D",
  INA: "#0067B1",
  Ganesha: "#8B4513",
  "KB Bank": "#007DC3",
  Sinarmas: "#006B35",
  Panin: "#003B5C",
};
