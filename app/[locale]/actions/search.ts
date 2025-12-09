"use server";

import { createClient } from "@/lib/supabase/server";

export async function searchProducts(query: string) {
    const supabase = await createClient();

    let queryBuilder = supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(8);

    if (query.trim()) {
        queryBuilder = queryBuilder.ilike("title", `%${query}%`);
    }

    const { data, error } = await queryBuilder;

    if (error) {
        console.error("Error searching products:", error);
        return [];
    }

    return data;
}
