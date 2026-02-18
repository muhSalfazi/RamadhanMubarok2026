
import { AladhanData } from "./prayerApi";

const BASE_URL = "https://equran.id/api/v2/sholat";

export interface EquranSchedule {
    tanggal: string; // "2026-02-19"
    imsak: string;
    subuh: string;
    terbit: string;
    dhuha: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
    date: string; // duplicate of tanggal?
}

export interface EquranResponse {
    code: number;
    message: string;
    data: {
        provinsi: string;
        kabkota: string;
        bulan: string;
        tahun: string;
        jadwal: EquranSchedule[];
    };
}

/**
 * Map Equran data format to AladhanData format for compatibility
 */
function mapEquranToAladhan(schedule: EquranSchedule, lat: number = 0, lng: number = 0, city: string = ""): AladhanData {
    const [y, m, d] = schedule.tanggal.split("-");
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));

    // Basic Hijri calculation or estimation (Equran doesn't seem to return Hijri date in this endpoint)
    // We might need to use a library or our hijri config offset. 
    // For now, allow the UI to handle hijri conversion via the existing `formatHijriDateId` 
    // which takes the Gregorian date and applies the offset.

    return {
        timings: {
            Fajr: schedule.subuh,
            Sunrise: schedule.terbit,
            Dhuhr: schedule.dzuhur,
            Asr: schedule.ashar,
            Sunset: schedule.maghrib, // Approximation
            Maghrib: schedule.maghrib,
            Isha: schedule.isya,
            Imsak: schedule.imsak,
            Midnight: "00:00", // Not provided
            Firstthird: "00:00",
            Lastthird: "00:00"
        },
        date: {
            timestamp: (date.getTime() / 1000).toString(),
            gregorian: {
                date: `${d}-${m}-${y}`,
                day: d,
                weekday: { en: date.toLocaleDateString('en-US', { weekday: 'long' }) },
                month: { number: parseInt(m), en: date.toLocaleDateString('en-US', { month: 'long' }) },
                year: y,
                designation: { abbreviated: "AD", expanded: "Anno Domini" }
            },
            hijri: {
                // Placeholder - will be formatted by UI helper
                date: "01-09-1447",
                day: "1",
                weekday: { en: "", ar: "" },
                month: { number: 9, en: "Ramadhan", ar: "رمضان" },
                year: "1447",
                designation: { abbreviated: "AH", expanded: "Anno Hegirae" },
                holidays: []
            }
        },
        meta: {
            latitude: lat,
            longitude: lng,
            timezone: "Asia/Jakarta",
            method: { id: 20, name: "Kemenag RI (Equran.id)" }
        }
    };
}

export async function fetchEquranSchedule(
    provinsi: string,
    kabkota: string,
    month: number = new Date().getMonth() + 1,
    year: number = new Date().getFullYear()
): Promise<AladhanData[]> {
    try {
        const res = await fetch(`${BASE_URL}/jadwal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                provinsi,
                kabkota,
                bulan: month,
                tahun: year
            }),
            next: { revalidate: 86400 } // Cache 24h
        });

        if (!res.ok) throw new Error(`Equran API Error: ${res.status}`);

        const json: EquranResponse = await res.json();
        if (json.code !== 200 || !json.data) throw new Error(`Equran API Error: ${json.message}`);

        return json.data.jadwal.map(s => mapEquranToAladhan(s, 0, 0, kabkota));

    } catch (error) {
        console.error("Fetch Equran Failed:", error);
        throw error;
    }
}
