
"use client";

import { useEffect, useState } from "react";

interface QiblaCompassProps {
    qiblaDirection: number; // The target degree (e.g. 295 for Indonesia -> Mecca)
    address?: string;
}

export default function QiblaCompass({ qiblaDirection, address }: QiblaCompassProps) {
    const [heading, setHeading] = useState(0);
    const [supported, setSupported] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);

    // Standard Qibla for Indonesia is approx 295 degrees (West-Northwest)
    // If we have device orientation, `heading` is the device's angle from North (0).
    // The compass needle should point to `qiblaDirection`.
    // Rotation of the needle = `qiblaDirection - heading`.

    // For desktop or if permission denied, we just show the static offset relative to North.

    useEffect(() => {
        if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
            setSupported(true);
        }
    }, []);

    const requestAccess = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    alert("Permission to access device orientation was denied");
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            // Non-iOS 13+ devices
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
        // alpha: rotation around z-axis (0-360) - Compass heading
        // webkitCompassHeading is for iOS
        let compass = event.alpha || 0;

        if ((event as any).webkitCompassHeading) {
            compass = (event as any).webkitCompassHeading;
        } else {
            // Android alpha is anti-clockwise from North? It varies. 
            // Standardizing is hard without specific library, but for basic implementation:
            compass = 360 - (event.alpha || 0);
        }

        setHeading(compass);
    };

    // Calculate needle rotation
    // If heading is 0 (North), needle points to qiblaDirection (e.g. 295).
    // If heading is 90 (East), needle should point 295 - 90 = 205.
    const needleRotation = qiblaDirection - heading;

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Compass Rose (Background) - Rotates opposite to heading so 'North' stays North */}
                <div
                    className="absolute inset-0 transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${-heading}deg)` }}
                >
                    <div className="w-full h-full rounded-full border-4 border-white/10 bg-neutral-900/50 relative shadow-2xl backdrop-blur-sm">

                        {/* Cardinals */}
                        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-emerald-500 font-bold text-lg">N</span>
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/50 font-bold">S</span>
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white/50 font-bold">W</span>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 font-bold">E</span>

                        {/* Ticks */}
                        {[0, 90, 180, 270].map(deg => (
                            <div key={deg}
                                className="absolute top-0 left-1/2 w-0.5 h-full bg-transparent"
                                style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
                            >
                                <div className="w-full h-3 bg-white/20 mx-auto"></div>
                                <div className="w-full h-3 bg-white/20 mx-auto mt-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Qibla Indicator (Needle) - Points to Qibla */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${needleRotation}deg)` }}
                >
                    {/* The Needle */}
                    <div className="relative w-8 h-full">
                        {/* Pointer towards Kaaba */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[40px] border-b-amber-500 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-1.5 h-1/2 bg-amber-500/50 rounded-full"></div>

                        {/* Kaaba Icon at the tip */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-pulse">
                            🕋
                        </div>
                    </div>
                </div>

                {/* Center Pivot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-neutral-800 z-10"></div>
            </div>

            <div className="mt-8 text-center space-y-2">
                <p className="text-white/60">Arah Kiblat: <span className="text-amber-400 font-bold">{qiblaDirection.toFixed(1)}°</span> dari Utara</p>
                {address && <p className="text-white/40 text-sm max-w-xs mx-auto">{address}</p>}

                {supported && !permissionGranted && (
                    <button
                        onClick={requestAccess}
                        className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-medium transition-all"
                    >
                        Aktifkan Kompas
                    </button>
                )}

                {(!supported && !permissionGranted) && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg max-w-xs mx-auto">
                        <p className="text-xs text-white/50">
                            Kompas live tidak didukung di perangkat ini. Gunakan jarum emas sebagai panduan sudut dari Utara.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
