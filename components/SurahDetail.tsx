"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Surah, Ayat } from "../lib/quranApi";
import StarParticles from "../components/StarParticles";
import MurotalPlayer from "../components/MurotalPlayer";

interface Props {
    surah: Surah;
    ayahs: Ayat[];
}

export default function SurahDetail({ surah, ayahs }: Props) {
    const [currentAyatIndex, setCurrentAyatIndex] = useState<number | null>(null);
    const searchParams = useSearchParams();

    const handlePlayAyat = (index: number) => {
        setCurrentAyatIndex(index);
    };

    const handleNext = () => {
        if (currentAyatIndex !== null && currentAyatIndex < ayahs.length - 1) {
            setCurrentAyatIndex(currentAyatIndex + 1);
        } else {
            setCurrentAyatIndex(null); // Stop at end
        }
    };

    const handlePrev = () => {
        if (currentAyatIndex !== null && currentAyatIndex > 0) {
            setCurrentAyatIndex(currentAyatIndex - 1);
        }
    };

    // Auto-scroll effect for Playback
    useEffect(() => {
        if (currentAyatIndex !== null) {
            const element = document.getElementById(`ayat-${currentAyatIndex}`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }, [currentAyatIndex]);

    // Initial scroll from URL query param (e.g. ?ayat=142)
    useEffect(() => {
        const ayatParam = searchParams.get('ayat');
        if (ayatParam) {
            const verseNumber = parseInt(ayatParam);
            // Verify if valid number
            if (!isNaN(verseNumber) && verseNumber > 0) {
                const index = verseNumber - 1; // 0-based index

                // Small delay to ensure render
                setTimeout(() => {
                    const element = document.getElementById(`ayat-${index}`);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });

                        // Visual cue
                        element.classList.add('ring-2', 'ring-emerald-500', 'bg-emerald-500/10');
                        setTimeout(() => {
                            element.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-500/10');
                        }, 2000);
                    }
                }, 100);
            }
        }
    }, [searchParams]);

    return (
        <main className="min-h-screen relative overflow-hidden selection:bg-emerald-500/30 pb-48">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 ramadhan-bg" />
                <div className="absolute inset-0 islamic-pattern mix-blend-overlay opacity-30" />
                <StarParticles />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-12">
                <header className="mb-12 text-center anim-fade-up">
                    <Link href="/quran" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Daftar Surat
                    </Link>
                    <div className="mb-4">
                        <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300 text-xs uppercase tracking-widest bg-emerald-500/5">
                            Surat ke-{surah.number} • {surah.revelation.id}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 font-serif">{surah.name.transliteration.id}</h1>
                    <p className="font-arabic text-3xl text-emerald-400 mt-2 mb-4">{surah.name.short}</p>
                    <p className="text-white/40">{surah.name.translation.id} • {surah.numberOfVerses} Ayat</p>
                </header>

                {/* Bismillah */}
                {surah.number !== 1 && surah.number !== 9 && (
                    <div className="text-center mb-12 anim-fade-up delay-1">
                        <p className="font-arabic text-3xl text-white/80">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    </div>
                )}

                <div className="space-y-6">
                    {ayahs.map((ayat, index) => {
                        const isPlaying = currentAyatIndex === index;
                        const isFocusMode = currentAyatIndex !== null;

                        // Focus Mode Logic:
                        // If something is playing...
                        // - Active card: Normal opacity, scaled up slightly
                        // - Inactive cards: Dimmed (opacity-30), blurred slightly
                        // If nothing playing: Normal opacity for all
                        let containerClasses = "glass p-6 md:p-8 rounded-2xl transition-all duration-700 ease-in-out ";

                        if (isFocusMode) {
                            if (isPlaying) {
                                containerClasses += "border-emerald-500/50 bg-emerald-900/20 shadow-[0_0_50px_rgba(16,185,129,0.15)] scale-[1.02] opacity-100 z-10";
                            } else {
                                containerClasses += "border-white/5 bg-white/5 opacity-30 scale-95 blur-[1px] grayscale-[0.5]";
                            }
                        } else {
                            containerClasses += "hover:bg-white/5 opacity-100";
                        }

                        return (
                            <div
                                key={ayat.number.inSurah}
                                id={`ayat-${index}`}
                                className={containerClasses}
                                onClick={() => handlePlayAyat(index)}
                            >
                                <div className="flex justify-between items-start mb-6 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${isPlaying ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                            {ayat.number.inSurah}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePlayAyat(index);
                                            }}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-white text-emerald-600' : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'}`}
                                        >
                                            {isPlaying ? (
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                            ) : (
                                                <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            )}
                                        </button>
                                    </div>

                                    <p className="font-arabic text-[32px] md:text-[48px] leading-[2.3] md:leading-[2.5] text-white text-right block w-full py-2 mb-4" dir="rtl">
                                        {ayat.text.arab}
                                    </p>
                                </div>

                                <div className="space-y-2 pl-12 border-l-2 border-white/5">
                                    <p className="text-emerald-400 text-sm italic opacity-80">{ayat.text.transliteration.en}</p>
                                    <p className="text-white/80 leading-relaxed">{ayat.translation.id}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {currentAyatIndex !== null && (
                <MurotalPlayer
                    title={`QS. ${surah.name.transliteration.id} : ${ayahs[currentAyatIndex].number.inSurah}`}
                    qari="Mishary Rashid Alafasy"
                    audioUrl={ayahs[currentAyatIndex].audio.primary}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </main>
    );
}
