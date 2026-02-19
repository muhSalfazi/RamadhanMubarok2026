"use client";

import { motion } from "framer-motion";
import VisitorCounter from "./VisitorCounter";

export default function SignatureFooter() {
    return (
        <footer className="relative w-full z-10 bg-[#020617] border-t border-white/5 py-12 overflow-hidden mt-20">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-50" />

            <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center animate-pulse-slow">
                        <svg className="w-4 h-4 text-emerald-400/80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L9.19 8.63L2 9.24L7.46 14.15L5.82 21.16L12 17.5L18.18 21.16L16.54 14.15L22 9.24L14.81 8.63L12 2Z" />
                        </svg>
                    </div>

                    {/* Main Text */}
                    <div className="space-y-1">
                        <p className="text-white/80 text-sm md:text-base font-medium tracking-wide">
                            Marhaban Ya Ramadhan 1447 H
                        </p>
                    </div>

                    {/* Copyright & Quote */}
                    <div className="space-y-3">
                        <div className="h-px w-12 bg-white/10 mx-auto" />
                        <p className="text-emerald-500/60 text-xs italic font-arabic">
                            Dirancang & dikembangkan oleh muhSalfazi
                        </p>
                        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
                            © 2026 RamadhanMubarok
                        </p>
                        <VisitorCounter />
                    </div>
                </motion.div>
            </div >
        </footer >
    );
}
