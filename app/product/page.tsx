"use client";

import { Suspense, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { saveOrder } from "@/app/actions/save-order";

const gallery = [
  "/images/products (1).webp",
  "/images/products (2).webp",
  "/images/products (3).webp",
  "/images/products (4).webp",
  "/images/products (5).webp",
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const colors = [
  { name: "Noir Onyx", swatch: "#111827" },
  { name: "Beige Sahara", swatch: "#d9c6a5" },
  { name: "Olive Mist", swatch: "#7f8c63" },
];

const wilayas = [
  { code: 1, name: "Adrar" },
  { code: 2, name: "Chlef" },
  { code: 3, name: "Laghouat" },
  { code: 4, name: "Oum El Bouaghi" },
  { code: 5, name: "Batna" },
  { code: 6, name: "Bejaia" },
  { code: 7, name: "Biskra" },
  { code: 8, name: "Bechar" },
  { code: 9, name: "Blida" },
  { code: 10, name: "Bouira" },
  { code: 11, name: "Tamanrasset" },
  { code: 12, name: "Tebessa" },
  { code: 13, name: "Tlemcen" },
  { code: 14, name: "Tiaret" },
  { code: 15, name: "Tizi Ouzou" },
  { code: 16, name: "Alger" },
  { code: 17, name: "Djelfa" },
  { code: 18, name: "Jijel" },
  { code: 19, name: "Setif" },
  { code: 20, name: "Saida" },
  { code: 21, name: "Skikda" },
  { code: 22, name: "Sidi Bel Abbes" },
  { code: 23, name: "Annaba" },
  { code: 24, name: "Guelma" },
  { code: 25, name: "Constantine" },
  { code: 26, name: "Medea" },
  { code: 27, name: "Mostaganem" },
  { code: 28, name: "MSila" },
  { code: 29, name: "Mascara" },
  { code: 30, name: "Ouargla" },
  { code: 31, name: "Oran" },
  { code: 32, name: "El Bayadh" },
  { code: 33, name: "Illizi" },
  { code: 34, name: "Bordj Bou Arreridj" },
  { code: 35, name: "Boumerdes" },
  { code: 36, name: "El Tarf" },
  { code: 37, name: "Tindouf" },
  { code: 38, name: "Tissemsilt" },
  { code: 39, name: "El Oued" },
  { code: 40, name: "Khenchela" },
  { code: 41, name: "Souk Ahras" },
  { code: 42, name: "Tipaza" },
  { code: 43, name: "Mila" },
  { code: 44, name: "Ain Defla" },
  { code: 45, name: "Naama" },
  { code: 46, name: "Ain Temouchent" },
  { code: 47, name: "Ghardaia" },
  { code: 48, name: "Relizane" },
  { code: 49, name: "Timimoun" },
  { code: 50, name: "Bordj Badji Mokhtar" },
  { code: 51, name: "Ouled Djellal" },
  { code: 52, name: "Beni Abbes" },
  { code: 53, name: "In Salah" },
  { code: 54, name: "In Guezzam" },
  { code: 55, name: "Touggourt" },
  { code: 56, name: "Djanet" },
  { code: 57, name: "El Meghaier" },
  { code: 58, name: "El Menia" },
];

const communeMap: Record<number, string[]> = {
  1: ["Adrar", "Reggane", "Timimoun"],
  5: ["Batna", "Tazoult", "Ain Touta"],
  9: ["Blida", "Boufarik", "Ouled Yaich"],
  16: ["Alger Centre", "El Biar", "Cheraga", "Bab Ezzouar"],
  31: ["Oran", "Es Senia", "Bir El Djir"],
  48: ["Relizane", "Mazouna"],
};

const deliveryFees: Record<
  "home" | "stopdesk",
  Record<number, number> & { default: number }
> = {
  home: {
    1: 900,
    5: 650,
    9: 550,
    16: 400,
    31: 600,
    48: 900,
    default: 750,
  },
  stopdesk: {
    1: 500,
    5: 450,
    9: 350,
    16: 200,
    31: 300,
    48: 600,
    default: 450,
  },
};

const product = {
  title: 'Robe "Ophira" - Edition Algeria',
  description:
    "Robe longue fluide, coupe signature Ophira. Tissu premium, tombee impeccable et details minimalistes pour un look chic sans effort. Paiement a la livraison partout en Algerie.",
  badge: "Livraison 24h-72h",
  price: 5499,
  compareAt: 6999,
  sku: "OPH-AL-2025",
  benefits: [
    "Tissu doux et respirant, ideal pour le climat algerien",
    "Coupe flatteuse et poches discretes",
    "Satisfait ou rembourse sous 7 jours",
  ],
};

const accordionItems = [
  {
    title: "Description",
    content:
      "Inspiree des silhouettes epurees, cette robe Ophira combine confort et elegance pour vos sorties, soirees et evenements. Le tissu reste fluide et opaque, ne colle pas et ne froisse presque pas.",
  },
  {
    title: "Guide des tailles",
    content:
      "S: 36-38 | M: 38-40 | L: 40-42 | XL: 42-44 | XXL: 44-46. Si vous hesitez entre deux tailles, prenez la plus grande pour plus d'aisance.",
  },
  {
    title: "Livraison & retour",
    content:
      "Livraison 24h-72h sur les grandes wilayas (Alger, Oran, Constantine). Paiement cash a la reception. Retour accepte sous 7 jours si l'article est intact avec l'etiquette.",
  },
];

const productDetails = [
  { label: "🧶 القماش", value: "قطيفة فاخرة بوزن 450غ" },
  { label: "🎨 اللون", value: "أسود فقط 🖤" },
  { label: "💎 التزيين", value: "أحجار ألماس حر مختارة بعناية" },
  { label: "🪡 الخياطة", value: "متقونة باحترافية عالية" },
  { label: "📏 المقاسات", value: "L - XL - XXL" },
  { label: "✨ لماذا تشتريها؟", value: "مثالية للمناسبات الراقية" },
];

type Feedback = { status: "idle" | "success" | "error"; message?: string };

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ProductPage />
    </Suspense>
  );
}

