import Link from "next/link";
import StarParticles from "@/components/StarParticles";
import { DOA_RAMADHAN } from "@/lib/data/doa";

export default function DoaPage() {
    return (
        <main className="min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 ramadhan-bg" />
                <div className="absolute inset-0 islamic-pattern mix-blend-overlay opacity-30" />
                <StarParticles />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <header className="mb-12 text-center anim-fade-up">
                    <Link href="/karawang" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Doa-Doa Ramadhan</h1>
                    <p className="text-white/40">Kumpulan doa penting untuk ibadah puasa Anda</p>
                </header>

                {/* Categories */}
                <div className="space-y-12">
                    {/* Niat & Berbuka */}
                    <section className="anim-fade-up delay-1">
                        <h2 className="text-xl font-bold text-white/80 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm">01</span>
                            Niat & Berbuka
                        </h2>
                        <div className="grid gap-6">
                            {DOA_RAMADHAN.filter(d => d.category === "sholat").map((doa) => (
                                <div key={doa.id} className="glass p-6 md:p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <h3 className="text-lg font-bold text-emerald-300 mb-6 group-hover:text-emerald-200">{doa.title}</h3>
                                    <p className="font-arabic text-3xl leading-loose text-white text-right mb-6" dir="rtl">{doa.arab}</p>
                                    <p className="text-white/60 text-sm italic mb-3">{doa.latin}</p>
                                    <div className="h-px bg-white/10 w-full mb-3" />
                                    <p className="text-white/80 font-medium">"{doa.trans}"</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Lailatul Qadar */}
                    <section className="anim-fade-up delay-2">
                        <h2 className="text-xl font-bold text-white/80 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 text-sm" style={{ color: '#c9933a', background: 'rgba(201, 147, 58, 0.1)' }}>02</span>
                            Malam Lailatul Qadar
                        </h2>
                        <div className="grid gap-6">
                            {DOA_RAMADHAN.filter(d => d.category === "lailatul-qadar").map((doa) => (
                                <div key={doa.id} className="glass-gold p-6 md:p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <h3 className="text-lg font-bold text-gold-300 mb-6" style={{ color: '#e8b96a' }}>{doa.title}</h3>
                                    <p className="font-arabic text-3xl leading-loose text-white text-right mb-6" dir="rtl">{doa.arab}</p>
                                    <p className="text-white/60 text-sm italic mb-3">{doa.latin}</p>
                                    <div className="h-px bg-white/10 w-full mb-3" />
                                    <p className="text-white/80 font-medium">"{doa.trans}"</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Harian */}
                    <section className="anim-fade-up delay-3">
                        <h2 className="text-xl font-bold text-white/80 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm">03</span>
                            Doa Harian
                        </h2>
                        <div className="grid gap-6">
                            {DOA_RAMADHAN.filter(d => d.category === "harian").map((doa) => (
                                <div key={doa.id} className="glass p-6 md:p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <h3 className="text-lg font-bold text-white mb-6 group-hover:text-emerald-300 transition-colors">{doa.title}</h3>
                                    <p className="font-arabic text-3xl leading-loose text-white text-right mb-6" dir="rtl">{doa.arab}</p>
                                    <p className="text-white/60 text-sm italic mb-3">{doa.latin}</p>
                                    <div className="h-px bg-white/10 w-full mb-3" />
                                    <p className="text-white/80 font-medium">"{doa.trans}"</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <footer className="mt-12 text-center anim-fade opacity-40 hover:opacity-100 transition-opacity">
                    <p className="font-arabic text-xl mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    <p className="text-xs">
                        Semoga doa kita dikabulkan oleh Allah SWT.
                    </p>
                </footer>
            </div>
        </main>
    );
}
