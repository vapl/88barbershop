import { getSanityData, toLocale } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import Contacts from "@/components/sections/ContactsSection";
import HeroServices from "@/components/sections/HeroServices";
import ServicePricingSection from "@/components/sections/ServicePricingSection";
import { getSEOData } from "@/lib/getSEOData";

// Tell Next.js which locales to generate
export function generateStaticParams() {
  return [{ locale: "lv" }, { locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale);
  return getSEOData(locale);
}

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale);
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);
  return (
    <>
      <HeroServices heroData={siteData.hero} locale={locale} />
      <ServicePricingSection serviceData={siteData.services} locale={locale} />
      <Contacts
        workingTime={siteData.working_time}
        contacts={siteData.contacts}
        contactsFormData={siteData.contact_form}
        errorsData={siteData.errors}
        locale={locale}
      />
    </>
  );
}
