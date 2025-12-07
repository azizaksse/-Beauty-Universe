import { createClient } from "@/lib/supabase/server";
import { setRequestLocale } from 'next-intl/server';
import { notFound } from "next/navigation";
import { EditProductForm } from "@/app/[locale]/admin/products/edit-product-form";

export default async function EditProductPage({
    params
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    const supabase = await createClient();

    // Fetch product
    const { data: product, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (productError || !product) {
        notFound();
    }

    // Fetch variants
    const { data: variants, error: variantsError } = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", id);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
            <EditProductForm product={product} variants={variants || []} />
        </div>
    );
}
