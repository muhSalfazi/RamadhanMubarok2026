export interface DzikirItem {
    id: number;
    title: string;
    arabic: string;
    latin: string;
    translation: string;
    note?: string;
}

export const dzikirSholat: DzikirItem[] = [
    {
        id: 1,
        title: "Istighfar (3x)",
        arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيْمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        latin: "Astaghfirullahal 'adzim alladzi laa ilaaha illa huwal hayyul qoyyum wa atuubu ilaih.",
        translation: "Aku memohon ampun kepada Allah Yang Maha Agung, yang tiada Tuhan selain Dia, Yang Maha Hidup lagi Maha Berdiri Sendiri, dan aku bertaubat kepada-Nya."
    },
    {
        id: 2,
        title: "Tahlil & Doa Keselamatan",
        arabic: "اَللَّهُمَّ أَنْتَ السَّلاَمُ، وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَاْلإِكْرَامِ",
        latin: "Allahumma antas salaam, wa minkas salaam, tabaarakta yaa dzal jalaali wal ikraam.",
        translation: "Ya Allah, Engkau adalah Dzat yang mempunyai kesejahteraan dan dari-Mu kesejahteraan itu, Maha Suci Engkau wahai Dzat yang mempunyai kebesaran dan kemuliaan."
    },
    {
        id: 201,
        title: "Doa Memohon Pertolongan",
        arabic: "اَللَّهُمَّ لاَ مَانِعَ لِمَا أَعْطَيْتَ، وَلاَ مُعْطِيَ لِمَا مَنَعْتَ، وَلاَ يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
        latin: "Allahumma laa maani'a limaa a'thoyta, wa laa mu'thiya limaa mana'ta, wa laa yanfa'u dzal jaddi minkal jaddu.",
        translation: "Ya Allah, tidak ada yang dapat mencegah apa yang Engkau berikan, dan tidak ada yang dapat memberi apa yang Engkau cegah, dan kekayaan tidak bermanfaat bagi pemiliknya (untuk menyelamatkan) dari siksa-Mu."
    },
    {
        id: 7,
        title: "Ayat Kursi",
        arabic: "اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْqَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ",
        latin: "Allahu laa ilaaha illa huwal hayyul qayyum. Laa ta'khudzuhu sinatuw wa laa naum. Lahu maa fis samaawaati wa maa fil ardh. Man dzalladzii yasyfa'u 'indahu illa bi idznih. Ya'lamu maa baina aidiihim wa maa khalfahum. Wa laa yuhiishuuna bi syai-im min 'ilmihi illa bi maa syaa-a. Wasi'a kursiyyuhus samaawaati wal ardh. Wa laa ya-uuduhu hifzhuhumaa wahuwal 'aliyyul 'azhiim.",
        translation: "Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafa'at di sisi Allah tanpa izin-Nya? Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar."
    },
    {
        id: 101,
        title: "Surah Al-Ikhlas",
        arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
        latin: "Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
        translation: "Katakanlah: Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan, dan tidak ada seorangpun yang setara dengan Dia."
    },
    {
        id: 102,
        title: "Surah Al-Falaq",
        arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        latin: "Qul a'uzhu bi rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin izha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin izha hasad.",
        translation: "Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai waktu subuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul, dan dari kejahatan orang yang dengki apabila ia dengki."
    },
    {
        id: 103,
        title: "Surah An-Nas",
        arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
        latin: "Qul a'uzhu bi rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Allazhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
        translation: "Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia."
    },
    {
        id: 3,
        title: "Tasbih (33x)",
        arabic: "سُبْحَانَ اللهِ",
        latin: "Subhanallah",
        translation: "Maha Suci Allah."
    },
    {
        id: 4,
        title: "Tahmid (33x)",
        arabic: "اَلْحَمْدُ لِلَّهِ",
        latin: "Alhamdulillah",
        translation: "Segala puji bagi Allah."
    },
    {
        id: 5,
        title: "Takbir (33x)",
        arabic: "اَللَّهُ أَكْبَرُ",
        latin: "Allahu Akbar",
        translation: "Allah Maha Besar."
    },
    {
        id: 6,
        title: "Penutup Dzikir (Tahlil Lengkap)",
        arabic: "اَللَّهُ أَكْبَرُ كَبِيْرًا وَالْحَمْدُ لِلَّهِ كَثِيْرًا وَسُبْحَانَ اللهِ بُكْرَةً وَأَصِيْلاً. لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِيْ وَيُمِيْتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ. وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيْمِ",
        latin: "Allahu akbar kabiro, walhamdulillahi katsiro, wa subhanallahi bukrotaw wa ashila. Laa ilaaha illallahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu yuhyii wa yumiitu wa huwa 'alaa kulli syai-in qodiir. Wa laa haula wa laa quwwata illa billahil 'aliyyil 'adzim.",
        translation: "Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan pujian yang banyak. Maha Suci Allah pada waktu pagi dan petang. Tidak ada tuhan selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji, Dia menghidupkan dan mematikan, dan Dia Maha Kuasa atas segala sesuatu. Tiada daya dan upaya melainkan dengan pertolongan Allah Yang Maha Tinggi lagi Maha Agung."
    }
];

