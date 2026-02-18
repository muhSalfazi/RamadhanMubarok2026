export const KAABAH_COORDS = {
    lat: 21.422487,
    lng: 39.826206,
};

// Calculate bearing (qibla direction) from user coords to Kaabah
export function calculateQiblaDirection(latitude: number, longitude: number): number {
    const phiK = (KAABAH_COORDS.lat * Math.PI) / 180.0;
    const lambdaK = (KAABAH_COORDS.lng * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;

    const y = Math.sin(lambdaK - lambda);
    const x =
        Math.cos(phi) * Math.tan(phiK) -
        Math.sin(phi) * Math.cos(lambdaK - lambda);

    let qibla = Math.atan2(y, x);
    qibla = (qibla * 180.0) / Math.PI;

    return (qibla + 360) % 360;
}

// Calculate distance using Haversine formula
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d);
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

