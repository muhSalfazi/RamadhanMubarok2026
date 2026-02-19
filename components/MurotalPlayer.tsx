"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    audioUrl: string;
    title: string;
    qari: string;
    onNext: () => void;
    onPrev: () => void;
}

export default function MurotalPlayer({ audioUrl, title, qari, onNext, onPrev }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);

    const [error, setError] = useState<string | null>(null);

    // Reset state when audioUrl changes
    useEffect(() => {
        setIsPlaying(true);
        setProgress(0);
        setError(null);
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Auto-play blocked or error:", e);
                    setIsPlaying(false);
                });
            }
        }
    }, [audioUrl]);

    const handleError = () => {
        setError("Gagal memutar audio. Coba lagi atau periksa koneksi.");
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setProgress(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
    };

    const handleSpeedChange = () => {
        const speeds = [1, 1.25, 1.5, 0.75];
        const nextSpeedIdx = (speeds.indexOf(speed) + 1) % speeds.length;
        const newSpeed = speeds[nextSpeedIdx];
        setSpeed(newSpeed);
        if (audioRef.current) audioRef.current.playbackRate = newSpeed;
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? "0" + sec : sec}`;
    };

    return (
        <div className="fixed bottom-[62px] md:bottom-0 left-0 right-0 z-50 bg-[#0f172a]/90 backdrop-blur-xl border-t border-white/10 p-4 anim-slide-up">
            <audio
                ref={audioRef}
                src={audioUrl}
                onError={handleError}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onNext}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
            />

            <div className="max-w-3xl mx-auto flex items-center gap-4">
                {/* Info */}
                <div className="hidden md:block w-48">
                    <p className="text-white font-bold truncate">{title}</p>
                    {error ? (
                        <p className="text-red-400 text-xs truncate animate-pulse">{error}</p>
                    ) : (
                        <p className="text-white/40 text-xs truncate">{qari}</p>
                    )}
                </div>

                {/* Controls */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-4">
                        <button onClick={onPrev} className="text-white/60 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                        </button>

                        <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-white transition-colors shadow-lg shadow-emerald-500/20">
                            {isPlaying ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>

                        <button onClick={onNext} className="text-white/60 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full flex items-center gap-2 text-xs text-white/40 font-mono">
                        <span>{formatTime(progress)}</span>
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                            if (!audioRef.current) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pos = (e.clientX - rect.left) / rect.width;
                            audioRef.current.currentTime = pos * duration;
                        }}>
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(progress / duration) * 100}%` }} />
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Extras */}
                <div className="flex items-center gap-3">
                    <button onClick={handleSpeedChange} className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded hover:bg-emerald-500/20 transition-colors w-12 text-center">
                        {speed}x
                    </button>
                </div>
            </div>
        </div>
    );
}
