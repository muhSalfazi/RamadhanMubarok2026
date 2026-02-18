
import Link from "next/link";
import { getNarrators } from "../../lib/hadithApi";

export const metadata = {
    title: "Kumpulan Hadist - Ramadhan 2026",
    description: "Baca kumpulan hadist shahih dari berbagai perawi terpercaya.",
};

export default async function HadithPage() {
    const narrators = await getNarrators();

    return (
        <div className="min-h-screen bg-neutral-950 relative selection:bg-emerald-500/30">
            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10 pb-40">
                <header className="mb-10">
                    <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Ensiklopedia Hadist</h1>
                    <p className="text-white/60">Pilih perawi untuk mulai membaca hadist.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {narrators.map((narrator) => (
                        <Link
                            key={narrator.slug}
                            href={`/hadith/${narrator.slug}`}
                            className="group glass p-6 rounded-2xl border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {narrator.name}
                                </h3>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-white/40 text-sm">Total Hadist: <span className="text-white/80 font-mono">{narrator.total.toLocaleString()}</span></p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
