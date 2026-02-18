import { getSanityData, PageProps } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import Contacts from "@/components/sections/ContactsSection";
import HeroServices from "@/components/sections/HeroServices";
import ServicePricingSection from "@/components/sections/ServicePricingSection";
import { getSEOData } from "@/lib/getSEOData";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale, "services/akmenu16");
}

export default async function ServicesPardaugavaPage({ params }: PageProps) {
  const { locale } = await params;
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  const label = {
    lv: "Akmeņu 16",
    en: "Akmeņu 16",
    ru: "Akmeņu 16",
  };
  const BarbershopLabel = {
    lv: "Barbershop",
    en: "Barbershop",
    ru: "Барбершоп",
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
        backgroundImage="url(/images/akmenu/akmenu_1.jpeg)"
        overlayClassName="bg-black/45"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        className="bg-bottom lg:bg-position-[center_90%]"
      />
      <section className="bg-background-alt px-4 md:px-16 lg:px-32">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-3 py-6">
          <Link
            href={switcher.gertrudes34.href}
            className="rounded-xs border border-white/20 bg-black/30 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70 transition hover:border-white/50 hover:text-white"
          >
            {switcher.gertrudes34.label[locale]}
          </Link>
          <Link
            href={switcher.akmenu16.href}
            className="rounded-xs border border-primary bg-primary/90 px-5 py-2 text-[11px] uppercase tracking-[0.3em] text-background shadow-lg transition"
          >
            {switcher.akmenu16.label[locale]}
          </Link>
        </div>
      </section>
      <ServicePricingSection
        serviceData={siteData.services}
        locale={locale}
        locationId="akmenu16"
        locationLabel={label[locale]}
        contactsData={siteData.contacts}
      />
      <div className="flex flex-wrap md:flex-nowrap w-full h-[560px]">
        <div className="relative w-full md:w-1/2 md:h-full">
          <Image
            src="/images/akmenu/akmenu-bg_1.jpeg"
            alt="Akmeņu 16 Barbershop interior"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative w-full md:w-1/2 md:h-full">
          <Image
            src="/images/akmenu/akmenu-bg_2.jpeg"
            alt="Akmeņu 16 Barbershop interior"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <Contacts
        workingTime={siteData.working_time}
        contacts={siteData.contacts}
        contactsFormData={siteData.contact_form}
        errorsData={siteData.errors}
        locale={locale}
        locationId="akmenu16"
      />
    </>
  );
}
