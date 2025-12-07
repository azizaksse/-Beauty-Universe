import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from "react";
import { ProductList } from "./product-list";

export default async function ProductsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </Button>
                </Link>
            </div>

            <Suspense fallback={
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            }>
                <ProductList />
            </Suspense>
        </div>
    );
}
