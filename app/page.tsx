import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  RefreshCw,
  SlidersHorizontal,
  BookOpen,
} from "lucide-react";
import Rumah123Logo from "@/components/ui/Rumah123Logo";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-[#003366] via-[#00438F] to-[#092147] text-white">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Rumah123Logo variant="white" withTagline={true} />
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 text-blue-100 hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden sm:inline">Kelola Bunga</span>
            </Link>
            <span className="text-xs font-semibold text-blue-200 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              Internal Tools
            </span>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/25 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs text-blue-200 mb-5 backdrop-blur-xs font-medium">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Internal Mortgage Workspace
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight tracking-tight">
            KPR Calculator
            <br />
            <span className="text-blue-300">Rumah123</span>
          </h1>

          <p className="text-blue-100 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Kalkulasi suku bunga 15+ bank mitra, simulasi cicilan Secondary & Take Over, dan akses cepat Kamus RAC.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-md text-sm sm:text-base cursor-pointer"
            >
              <span>Buka Kalkulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all text-sm sm:text-base cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-200" />
              <span>Kelola Bunga</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Fitur Utama
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Alat bantu konsultasi KPR untuk tim internal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <FeatureCard
            icon={<Calculator className="w-5 h-5 text-blue-600" />}
            title="15+ Bank Rekanan"
            desc="Bandingkan cicilan dan suku bunga bank secara objektif dalam hitungan detik."
            bg="bg-blue-50"
          />
          <FeatureCard
            icon={<RefreshCw className="w-5 h-5 text-emerald-600" />}
            title="Secondary & Take Over"
            desc="Hitung angsuran, penghematan cicilan, penalti, serta opsi Ready Dana biaya proses."
            bg="bg-emerald-50"
          />
          <FeatureCard
            icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
            title="Kamus RAC Bank"
            desc="Contekan cepat kebijakan kredit, batas gaji, DP minimal, dan agunan antar bank."
            bg="bg-indigo-50"
          />
        </div>
      </section>

      {/* Banks */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wider mb-5">
            15+ Bank Rekanan
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Mandiri",
              "BTN",
              "CIMB Niaga",
              "BSI",
              "Permata",
              "Maybank",
              "OCBC",
              "Danamon",
              "UOB",
              "BNI",
              "BRI",
              "Sinarmas",
              "Muamalat",
              "INA",
              "Ganesha",
              "KB Bank",
            ].map((b) => (
              <span
                key={b}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium border border-gray-200/60"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-[#0B2545] text-white text-center py-12">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Mulai Simulasi KPR
          </h2>
          <p className="text-blue-200 text-xs sm:text-sm mb-6 max-w-md mx-auto">
            Hitung cicilan dan susun rekomendasi program bank terbaik untuk nasabah.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-all text-sm cursor-pointer shadow-md"
          >
            <span>Buka Kalkulator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-500 text-center py-5 text-xs border-t border-gray-800">
        Rumah123 Mortgage Workspace | Internal Tools
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
    <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
      <div
        className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-sm mb-1.5">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
