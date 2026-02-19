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
 * MyQuran V3 API Interfaces
 */
interface MyQuranV3CitySearchResponse {
    status: boolean;
    message: string;
    data: Array<{
        id: string; // Hash string in V3
        lokasi: string;
    }>;
}

interface MyQuranV3ScheduleResponse {
    status: boolean;
    message: string;
    data: {
        id: string;
        kabko: string;
        prov: string;
        jadwal: {
            [date: string]: { // Key is "YYYY-MM-DD" e.g "2026-02-19"
                tanggal: string;
                imsak: string;
                subuh: string;
                terbit: string;
                dhuha: string;
                dzuhur: string;
                ashar: string;
                maghrib: string;
                isya: string;
            }
        }
    };
}

/**
 * Fetch jadwal sholat berdasarkan nama kota
 * Hybrid: Menggunakan Aladhan untuk metadata/hijriah + MyQuran V3 (Kemenag) untuk akurasi waktu sholat Indonesia
 */
export async function fetchPrayerTimesByCity(
    citySlug: string,
    country: string = "Indonesia",
    date?: string
): Promise<AladhanData> {
    const todayRaw = date || getJakartaDate();
    const [y, m, d] = todayRaw.split("-");
    const today = `${d}-${m}-${y}`; // DD-MM-YYYY required by Aladhan
    const todayV3 = todayRaw; // YYYY-MM-DD required by MyQuran V3

    // 1. Fetch Basic Data from Aladhan (for Metadata, Hijri, etc.)
    const indoCity = getCityBySlug(citySlug);
    const aladhanUrl = `${ALADHAN_BASE}/timingsByCity/${today}?city=${encodeURIComponent(indoCity?.name || citySlug)}&country=${encodeURIComponent(country)}&method=${HIJRI_CONFIG.method}&school=0&adjustment=0`;

    // Fetch Aladhan in parallel with MyQuran search if possible, but sequential is easier to manage fallback
    let aladhanData: AladhanData;

    try {
        const res = await fetch(aladhanUrl, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error(`Aladhan API Error: ${res.status}`);
        const json = await res.json();
        aladhanData = json.data as AladhanData;
    } catch (e) {
        console.error("Aladhan fetch failed:", e);
        // If Aladhan fails completely, we can't easily construct the full object without mocking.
        throw e;
    }

    // 2. Try to fetch from MyQuran V3 (Kemenag/NU Standard) for Indonesian cities
    if (country === "Indonesia" || !country) {
        try {
            // A. Search City ID (V3)
            // Gunakan nama kota dari config jika ada, jika tidak gunakan slug (di-replace - dengan spasi)
            const keyword = indoCity?.name || citySlug.replace(/-/g, " ");
            const searchUrl = `https://api.myquran.com/v3/sholat/kabkota/cari/${encodeURIComponent(keyword)}`;

            const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } }); // Cache search longer
            const searchJson = await searchRes.json() as MyQuranV3CitySearchResponse;

            if (searchJson.status && searchJson.data && searchJson.data.length > 0) {
                // Prioritize "KOTA" if multiple results, otherwise take first
                const cityData = searchJson.data.find((c) => c.lokasi.startsWith("KOTA")) || searchJson.data[0];
                const cityId = cityData.id;

                // B. Fetch Schedule (V3)
                // V3 format: /sholat/jadwal/{cityId}/{yyyy-mm-dd}
                const scheduleUrl = `https://api.myquran.com/v3/sholat/jadwal/${cityId}/${todayV3}`;
                const scheduleRes = await fetch(scheduleUrl, { next: { revalidate: 3600 } });
                const scheduleJson = await scheduleRes.json(); // Type is dynamic because of date key

                if (scheduleJson.status && scheduleJson.data && scheduleJson.data.jadwal) {
                    const jadwalData = scheduleJson.data.jadwal;

                    // The key in 'jadwal' is the date string YYYY-MM-DD (todayV3)
                    // But sometimes it might be just 'jadwal': { ... } if fetching for specific date? 
                    // Based on documentation: "jadwal": { "2026-02-19": { ... } }
                    const j = jadwalData[todayV3] || jadwalData; // Handle potential variation

                    if (j && j.subuh) {
                        // C. Overwrite Aladhan Timings with MyQuran Data
                        aladhanData.timings.Fajr = j.subuh;
                        aladhanData.timings.Sunrise = j.terbit;
                        aladhanData.timings.Dhuhr = j.dzuhur;
                        aladhanData.timings.Asr = j.ashar;
                        aladhanData.timings.Maghrib = j.maghrib;
                        aladhanData.timings.Isha = j.isya;
                        aladhanData.timings.Imsak = j.imsak;
                        aladhanData.timings.Sunset = j.maghrib; // Sync Sunset with Maghrib

                        console.log(`[PrayerApi] Used MyQuran V3 data for ${citySlug} (ID: ${cityId})`);
                    }
                }
            }
        } catch (e) {
            console.warn(`[PrayerApi] MyQuran V3 fallback failed for ${citySlug}, using Aladhan default.`, e);
            // Continue with Aladhan data
        }
    }

    return aladhanData;
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
