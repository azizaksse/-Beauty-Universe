import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/app/[locale]/admin/actions/categories";

export async function CategoryList() {
    const supabase = await createClient();
    const { data: categories, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching categories:", error);
        return <div className="text-red-500">Error loading categories.</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Slug</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {category.slug}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <form action={async () => {
                                        "use server";
                                        await deleteCategory(category.id);
                                    }}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            type="submit"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                No categories found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
