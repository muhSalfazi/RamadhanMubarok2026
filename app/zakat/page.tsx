"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ZakatPage() {
    const [activeTab, setActiveTab] = useState<"fitrah" | "maal">("fitrah");

    // Zakat Fitrah State
    const [fitrahPeople, setFitrahPeople] = useState<number>(1);
    const [ricePrice, setRicePrice] = useState<number>(15000); // Default price per liter/kg approximation
    const [fitrahType, setFitrahType] = useState<"beras" | "uang">("uang");
    const [fitrahResult, setFitrahResult] = useState<number>(0);

    // Zakat Maal State
    const [goldPrice, setGoldPrice] = useState<number>(1000000); // 1jt/gram default
    const [assets, setAssets] = useState<number>(0);
    const [maalResult, setMaalResult] = useState<number>(0);
    const [isNishabReached, setIsNishabReached] = useState<boolean>(false);

    // Constants
    const FITRAH_LITER = 3.5;
    const FITRAH_KG = 2.5;
    const NISHAB_GOLD_GRAM = 85;

    // Calculate Fitrah
    useEffect(() => {
        // Kemenag standard: 2.5kg or 3.5 liter
        // We use price input as "Price per Liter/Kg equiv" basically price per unit used
        // Usually people input "Harga Beras per Liter" then we mult by 3.5. 
        // Or "Harga Beras per Kg" then we mult by 2.5.
        // To simplify, let's assume user inputs the price of the rice they eat (per Liter or Kg depending on their habit).
        // Common practice in IDR calculator is Price per Liter * 3.5 liters.

        // Let's use 3.5 Liter standard for 'uang' conversion as it is safer/more common in calculators text.
        // Total = People * 3.5 * RicePrice
        const total = fitrahPeople * 3.5 * ricePrice;
        setFitrahResult(total);
    }, [fitrahPeople, ricePrice]);

    // Calculate Maal
    useEffect(() => {
        const nishabValue = NISHAB_GOLD_GRAM * goldPrice;
        const reached = assets >= nishabValue;
        setIsNishabReached(reached);

        if (reached) {
            setMaalResult(assets * 0.025);
        } else {
            setMaalResult(0);
        }
    }, [assets, goldPrice]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white pb-32 relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

            {/* Header */}
            <div className="pt-8 px-6 pb-6 relative z-10">
                <Link href="/ibadah" className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-6 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali
                </Link>
                <h1 className="text-3xl font-bold mb-2">Kalkulator Zakat</h1>
                <p className="text-white/60 text-sm">Hitung kewajiban zakat Anda.</p>
            </div>

            {/* Tabs */}
            <div className="px-6 mb-8 relative z-10">
                <div className="flex p-1 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                    <button
                        onClick={() => setActiveTab("fitrah")}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === "fitrah"
                                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                                : "text-white/50 hover:text-white"
                            }`}
                    >
                        Zakat Fitrah
                    </button>
                    <button
                        onClick={() => setActiveTab("maal")}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === "maal"
                                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                                : "text-white/50 hover:text-white"
                            }`}
                    >
                        Zakat Maal
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 relative z-10 max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                    {activeTab === "fitrah" ? (
                        <motion.div
                            key="fitrah"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
                        >
                            <h2 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Zakat Fitrah (Jiwa)
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Jumlah Orang (Jiwa)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={fitrahPeople}
                                        onChange={(e) => setFitrahPeople(parseInt(e.target.value) || 0)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Harga Beras per Liter (Rp)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">Rp</span>
                                        <input
                                            type="number"
                                            value={ricePrice}
                                            onChange={(e) => setRicePrice(parseInt(e.target.value) || 0)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-white/40 mt-1">*Standar 3.5 Liter beras makanan pokok.</p>
                                </div>

                                <div className="border-t border-white/10 pt-6 mt-6">
                                    <p className="text-white/50 text-sm mb-1">Total Zakat yang harus dibayar:</p>
                                    <p className="text-3xl font-bold text-amber-400 font-mono tracking-tight">
                                        {formatCurrency(fitrahResult)}
                                    </p>
                                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-200/80 leading-relaxed">
                                        Perhitungan: {fitrahPeople} Orang x 3.5 Liter x {formatCurrency(ricePrice)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="maal"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
                        >
                            <h2 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Zakat Maal (Harta)
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Harga Emas per Gram Saat Ini (Rp)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">Rp</span>
                                        <input
                                            type="number"
                                            value={goldPrice}
                                            onChange={(e) => setGoldPrice(parseInt(e.target.value) || 0)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Total Harta (Uang/Tabungan/Emas)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">Rp</span>
                                        <input
                                            type="number"
                                            value={assets}
                                            onChange={(e) => setAssets(parseInt(e.target.value) || 0)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-white/40 mt-1">*Harta yang sudah tersimpan selama 1 tahun (Haul).</p>
                                </div>

                                <div className="border-t border-white/10 pt-6 mt-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-white/50 text-sm">Batas Nishab (85gr Emas):</p>
                                        <p className="text-white text-sm font-medium">{formatCurrency(NISHAB_GOLD_GRAM * goldPrice)}</p>
                                    </div>

                                    <p className="text-white/50 text-sm mb-1">Total Zakat (2.5%):</p>

                                    {isNishabReached ? (
                                        <p className="text-3xl font-bold text-amber-400 font-mono tracking-tight">
                                            {formatCurrency(maalResult)}
                                        </p>
                                    ) : (
                                        <div>
                                            <p className="text-2xl font-bold text-white/30 font-mono tracking-tight">
                                                Rp 0
                                            </p>
                                            <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded text-xs text-white/60">
                                                Belum wajib zakat (Belum mencapai nishab)
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
