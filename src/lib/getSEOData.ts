import { client } from "@/lib/sanityClient";
import { siteDataQuery } from "@/lib/sanityQuery";
import { adaptSanityData } from "@/lib/dataAdapter";

async function getSanityData() {
  const data = await client.fetch(siteDataQuery, {}, { next: { revalidate: 3600 } });
  return data;
}

const normalizePath = (path?: string) => {
  if (!path) return "";
  const trimmed = path.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
};

export async function getSEOData(locale: "lv" | "en" | "ru", path?: string) {
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  const baseUrl = "https://88barbershop.lv";
  const localePrefix = locale === "lv" ? "" : `/${locale}`;
  const routePath = normalizePath(path);
  const canonicalUrl = `${baseUrl}${localePrefix}${routePath}`;
  const title = `${siteData.general.siteName} - ${siteData.general.slogan[locale]}`;
  const description = siteData.general.description[locale];

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteData.general.siteName,
      images: [
        {
          url: `${baseUrl}/og-image.jpeg`,
          width: 1200,
          height: 630,
          alt: `${siteData.general.slogan[locale]}`,
        },
      ],
      locale: locale === "lv" ? "lv_LV" : locale === "en" ? "en_GB" : "ru_RU",
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        lv: `${baseUrl}${routePath}`,
        en: `${baseUrl}/en${routePath}`,
        ru: `${baseUrl}/ru${routePath}`,
      },
    },
  };
}
