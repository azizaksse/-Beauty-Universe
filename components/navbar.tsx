"use client";

import { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./layout/LanguageSwitcher";
import { useTranslations } from "next-intl";

import { SearchModal } from "./search-modal";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Navbar");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "home" },
    { href: "/collections/all", label: "catalog" },
    { href: "/pages/contact", label: "contact" },
  ];

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Top Bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center bg-black px-4 text-center text-xs font-medium text-white sm:text-sm">
        مرحبا بكم التوصيل متوفر 69 ولاية والدفع عند الاستلام
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed inset-x-0 top-12 z-40 mx-auto flex w-[95%] max-w-6xl items-center justify-between rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-sm backdrop-blur-xl transition-all duration-300",
          scrolled && "bg-white/95 shadow-md"
        )}
      >
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            aria-label={t("menu")}
            className="rounded-full p-2 text-neutral-800 hover:bg-black/5"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-100 bg-white shadow-sm">
            <img src="/images/logo.png" alt="Beauty Universe" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold tracking-tight text-neutral-900">
              Beauty Universe
            </span>
            <span className="font-sans text-sm font-normal text-neutral-600">
              بيوتي يونيفرس
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition hover:text-gold-600"
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* Search Trigger (Desktop) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="group relative hidden h-9 w-40 items-center justify-between rounded-full border border-neutral-200 bg-transparent px-3 text-sm text-neutral-400 transition-all hover:border-black hover:text-neutral-600 sm:flex"
          >
            <span className="text-left">Search...</span>
            <Search className="h-4 w-4 text-neutral-500 group-hover:text-black" />
          </button>

          {/* Search Trigger (Mobile) */}
          <button
            aria-label={t("search")}
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 text-neutral-800 hover:bg-black/5 sm:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            aria-label={t("cart")}
            className="rounded-full p-2 text-neutral-800 hover:bg-black/5"
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
              className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
                <span className="text-lg font-bold text-neutral-900">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="mb-4 flex w-full items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-500"
                >
                  <Search className="h-4 w-4" />
                  <span>Search products...</span>
                </button>

                <div className="mb-4 sm:hidden">
                  <LanguageSwitcher orientation="horizontal" />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-4 py-3 text-base font-medium text-neutral-600 transition hover:bg-gold-50 hover:text-gold-700"
                    onClick={() => setOpen(false)}
                  >
                    {t(link.label)}
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
