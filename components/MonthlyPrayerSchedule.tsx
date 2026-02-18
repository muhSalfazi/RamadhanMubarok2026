"use client";

import { AladhanData } from "../lib/prayerApi";
import { formatHijriDateId } from "../lib/hijriConfig";

interface MonthlyPrayerScheduleProps {
    data: AladhanData[];
}

export default function MonthlyPrayerSchedule({ data }: MonthlyPrayerScheduleProps) {
    if (!data || data.length === 0) return null;

    // Get current date for highlighting
    // Note: In a real app we might want to pass "currentDate" as prop to match server time
    // but for highlighting "today" in the list, client side date is usually fine.
    // However, since we have fixed dates for Ramadhan in this project, we might want to highlight based on the first item?
    // Let's just highlight if the date matches today's date.

    // Actually, for this specific project context where we force "1 Ramadhan 2026", 
    // highlighting the "current" row might be tricky if we use actual system date (which is 2026 in the prompt but might vary).
    // Let's rely on the date string comparison.

    return (
        <div className="w-full overflow-hidden rounded-2xl glass border border-white/10 anim-fade-up">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white">Jadwal Imsakiyah</h3>
                    <p className="text-white/40 text-sm">Ramadhan 1447 H / 2026 M</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="p-4 text-xs font-semibold text-emerald-400 uppercase tracking-wider whitespace-nowrap">Tanggal</th>
                            <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Imsak</th>
                            <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Subuh</th>
                            <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Dzuhur</th>
                            <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Ashar</th>
                            <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Maghrib</th>
                            <th className="p-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-center">Isya</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((day, index) => {
                            const timings = day.timings;
                            const hijri = day.date.hijri;
                            const gregorian = day.date.gregorian;

                            // Simple highlight logic: check if this row has same date as first data (assuming we are showing "current" month)
                            // Or better, don't highlight for now unless requested.
                            const hijriDateStr = formatHijriDateId(hijri, gregorian.date); // e.g. "1 Ramadhan 1447 H"
                            const [hDay, hMonth] = hijriDateStr.split(" ");

                            // Skip if day is invalid (e.g. 0 Ramadhan due to negative offset)
                            if (parseInt(hDay) < 1) return null;

                            return (
                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium text-sm">{hDay} {hMonth}</span>
                                            <span className="text-white/30 text-xs">{gregorian.day} {gregorian.month.en}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center font-mono text-white/80 text-sm">{timings.Imsak.replace(/\s*\(.*\)/, "")}</td>
                                    <td className="p-4 text-center font-mono text-white/80 text-sm">{timings.Fajr.replace(/\s*\(.*\)/, "")}</td>
                                    <td className="p-4 text-center font-mono text-white/80 text-sm">{timings.Dhuhr.replace(/\s*\(.*\)/, "")}</td>
                                    <td className="p-4 text-center font-mono text-white/80 text-sm">{timings.Asr.replace(/\s*\(.*\)/, "")}</td>
                                    <td className="p-4 text-center font-mono text-emerald-400 font-bold text-sm bg-emerald-500/5 rounded-lg">{timings.Maghrib.replace(/\s*\(.*\)/, "")}</td>
                                    <td className="p-4 text-center font-mono text-white/80 text-sm">{timings.Isha.replace(/\s*\(.*\)/, "")}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
