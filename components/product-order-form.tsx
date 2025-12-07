"use client";

import { useState, useEffect } from "react";
import { ALGERIA_WILAYAS, getBaladiasByWilaya } from "@/lib/algeria-locations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Truck, Calculator, User, Phone, MapPin, Home } from "lucide-react";
import { useLocale } from "next-intl";

interface ProductOrderFormProps {
    product: {
        id: string;
        title: string;
        price: number;
    };
}

export function ProductOrderForm({ product }: ProductOrderFormProps) {
    const locale = useLocale();
    const isArabic = locale === "ar";

    // Default color and size options
    const DEFAULT_COLORS = ["Red", "Black", "Blue", "White", "Green"];
    const DEFAULT_SIZES = ["S", "M", "L", "XL", "XXL"];

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedWilaya, setSelectedWilaya] = useState("");
    const [selectedBaladia, setSelectedBaladia] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState<"home" | "desk">("home");
    const [baladias, setBaladias] = useState<string[]>([]);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    // Update baladias when wilaya changes
    useEffect(() => {
        if (selectedWilaya) {
            const wilayaCode = ALGERIA_WILAYAS.find(w => w.name === selectedWilaya)?.code;
            if (wilayaCode) {
                setBaladias(getBaladiasByWilaya(wilayaCode));
                setSelectedBaladia("");
            }
        }
    }, [selectedWilaya]);

    // Fetch delivery price when wilaya changes
    useEffect(() => {
        if (selectedWilaya) {
            const wilayaCode = ALGERIA_WILAYAS.find(w => w.name === selectedWilaya)?.code;
            if (wilayaCode === 16 || wilayaCode === 31) {
                setDeliveryPrice(deliveryMethod === "home" ? 500 : 400);
            } else {
                setDeliveryPrice(deliveryMethod === "home" ? 700 : 600);
            }
        }
    }, [selectedWilaya, deliveryMethod]);

    const totalPrice = product.price + deliveryPrice;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                product_id: product.id,
                color: selectedColor,
                size: selectedSize,
                customer_name: fullName,
                customer_phone: `+213${phone}`,
                wilaya: selectedWilaya,
                baladia: selectedBaladia,
                address,
                delivery_method: deliveryMethod,
                product_price: product.price,
                delivery_price: deliveryPrice,
                total_price: totalPrice,
            };

            console.log("Order data:", orderData);
            alert("Commande envoyée avec succès!");
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Erreur lors de l'envoi de la commande");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Color & Size Selection - ALWAYS SHOWN AT TOP */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
                {/* Color Selection */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-neutral-900">
                        {isArabic ? "اللون" : "Couleur"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {DEFAULT_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${selectedColor === color
                                        ? "border-black bg-black text-white"
                                        : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300"
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-neutral-900">
                        {isArabic ? "المقاس" : "Taille"}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                        {DEFAULT_SIZES.map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => setSelectedSize(size)}
                                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${selectedSize === size
                                        ? "border-black bg-black text-white"
                                        : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-neutral-900">
                    <Calculator className="h-4 w-4" />
                    {isArabic ? "استمارة الطلب" : "Résumé de la commande"}
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-neutral-600">
                            <ShoppingCart className="h-4 w-4" />
                            {isArabic ? "سعر المنتج" : "Prix du produit"}
                        </span>
                        <span className="font-bold text-neutral-900">{product.price} DZD</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-neutral-600">
                            <Truck className="h-4 w-4" />
                            {isArabic ? "سعر التوصيل" : "Frais de livraison"}
                        </span>
                        <span className="font-bold text-neutral-900">
                            {deliveryPrice > 0 ? `${deliveryPrice} DZD` : "..."}
                        </span>
                    </div>
                    <div className="border-t border-neutral-200 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 font-bold text-neutral-900">
                                <Calculator className="h-4 w-4" />
                                {isArabic ? "المجموع" : "Total"}
                            </span>
                            <span className="text-lg font-bold text-neutral-900">
                                {totalPrice > 0 ? `${totalPrice} DZD` : "..."}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900">
                    {isArabic ? "المرجو إدخال معلوماتك الخاصة بك" : "Vos coordonnées"}
                </h3>

                <div className="space-y-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">
                            {isArabic ? "الإسم الكامل" : "Nom complet"}
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                            <Input
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={isArabic ? "الإسم الكامل" : "Nom complet"}
                                className="h-12 rounded-xl border-neutral-200 pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">
                            {isArabic ? "الهاتف" : "Téléphone"}
                        </label>
                        <div className="flex gap-2">
                            <div className="flex h-12 items-center rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-neutral-700">
                                DZ +213
                            </div>
                            <div className="relative flex-1">
                                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                                <Input
                                    required
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                    placeholder="555 123 456"
                                    className="h-12 rounded-xl border-neutral-200 pl-10"
                                    maxLength={9}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">
                            {isArabic ? "الولاية" : "Wilaya"}
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                            <select
                                required
                                value={selectedWilaya}
                                onChange={(e) => setSelectedWilaya(e.target.value)}
                                className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-10 pr-10 text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
                            >
                                <option value="">Wilaya</option>
                                {ALGERIA_WILAYAS.map((wilaya) => (
                                    <option key={wilaya.code} value={wilaya.name}>
                                        {isArabic ? wilaya.nameAr : wilaya.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {baladias.length > 0 && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-700">
                                {isArabic ? "البلدية" : "Commune"}
                            </label>
                            <div className="relative">
                                <Home className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                                <select
                                    required
                                    value={selectedBaladia}
                                    onChange={(e) => setSelectedBaladia(e.target.value)}
                                    className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-10 pr-10 text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
                                >
                                    <option value="">Baladia</option>
                                    {baladias.map((baladia) => (
                                        <option key={baladia} value={baladia}>
                                            {baladia}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">
                            {isArabic ? "العنوان" : "Adresse de livraison"}
                        </label>
                        <Input
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={isArabic ? "العنوان" : "Adresse complète"}
                            className="h-12 rounded-xl border-neutral-200"
                        />
                    </div>
                </div>
            </div>

            {/* Delivery Method */}
            <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-neutral-900">
                    <Truck className="h-4 w-4" />
                    {isArabic ? "التوصيل" : "Mode de livraison"}
                </h3>
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={() => setDeliveryMethod("home")}
                        className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition ${deliveryMethod === "home"
                                ? "border-black bg-black text-white"
                                : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300"
                            }`}
                    >
                        <span className="flex items-center gap-2 font-semibold">
                            <Home className="h-5 w-5" />
                            {isArabic ? "التوصيل للمنزل" : "Livraison à domicile"}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeliveryMethod("desk")}
                        className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition ${deliveryMethod === "desk"
                                ? "border-black bg-black text-white"
                                : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300"
                            }`}
                    >
                        <span className="flex items-center gap-2 font-semibold">
                            <MapPin className="h-5 w-5" />
                            {isArabic ? "التوصيل للمكتب" : "Livraison au bureau"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={loading || !selectedWilaya || !selectedColor || !selectedSize}
                className="h-14 w-full rounded-full bg-black text-base font-bold text-white hover:bg-neutral-800 disabled:opacity-50"
            >
                {loading ? (
                    isArabic ? "جاري الإرسال..." : "Envoi en cours..."
                ) : (
                    <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {isArabic ? `إشتري الآن - ${totalPrice} المجموع` : `Commander - Total ${totalPrice} DZD`}
                    </>
                )}
            </Button>
        </form>
    );
}
