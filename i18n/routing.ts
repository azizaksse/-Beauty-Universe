import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ["fr", "ar"] as const;
export const defaultLocale = "fr";
export const localePrefix = "always";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
