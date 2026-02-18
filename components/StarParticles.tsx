"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    minOpacity: number;
    maxOpacity: number;
}

function generateStars(count: number): Star[] {
    return Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        minOpacity: Math.random() * 0.1 + 0.05,
        maxOpacity: Math.random() * 0.4 + 0.2,
    }));
}

export default function StarParticles() {
    const starsRef = useRef<Star[]>(generateStars(80));

    return (
        <div className="stars-container" aria-hidden="true">
            {starsRef.current.map((star, i) => (
                <div
                    key={i}
                    className="star"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        "--duration": `${star.duration}s`,
                        "--delay": `${star.delay}s`,
                        "--min-opacity": star.minOpacity,
                        "--max-opacity": star.maxOpacity,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
