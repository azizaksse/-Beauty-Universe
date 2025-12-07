"use client";

import { useActionState } from "react";
import { updateHeroContent } from "@/app/[locale]/admin/actions/design";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";

const initialState = {
    error: "",
};

interface DesignFormProps {
    initialData: any;
}

export function DesignForm({ initialData }: DesignFormProps) {
    const [state, action, isPending] = useActionState(updateHeroContent, initialState);

    return (
        <form action={action} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="heading">Main Heading</Label>
                <Input
                    id="heading"
                    name="heading"
                    defaultValue={initialData?.heading || ""}
                    placeholder="e.g. New Collection 2025"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="subheading">Subheading</Label>
                <Input
                    id="subheading"
                    name="subheading"
                    defaultValue={initialData?.subheading || ""}
                    placeholder="e.g. Discover the elegance of modern fashion."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="button_text">Button Text</Label>
                <Input
                    id="button_text"
                    name="button_text"
                    defaultValue={initialData?.button_text || "Shop Now"}
                    placeholder="e.g. Shop Now"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image_url">Hero Image URL</Label>
                <Input
                    id="image_url"
                    name="image_url"
                    defaultValue={initialData?.image_url || ""}
                    placeholder="https://..."
                />
                <p className="text-xs text-gray-500">Paste a public image URL here.</p>
            </div>

            {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}

            {state?.success && (
                <p className="text-sm text-green-500">Saved successfully!</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </>
                )}
            </Button>
        </form>
    );
}
