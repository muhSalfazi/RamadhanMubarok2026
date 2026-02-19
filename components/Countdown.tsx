"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { PrayerTime } from "@/types/prayer";
import { useAdzan } from "./AdzanContext";

interface CountdownProps {
    prayers: PrayerTime[];
}

function parseTimeToMinutes(timeStr: string): number {
    const clean = timeStr.replace(/\s*\(.*\)/, "").trim();
    const [h, m] = clean.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
}

function getNextPrayerInfo(prayers: PrayerTime[]): { prayer: PrayerTime; index: number } {
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();
    for (let i = 0; i < prayers.length; i++) {
        if (parseTimeToMinutes(prayers[i].time) > cur) return { prayer: prayers[i], index: i };
    }
    return { prayer: prayers[0], index: 0 };
}

function getCurrentPrayerIndex(prayers: PrayerTime[]): number {
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();
    let idx = -1;
    for (let i = 0; i < prayers.length; i++) {
        if (parseTimeToMinutes(prayers[i].time) <= cur) idx = i;
    }
    return idx;
}

function getSecondsUntil(prayer: PrayerTime): number {
    const clean = prayer.time.replace(/\s*\(.*\)/, "").trim();
    const [h, m] = clean.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h || 0, m || 0, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
}

function DigitBox({ value }: { value: string }) {
    const prevRef = useRef(value);
    const changed = prevRef.current !== value;
    useEffect(() => { prevRef.current = value; }, [value]);

    return (
        <div className={`digit-box w-16 md:w-20 h-16 md:h-20 flex items-center justify-center transition-all duration-300 ${changed ? "scale-105" : ""}`}>
            <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">{value}</span>
        </div>
    );
}

export default function Countdown({ prayers }: CountdownProps) {
    const { playAdzan, isPlaying } = useAdzan(); // Global Adzan Context
    const [timeLeft, setTimeLeft] = useState<{ h: number, m: number, s: number } | null>(null);
    const [nextInfo, setNextInfo] = useState(() => getNextPrayerInfo(prayers));
    const [currentIdx, setCurrentIdx] = useState(() => getCurrentPrayerIndex(prayers));

    // Calculate target timestamp once to prevent drift
    const calculateTarget = useCallback(() => {
        const next = getNextPrayerInfo(prayers);
        const clean = next.prayer.time.replace(/\s*\(.*\)/, "").trim();
        const [h, m] = clean.split(":").map(Number);
        const now = new Date();
        const target = new Date();
        target.setHours(h || 0, m || 0, 0, 0);
        if (target <= now) target.setDate(target.getDate() + 1);
        return { target, next };
    }, [prayers]);

    useEffect(() => {
        let { target, next } = calculateTarget();
        setNextInfo(next);
        setCurrentIdx(getCurrentPrayerIndex(prayers));

        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.floor((target.getTime() - now.getTime()) / 1000);

            if (diff <= 0) {
                // Time up! Trigger Adzan and refresh
                playAdzan();
                const refreshed = calculateTarget();
                target = refreshed.target;
                setNextInfo(refreshed.next);
                setCurrentIdx(getCurrentPrayerIndex(prayers));
            } else {
                setTimeLeft({
                    h: Math.floor(diff / 3600),
                    m: Math.floor((diff % 3600) / 60),
                    s: diff % 60
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [prayers, calculateTarget, playAdzan]);

    const pad = (n: number) => String(n).padStart(2, "0");

    const currentPrayer = currentIdx >= 0 ? prayers[currentIdx] : null;

    // Calculate progress for the bar
    const now = new Date();
    const curMinutes = now.getHours() * 60 + now.getMinutes();
    const nextMinutes = parseTimeToMinutes(nextInfo.prayer.time);
    // Simple progress approximation (can be refined but enough for visual)
    // We'll use a fixed 4-hour window for the visual bar or relative to previous prayer
    const prevPrayerTime = currentIdx >= 0 ? prayers[currentIdx].time : "00:00";
    const prevMinutes = parseTimeToMinutes(prevPrayerTime);

    let totalWindow = nextMinutes - prevMinutes;
    if (totalWindow < 0) totalWindow += 24 * 60; // Cross midnight
    let elapsed = curMinutes - prevMinutes;
    if (elapsed < 0) elapsed += 24 * 60;

    const progressPerc = totalWindow > 0 ? Math.min(100, Math.max(0, (elapsed / totalWindow) * 100)) : 0;

    if (!timeLeft) return null; // Hydration safe

    return (
        <div className={`glass-strong p-6 md:p-8 anim-fade-up delay-2 relative overflow-hidden transition-all duration-1000 ${isPlaying ? "border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]" : ""}`}>
            {/* Decorative glow orb - Rotate when adzan playing */}
            <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none transition-all duration-[3000ms] ${isPlaying ? "animate-spin-slow opacity-50 scale-125" : "opacity-30"}`}
                style={{
                    background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)",
                    backgroundImage: isPlaying ? "conic-gradient(from 0deg, transparent, rgba(16,185,129,0.3), transparent)" : undefined
                }} />

            <div className="relative z-10">
                {/* Current prayer indicator */}
                {currentPrayer && (
                    <div className="flex items-center gap-2 mb-5">
                        <div className={`w-2 h-2 rounded-full bg-emerald-400 ${isPlaying ? "animate-ping" : "pulse-emerald"}`} />
                        <span className="text-emerald-400/70 text-sm font-medium">
                            {isPlaying ? `Adzan ${nextInfo.prayer.nameId} Berkumandang...` : `Waktu ${currentPrayer.nameId} sedang berlangsung`}
                        </span>
                    </div>
                )}

                {/* Label */}
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
                    Menuju Waktu Sholat
                </p>

                {/* Next prayer name */}
                <div className="flex items-baseline gap-3 mb-6">
                    <h2 className={`text-3xl md:text-4xl font-bold text-white ${isPlaying ? "animate-pulse" : ""}`}>
                        {nextInfo.prayer.nameId}
                    </h2>
                    <span className="font-arabic text-lg text-white/25" dir="rtl">
                        {nextInfo.prayer.nameAr}
                    </span>
                    <span className="text-white/30 text-sm ml-auto">
                        {nextInfo.prayer.time.replace(/\s*\(.*\)/, "")}
                    </span>
                </div>

                {/* Digit countdown */}
                <div className="flex items-center gap-2 md:gap-3">
                    <DigitBox value={pad(timeLeft.h)} />
                    <span className="text-white/25 text-3xl font-light pb-5">:</span>
                    <DigitBox value={pad(timeLeft.m)} />
                    <span className="text-white/25 text-3xl font-light pb-5">:</span>
                    <DigitBox value={pad(timeLeft.s)} />
                </div>

                {/* Labels */}
                <div className="flex gap-2 md:gap-3 mt-2 pl-0">
                    {["Jam", "Menit", "Detik"].map((label, i) => (
                        <div key={label} className="w-16 md:w-20 text-center">
                            <span className="text-white/25 text-xs">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="mt-6 h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-linear"
                        style={{
                            width: `${progressPerc}%`,
                            background: isPlaying ? "linear-gradient(90deg, #10b981, #facc15, #10b981)" : "linear-gradient(90deg, #10b981, #c9933a)",
                            backgroundSize: isPlaying ? "200% 100%" : "100% 100%",
                            animation: isPlaying ? "shimmer 2s infinite linear" : "none"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
