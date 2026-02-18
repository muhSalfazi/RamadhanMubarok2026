import Link from "next/link";
import StarParticles from "@/components/StarParticles";
import dynamic from "next/dynamic";

// Dynamically import Compass to avoid SSR issues with window/navigator
const QiblaCompass = dynamic(() => import("@/components/QiblaCompass"), {
    ssr: false,
    loading: () => (
        <div className="w-64 h-64 mx-auto rounded-full border-4 border-white/5 animate-pulse flex items-center justify-center">
            <span className="text-white/20">Memuat Kompas...</span>
        </div>
    )
});

export default function KiblatPage() {
    return (
        <main className="min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 ramadhan-bg" />
                <div className="absolute inset-0 islamic-pattern mix-blend-overlay opacity-30" />
                <StarParticles />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
                <header className="mb-8 text-center anim-fade-up w-full">
                    <Link href="/karawang" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <div className="mb-4 flex justify-center">
                        <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300 text-xs uppercase tracking-widest bg-emerald-500/5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Realtime Sensor
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Arah Kiblat</h1>
                    <p className="text-white/40">Pastikan GPS aktif & kalibrasi kompas HP Anda</p>
                </header>

                <div className="w-full anim-fade-up delay-1">
                    <QiblaCompass />
                </div>

                <footer className="mt-12 text-center anim-fade opacity-40 hover:opacity-100 transition-opacity pb-24">
                    <p className="font-arabic text-xl mb-2">فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ</p>
                    <p className="text-xs max-w-md mx-auto leading-relaxed">
                        "Palingkanlah mukamu ke arah Masjidil Haram. Dan dimana saja kamu berada, palingkanlah mukamu ke arahnya." (QS. Al-Baqarah: 144)
                    </p>
                </footer>
            </div>
        </main>
    );
}
