import { HijriDate, GregorianDate } from "@/types/prayer";
import { formatHijriDateId, formatGregorianDateId, HIJRI_CONFIG } from "@/lib/hijriConfig";

interface HeroSectionProps {
    cityName: string;
    hijri: HijriDate;
    gregorian: GregorianDate;
    hijriMonthAr: string;
}

export default function HeroSection({
    cityName,
    hijri,
    gregorian,
    hijriMonthAr,
}: HeroSectionProps) {
    const hijriFormatted = formatHijriDateId(hijri, gregorian.date);
    const gregorianFormatted = formatGregorianDateId(gregorian);
    const isRamadhan = hijri.month.number === 9;

    return (
        <section className="text-center py-8 md:py-12 anim-fade-up relative z-10">
            {/* Ramadhan badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 glass-gold anim-fade-up delay-1">
                <span className="text-sm" aria-hidden="true">✦</span>
                <span className="text-sm font-medium text-gold-gradient tracking-wide">
                    Selamat Menjalankan Ibadah Puasa Ramadhan 1447 H
                </span>
                <span className="text-sm" aria-hidden="true">✦</span>
            </div>

            {/* City name */}
            <div className="anim-fade-up delay-2">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-white/30 text-xs uppercase tracking-widest">Lokasi Aktif</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-1">
                    {cityName}
                </h1>
                <p className="text-white/25 text-sm">Indonesia</p>
            </div>

            {/* Dates */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 anim-fade-up delay-3">
                {/* Gregorian */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl">
                    <svg className="w-4 h-4 text-white/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white/70 text-sm font-medium">{gregorianFormatted}</span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

                {/* Hijri */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 glass rounded-xl"
                    style={{ background: "rgba(16,185,129,0.07)", borderColor: "rgba(16,185,129,0.18)" }}>
                    <span className="text-emerald-400/70 text-sm">☪</span>
                    <span className="text-emerald-300 text-sm font-semibold">{hijriFormatted}</span>
                </div>
            </div>

            {/* Arabic month name */}
            {isRamadhan && (
                <div className="mt-4 anim-fade-up delay-4">
                    <p className="font-arabic text-3xl text-white/10 tracking-widest" dir="rtl">
                        {hijriMonthAr}
                    </p>
                </div>
            )}

            {/* Kemenag label */}
            {/* <p className="mt-4 text-white/20 text-xs anim-fade-up delay-5">
                {HIJRI_CONFIG.label}
            </p> */}
        </section>
    );
}
