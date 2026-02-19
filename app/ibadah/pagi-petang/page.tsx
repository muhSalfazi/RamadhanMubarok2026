"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { wirdulLatifPagi, wirdulLatifPetang } from "@/lib/wirdulLatifData";
import DigitalTasbih from "@/components/DigitalTasbih";

export default function DzikirPagiPetangPage() {
    const [activeTab, setActiveTab] = useState<"pagi" | "petang">("pagi");

    const data = activeTab === "pagi" ? wirdulLatifPagi : wirdulLatifPetang;
    const themeColor = activeTab === "pagi" ? "emerald" : "amber"; // amber for sunset/petang

    return (
        <div className="min-h-screen bg-neutral-950 relative selection:bg-emerald-500/30">
            {/* Background elements */}
            <div className={`fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] ${activeTab === 'pagi' ? 'from-emerald-900/20' : 'from-amber-900/20'} via-neutral-950 to-neutral-950 pointer-events-none transition-colors duration-700`} />

            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-80">
                <header className="mb-8">
                    <Link href="/ibadah" className={`inline-flex items-center ${activeTab === 'pagi' ? 'text-emerald-400 hover:text-emerald-300' : 'text-amber-400 hover:text-amber-300'} transition-colors mb-4`}>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Menu
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dzikir Pagi & Petang</h1>
                    <p className="text-white/60">Bacaan Wirdul Latif yang dibaca waktu pagi dan sore.</p>
                </header>

                {/* Tabs */}
                <div className="flex p-1 bg-white/5 rounded-xl mb-8 w-fit mx-auto md:mx-0 border border-white/5">
                    <button
                        onClick={() => setActiveTab("pagi")}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${activeTab === "pagi" ? "text-white" : "text-white/40 hover:text-white/60"}`}
                    >
                        {activeTab === "pagi" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/20"
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            Dzikir Pagi
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("petang")}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${activeTab === "petang" ? "text-white" : "text-white/40 hover:text-white/60"}`}
                    >
                        {activeTab === "petang" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-amber-500 rounded-lg shadow-lg shadow-amber-500/20"
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            Dzikir Petang
                        </span>
                    </button>
                </div>

                <div className="grid gap-4">
                    <AnimatePresence mode="wait">
                        {data.map((item) => (
                            <motion.div
                                key={item.id + activeTab} // Unique key to force re-render/animate on tab switch
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`glass p-5 md:p-6 rounded-2xl border border-white/5 ${activeTab === 'pagi' ? 'hover:border-emerald-500/30' : 'hover:border-amber-500/30'} transition-all group w-full overflow-hidden`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className={`text-base font-bold ${activeTab === 'pagi' ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-amber-400 group-hover:text-amber-300'} transition-colors`}>{item.title}</h3>
                                </div>
                                <p className="font-arabic text-xl md:text-2xl text-right text-white leading-loose mb-3" dir="rtl">{item.arabic}</p>
                                <p className={`${activeTab === 'pagi' ? 'text-emerald-500/80' : 'text-amber-500/80'} italic text-xs md:text-sm mb-2`}>{item.latin}</p>
                                <p className="text-white/70 text-sm leading-relaxed">{item.translation}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <DigitalTasbih />
            </div>
        </div>
    );
}
