
import { fetchAllDoas } from "../../lib/doaApi";
import DoaPageContent from "../../components/DoaPageContent";

export const metadata = {
    title: "Kumpulan Doa Harian - Ramadhan 2026",
    description: "Kumpulan doa harian lengkap dengan arti dan transliterasi.",
};

export default async function DoaPage() {
    const doas = await fetchAllDoas();
    return <DoaPageContent initialDoas={doas} />;
}
