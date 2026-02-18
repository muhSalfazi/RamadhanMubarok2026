"use client";

import { PrayerTime } from "@/types/prayer";
import PrayerCard from "./PrayerCard";

interface PrayerGridProps {
    prayers: PrayerTime[];
}

import { useState, useEffect } from "react";

function parseTimeToMinutes(timeStr: string): number {
    const clean = timeStr.replace(/\s*\(.*\)/, "").trim();
    const [h, m] = clean.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
}

export default function PrayerGrid({ prayers }: PrayerGridProps) {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [nextIndex, setNextIndex] = useState(-1);

    useEffect(() => {
        function updateState() {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            let active = -1;
            let next = 0;

            for (let i = 0; i < prayers.length; i++) {
                const pKv = parseTimeToMinutes(prayers[i].time);

                if (pKv <= currentMinutes) {
                    active = i;
                } else {
                    next = i;
                    break; // first one > current is next
                }
            }

            // If we passed Isya (active=4), next is Subuh (0) tomorrow
            if (active === 4) {
                next = 0;
            }

            setCurrentIndex(active);
            setNextIndex(next);
        }

        updateState();
        const interval = setInterval(updateState, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [prayers]);

    return (
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-5 px-1 anim-fade-up delay-3">
                <p className="text-white/30 text-xs uppercase tracking-widest font-medium">
                    Jadwal Sholat Hari Ini
                </p>
                <div className="h-px bg-white/10 flex-1 ml-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {prayers.map((prayer, i) => (
                    <PrayerCard
                        key={prayer.name}
                        prayer={prayer}
                        index={i}
                        isActive={i === currentIndex}
                        isNext={i === nextIndex && i !== currentIndex}
                    />
                ))}
            </div>
        </div>
    );
}
