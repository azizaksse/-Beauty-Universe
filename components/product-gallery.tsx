"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt={title}
                        className="h-full w-full object-cover transition-all duration-300"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                        No Image
                    </div>
                )}
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedImage(img)}
                            className={cn(
                                "aspect-square overflow-hidden rounded-xl bg-neutral-100 ring-2 ring-offset-2 transition-all",
                                selectedImage === img
                                    ? "ring-black"
                                    : "ring-transparent hover:ring-neutral-200"
                            )}
                        >
                            <img
                                src={img}
                                alt={`${title} ${i + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
