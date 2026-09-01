"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  ChevronLeft,
  SlidersHorizontal,
  Building2,
  Percent,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Calculator,
  RefreshCw,
  X,
  Layers,
} from "lucide-react";
import Rumah123Logo from "@/components/ui/Rumah123Logo";
import type { BankProduct } from "@/lib/types";

const ALL_BANKS = [
  "BCA",
  "Mandiri",
  "BTN",
  "CIMB",
  "Permata",
  "Danamon",
  "Panin",
  "Maybank",
  "OCBC",
  "UOB",
  "BSI",
  "BNI",
  "BRI",
];

const BANK_COLORS: Record<string, string> = {
  BCA: "#005BAA",
  Mandiri: "#003366",
  BTN: "#00438F",
  CIMB: "#8B0000",
  Permata: "#008850",
  Danamon: "#FF5A00",
  Panin: "#006400",
  Maybank: "#FFCC00",
  OCBC: "#DA291C",
  UOB: "#002B49",
  BSI: "#00A39D",
};

interface FormState {
  no?: number;
  bank: string;
  tipe: BankProduct["tipe"];
  kode: string;
  nama: string;
  minPlafond: number;
  maxPlafond: number;
  dpMin: number;
  minTenor: number;
  maxTenor: number;
  masaFix: number;
  jenisBunga: "Fixed" | "Berjenjang" | "Single Rate";
  // For Fixed -> Floating
  fixRate: string;
  floatingRate: string;
  // For Berjenjang
  tiers: { endYear: number; rate: string }[];
  berjenjangFloatingRate: string;
  // For Single Rate
  singleRate: string;
  syariah: boolean;
}

const DEFAULT_FORM: FormState = {
  bank: "Mandiri",
  tipe: "Take Over",
  kode: "",
  nama: "",
  minPlafond: 100_000_000,
  maxPlafond: 5_000_000_000,
  dpMin: 0.1,
  minTenor: 5,
  maxTenor: 20,
  masaFix: 3,
  jenisBunga: "Fixed",
  fixRate: "3.75",
  floatingRate: "13.00",
  tiers: [
    { endYear: 2, rate: "3.99" },
    { endYear: 4, rate: "5.89" },
    { endYear: 6, rate: "8.89" },
  ],
  berjenjangFloatingRate: "13.00",
  singleRate: "8.50",
  syariah: false,
};

function formatIDR(v: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(v);
}

