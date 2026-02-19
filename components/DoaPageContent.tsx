
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Doa } from "../lib/doaApi";

// Helper for fuzzy search or just simple includes
function filterDoas(doas: Doa[], query: string, group: string): Doa[] {
    const q = query.toLowerCase();
    return doas.filter(doa => {
        const matchQuery = !q ||
            doa.nama.toLowerCase().includes(q) ||
            doa.idn.toLowerCase().includes(q) ||
            doa.tr.toLowerCase().includes(q) ||
            (Array.isArray(doa.tag) ? doa.tag.some((t: string) => t.toLowerCase().includes(q)) : (typeof doa.tag === 'string' && doa.tag.toLowerCase().includes(q)));

        const matchGroup = !group || doa.grup === group;
        return matchQuery && matchGroup;
    });
}

export default function DoaPageContent({ initialDoas }: { initialDoas: Doa[] }) {
    const [search, setSearch] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    // Extract unique groups
    const groups = useMemo(() => {
        const g = new Set(initialDoas.map(d => d.grup));
        return Array.from(g).sort();
    }, [initialDoas]);

    const filtered = useMemo(() => filterDoas(initialDoas, search, selectedGroup), [initialDoas, search, selectedGroup]);

    return (
        <div className="min-h-screen bg-neutral-950 relative selection:bg-emerald-500/30">
            {/* Background elements would be here (reusing from layout/home if global) */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-80">
                <header className="mb-8">
                    <Link href="/ibadah" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Menu
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Kumpulan Doa Harian</h1>
                    <p className="text-white/60">Sumber: Equran.id</p>
                </header>

                {/* Search & Filter */}
                <div className="mb-8 space-y-4 md:space-y-0 md:flex gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Cari doa (nama, arti, tag)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className="w-full md:w-64 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-all [&>option]:bg-neutral-900"
                    >
                        <option value="">Semua Kategori</option>
                        {groups.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {filtered.length > 0 ? (
                        filtered.map((doa) => (
                            <div key={doa.id} className="glass p-5 md:p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group w-full overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-base font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors break-words max-w-[70%]">{doa.nama}</h3>
                                    <span className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-white/40 whitespace-nowrap">{doa.grup}</span>
                                </div>
                                <p className="font-arabic text-lg md:text-xl text-right text-white leading-loose mb-3 break-words whitespace-pre-wrap max-w-full" dir="rtl">{doa.ar}</p>
                                <p className="text-emerald-500/80 italic text-[10px] md:text-xs mb-1 break-words whitespace-pre-wrap max-w-full">{doa.tr}</p>
                                <p className="text-white/70 text-xs leading-relaxed break-words whitespace-pre-wrap max-w-full">{doa.idn}</p>
                                {doa.tentang && <p className="text-white/30 text-[10px] mt-3 border-t border-white/5 pt-2 break-words max-w-full">{doa.tentang}</p>}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-white/40">
                            <p>Tidak ditemukan doa yang sesuai.</p>
                        </div>
                    )}
                </div>

                {/* Spacer for bottom nav */}
                <div className="h-32 w-full"></div>
            </div>
        </div>
    );
}
