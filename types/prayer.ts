export interface City {
    name: string;
    slug: string;
    lat: number;
    lng: number;
    country: string;
}

export interface PrayerTime {
    name: string;       // API key (e.g. "Fajr")
    nameId: string;     // Bahasa Indonesia (e.g. "Subuh")
    nameAr: string;     // Arabic (e.g. "الفجر")
    time: string;       // "04:37 (WIB)"
    icon: string;       // emoji icon
}

export interface PrayerTimings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
    [key: string]: string;
}

export interface HijriDate {
    day: string;
    month: { number: number; en: string; ar: string };
    year: string;
    weekday: { en: string; ar: string };
}

export interface GregorianDate {
    date: string;
    day: string;
    month: { number: number; en: string };
    year: string;
    weekday: { en: string };
}

export interface PrayerData {
    timings: PrayerTimings;
    date: {
        hijri: HijriDate;
        gregorian: GregorianDate;
        timestamp: string;
    };
    meta: {
        latitude: number;
        longitude: number;
        timezone: string;
        method: {
            id: number;
            name: string;
        };
        latitudeAdjustmentMethod: string;
        midnightMode: string;
        school: string;
        offset: {
            [key: string]: number;
        };
    };
}

export interface AladhanResponse {
    code: number;
    status: string;
    data: PrayerData;
}
