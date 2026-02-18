import { getSanityData, PageProps } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import Contacts from "@/components/sections/ContactsSection";
import HeroServices from "@/components/sections/HeroServices";
import ServicePricingSection from "@/components/sections/ServicePricingSection";
import { getSEOData } from "@/lib/getSEOData";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale);
}

export default async function ServicesCentrsPage({ params }: PageProps) {
  const { locale } = await params;
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  const label = {
    lv: "Ģertrūdes 34",
    en: "Ģertrūdes 34",
    ru: "Ģertrūdes 34",
  };
  const BarbershopLabel = {
    lv: "Barbershop",
    en: "Barbershop",
    ru: "Барбершоп",
  };

  const premiumLabel = {
    lv: "Premium",
    en: "Premium",
    ru: "Премиум",
  };

  const switcher = {
    gertrudes34: {
      label: { lv: "Ģertrūdes 34", en: "Ģertrūdes 34", ru: "Ģertrūdes 34" },
      href: `/${locale}/services/gertrudes34`,
    },
    akmenu16: {
      label: { lv: "Akmeņu 16", en: "Akmeņu 16", ru: "Akmeņu 16" },
      href: `/${locale}/services/akmenu16`,
    },
  };

  return (
    <>
      <HeroServices
        heroData={siteData.hero}
        locale={locale}
        label={BarbershopLabel[locale]}
        titleOverride={label[locale]}
        badgeText={premiumLabel[locale]}
        backgroundImage="url(/images/gertrudes/gertrudes_bg_2.jpeg)"
        overlayClassName="bg-black/45"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        className="bg-bottom lg:bg-position-[center_center]"
      />
      <section className="bg-background-alt px-4 md:px-16 lg:px-32">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-3 py-6">
          <Link
            href={switcher.gertrudes34.href}
            className="rounded-xs border border-primary bg-primary/90 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-background shadow-lg transition"
          >
            {switcher.gertrudes34.label[locale]}
          </Link>
          <Link
            href={switcher.akmenu16.href}
            className="rounded-xs border border-white/20 bg-black/30 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70 transition hover:border-white/50 hover:text-white"
          >
            {switcher.akmenu16.label[locale]}
          </Link>
        </div>
      </section>
      <ServicePricingSection
        serviceData={siteData.services}
        contactsData={siteData.contacts}
        locale={locale}
        locationId="gertrudes34"
        locationLabel={label[locale]}
        premiumTag={premiumLabel[locale]}
      />
      <Contacts
        workingTime={siteData.working_time}
        contacts={siteData.contacts}
        contactsFormData={siteData.contact_form}
        errorsData={siteData.errors}
        locale={locale}
        locationId="gertrudes34"
      />
    </>
  );
}