// Common items for Pagi & Petang (Al-Ma'tsurat)
const surahAlIkhlas = {
    id: 101,
    title: "Surah Al-Ikhlas (3x)",
    arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
    latin: "Qul huwallahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    translation: "Katakanlah: Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan, dan tidak ada seorangpun yang setara dengan Dia."
};

const surahAlFalaq = {
    id: 102,
    title: "Surah Al-Falaq (3x)",
    arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    latin: "Qul a'uzhu bi rabbil-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin izha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin izha hasad.",
    translation: "Katakanlah: Aku berlindung kepada Tuhan Yang Menguasai waktu subuh, dari kejahatan makhluk-Nya, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul, dan dari kejahatan orang yang dengki apabila ia dengki."
};

const surahAnNas = {
    id: 103,
    title: "Surah An-Nas (3x)",
    arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
    latin: "Qul a'uzhu bi rabbin-nas. Malikin-nas. Ilahin-nas. Min sharril-waswasil-khannas. Allazhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Katakanlah: Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia."
};

const ayatKursi = {
    id: 100,
    title: "Ayat Kursi (1x)",
    arabic: "اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْqَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ",
    latin: "Allahu laa ilaaha illa huwal hayyul qayyum. Laa ta'khudzuhu sinatuw wa laa naum. Lahu maa fis samaawaati wa maa fil ardh. Man dzalladzii yasyfa'u 'indahu illa bi idznih. Ya'lamu maa baina aidiihim wa maa khalfahum. Wa laa yuhiishuuna bi syai-im min 'ilmihi illa bi maa syaa-a. Wasi'a kursiyyuhus samaawaati wal ardh. Wa laa ya-uuduhu hifzhuhumaa wahuwal 'aliyyul 'azhiim.",
    translation: "Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafa'at di sisi Allah tanpa izin-Nya? Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar."
};

