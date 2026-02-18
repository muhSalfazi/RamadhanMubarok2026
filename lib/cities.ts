import { City } from "@/types/prayer";

export const INDONESIAN_CITIES: City[] = [
    { name: "Karawang", slug: "karawang", lat: -6.3022, lng: 107.3011, country: "Indonesia" },
    { name: "Jakarta", slug: "jakarta", lat: -6.2088, lng: 106.8456, country: "Indonesia" },
    { name: "Surabaya", slug: "surabaya", lat: -7.2575, lng: 112.7521, country: "Indonesia" },
    { name: "Bandung", slug: "bandung", lat: -6.9175, lng: 107.6191, country: "Indonesia" },
    { name: "Medan", slug: "medan", lat: 3.5952, lng: 98.6722, country: "Indonesia" },
    { name: "Semarang", slug: "semarang", lat: -6.9932, lng: 110.4203, country: "Indonesia" },
    { name: "Makassar", slug: "makassar", lat: -5.1477, lng: 119.4327, country: "Indonesia" },
    { name: "Palembang", slug: "palembang", lat: -2.9761, lng: 104.7754, country: "Indonesia" },
    { name: "Tangerang", slug: "tangerang", lat: -6.1781, lng: 106.6297, country: "Indonesia" },
    { name: "Depok", slug: "depok", lat: -6.4025, lng: 106.7942, country: "Indonesia" },
    { name: "Bekasi", slug: "bekasi", lat: -6.2383, lng: 106.9756, country: "Indonesia" },
    { name: "Bogor", slug: "bogor", lat: -6.5971, lng: 106.806, country: "Indonesia" },
    { name: "Pekanbaru", slug: "pekanbaru", lat: 0.5071, lng: 101.4478, country: "Indonesia" },
    { name: "Bandar Lampung", slug: "bandar-lampung", lat: -5.3971, lng: 105.2668, country: "Indonesia" },
    { name: "Padang", slug: "padang", lat: -0.9471, lng: 100.4172, country: "Indonesia" },
    { name: "Malang", slug: "malang", lat: -7.9797, lng: 112.6304, country: "Indonesia" },
    { name: "Yogyakarta", slug: "yogyakarta", lat: -7.7956, lng: 110.3695, country: "Indonesia" },
    { name: "Solo", slug: "solo", lat: -7.5755, lng: 110.8243, country: "Indonesia" },
    { name: "Denpasar", slug: "denpasar", lat: -8.6705, lng: 115.2126, country: "Indonesia" },
    { name: "Samarinda", slug: "samarinda", lat: -0.5022, lng: 117.1536, country: "Indonesia" },
    { name: "Balikpapan", slug: "balikpapan", lat: -1.2654, lng: 116.8312, country: "Indonesia" },
    { name: "Banjarmasin", slug: "banjarmasin", lat: -3.3194, lng: 114.5908, country: "Indonesia" },
    { name: "Pontianak", slug: "pontianak", lat: -0.0263, lng: 109.3425, country: "Indonesia" },
    { name: "Manado", slug: "manado", lat: 1.4748, lng: 124.8421, country: "Indonesia" },
    { name: "Ambon", slug: "ambon", lat: -3.6954, lng: 128.1814, country: "Indonesia" },
    { name: "Jayapura", slug: "jayapura", lat: -2.5337, lng: 140.7181, country: "Indonesia" },
    { name: "Mataram", slug: "mataram", lat: -8.5833, lng: 116.1167, country: "Indonesia" },
    { name: "Kupang", slug: "kupang", lat: -10.1772, lng: 123.6071, country: "Indonesia" },
    { name: "Banda Aceh", slug: "banda-aceh", lat: 5.5483, lng: 95.3238, country: "Indonesia" },
    { name: "Batam", slug: "batam", lat: 1.1301, lng: 104.0529, country: "Indonesia" },
    { name: "Cirebon", slug: "cirebon", lat: -6.7063, lng: 108.5573, country: "Indonesia" },
    { name: "Tasikmalaya", slug: "tasikmalaya", lat: -7.3274, lng: 108.2207, country: "Indonesia" },
    { name: "Serang", slug: "serang", lat: -6.1104, lng: 106.1641, country: "Indonesia" },
    { name: "Sukabumi", slug: "sukabumi", lat: -6.9277, lng: 106.9299, country: "Indonesia" },
    { name: "Kediri", slug: "kediri", lat: -7.8166, lng: 112.0114, country: "Indonesia" },
    { name: "Jambi", slug: "jambi", lat: -1.6101, lng: 103.6131, country: "Indonesia" },
    { name: "Bengkulu", slug: "bengkulu", lat: -3.7928, lng: 102.2608, country: "Indonesia" },
    { name: "Palu", slug: "palu", lat: -0.8917, lng: 119.8707, country: "Indonesia" },
    { name: "Kendari", slug: "kendari", lat: -3.9985, lng: 122.5127, country: "Indonesia" },
    { name: "Sorong", slug: "sorong", lat: -0.8833, lng: 131.25, country: "Indonesia" },
];

export function getCityBySlug(slug: string): City | undefined {
    return INDONESIAN_CITIES.find((c) => c.slug === slug);
}

export const DEFAULT_CITY = INDONESIAN_CITIES[0]; // Karawang
