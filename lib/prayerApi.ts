import { HIJRI_CONFIG, getJakartaDate } from "./hijriConfig";
import { INDONESIAN_CITIES, getCityBySlug } from "./cities";
// import { fetchEquranSchedule } from "./equranApi";

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

// Bounding box for Indonesia (rough approximation)
function isCoordinatesInIndonesia(lat: number, lng: number): boolean {
    return (lat >= -11 && lat <= 6) && (lng >= 95 && lng <= 141);
}

// Find nearest Indonesian city from cities.ts
function findNearestCity(lat: number, lng: number): { city: typeof INDONESIAN_CITIES[0], distance: number } | null {
    let nearest = null;
    let minDist = Infinity;

    for (const city of INDONESIAN_CITIES) {
        if (!city.kabkota || !city.provinsi) continue;
        const d = Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2));
        if (d < minDist) {
            minDist = d;
            nearest = city;
        }
    }
    return nearest ? { city: nearest, distance: minDist } : null;
}

/**
 * Fetch jadwal sholat berdasarkan koordinat GPS
 */
export async function fetchPrayerTimesByCoords(
    lat: number,
    lng: number,
    date?: string
): Promise<AladhanData> {
    const todayRaw = date || getJakartaDate(); // YYYY-MM-DD
    const [y, m, d] = todayRaw.split("-");

    // Check if in Indonesia - DEPRECATED: User requested Aladhan only
    /*
    if (isCoordinatesInIndonesia(lat, lng)) {
        // Find nearest city to map to Equran kabkota
        const match = findNearestCity(lat, lng);
        if (match && match.city.provinsi && match.city.kabkota) {
            try {
                // Fetch from Equran
                const schedule = await fetchEquranSchedule(match.city.provinsi, match.city.kabkota, parseInt(m), parseInt(y));
                // Find today's data
                const todayData = schedule.find(s => s.date.gregorian.date === `${d}-${m}-${y}`);
                if (todayData) return todayData;
            } catch (e) {
                console.error("Equran fallback to Aladhan:", e);
                // Fallback to Aladhan if Equran fails
            }
        }
    }
    */

    // Default: Aladhan
    const today = `${d}-${m}-${y}`; // DD-MM-YYYY required by Aladhan
    const url = `${ALADHAN_BASE}/timings/${today}?latitude=${lat}&longitude=${lng}&method=${HIJRI_CONFIG.method}&school=0&adjustment=0&tune=0,0,0,0,0,0,0,0,0`;

    const res = await fetch(url, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        const fallbackUrl = `${ALADHAN_BASE}/timings/${today}?latitude=${lat}&longitude=${lng}&method=${HIJRI_CONFIG.methodFallback}&school=0&adjustment=0`;
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
    citySlug: string,
    country: string = "Indonesia",
    date?: string
): Promise<AladhanData> {
    const todayRaw = date || getJakartaDate();
    const [y, m, d] = todayRaw.split("-");

    // Check if Indonesian city
    // Check if Indonesian city - DEPRECATED: User requested Aladhan only
    /*
    const indoCity = getCityBySlug(citySlug);
    if (indoCity && indoCity.country === "Indonesia" && indoCity.provinsi && indoCity.kabkota) {
        try {
            const schedule = await fetchEquranSchedule(indoCity.provinsi, indoCity.kabkota, parseInt(m), parseInt(y));
            const todayData = schedule.find(s => s.date.gregorian.date === `${d}-${m}-${y}`);
            if (todayData) return todayData;
        } catch (e) {
            console.error("Equran fallback to Aladhan:", e);
        }
    }
    */
    const indoCity = getCityBySlug(citySlug);

    const today = `${d}-${m}-${y}`;
    const url = `${ALADHAN_BASE}/timingsByCity/${today}?city=${encodeURIComponent(indoCity?.name || citySlug)}&country=${encodeURIComponent(country)}&method=${HIJRI_CONFIG.method}&school=0&adjustment=0`;

    const res = await fetch(url, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Gagal mengambil data untuk kota ${citySlug} (${res.status})`);
    }

    const json = await res.json();
    return json.data as AladhanData;
}

/**
 * Fetch jadwal sholat satu bulan penuh berdasarkan koordinat
 */
export async function fetchMonthlyPrayerTimesByCoords(
    lat: number,
    lng: number,
    month: number,
    year: number
): Promise<AladhanData[]> {

    /*
    if (isCoordinatesInIndonesia(lat, lng)) {
        const match = findNearestCity(lat, lng);
        if (match && match.city.provinsi && match.city.kabkota) {
            try {
                return await fetchEquranSchedule(match.city.provinsi, match.city.kabkota, month, year);
            } catch (e) {
                console.error("Equran monthly fallback to Aladhan:", e);
            }
        }
    }
    */

    const url = `${ALADHAN_BASE}/calendar/${year}/${month}?latitude=${lat}&longitude=${lng}&method=${HIJRI_CONFIG.method}&school=0&adjustment=0&tune=0,0,0,0,0,0,0,0,0`;

    const res = await fetch(url, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Gagal mengambil data jadwal sholat bulanan (${res.status})`);
    }

    const json = await res.json();
    return json.data as AladhanData[];
}

/**
 * Fetch jadwal sholat satu bulan penuh berdasarkan kota
 */
export async function fetchMonthlyPrayerTimesByCity(
    city: string,
    country: string = "Indonesia",
    month: number,
    year: number
): Promise<AladhanData[]> {

    // Attempt to match slug or name to our list
    // Note: 'city' arg here might be slug or name. Assuming slug if from app/[city]
    const indoCity = getCityBySlug(city) || INDONESIAN_CITIES.find(c => c.name.toLowerCase() === city.toLowerCase());

    /*
    if (indoCity && indoCity.country === "Indonesia" && indoCity.provinsi && indoCity.kabkota) {
        try {
            return await fetchEquranSchedule(indoCity.provinsi, indoCity.kabkota, month, year);
        } catch (e) {
            console.error("Equran monthly fallback to Aladhan:", e);
        }
    }
    */

    const url = `${ALADHAN_BASE}/calendarByCity/${year}/${month}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${HIJRI_CONFIG.method}&school=0&adjustment=0`;

    const res = await fetch(url, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Gagal mengambil data jadwal sholat bulanan kota ${city} (${res.status})`);
    }

    const json = await res.json();
    return json.data as AladhanData[];
}
