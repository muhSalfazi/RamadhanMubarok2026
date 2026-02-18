export interface JuzInfo {
    id: number;
    start: { surah: number; ayat: number; name: string };
    end: { surah: number; ayat: number; name: string };
}

export const JUZ_DATA: JuzInfo[] = [
    { id: 1, start: { surah: 1, ayat: 1, name: "Al-Fatihah" }, end: { surah: 2, ayat: 141, name: "Al-Baqarah" } },
    { id: 2, start: { surah: 2, ayat: 142, name: "Al-Baqarah" }, end: { surah: 2, ayat: 252, name: "Al-Baqarah" } },
    { id: 3, start: { surah: 2, ayat: 253, name: "Al-Baqarah" }, end: { surah: 3, ayat: 92, name: "Ali 'Imran" } },
    { id: 4, start: { surah: 3, ayat: 93, name: "Ali 'Imran" }, end: { surah: 4, ayat: 23, name: "An-Nisa'" } },
    { id: 5, start: { surah: 4, ayat: 24, name: "An-Nisa'" }, end: { surah: 4, ayat: 147, name: "An-Nisa'" } },
    { id: 6, start: { surah: 4, ayat: 148, name: "An-Nisa'" }, end: { surah: 5, ayat: 81, name: "Al-Ma'idah" } },
    { id: 7, start: { surah: 5, ayat: 82, name: "Al-Ma'idah" }, end: { surah: 6, ayat: 110, name: "Al-An'am" } },
    { id: 8, start: { surah: 6, ayat: 111, name: "Al-An'am" }, end: { surah: 7, ayat: 87, name: "Al-A'raf" } },
    { id: 9, start: { surah: 7, ayat: 88, name: "Al-A'raf" }, end: { surah: 8, ayat: 40, name: "Al-Anfal" } },
    { id: 10, start: { surah: 8, ayat: 41, name: "Al-Anfal" }, end: { surah: 9, ayat: 92, name: "At-Taubah" } },
    { id: 11, start: { surah: 9, ayat: 93, name: "At-Taubah" }, end: { surah: 11, ayat: 5, name: "Hud" } },
    { id: 12, start: { surah: 11, ayat: 6, name: "Hud" }, end: { surah: 12, ayat: 52, name: "Yusuf" } },
    { id: 13, start: { surah: 12, ayat: 53, name: "Yusuf" }, end: { surah: 14, ayat: 52, name: "Ibrahim" } },
    { id: 14, start: { surah: 15, ayat: 1, name: "Al-Hijr" }, end: { surah: 16, ayat: 128, name: "An-Nahl" } },
    { id: 15, start: { surah: 17, ayat: 1, name: "Al-Isra'" }, end: { surah: 18, ayat: 74, name: "Al-Kahfi" } },
    { id: 16, start: { surah: 18, ayat: 75, name: "Al-Kahfi" }, end: { surah: 20, ayat: 135, name: "Taha" } },
    { id: 17, start: { surah: 21, ayat: 1, name: "Al-Anbiya'" }, end: { surah: 22, ayat: 78, name: "Al-Hajj" } },
    { id: 18, start: { surah: 23, ayat: 1, name: "Al-Mu'minun" }, end: { surah: 25, ayat: 20, name: "Al-Furqan" } },
    { id: 19, start: { surah: 25, ayat: 21, name: "Al-Furqan" }, end: { surah: 27, ayat: 55, name: "An-Naml" } },
    { id: 20, start: { surah: 27, ayat: 56, name: "An-Naml" }, end: { surah: 29, ayat: 45, name: "Al-'Ankabut" } },
    { id: 21, start: { surah: 29, ayat: 46, name: "Al-'Ankabut" }, end: { surah: 33, ayat: 30, name: "Al-Ahzab" } },
    { id: 22, start: { surah: 33, ayat: 31, name: "Al-Ahzab" }, end: { surah: 36, ayat: 27, name: "Yasin" } },
    { id: 23, start: { surah: 36, ayat: 28, name: "Yasin" }, end: { surah: 39, ayat: 31, name: "Az-Zumar" } },
    { id: 24, start: { surah: 39, ayat: 32, name: "Az-Zumar" }, end: { surah: 41, ayat: 46, name: "Fussilat" } },
    { id: 25, start: { surah: 41, ayat: 47, name: "Fussilat" }, end: { surah: 45, ayat: 37, name: "Al-Jasiyah" } },
    { id: 26, start: { surah: 46, ayat: 1, name: "Al-Ahqaf" }, end: { surah: 51, ayat: 30, name: "Az-Zariyat" } },
    { id: 27, start: { surah: 51, ayat: 31, name: "Az-Zariyat" }, end: { surah: 57, ayat: 29, name: "Al-Hadid" } },
    { id: 28, start: { surah: 58, ayat: 1, name: "Al-Mujadalah" }, end: { surah: 66, ayat: 12, name: "At-Tahrim" } },
    { id: 29, start: { surah: 67, ayat: 1, name: "Al-Mulk" }, end: { surah: 77, ayat: 50, name: "Al-Mursalat" } },
    { id: 30, start: { surah: 78, ayat: 1, name: "An-Naba'" }, end: { surah: 114, ayat: 6, name: "An-Nas" } },
];
