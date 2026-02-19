"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DigitalTasbih() {
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState<number | null>(33); // null for infinity

    // Ensure count persists or resets on open? Let's persistence per session maybe not needed.
    // Let's keep it simple: reset on close or keep state. Keep state is better.

    // Vibration helper
    const vibrate = (pattern: number | number[]) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    const handleIncrement = () => {
        const nextCount = count + 1;
        setCount(nextCount);

        // Vibrate on every click (light)
        vibrate(10);

        // Vibrate on target (strong)
        if (target && nextCount % target === 0) {
            vibrate([50, 50, 50]);
        }
    };

    const handleReset = () => {
        setCount(0);
        vibrate(20);
    };

    return (
        <>
            {/* Floating Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 right-4 md:right-8 z-40 w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white border-2 border-white/20"
                >
                    {/* Tasbih Icon / Fingerprint / Tap Icon */}
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    {/* Optional: Small label or counter badge */}
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-neutral-900 font-bold">
                            {count > 99 ? '99+' : count}
                        </span>
                    )}
                </motion.button>
            )}

            {/* Floating Widget (Non-blocking) */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none flex justify-center pb-24 md:pb-8 px-4">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="pointer-events-auto bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-xs p-5 relative shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Background Pattern */}
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none" />

                            {/* Header */}
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Tasbih Digital
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Counter Display - Compact */}
                            <div
                                className="w-full h-32 rounded-2xl border-2 border-emerald-500/20 bg-emerald-900/10 flex flex-col items-center justify-center relative cursor-pointer active:scale-95 transition-transform mb-4 group select-none touch-manipulation overflow-hidden"
                                onClick={handleIncrement}
                            >
                                {/* Progress BG */}
                                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-300" style={{ width: `${Math.min(100, (count / (target || 33)) * 100)}%` }} />

                                <span className="text-5xl font-bold text-white font-mono tracking-tighter group-active:text-emerald-400 transition-colors">
                                    {count}
                                </span>
                                <span className="text-white/40 text-xs mt-1 font-medium tracking-widest uppercase">
                                    {target ? `Target: ${target}` : 'Infinity'}
                                </span>
                                <p className="text-white/20 text-[10px] absolute bottom-2">Tap area</p>
                            </div>

                            {/* Controls - Compact Row */}
                            <div className="flex items-center gap-2 relative z-10">
                                <button
                                    onClick={handleReset}
                                    title="Reset"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all active:scale-95 shrink-0"
                                >
                                    <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>

                                <select
                                    value={target || "infinity"}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setTarget(val === "infinity" ? null : parseInt(val));
                                        vibrate(10);
                                    }}
                                    className="flex-1 px-3 py-2.5 h-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                                >
                                    <option value="33" className="bg-neutral-900">Target 33</option>
                                    <option value="100" className="bg-neutral-900">Target 100</option>
                                    <option value="1000" className="bg-neutral-900">Target 1000</option>
                                    <option value="infinity" className="bg-neutral-900">Tanpa Batas</option>
                                </select>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
