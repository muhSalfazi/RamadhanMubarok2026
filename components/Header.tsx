"use client";

import AdzanToggle from "./AdzanToggle";
import LocationSwitcher from "./LocationSwitcher";

interface HeaderProps {
    citySlug: string;
}

export default function Header({ citySlug }: HeaderProps) {
    return (
        <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12 anim-fade-up">
            {/* Brand Identity */}
            <div className="flex items-center gap-3.5 group cursor-default">
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden glass-strong group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors" />
                    <span className="text-xl relative z-10 animate-pulse-slow">☪</span>
                </div>
                <div>
                    <h1 className="text-base font-bold text-white tracking-tight leading-none group-hover:text-emerald-300 transition-colors">
                        Ramadhan <span className="text-emerald-400">2026</span>
                    </h1>
                    <p className="text-xs text-white/40 mt-0.5 font-medium tracking-wide">
                        Digital Experience
                    </p>
                </div>
            </div>

            {/* Global Actions */}
            <div className="flex items-center gap-3 ml-auto">
                <div className="hidden sm:block h-8 w-px bg-white/10 mx-1" />
                <AdzanToggle />
                <LocationSwitcher currentSlug={citySlug} />
            </div>
        </header>
    );
}
