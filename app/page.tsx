import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  TrendingDown,
  RefreshCw,
  Building2,
  ShieldCheck,
  Award,
} from "lucide-react";
import Rumah123Logo from "@/components/ui/Rumah123Logo";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-[#003366] via-[#00438F] to-[#092147] text-white">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Rumah123Logo variant="white" withTagline={true} />
          <div className="flex items-center gap-2 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">
              Official Mortgage Platform
            </span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 rounded-full px-4 py-1.5 text-xs sm:text-sm text-blue-100 mb-6 backdrop-blur-xs">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Disusun & Diverifikasi Langsung oleh Tim Mortgage Rumah123
          </div>

          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Simulasi KPR
            <br />
            <span className="text-blue-300">Paling Lengkap</span>
          </h1>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Bandingkan cicilan dari 15+ bank sekaligus, dengan bunga real-time.
            Hitung KPR Primary, Secondary, Take Over, dan Multiguna.
          </p>

          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-lg shadow-blue-900/30 text-lg"
          >
            Mulai Simulasi
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          Kenapa pakai KPR Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Calculator className="w-6 h-6 text-blue-600" />}
            title="Simulasi Akurat"
            desc="Kalkulasi cicilan dengan formula amortisasi yang tepat, termasuk bunga berjenjang dan fixed period."
            bg="bg-blue-50"
          />
          <FeatureCard
            icon={<TrendingDown className="w-6 h-6 text-green-600" />}
            title="Bandingkan Banyak Bank"
            desc="Lihat semua opsi dari 15+ bank sekaligus | UOB, CIMB, Maybank, BTN, BNI, BRI, dan lainnya."
            bg="bg-green-50"
          />
          <FeatureCard
            icon={<RefreshCw className="w-6 h-6 text-purple-600" />}
            title="Take Over Mudah"
            desc="Hitung potensi penghematan jika pindah bank, termasuk estimasi penalti dan biaya take over."
            bg="bg-purple-50"
          />
        </div>
      </section>

      {/* Banks */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-6">
            Bank yang tersedia
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "UOB",
              "Maybank",
              "CIMB Niaga",
              "Danamon",
              "BTN",
              "BNI",
              "BRI",
              "BSI",
              "OCBC",
              "Permata",
              "Mandiri",
              "Sinarmas",
              "Muamalat",
              "INA",
              "Ganesha",
              "KB Bank",
            ].map((b) => (
              <span
                key={b}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-3">
          Siap hitung cicilan KPR kamu?
        </h2>
        <p className="text-blue-100 mb-8">
          Gratis, langsung, tanpa registrasi.
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all"
        >
          Buka Kalkulator
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        © 2026 Rumah123 · Data bunga diperbarui berkala dari sumber bank resmi
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bg: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
