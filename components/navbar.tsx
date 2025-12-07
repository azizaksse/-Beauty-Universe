"use client";

import { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./layout/LanguageSwitcher";
import { useTranslations } from "next-intl";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Navbar");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/collections/abayas", label: t("abayas") },
    { href: "/collections/robes", label: t("robes") },
    { href: "/collections/ensembles", label: t("ensembles") },
    { href: "/pages/contact", label: t("contact") },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed inset-x-0 top-6 z-50 mx-auto flex w-[95%] max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300",
          scrolled && "bg-white/80 border-white/40 shadow-xl"
        )}
      >
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            aria-label={t("menu")}
            className="rounded-full p-2 text-neutral-800 hover:bg-white/20"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20">
            <img
              src="/images/logo.png"
              alt="Ophira Style"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            Ophira
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-neutral-800 transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            aria-label={t("search")}
            className="rounded-full p-2 text-neutral-800 hover:bg-white/20"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label={t("cart")}
            className="rounded-full p-2 text-neutral-800 hover:bg-white/20"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
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
              className="fixed left-0 top-0 z-50 h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-5">
                <span className="text-lg font-bold text-neutral-900">{t("menu")}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-4">
                <div className="mb-6 sm:hidden">
                  <LanguageSwitcher orientation="horizontal" />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-5 py-3.5 text-base font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
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
    </>
  );
}
