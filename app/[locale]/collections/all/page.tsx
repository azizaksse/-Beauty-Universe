import { Navbar } from "@/components/navbar";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { BestSellersGrid } from "@/components/best-sellers-grid";

export default async function AllCollectionsPage({
    params,
    searchParams
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ search?: string }>;
}) {
    const { locale } = await params;
    const { search } = await searchParams;
    setRequestLocale(locale);
    const t = await getTranslations("HomePage");

    const supabase = await createClient();
    let query = supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

    if (search) {
        query = query.ilike("title", `%${search}%`);
    }

    const { data: products } = await query;

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 pt-32 pb-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        {search ? `Search results for "${search}"` : t("categoriesTitle")}
                    </h1>
                    <p className="mt-2 text-neutral-600">
                        {search ? `${products?.length || 0} results found` : t("categoriesSubtitle")}
                    </p>
                </div>

                <BestSellersGrid
                    products={products || []}
                    translations={{
                        title: "",
                        subtitle: "",
                        viewAll: "",
                    }}
                    hideHeader={true}
                />
            </main>
        </div>
    );
}
