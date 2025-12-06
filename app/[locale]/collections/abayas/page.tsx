import { Navbar } from "@/components/navbar";
import { setRequestLocale } from "next-intl/server";

export default async function AbayasPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-10">
                <h1 className="text-3xl font-bold">Abayas</h1>
                <p className="mt-4 text-neutral-600">Coming soon...</p>
            </main>
        </div>
    );
}
