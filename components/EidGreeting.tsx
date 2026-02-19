"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function EidGreeting() {
    return (
        <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-6 sm:p-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-md shadow-2xl anim-fade-up">

            {/* Background Ornaments */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-400/10 blur-[80px] rounded-full mix-blend-screen" />

                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 islamic-pattern opacity-[0.03]" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">

                {/* Greeting Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 text-xs font-medium tracking-widest uppercase">
                        1 Syawal 1447 H
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="font-arabic text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-tight py-2">
                    عيد مبارك
                </h1>

                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Selamat Hari Raya <span className="text-emerald-400">Idul Fitri</span>
                </h2>

                <p className="text-lg text-white/70 leading-relaxed max-w-lg mx-auto">
                    Taqabbalallahu Minna Wa Minkum. <br />
                    Semoga Allah menerima amal ibadah puasa kita dan menjadikan kita kembali dalam keadaan suci.
                </p>

                <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
                    <Link
                        href="/ibadah"
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xl">🕌</span>
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-white/50 uppercase tracking-wider">Lanjutkan</p>
                            <p className="text-white font-medium">Ibadah Harian</p>
                        </div>
                    </Link>

                    <Link
                        href="/quran"
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-xl">📖</span>
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-white/50 uppercase tracking-wider">Baca</p>
                            <p className="text-white font-medium">Al-Qur'an</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
