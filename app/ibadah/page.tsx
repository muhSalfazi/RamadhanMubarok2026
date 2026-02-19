"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const menuItems = [
    {
        title: "Doa Harian",
        description: "Kumpulan doa sehari-hari lengkap.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        href: "/ibadah/harian",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20"
    },
    {
        title: "Dzikir Sholat",
        description: "Bacaan dzikir setelah sholat fardhu.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
        ),
        href: "/ibadah/sholat",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20"
    },
    {
        title: "Dzikir Pagi & Petang",
        description: "Amalan dzikir pagi dan petang (Wirdul Latif).",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        href: "/ibadah/pagi-petang",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    },
    {
        title: "Kalkulator Zakat",
        description: "Hitung zakat fitrah & maal sesuai nishab.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        href: "/zakat",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    }
];

export default function DoaDashboard() {
    return (
        <div className="min-h-screen bg-neutral-950 relative selection:bg-emerald-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10 pb-40">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Menu Ibadah</h1>
                    <p className="text-white/60 text-lg">Kumpulan doa dan dzikir harian.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map((item, index) => (
                        <Link href={item.href} key={index} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`h-full p-6 rounded-2xl border ${item.bg} ${item.border} hover:bg-opacity-20 transition-all group-hover:scale-[1.02] flex items-center gap-6`}
                            >
                                <div className={`p-4 rounded-xl bg-white/5 ${item.color} shadow-lg`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
