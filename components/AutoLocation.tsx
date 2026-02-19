"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { INDONESIAN_CITIES } from "@/lib/cities";
import { findNearestCity, getUserCoordinates, reverseGeocode } from "@/lib/locationUtils";

export default function AutoLocation() {
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "detecting" | "done" | "error">("idle");

    useEffect(() => {
        // Prevent running multiple times if already detecting or done
        if (status !== "idle") return;

        // 1. Check for saved preference (User manually selected a city before)
        const savedCitySlug = localStorage.getItem("preferred_city");
        if (savedCitySlug) {
            // Validate if valid city
            const match = INDONESIAN_CITIES.find(c => c.slug === savedCitySlug);
            if (match) {
                router.replace(`/${match.slug}`);
                setStatus("done");
                return;
            }
        }

        // 2. If no saved city, try Auto-Detect (only once per session to avoid annoyance)
        // We keep sessionStorage check ONLY for auto-detect, so we don't spam GPS requests
        // But saved city should always redirect.
        const hasAutoRedirected = sessionStorage.getItem("auto_location_redirected");
        if (hasAutoRedirected) return;

        async function detect() {
            setStatus("detecting");
            try {
                // Mark as redirected for auto-detect path
                sessionStorage.setItem("auto_location_redirected", "true");

                const coords = await getUserCoordinates();
                const { latitude, longitude } = coords;

                const locationResult = await reverseGeocode(latitude, longitude);

                if (locationResult) {
                    const { city: cityName, displayName } = locationResult;
                    const cleanName = cityName.replace(/^(Kota|Kabupaten)\s+/i, "").trim().toLowerCase();

                    const match = INDONESIAN_CITIES.find(c => {
                        const dbName = c.name.toLowerCase();
                        return dbName === cleanName || dbName === cityName.toLowerCase() || c.kabkota?.toLowerCase() === cityName.toLowerCase();
                    });

                    if (match) {
                        // Auto-save this detected city as preferred so next time it's instant
                        localStorage.setItem("preferred_city", match.slug);
                        router.replace(`/${match.slug}?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(displayName)}`);
                        setStatus("done");
                        return;
                    }
                }

                const nearest = findNearestCity(latitude, longitude);
                const customName = locationResult?.displayName || nearest.name;

                // Save nearest match
                localStorage.setItem("preferred_city", nearest.slug);

                router.replace(`/${nearest.slug}?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(customName)}`);
                setStatus("done");

            } catch (error) {
                console.error("Auto-location failed:", error);
                setStatus("error");
            }
        }

        detect();
    }, [router, status]);

    return null; // Invisible component
}
