"use client";

import { useState } from "react";
import Link from "next/link";
import { Surah } from "../lib/quranApi";
import { JUZ_DATA } from "../lib/juzData";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface QuranBrowserProps {
    surahs: Surah[];
}

type Tab = "juz" | "surah";

export default function QuranBrowser({ surahs }: QuranBrowserProps) {
    const [activeTab, setActiveTab] = useState<Tab>("juz"); // Default user asked: "tampilkan per juz dulu dong"
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedJuz, setExpandedJuz] = useState<number | null>(null);

    // Filter Logic
    const filteredSurahs = surahs.filter(s =>
        s.name.transliteration.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.translation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(s.number).includes(searchQuery)
    );

    const toggleJuz = (juzId: number) => {
        setExpandedJuz(expandedJuz === juzId ? null : juzId);
    };

    // Helper to get Surahs in a specific Juz
    const getSurahsInJuz = (juzId: number) => {
        const juz = JUZ_DATA.find(j => j.id === juzId);
        if (!juz) return [];

        const startSurah = juz.start.surah;
        const endSurah = juz.end.surah;

        return surahs.filter(s => s.number >= startSurah && s.number <= endSurah);
    };

    return (
        <div className="space-y-8">
            {/* Search & Tabs */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Cari surat..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-white/20"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-black/20 p-1 rounded-xl w-full md:w-auto">
                    <button
                        onClick={() => setActiveTab("juz")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "juz"
                            ? "bg-emerald-500 text-white shadow-lg"
                            : "text-white/40 hover:text-white/70 hover:bg-white/5"
                            }`}
                    >
                        Juz View
                    </button>
                    <button
                        onClick={() => setActiveTab("surah")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "surah"
                            ? "bg-emerald-500 text-white shadow-lg"
                            : "text-white/40 hover:text-white/70 hover:bg-white/5"
                            }`}
                    >
                        All Surahs
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="anim-fade-up">
                {activeTab === "juz" ? (
                    /* JUZ VIEW */
                    <div className="grid gap-3">
                        {JUZ_DATA.map((juz) => (
                            <div key={juz.id} className="glass overflow-hidden rounded-xl border border-white/5">
                                <button
                                    onClick={() => toggleJuz(juz.id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold font-arabic">
                                            {juz.id}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">Juz {juz.id}</h3>
                                            <p className="text-white/30 text-xs">
                                                Mulai: QS. {juz.start.name} : {juz.start.ayat}
                                            </p>
                                        </div>
                                    </div>
                                    {expandedJuz === juz.id ? (
                                        <ChevronUp className="w-5 h-5 text-white/30" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-white/30" />
                                    )}
                                </button>

                                {/* Expanded Content: Surahs in this Juz */}
                                {expandedJuz === juz.id && (
                                    <div className="bg-black/20 p-3 border-t border-white/5 grid gap-2">
                                        <p className="px-2 text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">
                                            Daftar Surat di Juz {juz.id}
                                        </p>
                                        {getSurahsInJuz(juz.id).map(surah => (
                                            <Link
                                                key={surah.number}
                                                href={`/quran/${surah.number}`}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-white/20 text-sm font-mono w-6">{surah.number}.</span>
                                                    <div>
                                                        <p className="text-white text-sm font-medium group-hover:text-emerald-300 transition-colors">
                                                            {surah.name.transliteration.id}
                                                        </p>
                                                        <p className="text-white/30 text-[10px]">
                                                            {surah.name.translation.id} • {surah.numberOfVerses} Ayat
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="font-arabic text-lg text-white/50">{surah.name.short}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* SURAH GRID VIEW */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSurahs.length > 0 ? (
                            filteredSurahs.map((surah, index) => (
                                <Link
                                    key={surah.number}
                                    href={`/quran/${surah.number}`}
                                    className="glass p-5 rounded-xl hover:bg-white/10 transition-all group flex items-center gap-4"
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
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-white/30">
                                Tidak ada surat yang cocok dengan "<strong>{searchQuery}</strong>"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
