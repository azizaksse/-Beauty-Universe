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

    // Hardcoded products for now
    const allProducts = [
        {
            id: "1",
            title: "Fauteuil de Coiffure Theodore",
            price: 58000,
            images: ["/images/products/theodore-barber-chair.png"],
            slug: "theodore-chair"
        },
        {
            id: "2",
            title: "Miroir Intelligent LED",
            price: 25000,
            images: ["/images/products/smart-mirror-led.png"],
            slug: "smart-mirror"
        },
        {
            id: "3",
            title: "Panneaux Alternatifs Bois",
            price: 4500,
            images: ["/images/products/wood-alternative-panels.png"],
            slug: "wood-panels"
        },
        {
            id: "4",
            title: "Armoire Outils Coiffure",
            price: 32000,
            images: ["/images/products/barber-tools-cabinet.png"],
            slug: "tools-cabinet"
        },
        {
            id: "5",
            title: "Miroir Intelligent LED 2",
            price: 26000,
            images: ["/images/products/smart-mirror-led-2.png"],
            slug: "smart-mirror-2"
        }
    ];

    // Fetch products when query changes
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Simulate search
                if (!debouncedQuery.trim()) {
                    setResults([]);
                    return;
                }

                const filtered = allProducts.filter(p =>
                    p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
                );
                setResults(filtered);
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
                        initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 z-[70] w-[95%] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                        style={{ transform: "translate(-50%, -50%)" }}
                    >
                        {/* Header / Search Input */}
                        <div className="flex items-center gap-4 border-b border-neutral-100 p-4 sm:p-6">
                            <Search className="h-6 w-6 text-neutral-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Rechercher un produit..."
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
                            {/* Default View (New Arrivals) when no query */}
                            {!query && (
                                <div className="mb-8">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-neutral-500">Nouveautés</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                        {allProducts.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                onClick={onClose}
                                                className="group block space-y-3"
                                            >
                                                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.title}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="truncate text-sm font-medium text-neutral-900 group-hover:text-neutral-600">
                                                        {product.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm font-semibold text-neutral-900">
                                                        {product.price.toLocaleString()} DZD
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search Results */}
                            {query && (
                                <div>
                                    <h3 className="mb-4 text-sm font-semibold text-neutral-500">Résultats</h3>
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
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.title}
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="truncate text-sm font-medium text-neutral-900 group-hover:text-neutral-600">
                                                            {product.title}
                                                        </h4>
                                                        <p className="mt-1 text-sm font-semibold text-neutral-900">
                                                            {product.price.toLocaleString()} DZD
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-10 text-center text-neutral-500">
                                            Aucun produit trouvé pour "{query}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
