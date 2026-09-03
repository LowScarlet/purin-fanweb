export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

export const namespaces = [
  "common",
  "about",
  "schedule",
  "community",
  "news",
  "disclaimer",
] as const;
export type Namespace = (typeof namespaces)[number];

export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}
