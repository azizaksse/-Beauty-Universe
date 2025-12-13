import { createClient } from "@/lib/supabase/server";
import { BestSellersGrid } from "@/components/best-sellers-grid";
import { getTranslations } from "next-intl/server";

export async function BestSellersSection() {
    const supabase = await createClient();
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .not("category_id", "is", null)
        .order("created_at", { ascending: false })
        .limit(8);

    // const products = [
    //     {
    //         id: "1",
    //         title: "Fauteuil de Coiffure Theodore",
    //         price: 58000,
    //         images: ["/images/products/theodore-barber-chair.png"]
    //     },
    //     {
    //         id: "2",
    //         title: "Miroir Intelligent LED",
    //         price: 25000,
    //         images: ["/images/products/smart-mirror-led.png"]
    //     },
    //     {
    //         id: "3",
    //         title: "Panneaux Alternatifs Bois",
    //         price: 4500,
    //         images: ["/images/products/wood-alternative-panels.png"]
    //     },
    //     {
    //         id: "4",
    //         title: "Armoire Outils Coiffure",
    //         price: 32000,
    //         images: ["/images/products/barber-tools-cabinet.png"]
    //     }
    // ];

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
