"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
}

interface BestSellersGridProps {
    products: Product[];
    translations: {
        title: string;
        subtitle: string;
        viewAll: string;
    };
    hideHeader?: boolean;
}

export function BestSellersGrid({ products, translations, hideHeader = false }: BestSellersGridProps) {
    return (
        <section className="space-y-6">
            {!hideHeader && (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            {translations.title}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-neutral-900">
                            {translations.subtitle}
                        </h2>
                    </div>
                    <Link href="/collections/all">
                        <Button className="h-11 rounded-md bg-black px-5 text-sm font-semibold text-white">
                            {translations.viewAll}
                        </Button>
                    </Link>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4 overflow-hidden sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <Link href={`/product/${product.id}`} key={product.id} className="block h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group h-full space-y-3 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-50">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1 text-center">
                                <p className="text-sm font-semibold text-neutral-900">
                                    {product.title}
                                </p>
                                <p className="text-base font-bold text-neutral-900">{product.price} DA</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
