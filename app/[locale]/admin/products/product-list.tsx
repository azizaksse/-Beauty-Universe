import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { deleteProduct, toggleProductStatus } from "@/app/[locale]/admin/actions/products";
import { DeleteProductButton } from "./delete-product-button";

export async function ProductList() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            *,
            categories (
                name
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        return <div className="text-red-500">Error loading products.</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Created At</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {product.images && product.images.length > 0 ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="w-12 h-12 object-cover rounded-md border"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded-md border flex items-center justify-center text-gray-400">
                                                No Img
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {product.title}
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        {product.price} DA
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.categories?.name || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <form action={async () => {
                                            "use server";
                                            await toggleProductStatus(product.id, product.status);
                                        }}>
                                            <button type="submit" className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${product.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                                product.status === 'draft' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {product.status}
                                            </button>
                                        </form>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {format(new Date(product.created_at), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <DeleteProductButton id={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <p className="text-gray-500">No products found.</p>
                                        <Link href="/admin/products/new">
                                            <Button variant="outline">Add your first product</Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
