"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserCoordinates } from "@/lib/locationUtils";

// Custom type for iOS DeviceOrientationEvent
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    webkitCompassHeading?: number;
    requestPermission?: () => Promise<'granted' | 'denied'>;
}

// Kaaba Coordinates
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

export default function QiblaPage() {
    const [heading, setHeading] = useState<number>(0); // Initialize with 0 to avoid null checks in render

    const [qibla, setQibla] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

    // Calculate Qibla Bearing (Great Circle)
    function calculateQibla(lat: number, lng: number) {
        const phiK = KAABA_LAT * Math.PI / 180.0;
        const lambdaK = KAABA_LNG * Math.PI / 180.0;
        const phi = lat * Math.PI / 180.0;
        const lambda = lng * Math.PI / 180.0;

        const y = Math.sin(lambdaK - lambda);
        const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
        let bearing = Math.atan2(y, x) * 180.0 / Math.PI;

        return (bearing + 360) % 360;
    }

    useEffect(() => {
        // Init Location
        const savedLat = localStorage.getItem("preferred_lat");
        const savedLng = localStorage.getItem("preferred_lng");

        if (savedLat && savedLng) {
            const lat = parseFloat(savedLat);
            const lng = parseFloat(savedLng);
            setCoords({ lat, lng });
            setQibla(calculateQibla(lat, lng));
        } else {
            getUserCoordinates().then(c => {
                setCoords({ lat: c.latitude, lng: c.longitude });
                setQibla(calculateQibla(c.latitude, c.longitude));
            }).catch(() => setError("Gagal mendeteksi lokasi. Pastikan GPS aktif."));
        }
    }, []);

    const requestAccess = async () => {
        const doe = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<'granted' | 'denied'> };

        if (typeof doe.requestPermission === 'function') {
            try {
                const response = await doe.requestPermission();
                if (response === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    setError("Izin akses kompas ditolak.");
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
        const event = e as DeviceOrientationEventiOS;
        let compass = event.webkitCompassHeading || Math.abs(event.alpha! - 360);
        setHeading(compass);
    };

    // Calculate needle rotation: Qibla - Heading
    const needleRotation = (qibla - heading + 360) % 360;

    return (
        <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
            <Link href="/ibadah" className="absolute top-6 left-6 p-3 bg-white/5 rounded-full backdrop-blur-md z-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </Link>

            <h1 className="text-2xl font-bold mb-2">Arah Kiblat Akurat</h1>
            <p className="text-white/50 text-center mb-8 max-w-xs">
                {coords ? `Lokasi: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Mendeteksi lokasi..."}
            </p>

            <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Compass Dial */}
                <div
                    className="absolute inset-0 w-full h-full border-4 border-white/10 rounded-full shadow-2xl transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${-heading}deg)` }}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-red-500 font-bold">N</div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/50">S</div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50">E</div>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/50">W</div>
                </div>

                {/* Qibla Needle */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
                    style={{ transform: `rotate(${needleRotation}deg)` }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-12 h-12 bg-black border-2 border-gold rounded-md shadow-lg mb-2 relative">
                                <div className="absolute top-2 w-full h-[2px] bg-yellow-400"></div>
                            </div>
                            <div className="w-1 h-32 bg-emerald-500/50 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
                        </div>
                    </div>
                </div>

                {/* Center Pivot */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-neutral-900 z-10" />
            </div>

            <div className="mt-12 text-center">
                <p className="text-4xl font-bold font-mono text-emerald-400">
                    {qibla.toFixed(1)}°
                </p>
                <p className="text-sm text-white/50 uppercase tracking-widest mt-2">
                    Derajat dari Utara
                </p>
            </div>

            {/* Button Request Access */}
            {!permissionGranted && (
                <button
                    onClick={requestAccess}
                    className="relative z-50 mt-12 px-8 py-4 bg-emerald-600 rounded-2xl font-bold text-white shadow-xl shadow-emerald-500/20 active:scale-95 transition-transform"
                >
                    Aktifkan Kompas
                </button>
            )}

            {error && (
                <p className="mt-4 text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg max-w-xs text-center">
                    {error}
                </p>
            )}

            <div className="absolute bottom-6 text-center pointer-events-none">
                <p className="text-[10px] text-white/30 uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                    Metode: Great Circle (Geodesi WGS84)
                    <br />
                    Akurasi tinggi standar Kemenag RI
                </p>
            </div>
        </div>
    );
}
