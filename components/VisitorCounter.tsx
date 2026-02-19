"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
    const [visits, setVisits] = useState<number>(0);

    useEffect(() => {
        // Try to load from local storage first to avoid "0" flash
        const savedVisits = localStorage.getItem("visit_count");
        if (savedVisits) {
            setVisits(parseInt(savedVisits));
        }

        const fetchVisits = () => {
            // Use internal API route to bypass ad-blockers
            fetch("/api/visits")
                .then((res) => {
                    if (!res.ok) throw new Error("Internal API Error");
                    return res.json();
                })
                .then((data) => {
                    if (data.count) {
                        setVisits(data.count);
                        localStorage.setItem("visit_count", data.count.toString());
                    }
                })
                .catch((err) => {
                    console.error("Failed to fetch visits:", err);
                    // On error, if we have 0 (initial), try to set to 1 as fallback so it doesn't show "..." forever
                    setVisits(prev => prev === 0 ? 1 : prev);
                });
        };

        // Initial fetch
        fetchVisits();

        // Refresh every 30 seconds to show "live" updates if others visit
        const interval = setInterval(fetchVisits, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-wider text-emerald-400/60 bg-emerald-500/5 py-1.5 px-4 rounded-full border border-emerald-500/10 mt-8 backdrop-blur-sm hover:bg-emerald-500/10 transition-colors mx-auto w-fit mb-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{visits > 0 ? visits.toLocaleString() : "..."} Visits</span>
        </div>
    );
}
