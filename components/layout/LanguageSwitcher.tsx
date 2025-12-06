"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/routing";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function LanguageSwitcher({
  className,
  orientation = "horizontal",
}: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale]);

  const switchLocale = (nextLocale: "fr" | "ar") => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex items-center text-sm font-semibold text-neutral-600",
        isVertical ? "flex-col gap-2" : "flex-row gap-2",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => switchLocale("fr")}
        className={cn(
          "transition hover:text-black",
          locale === "fr" ? "font-bold text-black" : "text-neutral-500",
        )}
      >
        FR
      </button>
      <span className="text-neutral-400">|</span>
      <button
        type="button"
        onClick={() => switchLocale("ar")}
        className={cn(
          "transition hover:text-black",
          locale === "ar" ? "font-bold text-black" : "text-neutral-500",
        )}
      >
        AR
      </button>
    </div>
  );
}
