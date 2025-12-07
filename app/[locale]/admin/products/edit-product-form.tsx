"use client";

import { useState, useCallback, useActionState } from "react";
import { updateProduct } from "@/app/[locale]/admin/actions/products";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, Upload, Loader2 } from "lucide-react";

interface Variant {
    size: string;
    color: string;
    stock: number;
}

const initialState = {
    error: "",
    success: false
};

interface EditProductFormProps {
    product: any;
    variants: any[];
}

export function EditProductForm({ product, variants: initialVariants }: EditProductFormProps) {
    const [state, action, isPending] = useActionState(updateProduct, initialState);

    const [variants, setVariants] = useState<Variant[]>(
        initialVariants.length > 0
            ? initialVariants.map(v => ({ size: v.size, color: v.color, stock: v.stock }))
            : [{ size: "", color: "", stock: 0 }]
    );
    const [imageUrls, setImageUrls] = useState<string[]>(product.images || []);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const supabase = createClient();

    const addVariant = () => {
        setVariants([...variants, { size: "", color: "", stock: 0 }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newUrls: string[] = [];

        try {
            for (const file of Array.from(files)) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { error } = await supabase.storage
                    .from("products")
                    .upload(fileName, file);

                if (error) {
                    console.error("Error uploading image:", error);
                    continue;
                }

                const { data: publicUrlData } = supabase.storage
                    .from("products")
                    .getPublicUrl(fileName);

                newUrls.push(publicUrlData.publicUrl);
            }
            setImageUrls((prev) => [...prev, ...newUrls]);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    }, []);

    const removeImage = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    return (
        <form action={action} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <input type="hidden" name="id" value={product.id} />
            <input type="hidden" name="variants" value={JSON.stringify(variants)} />
            <input type="hidden" name="images" value={JSON.stringify(imageUrls)} />

            {/* Image Upload Section */}
            <div className="space-y-4">
                <Label className="text-base font-semibold">Media</Label>
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <Upload className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                <label htmlFor="file-upload-edit" className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline">
                                    Upload files
                                </label>
                                {" "}or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <Input
                            id="file-upload-edit"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFiles(e.target.files)}
                        />
                    </div>
                </div>

                {/* Image Previews */}
                {imageUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="relative group aspect-square border rounded-lg overflow-hidden bg-gray-50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={url} alt={`Product ${index}`} className="object-cover w-full h-full" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading images...
                    </div>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                        id="title"
                        name="title"
                        defaultValue={product.title}
                        placeholder="e.g. Summer T-Shirt"
                        required
                        className="w-full"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price (DA)</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={product.price}
                        placeholder="0.00"
                        required
                        className="w-full"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-lg font-semibold text-gray-900">Product Variants</h2>
                    <Button type="button" onClick={addVariant} variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Variant
                    </Button>
                </div>

                <div className="space-y-4">
                    {variants.map((variant, index) => (
                        <div key={index} className="flex items-end gap-4 p-4 bg-gray-50 rounded-md border border-gray-100">
                            <div className="flex-1 space-y-2">
                                <Label>Size</Label>
                                <Input
                                    value={variant.size}
                                    onChange={(e) => updateVariant(index, "size", e.target.value)}
                                    placeholder="S, M, L..."
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label>Color</Label>
                                <Input
                                    value={variant.color}
                                    onChange={(e) => updateVariant(index, "color", e.target.value)}
                                    placeholder="Red, Blue..."
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label>Stock</Label>
                                <Input
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) => updateVariant(index, "stock", e.target.value === "" ? 0 : parseInt(e.target.value))}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeVariant(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                disabled={variants.length === 1}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}

            <div className="flex justify-end pt-6 border-t">
                <Button type="submit" disabled={isPending || isUploading} className="w-full md:w-auto">
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving Changes...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Update Product
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
