import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductOrderForm } from "@/components/product-order-form";
import { ProductGallery } from "@/components/product-gallery";
import { getShippingZones } from "@/app/[locale]/admin/actions";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string; locale: string }>;
}) {
    const { id, locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("ProductPage");

    const supabase = await createClient();
    const { data: product } = await supabase
        .from("products")
        .select("*, product_variants(*)")
        .eq("id", id)
        .single();

    if (!product) {
        notFound();
    }

    const shippingZones = await getShippingZones();

    return (
        <div className="min-h-screen bg-white pb-20 text-neutral-900">
            <Navbar />

            <main className="mx-auto max-w-6xl px-4 pt-32">
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("backToHome")}
                </Link>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Image Gallery */}
                    <ProductGallery images={product.images || []} title={product.title} />

                    {/* Product Info & Order Form */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
                                {product.title}
                            </h1>
                            <p className="text-2xl font-bold text-neutral-900">
                                {product.price} DA
                            </p>
                        </div>

                        {product.description && (
                            <div className="prose prose-sm text-neutral-600">
                                <p>{product.description}</p>
                            </div>
                        )}

                        <ProductOrderForm product={product} shippingZones={shippingZones} />
                    </div>
                </div>
            </main>
        </div>
    );
}
