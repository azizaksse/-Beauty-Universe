import { Link } from "@/i18n/routing";
import { Package, ShoppingCart, Settings } from "lucide-react";
import { setRequestLocale } from 'next-intl/server';

export default async function AdminDashboard({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Quick Stats / Links */}
                <Link href="/admin/products/new" className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Add Product</h2>
                        <Package className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-gray-500">Create new products and variants.</p>
                </Link>

                <Link href="/admin/orders" className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
                        <ShoppingCart className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-gray-500">View and manage customer orders.</p>
                </Link>

                <Link href="/admin/settings/shipping" className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Shipping</h2>
                        <Settings className="w-8 h-8 text-purple-500" />
                    </div>
                    <p className="text-gray-500">Configure delivery rates for 58 Wilayas.</p>
                </Link>
            </div>
        </div>
    );
}
