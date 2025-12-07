"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrder(prevState: any, formData: FormData) {
    try {
        const supabase = await createClient();

        const orderData = {
            product_id: formData.get("product_id") as string,
            customer_name: formData.get("customer_name") as string,
            customer_phone: formData.get("customer_phone") as string,
            wilaya: formData.get("wilaya") as string,
            baladia: formData.get("baladia") as string,
            address: formData.get("address") as string,
            delivery_method: formData.get("delivery_method") as string,
            product_price: parseFloat(formData.get("product_price") as string),
            delivery_price: parseFloat(formData.get("delivery_price") as string),
            total_price: parseFloat(formData.get("total_price") as string),
            color: formData.get("color") as string,
            size: formData.get("size") as string,
            status: "pending",
        };

        const { data, error } = await supabase
            .from("orders")
            .insert(orderData)
            .select()
            .single();

        if (error) {
            console.error("Error creating order:", error);
            return {
                success: false,
                error: "Failed to create order. Please try again.",
            };
        }

        revalidatePath("/admin/orders");

        return {
            success: true,
            message: "Order created successfully!",
            orderId: data.id,
        };
    } catch (error) {
        console.error("Error in createOrder:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
        };
    }
}
