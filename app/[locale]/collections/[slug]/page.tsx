import { Navbar } from "@/components/navbar";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { BestSellersGrid } from "@/components/best-sellers-grid";
import { notFound } from "next/navigation";

export default async function CategoryPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("HomePage");

    const supabase = await createClient();

    // 1. Get Category ID from slug
    const { data: category } = await supabase
        .from("categories")
        .select("id, name")
        .eq("slug", slug)
        .single();

    if (!category) {
        notFound();
    }

    // 2. Get Products for Category
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .eq("category_id", category.id)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 pt-32 pb-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-neutral-900">{category.name}</h1>
                    <div className="mx-auto my-3 h-1 w-20 rounded-full bg-gradient-to-r from-gold-400 to-gold-600" />
                    <p className="mt-2 text-neutral-600">
                        {products?.length || 0} produits trouvés
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
