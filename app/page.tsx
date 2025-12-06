"use client";

import type { ReactNode } from "react";
import { HomeHero } from "@/components/home-hero";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Truck, RefreshCw, CreditCard, Facebook, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    title: "Robes",
    image: "/images/products (2).webp",
    href: "/collections/robes",
  },
  {
    title: "Abayas",
    image: "/images/products (3).webp",
    href: "/collections/abayas",
  },
  {
    title: "Ensembles",
    image: "/images/products (4).webp",
    href: "/collections/ensembles",
  },
];

const bestSellers = [
  {
    title: "Robe Ophira Blanche",
    price: "5 499 د.ج",
    image: "/images/products (5).webp",
  },
  {
    title: "Abaya Noir Minimal",
    price: "6 299 د.ج",
    image: "/images/products (6).webp",
  },
  {
    title: "Ensemble Sable",
    price: "4 999 د.ج",
    image: "/images/products (2).webp",
  },
  {
    title: "Abaya Nuit",
    price: "6 499 د.ج",
    image: "/images/products (3).webp",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-10">
        <HomeHero />

        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Nos Catégories
            </p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              Explorez les essentiels Ophira
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-900">
                    {cat.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Coups de cœur
              </p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900">
                Best sellers du moment
              </h2>
            </div>
            <Link href="/collections/all">
              <Button className="h-11 rounded-md bg-black px-5 text-sm font-semibold text-white">
                Voir tout
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 overflow-hidden sm:grid-cols-3 lg:grid-cols-4">
            {bestSellers.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group space-y-3 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm font-semibold text-neutral-900">
                    {item.title}
                  </p>
                  <p className="text-base font-bold text-neutral-900">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            <BadgeItem
              icon={<Truck className="h-5 w-5" />}
              title="Livraison 58 wilayas"
              desc="Expédition express et paiement à la réception."
            />
            <BadgeItem
              icon={<RefreshCw className="h-5 w-5" />}
              title="Échange 7 jours (frais)"
              desc="Échange possible sous 7 jours avec frais de retour."
            />
            <BadgeItem
              icon={<CreditCard className="h-5 w-5" />}
              title="Paiement à la livraison"
              desc="Aucun paiement en ligne, tout se fait à la remise."
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold text-neutral-900">Ophira Style</p>
            <p className="text-sm text-neutral-600">
              Mode feminine premium en Algerie. Paiement a la livraison, 58 wilayas.
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
              <span className="text-sm font-semibold">TikTok</span>
            </a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/213700000000"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
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
    <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3">
      <div className="rounded-full bg-white p-2 text-black shadow-sm">{icon}</div>
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>
        <p className="text-sm text-neutral-600">{desc}</p>
      </div>
    </div>
  );
}
