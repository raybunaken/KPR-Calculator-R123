// app/api/products/route.ts
// API endpoint to serve bank products data
// Uses Google Sheets as source of truth with ISR caching

import { NextResponse } from "next/server";
import { fetchBankProducts, fetchRAC, fetchBungaUpdates } from "@/lib/sheets";

// Cache for 1 hour (3600 seconds) - Next.js ISR
export const revalidate = 3600;

export async function GET() {
  try {
    const [products, rac, bungaUpdates] = await Promise.all([
      fetchBankProducts(),
      fetchRAC(),
      fetchBungaUpdates(),
    ]);

    return NextResponse.json(
      { products, rac, bungaUpdates, updatedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
