export default function CityLoading() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-midnight">
            <div className="absolute inset-0 ramadhan-bg opacity-50" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10 pb-20">

                {/* Header Skeleton */}
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-9 w-28 bg-white/5 rounded-xl animate-pulse" />
                        <div className="h-9 w-32 bg-white/5 rounded-xl animate-pulse" />
                    </div>
                </div>

                {/* Hero Skeleton */}
                <div className="text-center mb-12">
                    <div className="h-8 w-64 bg-white/5 rounded-full mx-auto mb-6 animate-pulse" />
                    <div className="h-16 w-48 bg-white/5 rounded-2xl mx-auto mb-6 animate-pulse" />
                    <div className="flex justify-center gap-4">
                        <div className="h-10 w-36 bg-white/5 rounded-xl animate-pulse" />
                        <div className="h-10 w-36 bg-white/5 rounded-xl animate-pulse" />
                    </div>
                </div>

                {/* Countdown Skeleton */}
                <div className="h-64 rounded-2xl bg-white/5 animate-pulse mb-8" />

                {/* Grid Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>

            </div>
        </div>
    );
}
