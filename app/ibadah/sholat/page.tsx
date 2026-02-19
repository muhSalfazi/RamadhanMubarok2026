"use client";

import Link from "next/link";
import { dzikirSholat } from "@/lib/dzikirData";
import DigitalTasbih from "@/components/DigitalTasbih";

export default function DzikirSholatPage() {
    return (
        <div className="min-h-screen bg-neutral-950 relative selection:bg-emerald-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-80">
                <header className="mb-8">
                    <Link href="/ibadah" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Menu
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dzikir Sholat Fardhu</h1>
                    <p className="text-white/60">Bacaan dzikir setelah sholat.</p>
                </header>

                <div className="grid gap-4">
                    {dzikirSholat.map((item) => (
                        <div key={item.id} className="glass p-5 md:p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group w-full overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-base font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                            </div>
                            <p className="font-arabic text-xl md:text-2xl text-right text-white leading-loose mb-3" dir="rtl">{item.arabic}</p>
                            <p className="text-cyan-500/80 italic text-xs md:text-sm mb-2">{item.latin}</p>
                            <p className="text-white/70 text-sm leading-relaxed">{item.translation}</p>
                            {item.note && <p className="text-white/30 text-xs mt-3 border-t border-white/5 pt-2">{item.note}</p>}
                        </div>
                    ))}
                </div>

                <DigitalTasbih />
            </div>
        </div>
    );
}
