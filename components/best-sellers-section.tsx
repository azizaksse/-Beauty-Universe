import { createClient } from "@/lib/supabase/server";
import { BestSellersGrid } from "@/components/best-sellers-grid";
import { getTranslations } from "next-intl/server";

export async function BestSellersSection() {
    const supabase = await createClient();
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(8);

    const t = await getTranslations("HomePage");

    return (
        <BestSellersGrid
            products={products || []}
            translations={{
                title: t("bestSellersTitle"),
                subtitle: t("bestSellersSubtitle"),
                viewAll: t("viewAll"),
            }}
        />
    );
}
