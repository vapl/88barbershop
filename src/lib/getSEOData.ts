import { client } from "@/lib/sanityClient";
import { siteDataQuery } from "@/lib/sanityQuery";
import { adaptSanityData } from "@/lib/dataAdapter";

async function getSanityData() {
  const data = await client.fetch(siteDataQuery, {}, { next: { revalidate: 3600 } });
  return data;
}

export async function getSEOData(locale: "lv" | "en" | "ru") {
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  const baseUrl = "https://88barbershop.lv";
  const title = `${siteData.general.siteName} - ${siteData.general.slogan[locale]}`;
  const description = siteData.general.description[locale];

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale === "lv" ? "" : locale}`,
      siteName: siteData.general.siteName,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteData.general.slogan[locale]}`,
        },
      ],
      locale: locale === "lv" ? "lv_LV" : locale === "en" ? "en_GB" : "ru_RU",
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "lv" ? "" : locale}`,
      languages: {
        lv: `${baseUrl}`,
        en: `${baseUrl}/en`,
        ru: `${baseUrl}/ru`,
      },
    },
  };
}
