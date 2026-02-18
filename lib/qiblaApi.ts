
export interface QiblaData {
    latitude: number;
    longitude: number;
    direction: number; // Angle from North
}

const BASE_URL = "https://api.aladhan.com/v1";

export async function getQiblaDirection(lat: number, lng: number): Promise<QiblaData | null> {
    try {
        const res = await fetch(`${BASE_URL}/qibla/${lat}/${lng}`, {
            next: { revalidate: 86400 } // Cache forever basically, qibla doesn't change
        });

        if (!res.ok) throw new Error("Failed to fetch Qibla");

        const json = await res.json();
        if (!json.data) return null;

        return {
            latitude: json.data.latitude,
            longitude: json.data.longitude,
            direction: json.data.direction
        };
    } catch (e) {
        console.error("Qibla fetch failed:", e);
        return null;
    }
}
