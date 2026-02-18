export interface DoaItem {
    id: string;
    title: string;
    arab: string;
    latin: string;
    trans: string;
    category: "harian" | "sholat" | "lailatul-qadar";
}

export const DOA_RAMADHAN: DoaItem[] = [
    {
        id: "niat-puasa",
        category: "sholat",
        title: "Niat Puasa Ramadhan",
        arab: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
        latin: "Nawaitu shauma ghadin 'an adā'i fardhi syahri Ramadhāna hādzihis sanati lillāhi ta'ālā.",
        trans: "Aku berniat puasa esok hari untuk menunaikan fardhu di bulan Ramadhan tahun ini, karena Allah Ta'ala."
    },
    {
        id: "doa-berbuka",
        category: "sholat",
        title: "Doa Berbuka Puasa",
        arab: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
        latin: "Allāhumma laka shumtu wa 'alā rizqika afthartu, dzahabaz zhamā'u wabtallatil 'urūqu wa tsabatal ajru in syā'allāh.",
        trans: "Ya Allah, untuk-Mu aku berpuasa, dan dengan rezeki-Mu aku berbuka. Telah hilang dahaga, urat-urat telah basah, dan pahala telah ditetapkan, insya Allah."
    },
    {
        id: "lailatul-qadar",
        category: "lailatul-qadar",
        title: "Doa Malam Lailatul Qadar",
        arab: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        latin: "Allāhumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'annī.",
        trans: "Ya Allah, sesungguhnya Engkau Maha Pemaaf yang menyukai permintaan maaf, maka maafkanlah aku."
    },
    {
        id: "hari-1",
        category: "harian",
        title: "Doa Ramadhan Hari Ke-1",
        arab: "اللَّهُمَّ اجْعَلْ صِيَامِي فِيْهِ صِيَامَ الصَّائِمِيْنَ، وَقِيَامِي فِيْهِ قِيَامَ الْقَائِمِيْنَ، وَنَبِّهْنِي فِيْهِ عَنْ نَوْمَةِ الْغَافِلِيْنَ، وَهَبْ لِي جُرْمِي فِيْهِ يَا إِلَهَ الْعَالَمِيْنَ، وَاعْفُ عَنِّي يَا عَافِيًا عَنِ الْمُجْرِمِيْنَ",
        latin: "Allāhummaj'al shiyāmī fīhi shiyāmas shāimīn, wa qiyāmī fīhi qiyāmal qāimīn, wa nabbihnī fīhi 'an naumatil ghāfilīn, wa hab lī jurmī fīhi yā ilāhal 'ālamīn, wa'fu 'annī yā 'āfiyan 'anil mujrimīn.",
        trans: "Ya Allah, jadikanlah puasaku di bulan ini sebagai puasa orang-orang yang berpuasa sebenarnya, shalat malamku di dalamnya sebagai orang yang shalat malam sebenarnya, bangunkanlah aku di dalamnya dari tidurnya orang-orang yang lalai. Bebaskanlah aku dari dosa-dosaku wahai Tuhan semesta alam. Maafkanlah aku wahai Yang Memberi ampunan kepada orang-orang yang berbuat dosa."
    },
    // Hari 2-30 bisa ditambahkan nanti atau sesuai kebutuhan
];
