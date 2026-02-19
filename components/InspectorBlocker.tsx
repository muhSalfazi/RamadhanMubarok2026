"use client";

import { useEffect } from "react";

export default function InspectorBlocker() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }
            // Ctrl+Shift+I / J / C (Inspector/Console)
            if (
                (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c")) ||
                // Ctrl+U (View Source)
                (e.ctrlKey && (e.key === "U" || e.key === "u"))
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return null;
}
