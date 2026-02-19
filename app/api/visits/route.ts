
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Use counterapi.dev's increment endpoint
        // This runs on server, so adblockers won't block it
        const res = await fetch("https://api.counterapi.dev/v1/ramadhan-tracker-v2/visits/up", {
            cache: 'no-store',
            headers: {
                // Mimic a browser request to avoid potential bot blocking (though counterapi is public)
                'User-Agent': 'Mozilla/5.0 (compatible; RamadhanTrackerBot/1.0; +https://ramadhanmubarok2026.vercel.app)'
            }
        });

        if (!res.ok) {
            throw new Error(`External API responded with ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Visitor API Error:", error);
        // Fallback: return a generic success but maybe null count or handle error gracefully
        return NextResponse.json({ error: "Failed to fetch visits" }, { status: 500 });
    }
}
