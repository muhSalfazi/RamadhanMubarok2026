import { HIJRI_CONFIG } from "./hijriConfig";

const ALADHAN_BASE = "https://api.aladhan.com/v1";

export interface AladhanTimings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
    [key: string]: string;
}

export interface AladhanDate {
    hijri: {
        date: string;
        day: string;
        month: { number: number; en: string; ar: string };
        year: string;
        weekday: { en: string; ar: string };
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
    };
    gregorian: {
        date: string;
        day: string;
        month: { number: number; en: string };
        year: string;
        weekday: { en: string };
        designation: { abbreviated: string; expanded: string };
    };
    timestamp: string;
}

export interface AladhanData {
    timings: AladhanTimings;
    date: AladhanDate;
    meta: {
        latitude: number;
        longitude: number;
        timezone: string;
        method: { id: number; name: string };
    };
}

/**
 * Fetch jadwal sholat berdasarkan koordinat GPS
 * Menggunakan metode Kemenag RI (method=20)
 * ISR: revalidate setiap 1 jam
 */
export async function fetchPrayerTimesByCoords(
    lat: number,
    lng: number,
    date?: string
): Promise<AladhanData> {
    const today = date || new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    const url = `${ALADHAN_BASE}/timings/${today}?latitude=${lat}&longitude=${lng}&method=${HIJRI_CONFIG.method}&school=1&tune=0,0,0,0,0,0,0,0,0`;

    const res = await fetch(url, {
        next: { revalidate: 3600 }, // ISR: revalidate setiap 1 jam
    });

    if (!res.ok) {
        // Fallback ke method 11 jika method 20 tidak tersedia
        const fallbackUrl = `${ALADHAN_BASE}/timings/${today}?latitude=${lat}&longitude=${lng}&method=${HIJRI_CONFIG.methodFallback}&school=1`;
        const fallbackRes = await fetch(fallbackUrl, {
            next: { revalidate: 3600 },
        });
        if (!fallbackRes.ok) {
            throw new Error(`Gagal mengambil data jadwal sholat (${res.status})`);
        }
        const fallbackJson = await fallbackRes.json();
        return fallbackJson.data as AladhanData;
    }

    const json = await res.json();
    return json.data as AladhanData;
}

/**
 * Fetch jadwal sholat berdasarkan nama kota
 */
export async function fetchPrayerTimesByCity(
    city: string,
    country: string = "Indonesia",
    date?: string
): Promise<AladhanData> {
    const today = date || new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    const url = `${ALADHAN_BASE}/timingsByCity/${today}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${HIJRI_CONFIG.method}&school=1`;

    const res = await fetch(url, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Gagal mengambil data untuk kota ${city} (${res.status})`);
    }

    const json = await res.json();
    return json.data as AladhanData;
}
