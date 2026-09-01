"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { YearlyAmortization } from "@/lib/types";
import { formatIDR, formatPercent } from "@/lib/calculator";

interface AmortizationChartProps {
  yearlySchedule: YearlyAmortization[];
  masaFix: number;
}

export default function AmortizationChart({
  yearlySchedule,
  masaFix,
}: AmortizationChartProps) {
  const data = yearlySchedule.map((y) => ({
    year: `Thn ${y.year}`,
    yearNum: y.year,
    cicilan: Math.round(y.monthlyInstallment),
    pokok: Math.round(y.totalPrincipalPaid / 12),
    bunga: Math.round(y.totalInterestPaid / 12),
    outstanding: Math.round(y.outstandingEnd),
    rate: y.rate,
  }));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const year = data.find((d) => d.year === label);
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs">
          <p className="font-semibold text-gray-700 mb-2">
            {label} | Rate: {formatPercent(year?.rate || 0)}
          </p>
          {payload.map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-gray-500">{p.name}</span>
              </div>
              <span className="font-medium text-gray-700">
                {formatIDR(p.value)}/bln
              </span>
            </div>
          ))}
          {year && (
            <div className="border-t border-gray-100 mt-2 pt-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Sisa hutang:</span>
                <span className="font-medium text-gray-600">
                  {formatIDR(year.outstanding)}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Grafik Cicilan per Tahun
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPokok" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBunga" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
            interval={Math.floor(data.length / 6)}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
            tickFormatter={(v) => formatIDR(v)}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
          {masaFix > 0 && (
            <ReferenceLine
              x={`Thn ${masaFix}`}
              stroke="#EF4444"
              strokeDasharray="4 4"
              label={{
                value: "End Fix",
                position: "top",
                fontSize: 10,
                fill: "#EF4444",
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="pokok"
            name="Cicilan Pokok"
            stroke="#3B82F6"
            fill="url(#colorPokok)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="bunga"
            name="Cicilan Bunga"
            stroke="#F97316"
            fill="url(#colorBunga)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
