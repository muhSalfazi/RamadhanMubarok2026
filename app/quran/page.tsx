import Link from "next/link";
import StarParticles from "@/components/StarParticles";
import { getAllSurah } from "@/lib/quranApi";

export default async function QuranPage() {
    const surahs = await getAllSurah();

    return (
        <main className="min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 ramadhan-bg" />
                <div className="absolute inset-0 islamic-pattern mix-blend-overlay opacity-30" />
                <StarParticles />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
                <header className="mb-12 text-center anim-fade-up">
                    <Link href="/karawang" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Al-Qur'an Digital</h1>
                    <p className="text-white/40">Baca Al-Qur'an dengan terjemahan dan audio</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {surahs.map((surah, index) => (
                        <Link
                            key={surah.number}
                            href={`/quran/${surah.number}`}
                            className="glass p-5 rounded-xl hover:bg-white/10 transition-all group anim-fade-up flex items-center gap-4"
                            style={{ animationDelay: `${Math.min(index * 0.05, 1)}s` }}
                        >
                            {/* Number Badge */}
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold shrink-0 group-hover:bg-emerald-500/20 transition-colors relative rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-300">{surah.number}</span>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold group-hover:text-emerald-300 transition-colors">{surah.name.transliteration.id}</h3>
                                <p className="text-white/40 text-xs">{surah.name.translation.id} • {surah.numberOfVerses} Ayat</p>
                            </div>

                            <div className="text-right">
                                <p className="font-arabic text-xl text-white/80" dir="rtl">{surah.name.short}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
