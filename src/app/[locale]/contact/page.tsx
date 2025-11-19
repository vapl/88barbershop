import { PageProps, getSanityData } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import MapEmbed from "@/components/MapEmbed";
import SectionHeading from "@/components/SectionHeading";
import Contacts from "@/components/sections/ContactsSection";
import HeroContact from "@/components/sections/HeroContact";
import { getSEOData } from "@/lib/getSEOData";

// Tell Next.js which locales to generate
export function generateStaticParams() {
  return [{ locale: "lv" }, { locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale);
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  return (
    <>
      <HeroContact heroData={siteData.hero} locale={locale} />
      <div className="flex items-center justify-center px-4 md:px-16 lg:px-32 py-20">
        <SectionHeading
          title={siteData.pages.contact_page.heading_intro[locale]}
          decoration={false}
          className="text-h3 md:text-h2"
          color="gold"
        />
      </div>
      <Contacts
        workingTime={siteData.working_time}
        contacts={siteData.contacts}
        contactsFormData={siteData.contact_form}
        errorsData={siteData.errors}
        locale={locale}
      />
      <section className="relative flex flex-col gap-[95px] items-center w-full text-background pt-[120px] bg-linear-to-br from-background via-background-alt/80 to-background overflow-hidden">
        <SectionHeading
          title={siteData.pages.contact_page.heading_map[locale]}
          decoration={true}
          className="text-h3 md:text-h2"
          color="gold"
        />
        <MapEmbed />
      </section>
    </>
  );
}