export const dzikirPagi: DzikirItem[] = [
    {
        id: 1,
        title: "Ta'awwudz",
        arabic: "أَعُوْذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ",
        latin: "A'udzu billahi minasy-syaithanir-rajim",
        translation: "Aku berlindung kepada Allah dari godaan syaitan yang terkutuk."
    },
    ayatKursi,
    surahAlIkhlas,
    surahAlFalaq,
    surahAnNas,
    {
        id: 5,
        title: "Doa Pagi Hari",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ. رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِيْ النَّارِ وَعَذَابٍ فِيْ الْقَبْرِ",
        latin: "Ashbahna wa ashbahal mulku lillah, walhamdulillah, laa ilaha illallah wahdahu laa syarika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli syai-in qadir. Rabbi as-aluka khaira ma fi hadzal yaum wa khaira ma ba'dahu, wa a'udzu bika min syarri ma fi hadzal yaum wa syarri ma ba'dahu. Rabbi a'udzu bika minal kasali wa su-il kibar, Rabbi a'udzu bika min 'adzabin fin-nar wa 'adzabin fil qabr.",
        translation: "Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan selain Allah, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Wahai Tuhanku, aku mohon kepada-Mu kebaikan amalan di hari ini dan hari setelahnya. Dan aku berlindung kepada-Mu dari kejahatan di hari ini dan hari setelahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan kejelekan di hari tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksaan di neraka dan siksaan di alam kubur."
    },
    {
        id: 6,
        title: "Sayyidul Istighfar",
        arabic: "اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ",
        latin: "Allahumma anta robbi laa ilaaha illa anta, kholaqtani wa ana ‘abduka wa ana ‘ala ‘ahdika wa wa’dika mastatho’tu. A’udzu bika min syarri maa shona’tu, abuu-u laka bini’matika ‘alayya, wa abuu-u bi dzanbi faghfirlii fainnahu laa yaghfirudz dzunuuba illa anta.",
        translation: "Ya Allah, Engkau adalah Rabbku, tidak ada Tuhan yang berhak disembah kecuali Engkau, Engkaulah yang menciptakanku. Aku adalah hamba-Mu. Aku akan setia pada perjanjianku pada-Mu (yaitu aku akan mentauhidkan-Mu) semampuku dan aku yakin akan janji-Mu (berupa surga untukku). Aku berlindung kepada-Mu dari kejelekan yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku. Oleh karena itu, ampunilah aku. Sesungguhnya tiada yang mengampuni dosa kecuali Engkau."
    },
    {
        id: 7,
        title: "Doa Keselamatan (3x)",
        arabic: "بِسْمِ اللهِ الَّذِيْ لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ",
        latin: "Bismillahilladzi laa yadhurru ma'asmihi syai-un fil ardhi wa laa fis samaa-i wa huwas sami'ul 'alim",
        translation: "Dengan nama Allah yang bila disebut, segala sesuatu di bumi dan langit tidak akan berbahaya, Dia-lah Yang Maha Mendengar lagi Maha Mengetahui."
    },
    {
        id: 8,
        title: "Doa Ridho (3x)",
        arabic: "رَضِيْتُ بِاللهِ رَبًّا، وَبِالْإِسْلاَمِ دِيْنًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        latin: "Radhitu billahi rabba, wa bil-islami dina, wa bi Muhammadin shallallahu 'alaihi wa sallama nabiyya.",
        translation: "Aku ridho Allah sebagai Rabb, Islam sebagai agama, dan Muhammad shallallahu 'alaihi wa sallam sebagai Nabi."
    },
    {
        id: 9,
        title: "Tasbih & Tahmid (100x)",
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        latin: "Subhanallah wa bihamdih.",
        translation: "Maha Suci Allah dan segala puji bagi-Nya."
    },
    {
        id: 10,
        title: "Tahlil (100x)",
        arabic: "لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ",
        latin: "Laa ilaha illallah wahdahu laa syarika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli syai-in qadir.",
        translation: "Tidak ada Tuhan selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji. Dia-lah yang berkuasa atas segala sesuatu."
    }
];

