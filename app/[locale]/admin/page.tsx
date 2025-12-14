import { getDashboardStats } from "@/app/[locale]/admin/actions/analytics";
import { Package, TrendingUp, Clock, CheckCircle, ShoppingBag } from "lucide-react";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم - Dashboard</h1>
                <p className="text-gray-600 mt-2">نظرة عامة على المبيعات والطلبات</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="إجمالي الطلبات"
                    value={stats.totalOrders}
                    icon={<ShoppingBag className="w-6 h-6" />}
                    color="blue"
                />
                <StatCard
                    title="الإيرادات"
                    value={`${stats.totalRevenue.toLocaleString()} DA`}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="green"
                />
                <StatCard
                    title="قيد الانتظار"
                    value={stats.pendingOrders}
                    icon={<Clock className="w-6 h-6" />}
                    color="yellow"
                />
                <StatCard
                    title="مكتملة"
                    value={stats.completedOrders}
                    icon={<CheckCircle className="w-6 h-6" />}
                    color="purple"
                />
            </div>

            {/* Product Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Package className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-900">المنتجات</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">إجمالي المنتجات:</span>
                            <span className="text-2xl font-bold text-gray-900">{stats.totalProducts}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">المنتجات النشطة:</span>
                            <span className="text-2xl font-bold text-green-600">{stats.activeProducts}</span>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">المنتجات الأكثر مبيعاً</h2>
                    <div className="space-y-3">
                        {stats.topProducts.slice(0, 5).map((product, index) => (
                            <div key={product.product_id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-100 text-gold-600 font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-900 font-medium">{product.product_title}</span>
                                </div>
                                <span className="text-gray-600">{product.order_count} طلب</span>
                            </div>
                        ))}
                        {stats.topProducts.length === 0 && (
                            <p className="text-gray-500 text-center py-4">لا توجد بيانات بعد</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">الطلبات الأخيرة</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-right py-3 px-4 text-gray-600 font-semibold">العميل</th>
                                <th className="text-right py-3 px-4 text-gray-600 font-semibold">المبلغ</th>
                                <th className="text-right py-3 px-4 text-gray-600 font-semibold">الحالة</th>
                                <th className="text-right py-3 px-4 text-gray-600 font-semibold">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-900">{order.customer_name}</td>
                                    <td className="py-3 px-4 text-gray-900 font-semibold">
                                        {order.total_price.toLocaleString()} DA
                                    </td>
                                    <td className="py-3 px-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {new Date(order.created_at).toLocaleDateString('ar-DZ')}
                                    </td>
                                </tr>
                            ))}
                            {stats.recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-500">
                                        لا توجد طلبات بعد
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Orders by Wilaya */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">الطلبات حسب الولاية</h2>
                <div className="space-y-3">
                    {stats.ordersByWilaya.map((item) => (
                        <div key={item.wilaya} className="flex items-center justify-between">
                            <span className="text-gray-900 font-medium">{item.wilaya}</span>
                            <div className="flex items-center gap-3">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gold-500 h-2 rounded-full"
                                        style={{
                                            width: `${(item.count / stats.totalOrders) * 100}%`,
                                        }}
                                    />
                                </div>
                                <span className="text-gray-600 w-12 text-right">{item.count}</span>
                            </div>
                        </div>
                    ))}
                    {stats.ordersByWilaya.length === 0 && (
                        <p className="text-gray-500 text-center py-4">لا توجد بيانات بعد</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'yellow' | 'purple';
}) {
    const colors = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${colors[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const statusConfig: Record<string, { label: string; className: string }> = {
        pending: { label: 'قيد الانتظار', className: 'bg-yellow-100 text-yellow-800' },
        confirmed: { label: 'مؤكد', className: 'bg-blue-100 text-blue-800' },
        shipped: { label: 'تم الشحن', className: 'bg-purple-100 text-purple-800' },
        delivered: { label: 'تم التوصيل', className: 'bg-green-100 text-green-800' },
        cancelled: { label: 'ملغي', className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}>
            {config.label}
        </span>
    );
}
