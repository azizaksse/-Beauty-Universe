import { Link } from "@/i18n/routing";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    ListTree,
    Palette,
    Users,
    Truck,
    Settings,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from 'next-intl/server';

export default async function AdminLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Orders
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <Package className="w-5 h-5 mr-3" />
                        Products
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <ListTree className="w-5 h-5 mr-3" />
                        Categories
                    </Link>
                    <Link
                        href="/admin/design"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <Palette className="w-5 h-5 mr-3" />
                        Store Design
                    </Link>
                    <Link
                        href="/admin/customers"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <Users className="w-5 h-5 mr-3" />
                        Customers
                    </Link>
                    <Link
                        href="/admin/settings/shipping"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <Truck className="w-5 h-5 mr-3" />
                        Shipping
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
