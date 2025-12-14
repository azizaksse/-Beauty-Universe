"use server";

import { createClient } from "@/lib/supabase/server";

export interface DashboardStats {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
    totalProducts: number;
    activeProducts: number;
    recentOrders: Array<{
        id: string;
        customer_name: string;
        total_price: number;
        status: string;
        created_at: string;
    }>;
    topProducts: Array<{
        product_id: string;
        product_title: string;
        order_count: number;
        total_revenue: number;
    }>;
    ordersByWilaya: Array<{
        wilaya: string;
        count: number;
    }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createClient();

    // Get total orders and revenue
    const { data: orders } = await supabase
        .from("orders")
        .select("total_price, status");

    const totalOrders = orders?.length || 0;
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_price || 0), 0) || 0;
    const pendingOrders = orders?.filter(o => o.status === "pending").length || 0;
    const completedOrders = orders?.filter(o => o.status === "completed").length || 0;

    // Get product stats
    const { data: products } = await supabase
        .from("products")
        .select("status");

    const totalProducts = products?.length || 0;
    const activeProducts = products?.filter(p => p.status === "active").length || 0;

    // Get recent orders
    const { data: recentOrders } = await supabase
        .from("orders")
        .select("id, customer_name, total_price, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

    // Get top products by order count
    const { data: orderProducts } = await supabase
        .from("orders")
        .select("product_id");

    const productCounts: Record<string, number> = {};
    orderProducts?.forEach(op => {
        if (op.product_id) {
            productCounts[op.product_id] = (productCounts[op.product_id] || 0) + 1;
        }
    });

    const topProductIds = Object.entries(productCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([id]) => id);

    const { data: topProductsData } = await supabase
        .from("products")
        .select("id, title")
        .in("id", topProductIds);

    const topProducts = topProductsData?.map(product => ({
        product_id: product.id,
        product_title: product.title,
        order_count: productCounts[product.id] || 0,
        total_revenue: 0 // Calculate if needed
    })) || [];

    // Get orders by wilaya
    const { data: ordersByWilayaData } = await supabase
        .from("orders")
        .select("wilaya");

    const wilayaCounts: Record<string, number> = {};
    ordersByWilayaData?.forEach(o => {
        if (o.wilaya) {
            wilayaCounts[o.wilaya] = (wilayaCounts[o.wilaya] || 0) + 1;
        }
    });

    const ordersByWilaya = Object.entries(wilayaCounts)
        .map(([wilaya, count]) => ({ wilaya, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return {
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders,
        totalProducts,
        activeProducts,
        recentOrders: recentOrders || [],
        topProducts,
        ordersByWilaya,
    };
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

    if (error) {
        console.error("Error updating order status:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
