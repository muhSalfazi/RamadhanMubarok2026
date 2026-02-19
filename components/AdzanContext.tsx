"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AdzanContextType {
    isAdzanEnabled: boolean;
    toggleAdzan: () => void;
    isPlaying: boolean;
    playAdzan: () => void;
    stopAdzan: () => void;
    audioError: string | null;
}

const AdzanContext = createContext<AdzanContextType | undefined>(undefined);

export function AdzanProvider({ children }: { children: React.ReactNode }) {
    const [isAdzanEnabled, setIsAdzanEnabled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioError, setAudioError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load preference from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("adzanEnabled");
        if (stored) {
            setIsAdzanEnabled(stored === "true");
        }
    }, []);

    const toggleAdzan = () => {
        const next = !isAdzanEnabled;
        setIsAdzanEnabled(next);
        localStorage.setItem("adzanEnabled", String(next));
        setAudioError(null);

        // Feedback sound
        if (next) {
            playFeedback();
        } else {
            stopAdzan();
        }
    };

    const playFeedback = () => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(528, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        } catch (e) { /* ignore */ }
    };

    const playAdzan = () => {
        if (!isAdzanEnabled) return;
        setAudioError(null);

        if (!audioRef.current) {
            // Use local file for reliability with cache busting
            audioRef.current = new Audio("/audio/adzan.mp3?v=1");

            // Error handling
            audioRef.current.onerror = () => {
                console.error("Audio source error, switching to backup...");
                // Try backup if primary fails
                if (audioRef.current) {
                    audioRef.current.src = "https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/mishary-rashid-alafasy/adhan/mishary-rashid-alafasy-adhan-01.mp3";
                    audioRef.current.play().catch(e => {
                        console.error("Backup audio error:", e);
                        setAudioError("Gagal memutar audio. File tidak ditemukan.");
                        setIsPlaying(false);
                    });
                }
            };

            audioRef.current.onended = () => setIsPlaying(false);
        }

        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch(error => {
                    console.error("Play Error:", error);
                    setAudioError("Browser memblokir autoplay. Silakan klik lagi.");
                    setIsPlaying(false);
                });
        }
    };

    const stopAdzan = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
    };

    return (
        <AdzanContext.Provider value={{ isAdzanEnabled, toggleAdzan, isPlaying, playAdzan, stopAdzan, audioError }}>
            {children}
        </AdzanContext.Provider>
    );
}

export function useAdzan() {
    const context = useContext(AdzanContext);
    if (!context) throw new Error("useAdzan must be used within AdzanProvider");
    return context;
}
