/**
 * Konfigurasi Kalender Hijriah Indonesia
 * Mengikuti standar Pemerintah Indonesia (Kementerian Agama RI)
 */

export const HIJRI_CONFIG = {
    method: 20,
    methodFallback: 11,
    dayOffset: -1,
    label: "Kalender mengikuti standar Pemerintah Indonesia (Kemenag RI)",
    monthNamesId: [
        "Muharram", "Safar", "Rabi'ul Awal", "Rabi'ul Akhir",
        "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban",
        "Ramadhan", "Syawal", "Dzulqa'dah", "Dzulhijjah",
    ],
} as const;

/**
 * VALIDASI MANUAL (OVERRIDE STATIS)
 * Digunakan jika hasil hisab/API berbeda dengan keputusan Sidang Isbat Kemenag.
 * Format: YYYY-MM-DD (Tanggal Masehi di Indonesia/Asia:Jakarta)
 */
export const KEMENAG_FIXED_DATES = {
    // Estimasi Awal Ramadhan 1447 H (Sesuaikan nanti dengan Sidang Isbat)
    "2026-02-19": { day: "1", month: { number: 9, en: "Ramadhan", ar: "ramaḍān" }, year: "1447" },

    // Estimasi Idul Fitri 1447 H (Sesuaikan nanti)
    "2026-03-21": { day: "1", month: { number: 10, en: "Shawwal", ar: "shawwāl" }, year: "1447" },
};

/**
 * Helper untuk mendapatkan tanggal Jakarta saat ini (YYYY-MM-DD)
 */
export function getJakartaDate(): string {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
        .format(new Date())
        .split("/")
        .reverse()
        .join("-"); // 2026-02-18
}

/**
 * Format tanggal Hijriah lengkap dalam Bahasa Indonesia dengan Validasi Manual
 */
export function formatHijriDateId(hijri: {
    day: string;
    month: { number: number; en: string; ar: string };
    year: string;
}, gregorianDateStr?: string): string { // gergorianDateStr: DD-MM-YYYY

    let finalDay = parseInt(hijri.day);
    let finalMonthIdx = hijri.month.number - 1;
    let finalYear = hijri.year;

    // 1. Cek Validasi Manual (Override) jika tanggal Masehi disediakan
    if (gregorianDateStr) {
        // Convert DD-MM-YYYY to YYYY-MM-DD for key lookup
        const [d, m, y] = gregorianDateStr.split("-");
        const isoKey = `${y}-${m}-${d}`;

        // @ts-ignore
        const override = KEMENAG_FIXED_DATES[isoKey];
        if (override) {
            finalDay = parseInt(override.day);
            finalMonthIdx = override.month.number - 1;
            finalYear = override.year;
        } else {
            // Jika tidak ada override spesifik, gunakan offset global
            finalDay += HIJRI_CONFIG.dayOffset;
        }
    } else {
        finalDay += HIJRI_CONFIG.dayOffset;
    }

    const monthName = HIJRI_CONFIG.monthNamesId[finalMonthIdx] || hijri.month.en;
    return `${finalDay} ${monthName} ${finalYear} H`;
}

/**
 * Format tanggal Masehi dalam Bahasa Indonesia
 */
export function formatGregorianDateId(gregorian: {
    day: string;
    month: { en: string };
    year: string;
    weekday: { en: string };
}): string {
    const DAYS: Record<string, string> = {
        Sunday: "Ahad", Monday: "Senin", Tuesday: "Selasa", Wednesday: "Rabu",
        Thursday: "Kamis", Friday: "Jumat", Saturday: "Sabtu",
    };
    const MONTHS: Record<string, string> = {
        January: "Januari", February: "Februari", March: "Maret", April: "April",
        May: "Mei", June: "Juni", July: "Juli", August: "Agustus",
        September: "September", October: "Oktober", November: "November", December: "Desember",
    };
    const day = DAYS[gregorian.weekday.en] || gregorian.weekday.en;
    const month = MONTHS[gregorian.month.en] || gregorian.month.en;
    return `${day}, ${gregorian.day} ${month} ${gregorian.year}`;
}
