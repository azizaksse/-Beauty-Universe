import { setRequestLocale } from 'next-intl/server';
import { CreateCategoryForm } from "./create-category-form";
import { CategoryList } from "./category-list";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function CategoriesPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Create Category Form */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                        <CreateCategoryForm />
                    </div>
                </div>

                {/* Categories List */}
                <div className="md:col-span-2">
                    <Suspense fallback={
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        </div>
                    }>
                        <CategoryList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
