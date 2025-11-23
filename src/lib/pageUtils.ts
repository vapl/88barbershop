import { client } from "@/lib/sanityClient";
import { siteDataQuery } from "@/lib/sanityQuery";

export type Locale = "lv" | "en" | "ru";

export type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function getSanityData() {
  try {
    const data = await client.fetch(siteDataQuery, {}, { next: { revalidate: 60 } });
    return data;
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return null;
  }
}
