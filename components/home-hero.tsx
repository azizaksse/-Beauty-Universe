"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/images/herobackground.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/products (1).webp"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-white/5" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-10 md:py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
        >
          Nouvelle collection 2025
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl"
        >
          Élégance minimaliste inspirée d&apos;Ophira – pensée pour l&apos;Algérie
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-xl text-sm text-white/85 sm:text-base"
        >
          Tissus premium, coupes modernes, livraison 58 wilayas. Découvrez nos
          robes, abayas et ensembles à forte conversion.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Link href="/collections/all">
            <Button className="h-12 rounded-md bg-black px-8 text-base font-semibold text-white shadow-lg shadow-black/20">
              Découvrir maintenant
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
