"use server";

import { createClient } from "@/lib/supabase/server";

type SaveResult = { success: boolean; message?: string };

export async function saveOrder(formData: FormData): Promise<SaveResult> {
  try {
    const supabase = await createClient();

    const payload = {
      full_name: formData.get("fullName"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      wilaya: Number(formData.get("wilaya")),
      product: formData.get("product"),
      size: formData.get("size"),
      color: formData.get("color"),
      quantity: Number(formData.get("quantity") ?? 1),
      delivery_cost: Number(formData.get("deliveryCost") ?? 0),
      total: Number(formData.get("total") ?? 0),
      notes: formData.get("note") ?? formData.get("notes"),
    };

    const { error } = await supabase.from("orders").insert(payload);
    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to save order", error);
    return {
      success: false,
      message: "Impossible d'enregistrer la commande pour le moment.",
    };
  }
}
