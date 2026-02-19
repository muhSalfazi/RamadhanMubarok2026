"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    const links = [
        {
            href: "/", label: "Home", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            href: "/quran", label: "Al-Qur'an", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            href: "/ibadah", label: "Ibadah", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )
        },
        {
            href: "/hadith", label: "Hadist", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },


    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto">
            {/* Mobile Bottom Nav */}
            <div className="md:hidden glass backdrop-blur-xl border-t border-white/10 px-6 py-3 flex justify-between items-center bg-[#020617]/80">
                {links.map((link) => {
                    let isActive = pathname.startsWith(link.href) && (link.href !== "/karawang" || pathname === "/karawang" || pathname === "/");

                    // Special case for Ibadah to include /doa and /kiblat
                    if (link.href === "/ibadah") {
                        isActive = pathname.startsWith("/ibadah") || pathname.startsWith("/doa") || pathname.startsWith("/kiblat");
                    }

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-emerald-400 scale-110' : 'text-white/40 hover:text-white/70'}`}
                        >
                            {link.icon}
                            <span className="text-[10px] font-medium">{link.label}</span>
                            {isActive && <div className="w-1 h-1 rounded-full bg-emerald-400 absolute -bottom-2" />}
                        </Link>
                    )
                })}
            </div>

            {/* Desktop Top Nav Overlay (Optional, if we want menu on top) */}
            {/* Currently Header.tsx handles top area, we can keep this for mobile only or create a floating dock for desktop later if needed */}
            <div className="hidden md:flex fixed right-8 top-8 z-50 flex-col gap-4">
                {links.map((link) => {
                    let isActive = pathname.startsWith(link.href) && (link.href !== "/karawang" || pathname === "/karawang" || pathname === "/");

                    if (link.href === "/ibadah") {
                        isActive = pathname.startsWith("/ibadah") || pathname.startsWith("/doa") || pathname.startsWith("/kiblat");
                    }

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group relative ${isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                        >
                            {link.icon}
                            <span className="absolute right-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                {link.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}
