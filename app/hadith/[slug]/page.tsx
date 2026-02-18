
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHadith } from "../../../lib/hadithApi";

interface PageProps {
    params: { slug: string };
    searchParams: { number?: string };
}

export async function generateMetadata({ params }: PageProps) {
    return {
        title: `Hadist Riwayat ${params.slug} - Ramadhan 2026`,
        description: `Baca hadist riwayat ${params.slug} lengkap dengan terjemahan bahasa Indonesia.`,
    };
}

export default async function HadithReadPage({ params, searchParams }: PageProps) {
    const number = parseInt(searchParams.number || "1");
    // Standardize slug (API assumes lowercase usually)
    const slug = params.slug.toLowerCase();

    const hadith = await getHadith(slug, number);

    if (!hadith) {
        return (
            <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-2xl font-bold text-white mb-2">Hadist Tidak Ditemukan</h1>
                <p className="text-white/60 mb-6">Nomor hadist ini mungkin tidak tersedia.</p>
                <Link href={`/hadith/${slug}`} className="text-emerald-400 hover:underline">Kembali ke awal</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 relative overflow-hidden selection:bg-emerald-500/30">
            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10 pb-20">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/hadith" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-2">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Daftar Perawi
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">{hadith.name}</h1>
                        <p className="text-white/40 text-sm">Hadist Nomor <span className="font-mono text-emerald-400">{hadith.contents.number}</span> dari {hadith.total}</p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-3">
                        {hadith.pagination.prev && (
                            <Link
                                href={`/hadith/${slug}?number=${hadith.pagination.prev}`}
                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400 text-white transition-all flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Prev
                            </Link>
                        )}

                        {/* Jump to number input could be added here as a client component */}

                        <Link
                            href={`/hadith/${slug}?number=${hadith.pagination.next}`}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400 text-white transition-all flex items-center"
                        >
                            Next
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </header>

                <div className="glass p-6 md:p-10 rounded-3xl border border-white/10">
                    <div className="mb-10 text-right">
                        <p className="font-arabic text-2xl md:text-4xl text-white leading-loose" dir="rtl">
                            {hadith.contents.arab}
                        </p>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <h3 className="text-emerald-400 font-bold mb-3 text-sm tracking-wider uppercase">Terjemahan</h3>
                        <p className="text-white/80 leading-relaxed text-lg">
                            {hadith.contents.id}
                        </p>
                    </div>
                </div>

                {/* Quick Jump Form - Simple implementation using standard form action */}
                <form className="mt-8 flex justify-center items-center gap-4 max-w-sm mx-auto">
                    <label className="text-white/40 text-sm">Lompat ke no:</label>
                    <input
                        type="number"
                        name="number"
                        placeholder={number.toString()}
                        className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-center focus:border-emerald-500 outline-none"
                    />
                    <button type="submit" className="p-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-500">
                        Go
                    </button>
                </form>
            </div>
        </div>
    );
}
