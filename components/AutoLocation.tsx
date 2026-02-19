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
                // Restore detailed info if available
                const savedName = localStorage.getItem("preferred_name");
                const savedLat = localStorage.getItem("preferred_lat");
                const savedLng = localStorage.getItem("preferred_lng");
                const locVer = localStorage.getItem("loc_ver");

                // IF we have detailed info AND it's the new version, use it.
                // Otherwise force re-detect to fix name format.
                if (savedName && savedLat && savedLng && locVer === "2") {
                    let url = `/${match.slug}`;
                    const params = new URLSearchParams();
                    params.set("lat", savedLat);
                    params.set("lng", savedLng);
                    params.set("name", savedName);

                    if (params.toString()) {
                        url += `?${params.toString()}`;
                    }

                    router.replace(url);
                    setStatus("done");
                    return;
                }

                // IF we only have the city slug (generic) but NO details,
                // we want to try to upgrade to a detailed location via GPS *if possible*.
                // So we do NOT return here. We let the code proceed to `detect()`.
                // However, we should technically redirect to the generic city momentarily 
                // so the user sees something while we upgrade in background?

                // Redirect to generic first (fast), then let detect() upgrade it.
                router.replace(`/${match.slug}`);
                // valid match found, but we proceed to detect to see if we can get better details.
            }
        }

        // 2. If no saved city, try Auto-Detect
        // We removed sessionStorage check to ensure it always tries to detect on refresh/first load
        // if no preference is saved.

        async function detect() {
            setStatus("detecting");
            try {
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
                        // Auto-save this detected city AND details as preferred
                        localStorage.setItem("preferred_city", match.slug);
                        localStorage.setItem("preferred_name", displayName);
                        localStorage.setItem("preferred_lat", latitude.toString());
                        localStorage.setItem("preferred_lng", longitude.toString());
                        localStorage.setItem("loc_ver", "2");

                        router.replace(`/${match.slug}?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(displayName)}`);
                        setStatus("done");
                        return;
                    }
                }

                const nearest = findNearestCity(latitude, longitude);
                const customName = locationResult?.displayName || nearest.name;

                // Save nearest match details
                localStorage.setItem("preferred_city", nearest.slug);
                localStorage.setItem("preferred_name", customName);
                localStorage.setItem("preferred_lat", latitude.toString());
                localStorage.setItem("preferred_lng", longitude.toString());
                localStorage.setItem("loc_ver", "2");

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
