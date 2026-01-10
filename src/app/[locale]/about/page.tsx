import { PageProps, getSanityData } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import ImagesCarousel from "@/components/carousel/ImagesCarousel";
import SectionHeading from "@/components/SectionHeading";
import AboutSection2 from "@/components/sections/AboutSection2";
import TeamSection from "@/components/sections/TeamSection";
import Contacts from "@/components/sections/ContactsSection";
import HeroAbout from "@/components/sections/HeroAbout";
import BusinessHighlightsSection from "@/components/sections/BusinessHighlightsSection";
import { getSEOData } from "@/lib/getSEOData";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale);
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  const sanityData = await getSanityData();
  if (!sanityData) {
    console.error("Sanity data not found");
    return null;
  }
  const siteData = adaptSanityData(sanityData);

  return (
    <>
      <HeroAbout heroData={siteData.hero} locale={locale} />
      <div className="flex flex-col items-center justify-center px-4 md:px-16 lg:px-32 py-20 bg-background-alt">
        <SectionHeading
          title={siteData.pages.about_page.heading_intro[locale]}
          decoration={false}
          className="text-h3 md:text-h2"
          color="white"
        />
      </div>
      <BusinessHighlightsSection
        highlights={siteData.pages.about_page.businessHighlights}
        barbersCount={siteData.general.barbers.length}
        locale={locale}
      />
      <div className="bg-background-alt pb-20 overflow-hidden">
        <ImagesCarousel images={siteData.gallery} />
      </div>
      <AboutSection2 about={siteData.about} locale={locale} />
      <TeamSection
        heading={siteData.pages.about_page.heading_team}
        barbers={siteData.general.barbers}
        locale={locale}
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
