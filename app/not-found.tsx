import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-midnight relative overflow-hidden">
            <div className="absolute inset-0 ramadhan-bg opacity-50" />

            <div className="relative z-10 text-center anim-fade-up">
                <h1 className="text-9xl font-bold text-white/5">404</h1>

                <div className="mt-[-40px]">
                    <h2 className="text-2xl font-bold text-white mb-2">Halaman Tidak Ditemukan</h2>
                    <p className="text-white/40 max-w-sm mx-auto mb-8">
                        Maaf, halaman atau kota yang Anda cari tidak tersedia dalam database kami.
                    </p>

                    <Link
                        href="/karawang"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-premium shadow-lg shadow-emerald-500/20"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
