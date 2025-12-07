"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateHeroContent(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const heading = formData.get("heading") as string;
    const subheading = formData.get("subheading") as string;
    const button_text = formData.get("button_text") as string;
    const image_url = formData.get("image_url") as string;

    // Upsert based on section_name 'hero_main'
    const { error } = await supabase
        .from("site_content")
        .upsert({
            section_name: 'hero_main',
            heading,
            subheading,
            button_text,
            image_url,
            is_active: true
        }, { onConflict: 'section_name' });

    if (error) {
        console.error("Error updating hero content:", error);
        return { error: "Failed to update content" };
    }

    revalidatePath("/admin/design");
    revalidatePath("/"); // Revalidate home page
    return { success: true };
}

export async function getHeroContent() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("section_name", "hero_main")
        .single();

    if (error && error.code !== 'PGRST116') { // Ignore "Row not found" error
        console.error("Error fetching hero content:", error);
    }

    return data;
}
