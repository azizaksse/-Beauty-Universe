import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { DesignForm } from "./design-form";
import { setRequestLocale } from "next-intl/server";

async function DesignContent() {
    const supabase = await createClient();
    const { data: heroContent } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", "hero_content")
        .single();

    return <DesignForm initialData={heroContent?.value || {}} />;
}

export default async function DesignPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Design Settings</h1>
                <p className="text-sm text-gray-600">
                    Customize hero section content and appearance
                </p>
            </div>

            <div className="rounded-lg border bg-white p-6">
                <Suspense fallback={<div>Loading...</div>}>
                    <DesignContent />
                </Suspense>
            </div>
        </div>
    );
}