function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>("M");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedWilaya, setSelectedWilaya] = useState<number>(16);
  const [selectedCommune, setSelectedCommune] = useState<string>(
    communeMap[16]?.[0] ?? "Commune principale",
  );
  const [deliveryMethod, setDeliveryMethod] = useState<"home" | "stopdesk">(
    "home",
  );
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({ status: "idle" });
  const [openAccordion, setOpenAccordion] = useState(accordionItems[0].title);
  const [isPending, startTransition] = useTransition();

  const communes = useMemo(
    () => communeMap[selectedWilaya] ?? ["Commune principale"],
    [selectedWilaya],
  );

  const deliveryFee = useMemo(
    () =>
      deliveryFees[deliveryMethod][selectedWilaya] ??
      deliveryFees[deliveryMethod].default,
    [deliveryMethod, selectedWilaya],
  );
  const subtotal = useMemo(() => product.price * quantity, [quantity]);
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (formData: FormData) => {
    formData.set("size", selectedSize ?? "");
    formData.set("color", selectedColor.name);
    formData.set("wilaya", String(selectedWilaya));
    formData.set("wilayaName", wilayas.find((w) => w.code === selectedWilaya)?.name ?? "");
    formData.set("commune", selectedCommune);
    formData.set("deliveryMethod", deliveryMethod);
    formData.set("deliveryCost", String(deliveryFee));
    formData.set("total", String(total));
    formData.set("product", product.title);
    formData.set("quantity", String(quantity));
    formData.set("note", note);

    startTransition(async () => {
      const result = await saveOrder(formData);
      if (result.success) {
        setFeedback({
          status: "success",
          message: "تم استلام طلبك بنجاح! سيتواصل معك فريقنا للتأكيد.",
        });
        setIsSheetOpen(false);
      } else {
        setFeedback({
          status: "error",
          message: result.message ?? "تعذر إرسال الطلب. حاول مرة أخرى.",
        });
      }
    });
  };

  return (
    <div className="bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
              O.
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Ophira Style</p>
              <p className="text-xs text-neutral-500">
                Boutique premium – Paiement a la livraison
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm text-neutral-600 md:flex">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Livraison express 58 wilayas</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Retour sous 7 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Paiement a la livraison</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row">
        <div className="w-full space-y-6 lg:w-7/12">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0.2, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="aspect-[4/5]"
              >
                <img
                  src={gallery[currentIndex]}
                  alt={`Ophira robe ${currentIndex + 1}`}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Bestseller Algerie
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {gallery.map((src, index) => (
              <button
                key={src}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "overflow-hidden rounded-lg border transition hover:opacity-90",
                  currentIndex === index
                    ? "border-neutral-900"
                    : "border-neutral-200",
                )}
              >
                <img
                  src={src}
                  alt={`thumbnail ${index + 1}`}
                  className="h-20 w-full object-cover"
                />
              </button>
            ))}
          </div>

          <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
              Paiement a la livraison | Essai possible
            </div>
            <div className="grid gap-3 text-sm text-neutral-700 sm:grid-cols-3">
              {product.benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-xl bg-neutral-50 p-3"
                >
                  <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            {accordionItems.map((item) => {
              const isOpen = openAccordion === item.title;
              return (
                <div key={item.title} className="border-b last:border-none">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? "" : item.title)}
                    className="flex w-full items-center justify-between py-3 text-left text-base font-semibold"
                  >
                    {item.title}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isOpen && "rotate-90",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-3 text-sm text-neutral-600"
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </section>

          <section className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-900">
              تفاصيل المنتج
            </h3>
            <p className="text-lg font-semibold text-neutral-800">
              جبة كلوش قطيفة راقية – فخامة من أول نظرة
            </p>
            <div className="space-y-2 text-right">
              {productDetails.map((item) => (
                <p key={item.label} className="text-base leading-relaxed">
                  <span className="font-semibold">{item.label}: </span>
                  {item.value}
                </p>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-5/12">
          <div className="sticky top-4 space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-600">
                {product.badge}
              </span>
              <span className="text-xs text-neutral-500">SKU: {product.sku}</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                {product.title}
              </h1>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-semibold">
                  {formatPrice(product.price)}{" "}
                </p>
                <p className="text-sm text-neutral-400 line-through">
                  {formatPrice(product.compareAt)}{" "}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold">Taille</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition",
                        selectedSize === size
                          ? "border-neutral-900 bg-neutral-900 text-white shadow-sm"
                          : "border-neutral-200 bg-white hover:border-neutral-400",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Couleur</p>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "flex items-center gap-3 rounded-full border px-3 py-2 pr-4 text-sm transition",
                        selectedColor.name === color.name
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white hover:border-neutral-400",
                      )}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: color.swatch }}
                        aria-hidden
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">الولاية</label>
                  <div className="relative">
                    <select
                      className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                      value={selectedWilaya}
                      onChange={(e) => {
                        const code = Number(e.target.value);
                        setSelectedWilaya(code);
                        const nextCommunes = communeMap[code];
                        setSelectedCommune(
                          nextCommunes ? nextCommunes[0] : "Commune principale",
                        );
                      }}
                    >
                      {wilayas.map((wilaya) => (
                        <option key={wilaya.code} value={wilaya.code}>
                          {wilaya.code} - {wilaya.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">البلدية</label>
                  <div className="relative">
                    <select
                      className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                      value={selectedCommune}
                      onChange={(e) => setSelectedCommune(e.target.value)}
                    >
                      {communes.map((commune) => (
                        <option key={commune}>{commune}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">خيار التوصيل</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("home")}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border px-4 py-3 text-left",
                      deliveryMethod === "home"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white hover:border-neutral-400",
                    )}
                  >
                    <input
                      type="radio"
                      className="mt-1 accent-black"
                      checked={deliveryMethod === "home"}
                      readOnly
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">توصيل للمنزل</p>
                      <p className="text-xs">
                        {formatPrice(
                          deliveryFees.home[selectedWilaya] ??
                            deliveryFees.home.default,
                        )}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("stopdesk")}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border px-4 py-3 text-left",
                      deliveryMethod === "stopdesk"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 bg-white hover:border-neutral-400",
                    )}
                  >
                    <input
                      type="radio"
                      className="mt-1 accent-black"
                      checked={deliveryMethod === "stopdesk"}
                      readOnly
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">توصيل للمكتب</p>
                      <p className="text-xs">
                        {formatPrice(
                          deliveryFees.stopdesk[selectedWilaya] ??
                            deliveryFees.stopdesk.default,
                        )}
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">سعر المنتج</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">
                    سعر التوصيل ({deliveryMethod === "home" ? "للمنزل" : "للمكتب"})
                  </span>
                  <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>المجموع</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <OrderForm
              onSubmit={handleSubmit}
              isPending={isPending}
              feedback={feedback}
              note={note}
              setNote={setNote}
              total={total}
            />
          </div>
        </aside>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <div className="flex flex-1 flex-col">
            <span className="text-xs text-neutral-500">المجموع</span>
            <span className="text-lg font-semibold">{formatPrice(total)}</span>
          </div>
          <Button
            className="h-12 flex-1 rounded-md bg-black text-white"
            onClick={() => setIsSheetOpen(true)}
          >
            اشتري الآن
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isSheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-6"
            onClick={() => setIsSheetOpen(false)}
          >
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-amber-600">
                    Paiement a la livraison
                  </p>
                  <h3 className="text-xl font-bold">استمارة الطلب</h3>
                </div>
                <button
                  onClick={() => setIsSheetOpen(false)}
                  aria-label="Fermer"
                  className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <OrderForm
                onSubmit={handleSubmit}
                isPending={isPending}
                feedback={feedback}
                note={note}
                setNote={setNote}
                total={total}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type OrderFormProps = {
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
  feedback: Feedback;
  note: string;
  setNote: (value: string) => void;
  total: number;
};

function OrderForm({
  onSubmit,
  isPending,
  feedback,
  note,
  setNote,
  total,
}: OrderFormProps) {
  return (
    <form
      action={onSubmit}
      className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
    >
      <div className="space-y-2 text-center">
        <p className="text-base font-bold">استمارة الطلب</p>
        <div className="space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-800">
          <div className="flex items-center justify-between">
            <span>سعر المنتج</span>
            <span className="font-semibold">{formatPrice(product.price)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>سعر التوصيل</span>
            <span className="font-semibold">يحتسب حسب الولاية</span>
          </div>
          <div className="flex items-center justify-between text-base font-bold">
            <span>المجموع</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <User className="h-4 w-4" />
            الاسم الكامل
          </label>
          <Input
            name="fullName"
            required
            placeholder="اكتب اسمك الكامل"
            className="h-11 text-base"
          />
        </div>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <Phone className="h-4 w-4" />
            الهاتف
          </label>
          <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3">
            <span className="text-sm font-semibold text-neutral-600">+213</span>
            <input
              name="phone"
              required
              inputMode="tel"
              placeholder="05XX XX XX XX"
              className="h-11 w-full bg-transparent text-base focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold">العنوان</label>
        <Input
          name="address"
          required
          placeholder="الحي، رقم المنزل، اقرب معلم"
          className="h-11 text-base"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold">ملاحظات (اختياري)</label>
        <textarea
          name="notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="اختر الحجم، اللون او ملاحظة للتوصيل"
          className="min-h-[96px] w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
        />
      </div>

      <div className="text-center text-sm font-semibold text-neutral-800">
        المجموع: {formatPrice(total)}
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-md bg-black text-base font-semibold text-white"
        disabled={isPending}
      >
        {isPending ? "جار ارسال الطلب..." : "اشتري الآن"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      {feedback.status === "success" && (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          {feedback.message}
        </p>
      )}
      {feedback.status === "error" && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {feedback.message}
        </p>
      )}
    </form>
  );
}

function formatPrice(value: number) {
  return `${value.toLocaleString("fr-DZ")} DA`;
}
