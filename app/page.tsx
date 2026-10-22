import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  TrendingDown,
  RefreshCw,
  Building2,
  ShieldCheck,
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
              <span className="hidden sm:inline">Kelola Suku Bunga</span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-blue-200 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">Internal Mortgage Workspace</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 rounded-full px-4 py-1.5 text-xs sm:text-sm text-blue-100 mb-6 backdrop-blur-xs font-medium">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Portal Khusus Tim Sales, Telemarketing & Mortgage Consultant Rumah123
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Workspace Simulasi & Komparasi KPR
            <br />
            <span className="text-blue-300">Tim Internal Mortgage</span>
          </h1>
          <p className="text-blue-100 text-base sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Platform kerja terpadu untuk konsultasi nasabah, pengecekan suku bunga real-time 15+ bank mitra, kalkulasi take over, dan penerbitan dokumen komparasi resmi.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-50 transition-all shadow-lg shadow-blue-900/30 text-base sm:text-lg cursor-pointer"
            >
              <span>Buka Kalkulator KPR</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-blue-700/60 hover:bg-blue-700/80 text-white font-semibold px-6 py-3.5 rounded-2xl border border-white/20 transition-all text-base cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-blue-200" />
              <span>Manajemen Bunga Bank</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Fasilitas Tim Internal
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            Peralatan Kerja Tim Mortgage
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Dirancang khusus untuk mendukung produktivitas dan akurasi saat berbicara dengan calon debitur
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Calculator className="w-6 h-6 text-blue-600" />}
            title="Multi-Bank Advisory Engine"
            desc="Bandingkan cicilan dari 15+ bank mitra secara objektif saat panggilan telepon dengan calon debitur."
            bg="bg-blue-50"
          />
          <FeatureCard
            icon={<RefreshCw className="w-6 h-6 text-emerald-600" />}
            title="Simulasi Secondary & Take Over"
            desc="Kalkulasi akurat mencakup angsuran fix/floating, penghematan cicilan, penalti pelunasan, dan opsi Ready Dana biaya proses."
            bg="bg-emerald-50"
          />
          <FeatureCard
            icon={<BookOpen className="w-6 h-6 text-indigo-600" />}
            title="Kamus RAC Bank Terpusat"
            desc="Akses cepat kriteria kebijakan kredit, syarat gaji, batasan agunan, DP minimal, dan status Ready Dana antar bank."
            bg="bg-indigo-50"
          />
        </div>
      </section>

      {/* Banks */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500 text-xs font-semibold uppercase tracking-wider mb-6">
            15+ Bank Rekanan Resmi Rumah123
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
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
                className="bg-gray-100 text-gray-700 text-xs px-3.5 py-1.5 rounded-full font-medium border border-gray-200/60"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-[#0B2545] text-white text-center py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Siap Melayani Konsultasi Calon Debitur?
          </h2>
          <p className="text-blue-200 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Gunakan kalkulator untuk menyusun rekomendasi bank terbaik dan terbitkan lembar komparasi resmi.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-50 transition-all text-sm sm:text-base cursor-pointer shadow-md"
          >
            <span>Buka Kalkulator KPR</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-400 text-center py-6 text-xs border-t border-gray-800">
        Rumah123 Mortgage Advisory Portal | Khusus Penggunaan Internal Tim Rumah123
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
    <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
