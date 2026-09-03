"use client";

import { useTranslation as useOriginalTranslation } from "react-i18next";
import { Locale, defaultLocale, Namespace } from "./config";

export function useTranslation(ns?: Namespace | string) {
  return useOriginalTranslation(ns);
}

export function useCurrentLocale(): Locale {
  const { i18n } = useOriginalTranslation();
  const current = i18n.language?.slice(0, 2) as Locale;
  return current === "en" ? "en" : defaultLocale;
}

/**
 * Returns a localized path given an internal route.
 * e.g. getLocalizedPath('/about', 'en') -> '/en/about'
 *      getLocalizedPath('/', 'id') -> '/id'
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  let cleanPath = path;
  if (cleanPath.startsWith("/id/") || cleanPath === "/id") {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath.startsWith("/en/") || cleanPath === "/en") {
    cleanPath = cleanPath.slice(3);
  }

  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }

  if (cleanPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${cleanPath}`;
}
