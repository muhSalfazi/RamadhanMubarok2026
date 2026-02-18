"use client";

import { useState } from "react";

interface AdzanToggleProps {
    className?: string;
}

export default function AdzanToggle({ className = "" }: AdzanToggleProps) {
    const [enabled, setEnabled] = useState(false);

    function toggle() {
        const next = !enabled;
        setEnabled(next);

        if (next) {
            // Feedback audio via Web Audio API
            try {
                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = "sine";
                osc.frequency.setValueAtTime(528, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.6);
            } catch {
                // Audio not supported — silent fail
            }
        }
    }

    return (
        <button
            onClick={toggle}
            title={enabled ? "Matikan notifikasi adzan" : "Aktifkan notifikasi adzan"}
            aria-label={enabled ? "Matikan notifikasi adzan" : "Aktifkan notifikasi adzan"}
            aria-pressed={enabled}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-premium ${enabled
                    ? "text-emerald-300"
                    : "text-white/40 hover:text-white/60"
                } ${className}`}
            style={{
                background: enabled ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${enabled ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.07)"}`,
            }}
        >
            {/* Toggle track */}
            <div
                className="toggle-track relative w-9 h-5 rounded-full"
                style={{ background: enabled ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.1)" }}
            >
                <div
                    className="toggle-thumb absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                    style={{ transform: enabled ? "translateX(18px)" : "translateX(2px)" }}
                />
            </div>

            {/* Icon */}
            {enabled ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12M9.172 9.172a4 4 0 000 5.656" />
                </svg>
            ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            )}

            <span className="hidden sm:inline text-xs font-medium">
                {enabled ? "Adzan On" : "Adzan Off"}
            </span>
        </button>
    );
}
