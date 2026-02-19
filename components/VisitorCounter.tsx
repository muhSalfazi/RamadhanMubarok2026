"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
    const [visits, setVisits] = useState<number>(0);

    useEffect(() => {
        // Optimistic initialization: Try to read from local storage, else default to 1
        const saved = localStorage.getItem("visit_count");
        const initialCount = saved ? parseInt(saved) : 1;
        setVisits(initialCount);

        const fetchVisits = () => {
            const hasVisited = localStorage.getItem("has_visited");
            const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            const isIgnored = localStorage.getItem("ignore_visits") === "true";
            const apiUrl = hasVisited || isLocalhost || isIgnored ? "/api/visits?mode=read" : "/api/visits";

            // Try internal API first
            fetch(apiUrl)
                .then((res) => {
                    if (!res.ok) throw new Error("API Error");
                    return res.json();
                })
                .then((data) => {
                    if (data.count) {
                        setVisits(data.count);
                        localStorage.setItem("visit_count", data.count.toString());
                        if (!hasVisited) {
                            localStorage.setItem("has_visited", "true");
                        }
                    }
                })
                .catch(() => {
                    // Silent fail - we already showed optimistic "1" or cached value
                    // Try fallback to direct call if internal API failed (last resort)
                    // Only try fallback if we haven't visited yet (to increment)
                    if (!hasVisited) {
                        fetch("https://api.counterapi.dev/v1/ramadhan-tracker-v2/visits/up")
                            .then(r => r.json())
                            .then(d => {
                                if (d.count) {
                                    setVisits(d.count);
                                    localStorage.setItem("visit_count", d.count.toString());
                                    localStorage.setItem("has_visited", "true");
                                }
                            })
                            .catch(e => console.warn("Visitor counter unreachable"));
                    }
                });
        };

        fetchVisits();
        const interval = setInterval(fetchVisits, 30000); // Live update
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-wider text-emerald-400/60 bg-emerald-500/5 py-1.5 px-4 rounded-full border border-emerald-500/10 mt-8 backdrop-blur-sm hover:bg-emerald-500/10 transition-colors mx-auto w-fit mb-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{visits > 0 ? visits.toLocaleString() : "1"} Visits</span>
        </div>
    );
}
