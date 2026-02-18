import { NextRequest, NextResponse } from "next/server";
import { fetchPrayerTimesByCoords, fetchPrayerTimesByCity } from "@/lib/aladhan";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const city = searchParams.get("city");
    const country = searchParams.get("country") || "Indonesia";
    const date = searchParams.get("date") || undefined;

    try {
        let data;

        if (lat && lng) {
            data = await fetchPrayerTimesByCoords(
                parseFloat(lat),
                parseFloat(lng),
                date
            );
        } else if (city) {
            data = await fetchPrayerTimesByCity(city, country, date);
        } else {
            return NextResponse.json(
                { error: "Provide either lat/lng or city parameter" },
                { status: 400 }
            );
        }

        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Prayer API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch prayer times. Please try again." },
            { status: 500 }
        );
    }
}
