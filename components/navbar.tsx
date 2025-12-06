"use client";

import { useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/collections/abayas", label: "Abayas" },
  { href: "/collections/robes", label: "Robes" },
  { href: "/collections/ensembles", label: "Ensembles" },
  { href: "/pages/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:py-4">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            aria-label="Ouvrir le menu"
            className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2 lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-neutral-200 bg-neutral-900">
              <img
                src="/images/logo.png"
                alt="Ophira Style"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-black">
              Ophira Style
            </span>
          </Link>
        </div>

        <nav className="hidden gap-8 text-sm font-semibold text-neutral-800 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 text-neutral-800">
          <button
            aria-label="Rechercher"
            className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Panier"
            className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
                <span className="text-lg font-semibold text-black">Menu</span>
                <button
                  aria-label="Fermer le menu"
                  className="rounded-full border border-neutral-200 p-2 hover:bg-neutral-50"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-semibold text-neutral-900 transition hover:bg-neutral-100",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
