"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCategory(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const image_url = formData.get("image_url") as string;

    // Simple slug generation
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const { error } = await supabase
        .from("categories")
        .insert({
            name,
            slug,
            image_url
        });

    if (error) {
        console.error("Error creating category:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/categories");
    return { success: true };
}

export async function deleteCategory(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting category:", error);
        return { error: "Failed to delete category" };
    }

    revalidatePath("/admin/categories");
    return { success: true };
}

export async function getCategories() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

    return data;
}
