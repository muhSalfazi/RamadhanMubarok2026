import { PrayerTime, PrayerTimings } from "@/types/prayer";

export const PRAYER_NAMES: PrayerTime[] = [
    { name: "Fajr", nameAr: "الفجر", nameId: "Subuh", time: "", icon: "🌙" },
    { name: "Dhuhr", nameAr: "الظهر", nameId: "Dzuhur", time: "", icon: "☀️" },
    { name: "Asr", nameAr: "العصر", nameId: "Ashar", time: "", icon: "🌤️" },
    { name: "Maghrib", nameAr: "المغرب", nameId: "Maghrib", time: "", icon: "🌅" },
    { name: "Isha", nameAr: "العشاء", nameId: "Isya", time: "", icon: "🌃" },
];

export function getPrayerTimes(timings: PrayerTimings): PrayerTime[] {
    return PRAYER_NAMES.map((p) => ({
        ...p,
        time: timings[p.name as keyof PrayerTimings] || "",
    }));
}

export function parseTime(timeStr: string): { hours: number; minutes: number } {
    const clean = timeStr.replace(/\s*\(.*\)/, "").trim();
    const [hours, minutes] = clean.split(":").map(Number);
    return { hours: hours || 0, minutes: minutes || 0 };
}

export function getNextPrayer(prayers: PrayerTime[]): { prayer: PrayerTime; index: number } | null {
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < prayers.length; i++) {
        const { hours, minutes } = parseTime(prayers[i].time);
        if (hours * 60 + minutes > cur) return { prayer: prayers[i], index: i };
    }
    return { prayer: prayers[0], index: 0 };
}

export function getCurrentPrayer(prayers: PrayerTime[]): number {
    const now = new Date();
    const cur = now.getHours() * 60 + now.getMinutes();
    let idx = -1;
    for (let i = 0; i < prayers.length; i++) {
        const { hours, minutes } = parseTime(prayers[i].time);
        if (hours * 60 + minutes <= cur) idx = i;
    }
    return idx;
}

export function getSecondsUntilNextPrayer(prayer: PrayerTime): number {
    const now = new Date();
    const { hours, minutes } = parseTime(prayer.time);
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
}

export function formatHijriDate(hijri: { day: string; month: { en: string; ar: string }; year: string }): string {
    return `${hijri.day} ${hijri.month.en} ${hijri.year} H`;
}

export function formatGregorianDate(gregorian: {
    day: string;
    month: { en: string };
    year: string;
    weekday: { en: string };
}): string {
    const DAYS_ID: Record<string, string> = {
        Sunday: "Ahad", Monday: "Senin", Tuesday: "Selasa",
        Wednesday: "Rabu", Thursday: "Kamis", Friday: "Jumat", Saturday: "Sabtu",
    };
    const MONTHS_ID: Record<string, string> = {
        January: "Januari", February: "Februari", March: "Maret",
        April: "April", May: "Mei", June: "Juni", July: "Juli",
        August: "Agustus", September: "September", October: "Oktober",
        November: "November", December: "Desember",
    };
    const day = DAYS_ID[gregorian.weekday.en] || gregorian.weekday.en;
    const month = MONTHS_ID[gregorian.month.en] || gregorian.month.en;
    return `${day}, ${gregorian.day} ${month} ${gregorian.year}`;
}
