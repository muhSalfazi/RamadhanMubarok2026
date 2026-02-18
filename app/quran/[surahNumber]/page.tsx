import { getSurahDetail } from "@/lib/quranApi";
import SurahDetail from "@/components/SurahDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    // ISR for first 5 surahs (Al-Fatihah, Al-Baqarah, etc)
    return [1, 2, 36, 67, 112, 113, 114].map((num) => ({
        surahNumber: num.toString(),
    }));
}

export default async function Page({ params }: { params: { surahNumber: string } }) {
    const number = parseInt(params.surahNumber);
    const data = await getSurahDetail(number);

    if (!data) notFound();

    return <SurahDetail surah={data.surah} ayahs={data.ayahs} />;
}
