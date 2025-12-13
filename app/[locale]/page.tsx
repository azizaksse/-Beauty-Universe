import type { ReactNode } from "react";
import { Suspense } from "react";
import { HomeHero } from "@/components/home-hero";
import { Navbar } from "@/components/navbar";
import { Truck, RefreshCw, CreditCard, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BestSellersSection } from "@/components/best-sellers-section";
import { BestSellersSkeleton } from "@/components/best-sellers-skeleton";
import { TestimonialsSection } from "@/components/testimonials-section";
import Image from "next/image";

// ... existing imports ...

// Categories data was here but is currently unused/commented out in the component

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const tCategories = await getTranslations("Categories");

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-10">
        <HomeHero />

        <Suspense fallback={<BestSellersSkeleton />}>
          <BestSellersSection />
        </Suspense>

        <TestimonialsSection />

        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {t("categoriesTitle")}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              {t("categoriesSubtitle")}
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-gold-400 to-gold-600" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titleKey: "Coiffure",
                href: "/collections/coiffure",
                image: "/images/products/theodore-barber-chair.png"
              },
              {
                titleKey: "Esthetique",
                href: "/collections/esthetique",
                image: "/images/products/smart-mirror-led.png"
              },
              {
                titleKey: "Cosmetiques",
                href: "/collections/cosmetiques",
                image: "/images/products/barber-tools-cabinet.png"
              }
            ].map((cat) => (
              <Link
                key={cat.titleKey}
                href={cat.href}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={tCategories(cat.titleKey)}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-900">
                    {tCategories(cat.titleKey)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            <BadgeItem
              icon={<Truck className="h-5 w-5" />}
              title={t("badges.deliveryTitle")}
              desc={t("badges.deliveryDesc")}
            />
            <BadgeItem
              icon={<RefreshCw className="h-5 w-5" />}
              title={t("badges.exchangeTitle")}
              desc={t("badges.exchangeDesc")}
            />
            <BadgeItem
              icon={<CreditCard className="h-5 w-5" />}
              title={t("badges.paymentTitle")}
              desc={t("badges.paymentDesc")}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold text-neutral-900">{t("footer.brand")}</p>
            <p className="text-sm text-neutral-600">
              {t("footer.description")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:bg-neutral-100"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:bg-neutral-100"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:bg-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M211.8 90.8a73.7 73.7 0 0 1-42.7-13.5v63.2a56 56 0 1 1-56-56 56.6 56.6 0 0 1 10.4 1V118a24 24 0 1 0 17 23.1V24h28a45.7 45.7 0 0 0 2.7 15.5c5.8 15.1 18.4 27.2 33.8 32.6l6.6 2.3v28.3Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/213700000000"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110 hover:bg-[#20bd5a] md:bottom-10 md:right-10"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

type BadgeProps = {
  icon: ReactNode;
  title: string;
  desc: string;
};

function BadgeItem({ icon, title, desc }: BadgeProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 transition-colors hover:border-gold-200 hover:bg-gold-50/30">
      <div className="rounded-full bg-gold-100 p-2 text-gold-600 shadow-sm">{icon}</div>
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>
        <p className="text-sm text-neutral-600">{desc}</p>
      </div>
    </div>
  );
}