export const dzikirPetang: DzikirItem[] = [
    {
        id: 1,
        title: "Ta'awwudz",
        arabic: "أَعُوْذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ",
        latin: "A'udzu billahi minasy-syaithanir-rajim",
        translation: "Aku berlindung kepada Allah dari godaan syaitan yang terkutuk."
    },
    ayatKursi,
    surahAlIkhlas,
    surahAlFalaq,
    surahAnNas,
    {
        id: 5,
        title: "Doa Sore Hari",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا. رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِيْ النَّارِ وَعَذَابٍ فِيْ الْقَبْرِ",
        latin: "Amsaynaa wa amsal mulku lillah, walhamdulillah, laa ilaha illallah wahdahu laa syarika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli syai-in qadir. Rabbi as-aluka khaira ma fi hadzihil lailah wa khaira ma ba'daha, wa a'udzu bika min syarri ma fi hadzihil lailah wa syarri ma ba'daha. Rabbi a'udzu bika minal kasali wa su-il kibar, Rabbi a'udzu bika min 'adzabin fin-nar wa 'adzabin fil qabr.",
        translation: "Kami telah memasuki waktu sore dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan selain Allah, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Wahai Tuhanku, aku mohon kepada-Mu kebaikan amalan di malam ini dan malam setelahnya. Dan aku berlindung kepada-Mu dari kejahatan di malam ini dan malam setelahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan kejelekan di hari tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksaan di neraka dan siksaan di alam kubur."
    },
    {
        id: 6,
        title: "Sayyidul Istighfar",
        arabic: "اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ",
        latin: "Allahumma anta robbi laa ilaaha illa anta, kholaqtani wa ana ‘abduka wa ana ‘ala ‘ahdika wa wa’dika mastatho’tu. A’udzu bika min syarri maa shona’tu, abuu-u laka bini’matika ‘alayya, wa abuu-u bi dzanbi faghfirlii fainnahu laa yaghfirudz dzunuuba illa anta.",
        translation: "Ya Allah, Engkau adalah Rabbku, tidak ada Tuhan yang berhak disembah kecuali Engkau, Engkaulah yang menciptakanku. Aku adalah hamba-Mu. Aku akan setia pada perjanjianku pada-Mu (yaitu aku akan mentauhidkan-Mu) semampuku dan aku yakin akan janji-Mu (berupa surga untukku). Aku berlindung kepada-Mu dari kejelekan yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku. Oleh karena itu, ampunilah aku. Sesungguhnya tiada yang mengampuni dosa kecuali Engkau."
    },
    {
        id: 7,
        title: "Doa Keselamatan (3x)",
        arabic: "بِسْمِ اللهِ الَّذِيْ لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ",
        latin: "Bismillahilladzi laa yadhurru ma'asmihi syai-un fil ardhi wa laa fis samaa-i wa huwas sami'ul 'alim",
        translation: "Dengan nama Allah yang bila disebut, segala sesuatu di bumi dan langit tidak akan berbahaya, Dia-lah Yang Maha Mendengar lagi Maha Mengetahui."
    },
    {
        id: 8,
        title: "Doa Ridho (3x)",
        arabic: "رَضِيْتُ بِاللهِ رَبًّا، وَبِالْإِسْلاَمِ دِيْنًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        latin: "Radhitu billahi rabba, wa bil-islami dina, wa bi Muhammadin shallallahu 'alaihi wa sallama nabiyya.",
        translation: "Aku ridho Allah sebagai Rabb, Islam sebagai agama, dan Muhammad shallallahu 'alaihi wa sallam sebagai Nabi."
    },
    {
        id: 9,
        title: "Tasbih & Tahmid (100x)",
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        latin: "Subhanallah wa bihamdih.",
        translation: "Maha Suci Allah dan segala puji bagi-Nya."
    },
    {
        id: 10,
        title: "Tahlil (100x)",
        arabic: "لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ",
        latin: "Laa ilaha illallah wahdahu laa syarika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli syai-in qadir.",
        translation: "Tidak ada Tuhan selain Allah semata, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji. Dia-lah yang berkuasa atas segala sesuatu."
    },
    {
        id: 11,
        title: "Doa Perlindungan Malam",
        arabic: "أَعُوْذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        latin: "A'udzu bikalimatillahit-tammati min syarri ma khalaq.",
        translation: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya."
    }
];
