import { AladhanResponse, PrayerData } from "../types/prayer";

const ALADHAN_BASE_URL = "https://api.aladhan.com/v1";

// Method 20 = Kementerian Agama Indonesia
const METHOD = 20;

export async function fetchPrayerTimesByCoords(
    lat: number,
    lng: number,
    date?: string
): Promise<PrayerData> {
    const today = date || new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

    const url = `${ALADHAN_BASE_URL}/timings/${today}?latitude=${lat}&longitude=${lng}&method=${METHOD}`;

    const res = await fetch(url, {
        next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch prayer times: ${res.status} ${res.statusText}`);
    }

    const json: AladhanResponse = await res.json();

    if (json.code !== 200) {
        throw new Error(`Aladhan API error: ${json.status}`);
    }

    return json.data;
}

export async function fetchPrayerTimesByCity(
    city: string,
    country: string = "Indonesia",
    date?: string
): Promise<PrayerData> {
    const today = date || new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

    const url = `${ALADHAN_BASE_URL}/timingsByCity/${today}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${METHOD}`;

    const res = await fetch(url, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch prayer times: ${res.status} ${res.statusText}`);
    }

    const json: AladhanResponse = await res.json();

    if (json.code !== 200) {
        throw new Error(`Aladhan API error: ${json.status}`);
    }

    return json.data;
}
