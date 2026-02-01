import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["lv", "en", "ru"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const hasLocale = first && LOCALES.includes(first);
  const isComingSoonWithLocale = hasLocale && segments[1] === "coming-soon";

  if (isComingSoonWithLocale) {
    return NextResponse.next();
  }

  const redirectPath = hasLocale ? `/${first}/coming-soon` : "/coming-soon";
  const url = request.nextUrl.clone();
  url.pathname = redirectPath;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
