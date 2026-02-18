
export interface Narrator {
    name: string;
    slug: string;
    total: number;
}

export interface HadithDetail {
    name: string;
    slug: string;
    total: number;
    pagination: {
        prev: number | null;
        next: number | null;
        current: number;
    };
    contents: {
        number: number;
        arab: string;
        id: string; // Translation
    };
}

const BASE_URL = "https://api.myquran.com/v2/hadits";

export async function getNarrators(): Promise<Narrator[]> {
    try {
        const res = await fetch(`${BASE_URL}/perawi`, {
            next: { revalidate: 86400 } // Cache 24h
        });
        if (!res.ok) throw new Error("Failed to fetch narrators");
        const json = await res.json();
        return json.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function getHadith(slug: string, number: number): Promise<HadithDetail | null> {
    try {
        const res = await fetch(`${BASE_URL}/${slug}/${number}`, {
            next: { revalidate: 3600 } // Cache 1h
        });

        if (!res.ok) return null; // Handle 404 or errors gracefully

        const json = await res.json();
        if (!json.data) return null;

        // Map API response to our interface
        // API response for single hadith: 
        // { data: { name: "Bukhari", id: "bukhari", available: 7008, contents: { number: 1, arab: "...", id: "..." } } }
        // Note: The structure might vary slightly based on previous curl check, let's align with that.
        // Curl output was: {"data":{"arab":"...","indo":"...","judul":"...","no":"1"}} inside `data` wrapper? 
        // Wait, curl probe on `v2/hadits/arbain/1` output: 
        // {"status":true, "data": {"arab": "...", "indo": "...", "no": "1"}}
        // But for `perawi` (e.g. bukhari), it might be different. 
        // Let's assume standard structure or standard `contents` wrapper.
        // Based on common MyQuran V2: `data` contains `contents` or direct fields.
        // Let's implement a flexible mapper.

        const validData = json.data || {};
        const validInfo = json.info || {};
        const validContents = validData.contents || validData;

        return {
            name: validInfo.perawi?.name || validData.name || validData.judul || slug,
            slug: slug,
            total: validInfo.perawi?.total || validData.available || 0,
            pagination: {
                prev: number > 1 ? number - 1 : null,
                next: number + 1, // We don't know max effectively unless we pass it, but simple next is fine
                current: number
            },
            contents: {
                number: parseInt(validContents.number || validContents.no || number),
                arab: validContents.arab || "",
                id: validContents.id || validContents.indo || "" // 'id' contains the translation in some endpoints
            }
        };

    } catch (e) {
        console.error(e);
        return null;
    }
}
