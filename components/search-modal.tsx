"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { searchProducts } from "@/app/[locale]/actions/search";

// Simple debounce hook implementation if not available
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    slug: string;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounceValue(query, 300);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch products when query changes
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const products = await searchProducts(debouncedQuery);
                setResults(products);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchProducts();
        }
    }, [debouncedQuery, isOpen]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-[10%] z-[70] w-[95%] max-w-4xl -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        {/* Header / Search Input */}
                        <div className="flex items-center gap-4 border-b border-neutral-100 p-4 sm:p-6">
                            <Search className="h-6 w-6 text-neutral-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                                className="flex-1 text-lg font-medium outline-none placeholder:text-neutral-300 sm:text-xl"
                            />
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
                            {/* Recently Viewed (Mock for now, or could be implemented with localStorage) */}
                            <div className="mb-8">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-neutral-500">Recently viewed</h3>
                                    <button className="text-sm text-neutral-400 hover:text-neutral-600">Clear</button>
                                </div>
                                {/* Placeholder for recently viewed items if any */}
                                {/* For now, we can just show the same products list or a subset if we had local storage logic */}
                                <p className="text-sm text-neutral-400 italic">No recently viewed items</p>
                            </div>

                            {/* Products Grid */}
                            <div>
                                <h3 className="mb-4 text-sm font-semibold text-neutral-500">Products</h3>
                                {loading ? (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="animate-pulse space-y-3">
                                                <div className="aspect-[3/4] rounded-xl bg-neutral-100" />
                                                <div className="h-4 w-2/3 rounded bg-neutral-100" />
                                                <div className="h-4 w-1/3 rounded bg-neutral-100" />
                                            </div>
                                        ))}
                                    </div>
                                ) : results.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                        {results.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                onClick={onClose}
                                                className="group block space-y-3"
                                            >
                                                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
                                                    {product.images?.[0] ? (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.title}
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-neutral-300">
                                                            <ShoppingBag className="h-8 w-8" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="truncate text-sm font-medium text-neutral-900 group-hover:text-neutral-600">
                                                        {product.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                                                        DA {product.price.toLocaleString()} DZD
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-10 text-center text-neutral-500">
                                        No products found for "{query}"
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