function CurrencyInput({
  value,
  onChange,
  placeholder = "0",
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  const displayValue = value
    ? new Intl.NumberFormat("id-ID").format(value)
    : "";

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
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium pointer-events-none">
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<BankProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("All");
  const [selectedTipe, setSelectedTipe] = useState<string>("All");
  const [selectedJenis, setSelectedJenis] = useState<string>("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKode, setEditingKode] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        search === "" ||
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.kode.toLowerCase().includes(search.toLowerCase()) ||
        p.bank.toLowerCase().includes(search.toLowerCase());
      const matchBank = selectedBank === "All" || p.bank === selectedBank;
      const matchTipe = selectedTipe === "All" || p.tipe === selectedTipe;
      const matchJenis =
        selectedJenis === "All" || p.jenisBunga === selectedJenis;
      return matchSearch && matchBank && matchTipe && matchJenis;
    });
  }, [products, search, selectedBank, selectedTipe, selectedJenis]);

  // Handle open modal for new product
  function handleOpenCreate() {
    setEditingKode(null);
    setForm({
      ...DEFAULT_FORM,
      kode: `KPR-${Date.now().toString().slice(-4)}`,
    });
    setIsModalOpen(true);
  }

  // Handle open modal for editing
  function handleOpenEdit(product: BankProduct) {
    setEditingKode(product.kode);

    let fixRate = "3.75";
    let floatingRate = "13.00";
    let singleRate = "8.50";
    const tiers: { endYear: number; rate: string }[] = [];

    if (product.jenisBunga === "Single Rate") {
      singleRate = ((product.rates[0] || 0.085) * 100).toFixed(2);
    } else if (product.jenisBunga === "Berjenjang") {
      let currentRate = product.rates[0];
      let startYear = 1;
      for (let y = 1; y < product.rates.length; y++) {
        if (
          product.rates[y] !== currentRate ||
          y === product.rates.length - 1
        ) {
          tiers.push({
            endYear: y,
            rate: ((currentRate || 0.05) * 100).toFixed(2),
          });
          currentRate = product.rates[y];
          startYear = y + 1;
        }
      }
      floatingRate = (
        (product.rates[product.rates.length - 1] || 0.13) * 100
      ).toFixed(2);
    } else {
      fixRate = ((product.rates[0] || 0.0375) * 100).toFixed(2);
      floatingRate = ((product.rates[product.masaFix] || 0.13) * 100).toFixed(
        2,
      );
    }

    setForm({
      no: product.no,
      bank: product.bank,
      tipe: product.tipe,
      kode: product.kode,
      nama: product.nama,
      minPlafond: product.minPlafond,
      maxPlafond: product.maxPlafond,
      dpMin: product.dpMin,
      minTenor: product.minTenor,
      maxTenor: product.maxTenor,
      masaFix: product.masaFix,
      jenisBunga: product.jenisBunga,
      fixRate,
      floatingRate,
      tiers: tiers.length > 0 ? tiers : DEFAULT_FORM.tiers,
      berjenjangFloatingRate: floatingRate,
      singleRate,
      syariah: product.syariah || false,
    });
    setIsModalOpen(true);
  }

  // Handle duplicate
  function handleDuplicate(product: BankProduct) {
    handleOpenEdit(product);
    setEditingKode(null);
    setForm((f) => ({
      ...f,
      kode: `${product.kode}-COPY`,
      nama: `${product.nama} (Duplikat)`,
    }));
  }

  // Handle delete
  async function handleDelete(kode: string, nama: string) {
    if (!confirm(`Hapus program "${nama}" (${kode})?`)) return;

    try {
      const res = await fetch(
        `/api/admin/products?kode=${encodeURIComponent(kode)}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (res.ok) {
        setNotification({
          type: "success",
          message: `Produk ${kode} berhasil dihapus.`,
        });
        loadProducts();
      } else {
        setNotification({
          type: "error",
          message: data.error || "Gagal menghapus produk",
        });
      }
    } catch {
      setNotification({ type: "error", message: "Terjadi kesalahan jaringan" });
    }
  }

  // Calculate Rate Array from Form State
  const computedRates = useMemo(() => {
    const totalYears = Math.max(1, form.maxTenor || 20);
    const rates: number[] = [];

    if (form.jenisBunga === "Single Rate") {
      const rate = (parseFloat(form.singleRate) || 8.5) / 100;
      for (let i = 0; i < totalYears; i++) rates.push(rate);
    } else if (form.jenisBunga === "Berjenjang") {
      const floatRate = (parseFloat(form.berjenjangFloatingRate) || 13.0) / 100;
      let currentYear = 0;

      for (const tier of form.tiers) {
        const tierRate = (parseFloat(tier.rate) || 5.0) / 100;
        while (currentYear < tier.endYear && currentYear < totalYears) {
          rates.push(tierRate);
          currentYear++;
        }
      }

      while (currentYear < totalYears) {
        rates.push(floatRate);
        currentYear++;
      }
    } else {
      const fix = (parseFloat(form.fixRate) || 3.75) / 100;
      const floatRate = (parseFloat(form.floatingRate) || 13.0) / 100;
      const masaFix = Math.max(1, form.masaFix);

      for (let i = 0; i < totalYears; i++) {
        rates.push(i < masaFix ? fix : floatRate);
      }
    }

    return rates;
  }, [form]);

  // Sample PMT preview
  const sampleCicilan = useMemo(() => {
    const P = 500_000_000;
    const r = (computedRates[0] || 0.05) / 12;
    const n = 120;
    const pmt = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    return Math.round(pmt);
  }, [computedRates]);

  // Save product submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const productPayload: BankProduct = {
      no: form.no || products.length + 1,
      bank: form.bank,
      tipe: form.tipe,
      kode: form.kode.trim(),
      nama: form.nama.trim(),
      minPlafond: form.minPlafond,
      maxPlafond: form.maxPlafond,
      dpMin: form.dpMin,
      minTenor: form.minTenor,
      maxTenor: form.maxTenor,
      masaFix:
        form.jenisBunga === "Fixed"
          ? form.masaFix
          : form.jenisBunga === "Berjenjang"
            ? form.tiers[form.tiers.length - 1]?.endYear || 5
            : form.maxTenor,
      rates: computedRates,
      syariah: form.syariah,
      jenisBunga: form.jenisBunga,
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productPayload }),
      });

      const data = await res.json();
      if (res.ok) {
        setNotification({
          type: "success",
          message: editingKode
            ? "Perubahan program berhasil disimpan."
            : "Program KPR baru berhasil ditambahkan.",
        });
        setIsModalOpen(false);
        loadProducts();
      } else {
        setNotification({
          type: "error",
          message: data.error || "Gagal menyimpan produk",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Gagal menghubungkan ke server",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/70 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/calculator"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Ke Kalkulator</span>
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <Rumah123Logo withTagline={true} />
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#00438F]">
              Portal Internal Manajemen Bunga
            </span>
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 bg-[#00438F] hover:bg-[#003366] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Program Baru</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-5">
        {/* Notification Toast */}
        {notification && (
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in ${
              notification.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
            <span className="text-gray-400 text-xs font-medium block mb-0.5">
              Total Program KPR
            </span>
            <strong className="text-xl font-extrabold text-gray-900">
              {products.length}
            </strong>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
            <span className="text-gray-400 text-xs font-medium block mb-0.5">
              Bank Rekanan
            </span>
            <strong className="text-xl font-extrabold text-blue-700">
              {new Set(products.map((p) => p.bank)).size} Bank
            </strong>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
            <span className="text-gray-400 text-xs font-medium block mb-0.5">
              Program Take Over
            </span>
            <strong className="text-xl font-extrabold text-orange-600">
              {products.filter((p) => p.tipe === "Take Over").length}
            </strong>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
            <span className="text-gray-400 text-xs font-medium block mb-0.5">
              Program Secondary
            </span>
            <strong className="text-xl font-extrabold text-emerald-600">
              {products.filter((p) => p.tipe === "KPR Secondary").length}
            </strong>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kode produk, nama bank, atau program..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Bank Filter */}
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="border border-gray-200 rounded-xl px-2.5 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            >
              <option value="All">Semua Bank</option>
              {ALL_BANKS.map((b) => (
                <option key={b} value={b}>
                  Bank {b}
                </option>
              ))}
            </select>

            {/* Tipe Filter */}
            <select
              value={selectedTipe}
              onChange={(e) => setSelectedTipe(e.target.value)}
              className="border border-gray-200 rounded-xl px-2.5 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            >
              <option value="All">Semua Tipe KPR</option>
              <option value="Take Over">Take Over</option>
              <option value="KPR Secondary">KPR Secondary</option>
              <option value="KPR Primary">KPR Primary</option>
            </select>

            {/* Jenis Bunga Filter */}
            <select
              value={selectedJenis}
              onChange={(e) => setSelectedJenis(e.target.value)}
              className="border border-gray-200 rounded-xl px-2.5 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
            >
              <option value="All">Semua Jenis Bunga</option>
              <option value="Fixed">Fixed Promo</option>
              <option value="Berjenjang">Berjenjang</option>
              <option value="Single Rate">Single Rate (Flat)</option>
            </select>

            <button
              onClick={loadProducts}
              className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600"
              title="Segarkan Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Catalog Table */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100/80 text-gray-600 border-b border-gray-200 text-[11px]">
                  <th className="p-3 text-left font-bold w-[70px]">Bank</th>
                  <th className="p-3 text-left font-bold">
                    Program KPR & Kode
                  </th>
                  <th className="p-3 text-left font-medium">Tipe</th>
                  <th className="p-3 text-left font-medium">
                    Skema Suku Bunga
                  </th>
                  <th className="p-3 text-right font-medium">Plafond</th>
                  <th className="p-3 text-center font-medium">Tenor</th>
                  <th className="p-3 text-center font-bold w-[120px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400">
                      Memuat katalog produk KPR...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400">
                      Tidak ada program KPR yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const bankColor = BANK_COLORS[p.bank] || "#3B82F6";
                    const initialRate = (p.rates[0] * 100).toFixed(2);
                    const floatingRate = (
                      p.rates[p.rates.length - 1] * 100
                    ).toFixed(2);

                    return (
                      <tr
                        key={p.kode}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="p-3">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded text-white inline-block"
                            style={{ backgroundColor: bankColor }}
                          >
                            {p.bank}
                          </span>
                        </td>
                        <td className="p-3">
                          <strong className="text-gray-900 block text-xs">
                            {p.nama}
                          </strong>
                          <span className="text-[10px] text-gray-400 font-mono">
                            Kode: {p.kode}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10.5px] font-medium bg-gray-100 text-gray-700">
                            {p.tipe}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="space-y-0.5">
                            <span className="font-bold text-blue-700 block">
                              {initialRate}%{" "}
                              <span className="font-normal text-[10px] text-gray-500">
                                ({p.jenisBunga}{" "}
                                {p.jenisBunga === "Fixed"
                                  ? `${p.masaFix}th`
                                  : ""}
                                )
                              </span>
                            </span>
                            {p.jenisBunga !== "Single Rate" && (
                              <span className="text-[10px] text-orange-700 block">
                                Floating: {floatingRate}%
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-right text-gray-600">
                          <span className="block font-medium">
                            {formatIDR(p.minPlafond)}
                          </span>
                          <span className="text-[10px] text-gray-400 block">
                            s.d {formatIDR(p.maxPlafond)}
                          </span>
                        </td>
                        <td className="p-3 text-center text-gray-700 font-medium">
                          {p.minTenor} - {p.maxTenor} Thn
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                              title="Edit Program"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(p)}
                              className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                              title="Duplikat Program"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.kode, p.nama)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                              title="Hapus Program"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal / Drawer: Form Editor Program KPR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  {editingKode
                    ? `Edit Program: ${editingKode}`
                    : "Tambah Program KPR Baru"}
                </h3>
                <p className="text-xs text-gray-500">
                  Isi detail suku bunga dan batasan program bank rekanan.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-5 space-y-5"
            >
              {/* Section 1: Informasi Dasar */}
              <div>
                <h4 className="font-bold text-xs text-gray-800 mb-3 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>1. Identitas Bank & Program</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Bank
                    </label>
                    <select
                      value={form.bank}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, bank: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-800 bg-white"
                      required
                    >
                      {ALL_BANKS.map((b) => (
                        <option key={b} value={b}>
                          Bank {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Tipe KPR
                    </label>
                    <select
                      value={form.tipe}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, tipe: e.target.value as any }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-800 bg-white"
                    >
                      <option value="Take Over">Take Over</option>
                      <option value="KPR Secondary">KPR Secondary</option>
                      <option value="KPR Primary">KPR Primary</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Kode Unik Produk
                    </label>
                    <input
                      type="text"
                      value={form.kode}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          kode: e.target.value.toUpperCase(),
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-800 font-mono"
                      placeholder="Misal: 99NB404"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Nama Lengkap Program
                    </label>
                    <input
                      type="text"
                      value={form.nama}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, nama: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-800"
                      placeholder="Misal: KPR Mandiri Take Over Fixed 3 Tahun Promo Khusus"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Skema Suku Bunga Dinamis */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="font-bold text-xs text-gray-800 mb-3 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-blue-600" />
                  <span>2. Skema Suku Bunga</span>
                </h4>

                {/* Jenis Bunga Selector */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { id: "Fixed", label: "Fixed Promo -> Floating" },
                    { id: "Berjenjang", label: "Berjenjang (Step-Up)" },
                    { id: "Single Rate", label: "Single Rate (Flat)" },
                  ].map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, jenisBunga: j.id as any }))
                      }
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-center ${
                        form.jenisBunga === j.id
                          ? "border-blue-500 bg-blue-50/80 text-blue-700 font-bold shadow-xs"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {j.label}
                    </button>
                  ))}
                </div>

                {/* Fixed Scheme Form */}
                {form.jenisBunga === "Fixed" && (
                  <div className="grid grid-cols-3 gap-3 p-3.5 bg-blue-50/30 rounded-xl border border-blue-100">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">
                        Masa Fix (Tahun)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={form.masaFix}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            masaFix: parseInt(e.target.value) || 1,
                          }))
                        }
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">
                        Suku Bunga Fix (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.fixRate}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, fixRate: e.target.value }))
                        }
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm bg-white"
                        placeholder="Contoh: 3.75"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">
                        Est. Bunga Floating (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.floatingRate}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            floatingRate: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm bg-white"
                        placeholder="Contoh: 13.00"
                      />
                    </div>
                  </div>
                )}

                {/* Berjenjang Scheme Form */}
                {form.jenisBunga === "Berjenjang" && (
                  <div className="space-y-3.5 p-3.5 bg-blue-50/30 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-blue-100/70">
                      <div>
                        <span className="text-xs font-bold text-blue-900 block">Atur Jenjang Suku Bunga Bebas (Fleksibel)</span>
                        <p className="text-[11px] text-gray-500">Anda bebas mengatur durasi tahun (misal: Th 1 saja, Th 2-3, Th 4-5, atau pola lainnya).</p>
                      </div>
                      {/* Presets */}
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setForm((f) => ({
                            ...f,
                            tiers: [
                              { endYear: 1, rate: "2.99" },
                              { endYear: 3, rate: "4.99" },
                              { endYear: 5, rate: "7.99" },
                            ],
                          }))}
                          className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200"
                        >
                          Pola Th 1 Awal (1, 2-3, 4-5)
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm((f) => ({
                            ...f,
                            tiers: [
                              { endYear: 2, rate: "3.99" },
                              { endYear: 4, rate: "5.89" },
                              { endYear: 6, rate: "8.89" },
                            ],
                          }))}
                          className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200"
                        >
                          Pola 2 Thn (1-2, 3-4, 5-6)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {form.tiers.map((tier, idx) => {
                        const startYear = idx === 0 ? 1 : (form.tiers[idx - 1]?.endYear || 0) + 1;
                        const duration = Math.max(1, tier.endYear - startYear + 1);

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-2xs flex-wrap sm:flex-nowrap"
                          >
                            <div className="w-full sm:w-44">
                              <span className="text-xs font-bold text-gray-800 block">
                                Tier {idx + 1}
                              </span>
                              <span className="text-[11px] font-semibold text-blue-700">
                                {startYear === tier.endYear ? `Tahun ke-${startYear}` : `Tahun ${startYear} s/d ${tier.endYear}`} ({duration} Thn)
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-gray-500">S.d Tahun:</span>
                              <input
                                type="number"
                                min={startYear}
                                max={30}
                                value={tier.endYear}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || startYear;
                                  const updated = [...form.tiers];
                                  updated[idx].endYear = Math.max(startYear, val);
                                  // Auto adjust next tiers if overlapping
                                  for (let j = idx + 1; j < updated.length; j++) {
                                    if (updated[j].endYear <= updated[j - 1].endYear) {
                                      updated[j].endYear = updated[j - 1].endYear + 2;
                                    }
                                  }
                                  setForm((f) => ({ ...f, tiers: updated }));
                                }}
                                className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-center"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-gray-500">Bunga (%):</span>
                              <input
                                type="number"
                                step="0.01"
                                value={tier.rate}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const updated = [...form.tiers];
                                  updated[idx].rate = val;
                                  setForm((f) => ({ ...f, tiers: updated }));
                                }}
                                className="w-24 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-center"
                                placeholder="0.00"
                              />
                            </div>
                            {form.tiers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = form.tiers.filter((_, i) => i !== idx);
                                  setForm((f) => ({ ...f, tiers: updated }));
                                }}
                                className="text-red-500 hover:text-red-700 p-1 ml-auto"
                                title="Hapus Tier Ini"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-blue-100 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const lastTier = form.tiers[form.tiers.length - 1];
                          const nextEnd = (lastTier?.endYear || 0) + 2;
                          setForm((f) => ({
                            ...f,
                            tiers: [...f.tiers, { endYear: nextEnd, rate: "9.99" }],
                          }));
                        }}
                        className="text-xs font-bold text-blue-600 bg-white border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        + Tambah Jenjang (Tier)
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600">
                          Bunga Floating Sisa Tenor (%):
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={form.berjenjangFloatingRate}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              berjenjangFloatingRate: e.target.value,
                            }))
                          }
                          className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-center bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Single Rate Scheme Form */}
                {form.jenisBunga === "Single Rate" && (
                  <div className="p-3.5 bg-purple-50/40 rounded-xl border border-purple-100">
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Suku Bunga Flat s.d Lunas (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.singleRate}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, singleRate: e.target.value }))
                      }
                      className="w-48 border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm bg-white"
                      placeholder="Contoh: 8.50"
                    />
                    <p className="text-[11px] text-gray-500 mt-1.5">
                      Suku bunga ini berlaku tetap dari tahun pertama hingga
                      akhir masa pinjaman.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 3: Plafond & Tenor Limits */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="font-bold text-xs text-gray-800 mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>3. Batasan Plafond & Tenor</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Min Plafond
                    </label>
                    <CurrencyInput
                      value={form.minPlafond}
                      onChange={(v) =>
                        setForm((f) => ({ ...f, minPlafond: v }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Max Plafond
                    </label>
                    <CurrencyInput
                      value={form.maxPlafond}
                      onChange={(v) =>
                        setForm((f) => ({ ...f, maxPlafond: v }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Min Tenor (Thn)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={form.minTenor}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          minTenor: parseInt(e.target.value) || 1,
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      Max Tenor (Thn)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={form.maxTenor}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          maxTenor: parseInt(e.target.value) || 1,
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Live Simulation Preview */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span className="flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span>
                      Pratinjau Hasil Perhitungan (Sampel Rp 500 Juta / 10 Th)
                    </span>
                  </span>
                  <span className="text-blue-700 font-extrabold text-sm">
                    {formatIDR(sampleCicilan)}/bln
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 flex flex-wrap gap-2 pt-1 border-t border-gray-200/60">
                  <span>
                    Bunga Awal:{" "}
                    <strong>{(computedRates[0] * 100).toFixed(2)}%</strong>
                  </span>
                  <span>|</span>
                  <span>
                    Total Periode Bunga Terdaftar:{" "}
                    <strong>{computedRates.length} Tahun</strong>
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 border border-gray-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#00438F] hover:bg-[#003366] disabled:opacity-50 shadow-xs cursor-pointer"
                >
                  {saving ? "Menyimpan..." : "Simpan Program KPR"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
