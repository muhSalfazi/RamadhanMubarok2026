import { PrayerTime } from "@/types/prayer";

interface PrayerCardProps {
    prayer: PrayerTime;
    isActive: boolean;
    isNext: boolean;
    index: number;
}

const PRAYER_COLORS = [
    // Subuh — indigo/violet (malam menjelang fajar)
    {
        bg: "rgba(99,102,241,0.07)",
        bgActive: "rgba(99,102,241,0.14)",
        border: "rgba(99,102,241,0.18)",
        borderActive: "rgba(99,102,241,0.5)",
        icon: "#818cf8",
        iconBg: "rgba(99,102,241,0.15)",
        label: "rgba(99,102,241,0.8)",
    },
    // Dzuhur — amber/gold (matahari terik)
    {
        bg: "rgba(245,158,11,0.07)",
        bgActive: "rgba(245,158,11,0.13)",
        border: "rgba(245,158,11,0.18)",
        borderActive: "rgba(245,158,11,0.5)",
        icon: "#fbbf24",
        iconBg: "rgba(245,158,11,0.15)",
        label: "rgba(245,158,11,0.8)",
    },
    // Ashar — orange (sore hari)
    {
        bg: "rgba(249,115,22,0.07)",
        bgActive: "rgba(249,115,22,0.13)",
        border: "rgba(249,115,22,0.18)",
        borderActive: "rgba(249,115,22,0.5)",
        icon: "#fb923c",
        iconBg: "rgba(249,115,22,0.15)",
        label: "rgba(249,115,22,0.8)",
    },
    // Maghrib — rose/red (matahari terbenam)
    {
        bg: "rgba(244,63,94,0.07)",
        bgActive: "rgba(244,63,94,0.13)",
        border: "rgba(244,63,94,0.18)",
        borderActive: "rgba(244,63,94,0.5)",
        icon: "#fb7185",
        iconBg: "rgba(244,63,94,0.15)",
        label: "rgba(244,63,94,0.8)",
    },
    // Isya — purple (malam)
    {
        bg: "rgba(139,92,246,0.07)",
        bgActive: "rgba(139,92,246,0.13)",
        border: "rgba(139,92,246,0.18)",
        borderActive: "rgba(139,92,246,0.5)",
        icon: "#a78bfa",
        iconBg: "rgba(139,92,246,0.15)",
        label: "rgba(139,92,246,0.8)",
    },
];

// SVG icons as strings (no dangerouslySetInnerHTML — rendered via SVG JSX)
const PRAYER_SVGS = [
    // Subuh — crescent
    <svg key="subuh" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>,
    // Dzuhur — sun
    <svg key="dzuhur" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>,
    // Ashar — cloud + sun
    <svg key="ashar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2v2M12 16v2M4.93 4.93l1.41 1.41M17.66 13.66l1.41 1.41M2 10h2M18 10h2" />
        <path d="M6 18a4 4 0 0 1 0-8 5 5 0 0 1 9.9-1H16a3 3 0 0 1 0 6H6z" />
    </svg>,
    // Maghrib — sunset
    <svg key="maghrib" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="9" x2="12" y2="2" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
        <line x1="23" y1="22" x2="1" y2="22" />
        <polyline points="8 6 12 2 16 6" />
    </svg>,
    // Isya — stars
    <svg key="isya" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>,
];

export default function PrayerCard({ prayer, isActive, isNext, index }: PrayerCardProps) {
    const c = PRAYER_COLORS[index] ?? PRAYER_COLORS[0];
    const svg = PRAYER_SVGS[index] ?? PRAYER_SVGS[0];
    const cleanTime = prayer.time.replace(/\s*\(.*\)/, "");

    return (
        <div
            className={`relative flex flex-col items-center gap-3 rounded-2xl p-5 transition-premium anim-fade-up delay-${index + 1} ${isActive ? "prayer-active-glow" : "hover:-translate-y-1"
                }`}
            style={{
                background: isActive ? c.bgActive : c.bg,
                border: `1px solid ${isActive ? c.borderActive : c.border}`,
            }}
        >
            {/* Active pulse dot */}
            {isActive && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <div className="pulse-emerald w-1.5 h-1.5 rounded-full" style={{ background: c.icon }} />
                </div>
            )}

            {/* Next dot */}
            {isNext && !isActive && (
                <div className="absolute top-3 right-3">
                    <div className="w-1.5 h-1.5 rounded-full opacity-50" style={{ background: c.icon }} />
                </div>
            )}

            {/* Icon */}
            <div
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{ color: c.icon, background: c.iconBg }}
            >
                {svg}
            </div>

            {/* Arabic name */}
            <p className="font-arabic text-xs opacity-30" dir="rtl">{prayer.nameAr}</p>

            {/* Indonesian name */}
            <h3 className={`text-sm font-semibold tracking-wide ${isActive ? "text-white" : "text-white/65"}`}>
                {prayer.nameId}
            </h3>

            {/* Time */}
            <div
                className={`text-2xl font-bold tabular-nums ${isActive ? "text-white" : "text-white/85"}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
            >
                {cleanTime}
            </div>

            {/* Status badge */}
            {isActive && (
                <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                    style={{ background: `${c.icon}20`, color: c.icon, border: `1px solid ${c.icon}35` }}
                >
                    Berlangsung
                </span>
            )}
            {isNext && !isActive && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium text-white/35"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    Berikutnya
                </span>
            )}
        </div>
    );
}
