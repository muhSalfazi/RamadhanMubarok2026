const QURAN_API_BASE = "https://api.quran.gading.dev";

export interface Surah {
    number: number;
    name: {
        short: string;
        long: string;
        transliteration: {
            en: string;
            id: string;
        };
        translation: {
            en: string;
            id: string;
        };
    };
    revelation: {
        arab: string;
        en: string;
        id: string;
    };
    numberOfVerses: number;
}

export interface Ayat {
    number: {
        inQuran: number;
        inSurah: number;
    };
    meta: {
        juz: number;
        page: number;
        manzil: number;
        ruku: number;
        hizbQuarter: number;
        sajda: {
            recommended: boolean;
            obligatory: boolean;
        };
    };
    text: {
        arab: string;
        transliteration: {
            en: string;
        };
    };
    translation: {
        en: string;
        id: string;
    };
    audio: {
        primary: string;
        secondary: string[];
    };
    tafsir: {
        id: {
            short: string;
            long: string;
        };
    };
}

export async function getAllSurah(): Promise<Surah[]> {
    try {
        const res = await fetch(`${QURAN_API_BASE}/surah`, {
            next: { revalidate: 86400 }, // Cache 24 jam
        });
        if (!res.ok) throw new Error("Failed to fetch surah list");
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching surah list:", error);
        return [];
    }
}

export async function getSurahDetail(number: number): Promise<{ surah: Surah; ayahs: Ayat[] } | null> {
    try {
        const res = await fetch(`${QURAN_API_BASE}/surah/${number}`, {
            next: { revalidate: 86400 },
        });
        if (!res.ok) throw new Error(`Failed to fetch surah ${number}`);
        const data = await res.json();
        return {
            surah: data.data,
            ayahs: data.data.verses,
        };
    } catch (error) {
        console.error(`Error fetching surah ${number}:`, error);
        return null;
    }
}
