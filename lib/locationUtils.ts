import { INDONESIAN_CITIES } from "./cities";
import { City } from "@/types/prayer";

/**
 * Sanitasi slug kota — hanya huruf, angka, dan tanda hubung
 * Mencegah path traversal dan script injection
 */
export function sanitizeCitySlug(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 50); // batas panjang
}

/**
 * Cari kota terdekat dari koordinat GPS
 */
export function findNearestCity(lat: number, lng: number): City {
    let nearest = INDONESIAN_CITIES[0];
    let minDist = Infinity;

    for (const city of INDONESIAN_CITIES) {
        // Haversine approximation (cukup akurat untuk jarak kota)
        const dlat = city.lat - lat;
        const dlng = city.lng - lng;
        const dist = Math.sqrt(dlat * dlat + dlng * dlng);
        if (dist < minDist) {
            minDist = dist;
            nearest = city;
        }
    }

    return nearest;
}

/**
 * Reverse geocoding menggunakan Nominatim OpenStreetMap (gratis, tanpa API key)
 * Hanya dijalankan di client side
 */
// Tipe hasil geocoding yang lebih detail
export interface LocationResult {
    displayName: string; // Nama detail: Duren, Karawang
    city: string;        // Nama kota untuk jadwal sholat: Karawang
}

export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<LocationResult | null> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`,
            {
                headers: {
                    "User-Agent": "RamadhanApp/2026 (contact@example.com)",
                },
            }
        );
        if (!res.ok) return null;
        const data = await res.json();
        const addr = data.address || {};

        // 1. Ambil kota utama untuk query jadwal sholat (City/Regency)
        const city =
            addr.city ||
            addr.town ||
            addr.municipality ||
            addr.regency ||
            addr.county ||
            addr.state_district ||
            "";

        // 2. Susun nama detail untuk display UI
        // Prioritas: Village/Suburb > District > City
        const parts = [];
        if (addr.village) parts.push(addr.village);
        else if (addr.suburb) parts.push(addr.suburb);
        else if (addr.hamlet) parts.push(addr.hamlet);

        if (addr.city_district) parts.push(addr.city_district);
        else if (addr.district) parts.push(addr.district);

        // Selalu akhiri dengan kota/kabupaten jika ada
        if (city && !parts.join("").includes(city)) {
            parts.push(city.replace(/^(Kota|Kabupaten)\s+/i, ""));
        }

        const displayName = parts.length > 0 ? parts.join(", ") : city;

        return {
            displayName,
            city
        };
    } catch {
        return null;
    }
}

/**
 * Dapatkan koordinat user via Geolocation API
 */
export function getUserCoordinates(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Browser tidak mendukung geolokasi"));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            (err) => {
                const messages: Record<number, string> = {
                    1: "Izin lokasi ditolak oleh pengguna",
                    2: "Posisi tidak tersedia",
                    3: "Waktu permintaan habis",
                };
                reject(new Error(messages[err.code] || "Gagal mendapatkan lokasi"));
            },
            { timeout: 10000, maximumAge: 300000, enableHighAccuracy: false }
        );
    });
}
