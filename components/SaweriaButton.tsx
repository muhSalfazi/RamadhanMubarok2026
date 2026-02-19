"use client";

import Image from "next/image";

export default function SaweriaButton() {
    return (
        <a
            href="https://saweria.co/muhSalfazi" // Username sesuai di screenshot
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 md:bottom-6 left-6 z-50 group flex items-center justify-center p-3 rounded-full bg-[#faae2b] hover:bg-[#ffb93d] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-[#5c3c0d]/10"
            aria-label="Dukung kami di Saweria"
        >
            {/* Simple Icon Representation (Wallet/Heart) or just Text if no icon available */}
            <div className="relative w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#5c3c0d]">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                </svg>
            </div>

            {/* Tooltip text on hover */}
            <span className="absolute left-full ml-3 px-3 py-1.5 bg-white text-gray-900 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
                Dukung Developer
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
            </span>
        </a>
    );
}
