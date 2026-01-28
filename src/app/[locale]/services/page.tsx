import { getSanityData, PageProps } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import Contacts from "@/components/sections/ContactsSection";
import HeroServices from "@/components/sections/HeroServices";
import Link from "next/link";
import Image from "next/image";
import { getSEOData } from "@/lib/getSEOData";
import SectionHeading from "@/components/SectionHeading";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale);
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  const copy = {
    heading: {
      lv: "Izvēlies salonu",
      en: "Choose a salon",
      ru: "Выберите салон",
    },
    subheading: {
      lv: "Izvēlies sev ērtāko lokāciju.",
      en: "Choose the location that suits you best.",
      ru: "Выберите наиболее удобную для вас локацию.",
    },
    salonLabel: {
      lv: "Salons",
      en: "Salon",
      ru: "Салон",
    },
    centrs: {
      label: "Centrs",
      image: "/images/price_centrs_bg-4.jpg",
    },
    pardaugava: {
      label: "Pārdaugava",
      image: "/images/hero-bg.jpg",
    },
  };

  return (
    <>
      <HeroServices heroData={siteData.hero} locale={locale} />
      <section className="relative flex flex-col items-center w-full bg-background-alt px-4 md:px-16 lg:px-32 py-[120px]">
        <div className="flex flex-col items-center gap-6 text-center max-w-3xl">
          <SectionHeading
            title={copy.heading[locale]} //servicesData.services_section.title[locale]
            subtitle={copy.subheading[locale]} //servicesData.services_section.subtitle[locale]
            decoration
          />
        </div>
        <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          <Link
            href={`/${locale}/services/centrs`}
            className="group relative flex min-h-[360px] items-end overflow-hidden rounded-xs border border-primary/30"
          >
            <div className="absolute right-4 top-4 z-20 rounded-xs border border-primary/70 bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
              Premium
            </div>
            <Image
              src={copy.centrs.image}
              alt="Centrs salon"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/30" />
            <div className="relative z-10 p-8">
              <span className="text-xs text-primary uppercase tracking-widest">
                {copy.salonLabel[locale]}
              </span>
              <h3 className="mt-2 text-h3 text-foreground font-heading uppercase">
                {copy.centrs.label}
              </h3>
            </div>
          </Link>
          <Link
            href={`/${locale}/services/pardaugava`}
            className="group relative flex min-h-[360px] items-end overflow-hidden rounded-xs border border-primary/30"
          >
            <Image
              src={copy.pardaugava.image}
              alt="Pārdaugava salon"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/30" />
            <div className="relative z-10 p-8">
              <span className="text-xs text-primary uppercase tracking-widest">
                {copy.salonLabel[locale]}
              </span>
              <h3 className="mt-2 text-h3 text-foreground font-heading uppercase">
                {copy.pardaugava.label}
              </h3>
            </div>
          </Link>
        </div>
      </section>
      {/* <Contacts
        workingTime={siteData.working_time}
        contacts={siteData.contacts}
        contactsFormData={siteData.contact_form}
        errorsData={siteData.errors}
        locale={locale}
      /> */}
    </>
  );
}
