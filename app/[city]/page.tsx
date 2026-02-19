import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getCityBySlug, INDONESIAN_CITIES } from "../../lib/cities";
import { fetchPrayerTimesByCoords, fetchMonthlyPrayerTimesByCoords } from "../../lib/prayerApi";
import { getPrayerTimes } from "../../lib/prayer-utils";
import StarParticles from "../../components/StarParticles";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import Countdown from "../../components/Countdown";
import PrayerGrid from "../../components/PrayerGrid";
import MonthlyPrayerSchedule from "../../components/MonthlyPrayerSchedule";
import CityLoading from "./loading";

// Loading component inline or import
export const dynamic = 'force-dynamic'; // Optional: if we want to ensure fresh data

async function MonthlyScheduleWrapper({ lat, lng }: { lat: number, lng: number }) {
    const monthlyData = await fetchMonthlyPrayerTimesByCoords(lat, lng, 2, 2026);
    const marchData = await fetchMonthlyPrayerTimesByCoords(lat, lng, 3, 2026);


    const allData = [...monthlyData, ...marchData];
    const ramadhanData = allData.filter(d => d.date.hijri.month.number === 9);

    return <MonthlyPrayerSchedule data={ramadhanData.length > 0 ? ramadhanData : monthlyData} />;
}

interface PageProps {
    params: { city: string };
    searchParams: { lat?: string; lng?: string; name?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const city = getCityBySlug(params.city);
    if (!city) return { title: "Kota Tidak Ditemukan" };

    return {
        title: `Ramadhan 2026 - Digital Experience`,
        description: `Jadwal Sholat Ramadhan 1447 H untuk ${city.name} dan sekitarnya. Kalender Hijriah sesuai standar Kemenag RI.`,
        openGraph: {
            type: "website",
            siteName: "Ramadhan 2026 Digital Experience",
            title: `Ramadhan 2026 - Digital Experience`,
            description: `Informasi waktu sholat, imsakiyah, dan countdown berbuka puasa untuk wilayah ${city.name}.`,
            locale: "id_ID",
            images: [
                {
                    url: "https://ramadhan2026.vercel.app/og-image.jpg", // Placeholder until verified
                    width: 1200,
                    height: 630,
                    alt: "Ramadhan 2026",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `Jadwal Sholat ${city.name} — Ramadhan 1447 H`,
            description: `Jadwal Imsakiyah dan Sholat 5 Waktu ${city.name}, Indonesia.`,
        },
    };
}

// Generate Static Params for common cities to improve build time/ISR
export async function generateStaticParams() {
    // Only pre-render top 10 cities to save build time, others will be ISR'd on demand
    return INDONESIAN_CITIES.slice(0, 10).map((city) => ({
        city: city.slug,
    }));
}

async function CityContent({
    citySlug,
    latStr,
    lngStr,
    customName,
}: {
    citySlug: string;
    latStr?: string;
    lngStr?: string;
    customName?: string;
}) {
    const city = getCityBySlug(citySlug);
    if (!city) notFound();

    // Use query params if provided (GPS), otherwise fallback to city default
    const lat = latStr ? parseFloat(latStr) : city.lat;
    const lng = lngStr ? parseFloat(lngStr) : city.lng;

    // Fetch API with Kemenag method (ISR 1 hour)
    const data = await fetchPrayerTimesByCoords(lat, lng);
    const prayers = getPrayerTimes(data.timings);

    return (
        <>
            <HeroSection
                cityName={customName ? decodeURIComponent(customName) : city.name}
                hijri={data.date.hijri}
                gregorian={data.date.gregorian}
                hijriMonthAr={data.date.hijri.month.ar}
            />

            <div className="mt-8 mb-12 space-y-12">
                <Countdown prayers={prayers} />
                <PrayerGrid prayers={prayers} />

                {/* Info Cards (Imsak/Terbit) */}
                <div className="grid grid-cols-2 gap-4 anim-fade-up delay-2">
                    <div className="glass p-4 flex items-center justify-between">
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Imsak</p>
                            <p className="text-white font-bold text-lg">{data.timings.Imsak.replace(/\s*\(.*\)/, "")}</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                    </div>
                    <div className="glass p-4 flex items-center justify-between">
                        <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Terbit</p>
                            <p className="text-white font-bold text-lg">{data.timings.Sunrise.replace(/\s*\(.*\)/, "")}</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Monthly Schedule */}
                <Suspense fallback={<div className="h-64 rounded-2xl glass animate-pulse" />}>
                    <MonthlyScheduleWrapper lat={city.lat} lng={city.lng} />
                </Suspense>
            </div>
        </>
    );
}

export default function CityPage({ params, searchParams }: PageProps) {
    return (
        <main className="min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
            {/* Background System */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 ramadhan-bg" />
                <div className="absolute inset-0 islamic-pattern mix-blend-overlay opacity-30" />
                <StarParticles />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-6 md:pt-10 pb-20">
                <Header citySlug={params.city} />

                <Suspense fallback={<CityLoading />}>
                    <CityContent
                        citySlug={params.city}
                        latStr={searchParams.lat}
                        lngStr={searchParams.lng}
                        customName={searchParams.name}
                    />
                </Suspense>

                <footer className="mt-12 text-center anim-fade opacity-40 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">
                        Sumber Data: Aladhan.com (Kemenag RI - Syafi'i)
                    </p>
                    <p className="font-arabic text-xl mb-2 leading-relaxed">
                        يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
                    </p>

                    <p className="text-xs text-white/50 mb-1">
                        QS. Al-Baqarah: 183
                    </p>

                    <p className="text-xs text-white/60 mb-4 italic">
                        “Wahai orang-orang yang beriman! Diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang-orang sebelum kamu agar kamu bertakwa.”
                    </p>
                </footer>
            </div>
        </main >
    );
}
