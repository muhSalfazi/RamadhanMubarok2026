
export interface Doa {
    id: string; // The API returns number, but we can treat as string for keys
    grup: string;
    nama: string;
    ar: string;
    tr: string;
    idn: string;
    tentang: string;
    tag: string[] | string; // API might return array or comma string, checking docs it said array/string
}

// Based on browser findings: { status: "success", total: 227, data: [...] }
export interface DoaResponse {
    status: string;
    total: number;
    data: Doa[];
}

const BASE_URL = "https://equran.id/api";

export async function fetchAllDoas(): Promise<Doa[]> {
    try {
        const res = await fetch(`${BASE_URL}/doa`, {
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!res.ok) throw new Error(`Failed to fetch doas: ${res.status}`);

        const json: DoaResponse = await res.json();
        // The API returns 'id' as number, convert to string if needed or keep as is.
        // Also 'tag' might be mixed, but docs said array.
        return json.data;
    } catch (error) {
        console.error("Error fetching doas:", error);
        return [];
    }
}
