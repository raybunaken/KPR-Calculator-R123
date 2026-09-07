// lib/rac.ts
// RAC (Risk Acceptance Criteria) - eligibility checker per bank

import type { BankProduct, BankRAC, LoanInput } from "./types";

export function checkEligibility(
  product: BankProduct,
  rac: BankRAC | undefined,
  input: LoanInput,
): { eligible: boolean; reasons: string[] } {
  // Fitur RAC dimatikan sesuai request, semua produk dianggap eligible
  return { eligible: true, reasons: [] };
}

export function filterProducts(
  products: BankProduct[],
  racList: BankRAC[],
  input: LoanInput,
): Array<BankProduct & { eligible: boolean; reasons: string[] }> {
  const racMap = new Map(racList.map((r) => [r.bank, r]));

  return products
    .filter((p) => p.tipe === input.kprType)
    .filter((p) => {
      if (!input.rateRange || input.rateRange === "all") return true;
      const rate0 =
        p.rates && p.rates[0] !== undefined
          ? p.rates[0] < 1
            ? p.rates[0] * 100
            : p.rates[0]
          : 99;
      if (input.rateRange === "<3") return rate0 < 3.0;
      if (input.rateRange === "3-4") return rate0 >= 3.0 && rate0 < 4.0;
      if (input.rateRange === "4-5") return rate0 >= 4.0 && rate0 < 5.0;
      if (input.rateRange === ">5") return rate0 >= 5.0;
      return true;
    })
    .map((p) => {
      const rac = racMap.get(p.bank);
      const { eligible, reasons } = checkEligibility(p, rac, input);
      return { ...p, eligible, reasons };
    })
    .sort((a, b) => {
      if (a.eligible && !b.eligible) return -1;
      if (!a.eligible && b.eligible) return 1;
      return (a.rates[0] ?? 99) - (b.rates[0] ?? 99);
    });
}
