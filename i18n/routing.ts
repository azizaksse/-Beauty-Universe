import {createSharedPathnamesNavigation} from "next-intl/navigation";

export const locales = ["fr", "ar"] as const;
export const defaultLocale = "fr";
export const localePrefix = "always";

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({
    locales,
    localePrefix,
  });
