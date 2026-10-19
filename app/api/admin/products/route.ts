import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { BankProduct } from "@/lib/types";

const dataFilePath = path.join(process.cwd(), "data", "bank-products.json");

async function readProductsData() {
  try {
    const raw = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { products: [], rac: [] };
  }
}

async function writeProductsData(data: any) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const data = await readProductsData();
    return NextResponse.json({
      products: data.products || [],
      rac: data.rac || [],
      bungaUpdates: data.bungaUpdates || {},
    });
  } catch (error) {
    console.error("Admin products GET error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product: BankProduct = body.product;

    if (!product || !product.kode || !product.nama || !product.bank) {
      return NextResponse.json(
        {
          error: "Data produk tidak lengkap. Kode, nama, dan bank wajib diisi.",
        },
        { status: 400 },
      );
    }

    const now = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const defaultDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const effectiveUpdatedAt = product.updatedAt?.trim() || defaultDate;

    const productToSave: BankProduct = {
      ...product,
      updatedAt: effectiveUpdatedAt,
    };

    const data = await readProductsData();
    const products: BankProduct[] = data.products || [];

    const existingIndex = products.findIndex((p) => p.kode === product.kode);
    if (existingIndex >= 0) {
      // Update existing
      products[existingIndex] = {
        ...products[existingIndex],
        ...productToSave,
      };
    } else {
      // Create new
      const nextNo =
        products.length > 0
          ? Math.max(...products.map((p) => p.no || 0)) + 1
          : 1;
      products.unshift({
        ...productToSave,
        no: nextNo,
      });
    }

    if (!data.bungaUpdates) {
      data.bungaUpdates = {};
    }
    data.bungaUpdates[product.bank] = effectiveUpdatedAt;

    data.products = products;
    await writeProductsData(data);

    return NextResponse.json({
      success: true,
      message:
        existingIndex >= 0
          ? "Produk berhasil diperbarui"
          : "Produk baru berhasil ditambahkan",
      product: productToSave,
      bungaUpdates: data.bungaUpdates,
    });
  } catch (error) {
    console.error("Admin products POST error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data produk" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const kode = searchParams.get("kode");

    if (!kode) {
      return NextResponse.json(
        { error: "Parameter kode produk wajib disertakan" },
        { status: 400 },
      );
    }

    const data = await readProductsData();
    const products: BankProduct[] = data.products || [];

    const filtered = products.filter((p) => p.kode !== kode);
    if (filtered.length === products.length) {
      return NextResponse.json(
        { error: "Produk dengan kode tersebut tidak ditemukan" },
        { status: 404 },
      );
    }

    data.products = filtered;
    await writeProductsData(data);

    return NextResponse.json({
      success: true,
      message: `Produk ${kode} berhasil dihapus`,
    });
  } catch (error) {
    console.error("Admin products DELETE error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 },
    );
  }
}
