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

        // Check if we already have a location preference in sessionStorage to avoid loops
        // (Optional: for now we obey user request to always default to current location on root)
        const hasRedirected = sessionStorage.getItem("auto_location_redirected");
        if (hasRedirected) return;

        async function detect() {
            setStatus("detecting");
            try {
                const coords = await getUserCoordinates();
                const { latitude, longitude } = coords;

                // Mark as redirected so we don't loop if user navigates back to root manually
                sessionStorage.setItem("auto_location_redirected", "true");

                const locationResult = await reverseGeocode(latitude, longitude);

                if (locationResult) {
                    const { city: cityName, displayName } = locationResult;
                    const cleanName = cityName.replace(/^(Kota|Kabupaten)\s+/i, "").trim().toLowerCase();

                    const match = INDONESIAN_CITIES.find(c => {
                        const dbName = c.name.toLowerCase();
                        return dbName === cleanName || dbName === cityName.toLowerCase() || c.kabkota?.toLowerCase() === cityName.toLowerCase();
                    });

                    if (match) {
                        router.replace(`/${match.slug}?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(displayName)}`);
                        setStatus("done");
                        return;
                    }
                }

                const nearest = findNearestCity(latitude, longitude);
                const customName = locationResult?.displayName || nearest.name;
                router.replace(`/${nearest.slug}?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(customName)}`);
                setStatus("done");

            } catch (error) {
                console.error("Auto-location failed:", error);
                // Silently fail and stay on default page
                setStatus("error");
            }
        }

        detect();
    }, [router, status]);

    return null; // Invisible component
}
