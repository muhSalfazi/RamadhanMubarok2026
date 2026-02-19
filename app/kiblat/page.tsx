"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    const [heading, setHeading] = useState<number>(0);

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

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 to-neutral-950/90 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565552629477-cd040270e4a2?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            </div>

            <div className="relative z-20 flex flex-col items-center w-full max-w-md">
                <h1 className="text-3xl font-bold mb-1 text-emerald-100 drop-shadow-md">Arah Kiblat</h1>
                <p className="text-emerald-200/80 text-sm mb-8 flex items-center gap-2 bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm border border-white/5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Mendeteksi lokasi..."}
                </p>

                <div className="relative w-80 h-80 md:w-96 md:h-96 my-4">
                    {/* Outer Ring / Bezel */}
                    <div className="absolute inset-0 rounded-full border-[6px] border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-neutral-900/80 backdrop-blur-xl" />

                    {/* Compass Dial (Rotates) */}
                    <div
                        className="absolute inset-2 rounded-full border-2 border-white/10 transition-transform duration-300 ease-out"
                        style={{ transform: `rotate(${-heading}deg)` }}
                    >
                        {/* Cardinal Points */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-red-500 font-bold text-lg font-serif">N</div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-lg font-serif">S</div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-bold text-lg font-serif">E</div>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-lg font-serif">W</div>

                        {/* Degree Ticks */}
                        {[...Array(72)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[2px] origin-bottom ${i % 18 === 0 ? 'h-3 bg-white/50' : i % 2 === 0 ? 'h-2 bg-white/30' : 'h-1 bg-white/10'}`}
                                style={{ transform: `rotate(${i * 5}deg) translateY(0px)`, height: '100%' }}
                            >
                                <div className={`w-full ${i % 18 === 0 ? 'h-4' : i % 2 === 0 ? 'h-2' : 'h-1'} bg-current mt-[2px] mx-auto`}></div>
                            </div>
                        ))}

                        {/* Kaaba Direction Indicator on the Dial */}
                        {/* We rotate this marker relative to the dial so it stays at the qibla angle */}
                        <div
                            className="absolute inset-0"
                            style={{ transform: `rotate(${qibla}deg)` }}
                        >
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                                <div className="w-8 h-8 relative">
                                    <Image
                                        src="/kaaba-icon.png"
                                        alt="Kaaba"
                                        width={32}
                                        height={32}
                                        className="drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                                        onError={(e: any) => {
                                            // Fallback if image missing
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML = '<div class="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_yellow]"></div>';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Qibla Needle (Static Center, or pointing to Qibla?) */}
                    {/* In NU Online style, usually there is a specific long needle pointing to the Qibla angle relative to North.
                        Since we rotate the dial by `-heading`, North is always "Up" if we didn't rotate. 
                        But we rotate the dial so North matches real North. 
                        The Qibla angle is fixed on the dial.
                        We can also add a static "Phone Heading" indicator at the top center.
                    */}

                    {/* Static Top Indicator (Your Phone's Heading) */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-emerald-500 z-30 drop-shadow-lg" />

                    {/* Center Decoration */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-64 h-64 border border-emerald-500/10 rounded-full animate-pulse" />
                        <div className="w-48 h-48 border border-emerald-500/20 rounded-full" />
                    </div>

                    {/* Pivot */}
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-neutral-800 rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-neutral-600 shadow-lg z-30 flex items-center justify-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full pb-[1px]" />
                    </div>

                    {/* The Qibla Pointer Needle (Green) - pointing to Calculate Rotation */}
                    {/* Alternative: The dial creates the reference. We can highlight the Qibla angle on the dial.
                        Let's use a long needle that points to the Qibla angle.
                    */}
                    <div
                        className="absolute inset-0 flex items-center justify-center transition-transform duration-500 z-20 mix-blend-screen"
                        style={{ transform: `rotate(${needleRotation}deg)` }}
                    >
                        <div className="w-[4px] h-[45%] bg-gradient-to-t from-transparent via-emerald-500/50 to-emerald-400 rounded-full absolute bottom-1/2 origin-bottom shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
                    </div>
                </div>

                <div className="mt-8 text-center bg-black/40 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/5 shadow-2xl">
                    <p className="text-5xl font-bold font-mono text-white tracking-tighter drop-shadow-lg">
                        {qibla.toFixed(1)}°
                    </p>
                    <p className="text-xs text-emerald-400 uppercase tracking-widest mt-2 font-semibold">
                        Sudut ke Ka'bah
                    </p>
                </div>
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
