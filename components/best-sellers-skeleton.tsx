export function BestSellersSkeleton() {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-11 w-24 animate-pulse rounded-md bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 gap-4 overflow-hidden sm:grid-cols-3 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm"
                    >
                        <div className="aspect-[3/4] w-full animate-pulse rounded-xl bg-gray-200" />
                        <div className="space-y-2 text-center">
                            <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                            <div className="mx-auto h-5 w-1/2 animate-pulse rounded bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
