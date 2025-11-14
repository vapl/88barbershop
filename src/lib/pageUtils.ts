import { client } from "@/lib/sanityClient";
import { siteDataQuery } from "@/lib/sanityQuery";

export type Locale = "lv" | "en" | "ru";

export function toLocale(locale: string): Locale {
  if (locale === "lv" || locale === "en" || locale === "ru") {
    return locale;
  }
  return "lv";
}

export async function getSanityData() {
  try {
    const data = await client.fetch(siteDataQuery, {}, { next: { revalidate: 3600 } });
    return data;
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return null;
  }
}
