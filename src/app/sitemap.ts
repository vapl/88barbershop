import type { MetadataRoute } from "next";

const BASE_URL = "https://88barbershop.lv";
const LOCALES = ["lv", "en", "ru"] as const;
const ROUTES = ["", "about", "contact", "privacy", "services", "services/gertrudes34", "services/akmenu16"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const localePrefix = locale === "lv" ? "" : `/${locale}`;

    for (const route of ROUTES) {
      const path = route ? `/${route}` : "";
      entries.push({
        url: `${BASE_URL}${localePrefix}${path}`,
        lastModified: now,
        alternates: {
          languages: {
            lv: `${BASE_URL}${route ? `/${route}` : ""}`,
            en: `${BASE_URL}/en${route ? `/${route}` : ""}`,
            ru: `${BASE_URL}/ru${route ? `/${route}` : ""}`,
          },
        },
      });
    }
  }

  return entries;
}
