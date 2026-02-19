"use client";

import Link from "next/link";
import AdzanToggle from "./AdzanToggle";
import LocationSwitcher from "./LocationSwitcher";

interface HeaderProps {
    citySlug: string;
}

export default function Header({ citySlug }: HeaderProps) {
    return (
        <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12 anim-fade-up">
            {/* Brand Identity */}
            <div className="flex items-center gap-4 group cursor-default">
                <div className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-[#042f2e] border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white fill-current relative z-10" viewBox="0 0 24 24">
                        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                        <path d="M19.088 4.65c.67.62 1.34 1.25.77 2.08-.55.79-1.36.46-1.95.14-.66-.35-1.42-.8-1.07-1.63.36-.88 1.48-.96 2.25-.59z" opacity="0.8" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-emerald-400 tracking-tight leading-none">
                        Ramadhan <span className="text-white">1447 H</span>
                    </h1>
                    <p className="text-sm text-white/40 mt-0.5 font-medium tracking-wide">
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
