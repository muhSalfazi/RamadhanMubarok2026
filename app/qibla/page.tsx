
"use client";

import { useState } from "react";
import Link from "next/link";
import QiblaCompass from "../../components/QiblaCompass";
import { getQiblaDirection, QiblaData } from "../../lib/qiblaApi";

export default function QiblaPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [qiblaData, setQiblaData] = useState<QiblaData | null>(null);

    const handleLocateMe = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Geolocation tidak didukung browser Anda.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const data = await getQiblaDirection(position.coords.latitude, position.coords.longitude);
                    if (data) {
                        setQiblaData(data);
                    } else {
                        setError("Gagal mengambil data arah kiblat.");
                    }
                } catch (err) {
                    setError("Terjadi kesalahan koneksi.");
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setError("Gagal mendeteksi lokasi. Pastikan GPS aktif.");
                setLoading(false);
            }
        );
    };

    return (
        <div className="min-h-screen bg-neutral-950 relative overflow-hidden selection:bg-emerald-500/30">
            <div className="relative z-10 max-w-2xl mx-auto px-4 pt-10 pb-20 text-center">
                <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-8">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                </Link>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Arah Kiblat</h1>
                <p className="text-white/60 mb-8">Temukan arah kiblat akurat dari lokasi Anda saat ini.</p>

                {!qiblaData && !loading && (
                    <button
                        onClick={handleLocateMe}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-emerald-600 font-lg rounded-full hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 ring-offset-neutral-900"
                    >
                        <span className="mr-2 text-xl">📍</span> Cari Kiblat Saya
                        <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:scale-105 transition-transform" />
                    </button>
                )}

                {loading && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white/50 animate-pulse">Sedang mencari lokasi...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mt-4 max-w-md mx-auto">
                        <p>{error}</p>
                        <button onClick={handleLocateMe} className="text-sm underline mt-2 hover:text-red-300">Coba Lagi</button>
                    </div>
                )}

                {qiblaData && (
                    <div className="mt-8 anim-fade-up">
                        <QiblaCompass qiblaDirection={qiblaData.direction} />
                        <button
                            onClick={handleLocateMe}
                            className="mt-8 text-white/40 hover:text-white text-sm underline decoration-white/20"
                        >
                            Perbarui Lokasi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
