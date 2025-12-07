import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/navbar";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProductOrderForm } from "@/components/product-order-form";

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
                    <div className="space-y-4">
                        <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
                            {product.images && product.images[0] ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-neutral-400">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images?.slice(1).map((img: string, i: number) => (
                                <div
                                    key={i}
                                    className="aspect-square overflow-hidden rounded-xl bg-neutral-100"
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} ${i + 2}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

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

                        <ProductOrderForm product={product} />
                    </div>
                </div>
            </main>
        </div>
    );
}
