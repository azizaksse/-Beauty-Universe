"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/[locale]/admin/actions/products";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        setIsDeleting(true);
        try {
            const result = await deleteProduct(id);
            if (result.error) {
                alert(result.error);
            } else {
                router.refresh();
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete product");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </Button>
    );
}
