"use client";

import { useEffect } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function CityError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Ramadhan App Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-midnight relative overflow-hidden">
            <div className="absolute inset-0 ramadhan-bg opacity-50" />

            <div className="relative z-10 glass-strong p-8 max-w-md w-full text-center anim-fade-up">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">Gagal Memuat Data</h2>
                <p className="text-white/40 text-sm mb-6">
                    {error.message || "Terjadi kesalahan saat menghubungi server. Silakan coba beberapa saat lagi."}
                </p>

                <button
                    onClick={reset}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors shadow-lg shadow-emerald-500/20"
                >
                    Coba Lagi
                </button>

                <div className="mt-6 text-xs text-white/20">
                    Error Code: {error.digest || "UNKNOWN"}
                </div>
            </div>
        </div>
    );
}
