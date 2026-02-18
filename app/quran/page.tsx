import Link from "next/link";
import StarParticles from "../../components/StarParticles";
import { getAllSurah } from "../../lib/quranApi";
import QuranBrowser from "../../components/QuranBrowser";

export default async function QuranPage() {
    const surahs = await getAllSurah();

    return (
        <main className="min-h-screen relative selection:bg-emerald-500/30">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 ramadhan-bg" />
                <div className="absolute inset-0 islamic-pattern mix-blend-overlay opacity-30" />
                <StarParticles />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 pt-8 pb-40">
                <header className="mb-8 text-center anim-fade-up">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Al-Qur'an Digital</h1>
                    <p className="text-white/40">Baca Al-Qur'an dengan terjemahan dan audio</p>
                </header>

                <QuranBrowser surahs={surahs} />
            </div>
        </main>
    );
}
