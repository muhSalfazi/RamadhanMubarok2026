"use client";

import { useEffect, useState } from "react";
import { calculateQiblaDirection, calculateDistance, KAABAH_COORDS } from "@/lib/qiblaUtils";

export default function QiblaCompass() {
    const [heading, setHeading] = useState<number>(0);
    const [qibla, setQibla] = useState<number>(0);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation tidak didukung browser ini.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoords({ lat: latitude, lng: longitude });
                const qiblaDir = calculateQiblaDirection(latitude, longitude);
                setQibla(qiblaDir);
            },
            (err) => {
                console.error(err);
                setError("Gagal mengambil lokasi. Pastikan GPS aktif.");
            },
            { enableHighAccuracy: true }
        );
    }, []);

    const requestAccess = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === "granted") {
                    setPermissionGranted(true);
                    window.addEventListener("deviceorientation", handleOrientation);
                } else {
                    setError("Izin akses sensor ditolak.");
                }
            } catch (e) {
                setError("Error requesting permission.");
            }
        } else {
            setPermissionGranted(true);
            window.addEventListener("deviceorientation", handleOrientation);
        }
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
        let compass = e.webkitCompassHeading || Math.abs(e.alpha! - 360);
        setHeading(compass);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    // Visual Rotation Logic
    // The compass rose (North) rotates opposite to device heading (-heading)
    // The Qibla needle is placed at the Qibla degree on the compass rose.

    const compassRotation = -heading;
    const distance = coords ? calculateDistance(coords.lat, coords.lng, KAABAH_COORDS.lat, KAABAH_COORDS.lng) : 0;

    // Check alignment: User is facing Qibla if heading matches qibla direction
    // Or rather, if the "top" of the phone (heading) aligns with Qibla angle.
    const diff = Math.abs(heading - qibla);
    const isAligned = diff < 5 || diff > 355;

    return (
        <div className="flex flex-col items-center justify-center p-4 text-center w-full max-w-md mx-auto">
            {!permissionGranted ? (
                <button
                    onClick={requestAccess}
                    className="mb-8 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold shadow-lg shadow-emerald-500/20 transition-all animate-pulse"
                >
                    Izinkan Akses Kompas
                </button>
            ) : (
                <div className="relative w-72 h-72 md:w-80 md:h-80 mb-8 mx-auto perspective-1000">
                    {/* Info Hint */}
                    <div className="absolute -top-12 left-0 right-0 text-center animate-fade-in">
                        <p className="text-white/60 text-sm">Putar HP sampai jarum hijau di atas</p>
                    </div>

                    {/* Main Compass Dial (Rotates) */}
                    <div
                        className="w-full h-full rounded-full border-4 border-white/10 relative transition-transform duration-300 ease-out shadow-2xl bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center transform-style-3d"
                        style={{ transform: `rotate(${compassRotation}deg)` }}
                    >
                        {/* Cardinal Points */}
                        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xl drop-shadow-md">N</span>
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/40 font-bold">S</span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">E</span>
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">W</span>

                        {/* Degree Ticks */}
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                            <div
                                key={deg}
                                className="absolute w-0.5 h-3 bg-white/20 top-0 left-1/2 origin-bottom"
                                style={{ transform: `translateX(-50%) rotate(${deg}deg) translateY(6px)` }}
                            />
                        ))}

                        {/* Qibla Indicator (Fixed position on the dial at specific degree) */}
                        <div
                            className="absolute w-1 h-32 bg-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-start origin-center"
                            style={{ transform: `translate(-50%, -50%) rotate(${qibla}deg)` }}
                        >
                            <div className="relative -top-16 flex flex-col items-center">
                                <span className="text-2xl animate-bounce">🕌</span>
                                <div className={`w-1 h-16 rounded-full mt-1 ${isAligned ? 'bg-emerald-400 shadow-[0_0_20px_#34d399]' : 'bg-emerald-500/30'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Fixed Center (Phone Reference) */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white/20 rounded-full border border-white/40 shadow-inner -translate-x-1/2 -translate-y-1/2 z-20" />
                    <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-red-500/50 -translate-x-1/2 z-20" />
                </div>
            )}

            {error && <p className="text-red-400 mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

            {/* Stats Panel */}
            <div className="glass p-6 rounded-2xl w-full">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <div className="text-left">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Arah Kiblat</p>
                        <div className="text-2xl font-bold text-white font-mono">{qibla.toFixed(1)}°</div>
                    </div>
                    <div className="text-right">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Arah HP</p>
                        <div className="text-2xl font-bold text-white font-mono">{heading.toFixed(1)}°</div>
                    </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-all duration-300 ${isAligned ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10 text-white/40'}`}>
                    {isAligned ? (
                        <>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-bold tracking-wide">MENGHADAP KIBLAT</span>
                        </>
                    ) : (
                        <span className="tracking-wide text-sm">Putar HP Anda Mencari Kiblat...</span>
                    )}
                </div>

                {coords && (
                    <div className="mt-4 pt-4 text-xs text-center text-white/30 flex justify-center gap-2">
                        <span>Jarak ke Ka'bah:</span>
                        <span className="text-emerald-400 font-bold">{distance.toLocaleString()} km</span>
                    </div>
                )}
            </div>
        </div>
    );
}
