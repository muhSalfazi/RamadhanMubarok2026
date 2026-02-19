"use client";

import { useAdzan } from "./AdzanContext";

interface AdzanToggleProps {
    className?: string;
}

export default function AdzanToggle({ className = "" }: AdzanToggleProps) {
    const { isAdzanEnabled, toggleAdzan, playAdzan, isPlaying, stopAdzan, audioError } = useAdzan();

    return (
        <div className={`flex flex-col items-end gap-2 ${className}`}>
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleAdzan}
                    title={isAdzanEnabled ? "Matikan notifikasi adzan" : "Aktifkan notifikasi adzan"}
                    aria-label={isAdzanEnabled ? "Matikan notifikasi adzan" : "Aktifkan notifikasi adzan"}
                    aria-pressed={isAdzanEnabled}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-premium ${isAdzanEnabled
                        ? "text-emerald-300"
                        : "text-white/40 hover:text-white/60"
                        }`}
                    style={{
                        background: isAdzanEnabled ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isAdzanEnabled ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.07)"}`,
                    }}
                >
                    {/* Toggle track */}
                    <div
                        className="toggle-track relative w-9 h-5 rounded-full"
                        style={{ background: isAdzanEnabled ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.1)" }}
                    >
                        <div
                            className="toggle-thumb absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300"
                            style={{ transform: isAdzanEnabled ? "translateX(18px)" : "translateX(2px)" }}
                        />
                    </div>

                    {/* Icon */}
                    {isAdzanEnabled ? (
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
                        {isAdzanEnabled ? "Adzan On" : "Adzan Off"}
                    </span>
                </button>

                {/* Test Button - Only show when enabled */}
                {isAdzanEnabled && (
                    <button
                        onClick={isPlaying ? stopAdzan : playAdzan}
                        title={isPlaying ? "Stop Test" : "Test Suara Adzan"}
                        className={`p-2 rounded-xl transition-colors ${isPlaying ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"}`}
                    >
                        {isPlaying ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {/* Error Message */}
            {audioError && (
                <div className="text-[10px] text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                    {audioError}
                </div>
            )}
        </div>
    );
}
