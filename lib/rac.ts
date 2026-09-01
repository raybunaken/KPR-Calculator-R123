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
