import { getSanityData, PageProps } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import Contacts from "@/components/sections/ContactsSection";
import HeroServices from "@/components/sections/HeroServices";
import ServicePricingSection from "@/components/sections/ServicePricingSection";
import { getSEOData } from "@/lib/getSEOData";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale);
}

export default async function ServicesPardaugavaPage({ params }: PageProps) {
  const { locale } = await params;
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  const label = {
    lv: "Pārdaugava",
    en: "Pardaugava",
    ru: "Пардауґава",
  };
  const salonLabel = {
    lv: "Salons",
    en: "Salon",
    ru: "Салон",
  };

  return (
    <>
      <HeroServices
        heroData={siteData.hero}
        locale={locale}
        label={salonLabel[locale]}
        titleOverride={label[locale]}
        backgroundImage="url(/images/bg-pattern-services.png), url(/images/hero-bg.jpg)"
        overlayClassName="bg-black/45"
        backgroundSize="220px auto, cover"
        backgroundRepeat="repeat, no-repeat"
        backgroundPosition="center, center"
      />
      <ServicePricingSection
        serviceData={siteData.services}
        locale={locale}
        locationId="pardaugava"
        locationLabel={label[locale]}
      />
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
