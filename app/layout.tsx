import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KPR Calculator | Rumah123",
  description:
    "Simulasi dan perbandingan cicilan KPR terlengkap dari berbagai bank. Hitung cicilan, bandingkan bunga, dan temukan produk KPR terbaik untuk Anda.",
  keywords:
    "KPR, cicilan rumah, simulasi KPR, kalkulator KPR, take over KPR, KPR Syariah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
