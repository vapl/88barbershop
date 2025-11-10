import { client } from "@/lib/sanityClient";
import { siteDataQuery } from "@/lib/sanityQuery";

export type Locale = "lv" | "en" | "ru";

export type PageProps = {
  params: { locale: Locale };
};

export async function getSanityData() {
  const data = await client.fetch(siteDataQuery, {}, { next: { revalidate: 3600 } });
  return data;
}
