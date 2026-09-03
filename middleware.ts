import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["id", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "id";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files and internal Next.js assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a supported locale (/id, /id/..., /en, /en/...)
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine preferred locale from cookie or default
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
  const preferredLocale =
    cookieLocale && locales.includes(cookieLocale)
      ? cookieLocale
      : defaultLocale;

  // Redirect: / -> /id, /about -> /id/about
  const targetPath =
    pathname === "/" ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;

  return NextResponse.redirect(new URL(targetPath, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, audio files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
