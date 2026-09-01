// lib/sheets.ts
// Google Sheets API client - reads bank product data

import { google } from "googleapis";
import type { BankProduct, BankRAC } from "./types";

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;

function getAuthClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

function parseNumber(s: string | undefined): number {
  if (!s) return 0;
  return parseFloat(s.replace(/[^0-9.-]/g, "")) || 0;
}

function parsePercent(s: string | undefined): number | null {
  if (!s) return null;
  const cleaned = s.replace("%", "").trim();
  const n = parseFloat(cleaned);
  if (isNaN(n)) return null;
  return n / 100;
}

export async function fetchBankProducts(): Promise<BankProduct[]> {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "INDEX!A3:BH500",
    });

    const rows = result.data.values || [];
    const products: BankProduct[] = [];

    for (const row of rows) {
      if (!row[0] || !row[1]) continue;
      const no = parseInt(row[0]);
      if (isNaN(no)) continue;

      const bank = row[1] as string;
      const tipe = row[2] as BankProduct["tipe"];
      const kode = row[3] as string;
      const nama = row[4] as string;
      if (!kode || !nama) continue;

      const minPlafond = parseNumber(row[5]);
      const maxPlafond = parseNumber(row[6]);
      const dpMin = parsePercent(row[7]) ?? 0;
      const minTenor = parseInt(row[8]) || 0;
      const maxTenor = parseInt(row[9]) || 0;
      const masaFix = parseInt(row[10]) || 0;

      // Rates start at column index 13
      const rates: number[] = [];
      for (let i = 13; i < Math.min(row.length, 53); i++) {
        const r = parsePercent(row[i]);
        if (r !== null) rates.push(r);
      }

      if (rates.length === 0) continue;

      const uniqueRates = new Set(rates);

      let isBerjenjang = false;
      let isSingleRate = false;

      const uniqueAllRates = new Set(rates);

      if (
        nama.toLowerCase().includes("berjenjang") ||
        tipe.toLowerCase().includes("berjenjang")
      ) {
        isBerjenjang = true;
      } else if (masaFix > 1 && rates.length > 0) {
        // Cek apakah ada perubahan suku bunga SELAMA masa fix
        const fixPeriodRates = rates.slice(0, masaFix);
        const uniqueFixRates = new Set(fixPeriodRates);
        if (uniqueFixRates.size > 1) {
          isBerjenjang = true;
        }
      }

      if (nama.toLowerCase().includes("single") || uniqueAllRates.size === 1) {
        isSingleRate = true;
        isBerjenjang = false;
      }

      let jenisBunga: "Fixed" | "Berjenjang" | "Single Rate" = "Fixed";
      if (isSingleRate) jenisBunga = "Single Rate";
      else if (isBerjenjang) jenisBunga = "Berjenjang";

      products.push({
        no,
        bank,
        tipe,
        kode,
        nama,
        minPlafond,
        maxPlafond,
        dpMin,
        minTenor,
        maxTenor,
        masaFix,
        rates,
        syariah:
          bank.toLowerCase().includes("syariah") ||
          nama.toLowerCase().includes("syariah") ||
          tipe.toLowerCase().includes("syariah"),
        jenisBunga,
      });
    }

    return products;
  } catch (error) {
    console.error("Error fetching bank products from Sheets:", error);
    // Fallback to static data
    const { default: staticData } = await import("../data/bank-products.json");
    return staticData.products as BankProduct[];
  }
}

export async function fetchRAC(): Promise<BankRAC[]> {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "RAC!A3:Z25",
    });

    const rows = result.data.values || [];
    const racList: BankRAC[] = [];

    for (const row of rows) {
      if (!row[0]) continue;
      const bank = row[0];
      const tipeKpr = row[1]
        ? row[1].split(",").map((s: string) => s.trim())
        : [];
      const area = row[2] ? row[2].split(",").map((s: string) => s.trim()) : [];
      const minIncomeKaryawan = parseNumber(row[3]);
      const minIncomePengusaha = parseNumber(row[4]);
      const statusKaryawan = row[5]
        ? row[5].split(",").map((s: string) => s.trim())
        : [];
      const jenisKpr = row[6]
        ? row[6].split(",").map((s: string) => s.trim())
        : [];
      const dpMinRaw = row[7] || "0";
      const dpMin = (parsePercent(dpMinRaw) ?? parseInt(dpMinRaw) / 100) || 0;
      const readyDana = row[8]
        ? row[8].split(",").map((s: string) => s.trim())
        : [];
      const minPlafondKpm = parseNumber(row[9]);
      const minPlafondTo = parseNumber(row[10]);

      racList.push({
        bank,
        tipeKpr,
        area,
        minIncomeKaryawan,
        minIncomePengusaha,
        statusKaryawan,
        jenisKpr,
        dpMin,
        readyDana,
        minPlafondKpm,
        minPlafondTo,
      });
    }

    return racList;
  } catch (error) {
    console.error("Error fetching RAC from Sheets:", error);
    const { default: staticData } = await import("../data/bank-products.json");
    return staticData.rac as BankRAC[];
  }
}

export async function fetchBungaUpdates(): Promise<Record<string, string>> {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Update Bunga!A3:B30",
    });

    const rows = result.data.values || [];
    const updates: Record<string, string> = {};
    for (const row of rows) {
      if (row[0] && row[1]) updates[row[0]] = row[1];
    }
    return updates;
  } catch {
    return {};
  }
}
