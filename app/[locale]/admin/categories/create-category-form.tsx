"use client";

import { useActionState } from "react";
import { createCategory } from "../actions/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState = {
    error: "",
};

export function CreateCategoryForm() {
    const [state, action, isPending] = useActionState(createCategory, initialState);

    return (
        <form action={action} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Category Name
                </label>
                <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Robes"
                    required
                />
            </div>

            {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}

            {state?.success && (
                <p className="text-sm text-green-500">Category created successfully!</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Create Category"}
            </Button>
        </form>
    );
}
