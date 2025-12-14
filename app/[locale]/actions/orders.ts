"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sendOrderConfirmationEmail } from "@/lib/email/send-order-confirmation";

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

        // Fetch product details for email
        const { data: product } = await supabase
            .from("products")
            .select("title")
            .eq("id", orderData.product_id)
            .single();

        // Send email confirmation
        try {
            await sendOrderConfirmationEmail({
                orderId: data.id,
                customerName: orderData.customer_name,
                productTitle: product?.title || "Product",
                productPrice: orderData.product_price,
                deliveryPrice: orderData.delivery_price,
                totalPrice: orderData.total_price,
                wilaya: orderData.wilaya,
                baladia: orderData.baladia || "",
                address: orderData.address || "",
                phone: orderData.customer_phone,
                size: orderData.size || undefined,
                color: orderData.color || undefined,
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Don't fail the order if email fails
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
