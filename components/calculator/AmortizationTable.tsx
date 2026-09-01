"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { YearlyAmortization } from "@/lib/types";
import { formatIDRFull, formatPercent } from "@/lib/calculator";

interface AmortizationTableProps {
  yearlySchedule: YearlyAmortization[];
  masaFix: number;
  showAll?: boolean;
}

export default function AmortizationTable({
  yearlySchedule,
  masaFix,
  showAll = false,
}: AmortizationTableProps) {
  const [expanded, setExpanded] = useState(false);
  const displayed =
    expanded || showAll ? yearlySchedule : yearlySchedule.slice(0, 5);

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3 print:text-black print:font-bold">
        Tabel Amortisasi per Tahun
      </h4>
      <div className="overflow-x-auto rounded-xl border border-gray-200 print:border-gray-400">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-100 text-gray-500 print:bg-gray-200 print:text-black print:font-bold">
              <th className="px-3 py-2 text-left font-medium print:text-black">Tahun</th>
              <th className="px-3 py-2 text-right font-medium print:text-black">Rate</th>
              <th className="px-3 py-2 text-right font-medium print:text-black">Cicilan/Bln</th>
              <th className="px-3 py-2 text-right font-medium print:text-black">Bunga/Bln</th>
              <th className="px-3 py-2 text-right font-medium print:text-black">Pokok/Bln</th>
              <th className="px-3 py-2 text-right font-medium print:text-black">Sisa Hutang</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((row) => {
              const isFixEnd = row.year === masaFix;
              const isAfterFix = row.year > masaFix;
              return (
                <tr
                  key={row.year}
                  className={`border-t border-gray-100 print:border-gray-300 ${
                    isAfterFix ? "bg-orange-50/50 print:bg-white" : "print:bg-white"
                  } ${isFixEnd ? "border-b-2 border-b-red-200 print:border-b-gray-400" : ""}`}
                >
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-gray-700 print:text-black font-mono">
                        Thn {row.year}
                      </span>
                      {row.year <= masaFix && (
                        <span className="bg-blue-100 text-blue-600 print:bg-gray-100 print:text-black print:border print:border-gray-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          Fix
                        </span>
                      )}
                      {row.year > masaFix && (
                        <span className="bg-orange-100 text-orange-600 print:bg-gray-100 print:text-black print:border print:border-gray-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          Float
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-600 print:text-black">
                    {formatPercent(row.rate)}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-800 print:text-black">
                    {formatIDRFull(row.monthlyInstallment)}
                  </td>
                  <td className="px-3 py-2 text-right text-orange-600 print:text-black">
                    {formatIDRFull(row.totalInterestPaid / 12)}
                  </td>
                  <td className="px-3 py-2 text-right text-blue-600 print:text-black">
                    {formatIDRFull(row.totalPrincipalPaid / 12)}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-600 print:text-black">
                    {formatIDRFull(row.outstandingEnd)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {yearlySchedule.length > 5 && !showAll && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-blue-600 hover:text-blue-700 py-2 print:hidden"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" /> Sembunyikan
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" /> Tampilkan semua{" "}
              {yearlySchedule.length} tahun
            </>
          )}
        </button>
      )}
    </div>
  );
}
