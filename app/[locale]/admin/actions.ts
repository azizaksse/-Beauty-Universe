"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);

    // Parse variants
    const variantsJson = formData.get("variants") as string;
    const variants = variantsJson ? JSON.parse(variantsJson) : [];

    // Parse images (URLs sent from client)
    const imagesJson = formData.get("images") as string;
    const images = imagesJson ? JSON.parse(imagesJson) : [];

    // 1. Insert Product
    const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
            title,
            price,
            images: images, // Save array of URLs directly
        })
        .select()
        .single();

    if (productError) {
        console.error("Error creating product:", productError);
        return { error: "Failed to create product" };
    }

    // 2. Insert Variants
    if (variants.length > 0) {
        const variantsData = variants.map((v: any) => ({
            product_id: product.id,
            size: v.size,
            color: v.color,
            stock: parseInt(v.stock),
        }));

        const { error: variantsError } = await supabase
            .from("product_variants")
            .insert(variantsData);

        if (variantsError) {
            console.error("Error creating variants:", variantsError);
            // Ideally we should rollback product creation here, but for simplicity we'll just return error
            return { error: "Failed to create variants" };
        }
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function getShippingZones() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("shipping_zones")
        .select("*")
        .order("wilaya_name");

    if (error) {
        console.error("Error fetching shipping zones:", error);
        return [];
    }

    return data;
}

export async function updateShippingRate(id: number, homePrice: number, deskPrice: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("shipping_zones")
        .update({
            home_delivery_price: homePrice,
            desk_delivery_price: deskPrice
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating shipping rate:", error);
        return { error: "Failed to update shipping rate" };
    }

    revalidatePath("/admin/settings/shipping");
    return { success: true };
}
