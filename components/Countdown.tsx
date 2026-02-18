"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { PrayerTime } from "@/types/prayer";

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
    const [secs, setSecs] = useState(0);
    const [nextInfo, setNextInfo] = useState(() => getNextPrayerInfo(prayers));
    const [currentIdx, setCurrentIdx] = useState(() => getCurrentPrayerIndex(prayers));

    const refresh = useCallback(() => {
        const next = getNextPrayerInfo(prayers);
        setNextInfo(next);
        setCurrentIdx(getCurrentPrayerIndex(prayers));
        setSecs(getSecondsUntil(next.prayer));
    }, [prayers]);

    useEffect(() => {
        refresh();
        const id = setInterval(() => {
            setSecs((prev) => {
                if (prev <= 1) { refresh(); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [refresh]);

    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n: number) => String(n).padStart(2, "0");

    const currentPrayer = currentIdx >= 0 ? prayers[currentIdx] : null;
    // Progress: how far through the ~6h window between prayers
    const totalSecs = 6 * 3600;
    const progress = Math.min(100, Math.max(2, ((totalSecs - secs) / totalSecs) * 100));

    return (
        <div className="glass-strong p-6 md:p-8 anim-fade-up delay-2 relative overflow-hidden">
            {/* Decorative glow orb */}
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)" }} />

            <div className="relative z-10">
                {/* Current prayer indicator */}
                {currentPrayer && (
                    <div className="flex items-center gap-2 mb-5">
                        <div className="pulse-emerald w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-emerald-400/70 text-sm font-medium">
                            Waktu {currentPrayer.nameId} sedang berlangsung
                        </span>
                    </div>
                )}

                {/* Label */}
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
                    Menuju Waktu Sholat
                </p>

                {/* Next prayer name */}
                <div className="flex items-baseline gap-3 mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
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
                    <DigitBox value={pad(h)} />
                    <span className="text-white/25 text-3xl font-light pb-5">:</span>
                    <DigitBox value={pad(m)} />
                    <span className="text-white/25 text-3xl font-light pb-5">:</span>
                    <DigitBox value={pad(s)} />
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
                            width: `${progress}%`,
                            background: "linear-gradient(90deg, #10b981, #c9933a)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
