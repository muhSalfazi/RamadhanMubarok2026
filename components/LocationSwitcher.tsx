"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { INDONESIAN_CITIES } from "@/lib/cities";
import { City } from "@/types/prayer";
import { sanitizeCitySlug, findNearestCity, getUserCoordinates, reverseGeocode } from "@/lib/locationUtils";

interface LocationSwitcherProps {
    currentSlug: string;
}

export default function LocationSwitcher({ currentSlug }: LocationSwitcherProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [geoError, setGeoError] = useState("");
    const router = useRouter();

    const current = INDONESIAN_CITIES.find((c) => c.slug === currentSlug);
    const filtered = INDONESIAN_CITIES.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    function handleSelect(city: City) {
        setOpen(false);
        setSearch("");
        // Save base preference
        localStorage.setItem("preferred_city", city.slug);

        // Clear detailed GPS preferences because user selected a generic city
        localStorage.removeItem("preferred_name");
        localStorage.removeItem("preferred_lat");
        localStorage.removeItem("preferred_lng");

        router.push(`/${city.slug}`);
    }

    async function detectLocation() {
        setOpen(false); // Close immediately as requested
        setSearch("");
        setLoading(true);
        setGeoError("");
        try {
            const coords = await getUserCoordinates();
            const { latitude, longitude } = coords;

            // Coba reverse geocoding untuk nama kota yang lebih akurat
            const locationResult = await reverseGeocode(latitude, longitude);

            if (locationResult) {
                const { city: cityName, displayName } = locationResult;
                const cleanName = cityName.replace(/^(Kota|Kabupaten)\s+/i, "").trim().toLowerCase();

                const match = INDONESIAN_CITIES.find(c => {
                    const dbName = c.name.toLowerCase();
                    return dbName === cleanName || dbName === cityName.toLowerCase() || c.kabkota?.toLowerCase() === cityName.toLowerCase();
                });

                if (match) {
                    localStorage.setItem("preferred_city", match.slug);
                    localStorage.setItem("preferred_name", displayName);
                    localStorage.setItem("preferred_lat", latitude.toString());
                    localStorage.setItem("preferred_lng", longitude.toString());
                    router.push(`/${match.slug}?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(displayName)}`);
                    return;
                }
            }

            const nearest = findNearestCity(latitude, longitude);
            const customName = locationResult?.displayName || nearest.name;
            localStorage.setItem("preferred_city", nearest.slug);
            localStorage.setItem("preferred_name", customName);
            localStorage.setItem("preferred_lat", latitude.toString());
            localStorage.setItem("preferred_lng", longitude.toString());
            router.push(`/${nearest.slug}?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(customName)}`);

        } catch (err: any) {
            console.error(err);
            // Since menu is closed, we alert the error or just fail silently
            // alert("Gagal mendapatkan lokasi: " + (err.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative z-50">
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass hover:bg-white/5 text-sm transition-premium font-medium text-white/90 hover:text-white group"
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{current?.name || "Pilih Kota"}</span>
                <svg className={`w-3.5 h-3.5 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Backdrop overlay for closing */}
            {open && (
                <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
            )}

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute top-full mt-2 right-0 w-80 z-50 rounded-2xl overflow-hidden bg-[#0f172a] border border-white/10 shadow-2xl anim-fade-up origin-top-right">
                    {/* Search Input */}
                    <div className="p-3 border-b border-white/5">
                        <div className="relative group">
                            <svg className="absolute left-3 top-2.5 w-4 h-4 text-white/30 group-focus-within:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Cari kota atau kabupaten..."
                                value={search}
                                onChange={(e) => setSearch(sanitizeCitySlug(e.target.value))}
                                className="w-full bg-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:bg-white/10 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Auto-detect Option */}
                    <div className="p-2 border-b border-white/5">
                        <button
                            onClick={detectLocation}
                            disabled={loading}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-300 hover:bg-emerald-500/10 transition-all disabled:opacity-50 group"
                        >
                            {loading ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {loading ? "Mendeteksi lokasi..." : "Gunakan Lokasi Saya Saat Ini"}
                        </button>
                        {geoError && (
                            <p className="text-red-400 text-xs px-3 py-1.5 bg-red-500/10 rounded-lg mt-1 mx-1 border border-red-500/20">
                                {geoError}
                            </p>
                        )}
                    </div>

                    {/* City List */}
                    <div className="max-h-64 overflow-y-auto scrollbar-thin">
                        {filtered.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-white/30 text-sm">Kota tidak ditemukan</p>
                            </div>
                        ) : (
                            <ul role="listbox">
                                {filtered.map((city) => (
                                    <li key={city.slug}>
                                        <button
                                            onClick={() => handleSelect(city)}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors ${city.slug === currentSlug ? "text-emerald-400 bg-emerald-500/5" : "text-white/70"
                                                }`}
                                            role="option"
                                            aria-selected={city.slug === currentSlug}
                                        >
                                            <span className="truncate mr-2">{city.name}</span>
                                            {city.slug === currentSlug && (
                                                <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
