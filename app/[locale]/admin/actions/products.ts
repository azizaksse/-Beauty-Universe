"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const category_id = formData.get("category_id") as string;

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
            images: images,
            category_id: category_id || null,
            status: 'draft' // Default to draft
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
            // Ideally we should rollback product creation here
            return { error: "Failed to create variants" };
        }
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    const supabase = await createClient();

    // 1. Delete Variants first (Foreign Key Constraint)
    const { error: variantsError } = await supabase
        .from("product_variants")
        .delete()
        .eq("product_id", id);

    if (variantsError) {
        console.error("Error deleting variants:", variantsError);
        return { error: "Failed to delete product variants" };
    }

    // 2. Delete Product
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting product:", error);
        // Check for foreign key constraint violation (code 23503 in Postgres)
        if (error.code === '23503') {
            return { error: "Cannot delete product because it has associated orders or other records." };
        }
        return { error: error.message || "Failed to delete product" };
    }

    revalidatePath("/admin/products");
    return { success: true };
}

export async function toggleProductStatus(id: string, currentStatus: string) {
    const supabase = await createClient();
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';

    const { error } = await supabase
        .from("products")
        .update({ status: newStatus })
        .eq("id", id);

    if (error) {
        console.error("Error updating product status:", error);
        return { error: "Failed to update status" };
    }

    revalidatePath("/admin/products");
    return { success: true };
}

export async function updateProduct(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const category_id = formData.get("category_id") as string;

    // Parse variants
    const variantsJson = formData.get("variants") as string;
    const variants = variantsJson ? JSON.parse(variantsJson) : [];

    // Parse images (URLs sent from client)
    const imagesJson = formData.get("images") as string;
    const images = imagesJson ? JSON.parse(imagesJson) : [];

    // 1. Update Product
    const { error: productError } = await supabase
        .from("products")
        .update({
            title,
            price,
            images: images,
            category_id: category_id || null,
        })
        .eq("id", id);

    if (productError) {
        console.error("Error updating product:", productError);
        return { error: "Failed to update product" };
    }

    // 2. Update Variants (Full replacement strategy for simplicity)
    // First delete existing variants
    const { error: deleteError } = await supabase
        .from("product_variants")
        .delete()
        .eq("product_id", id);

    if (deleteError) {
        console.error("Error deleting old variants:", deleteError);
        return { error: "Failed to update variants" };
    }

    // Then insert new ones
    if (variants.length > 0) {
        const variantsData = variants.map((v: any) => ({
            product_id: id,
            size: v.size,
            color: v.color,
            stock: parseInt(v.stock),
        }));

        const { error: variantsError } = await supabase
            .from("product_variants")
            .insert(variantsData);

        if (variantsError) {
            console.error("Error creating variants:", variantsError);
            return { error: "Failed to create variants" };
        }
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}
