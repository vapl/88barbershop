import { PageProps, getSanityData } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import Contacts from "@/components/sections/ContactsSection";
import HeroSection from "@/components/sections/HeroSection";
import BarberRibbons from "@/components/sections/BarberRibbons";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ReviewsSection from "@/components/sections/ReviewsSection";

import { getSEOData } from "@/lib/getSEOData";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  return getSEOData(locale, "");
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  const sanityData = await getSanityData();
  const siteData = adaptSanityData(sanityData);

  return (
    <>
      <div className="relative trimmer-cursor">
        <HeroSection heroData={siteData.hero} locale={locale} />
        <BarberRibbons ribbonsData={siteData.ribbons} locale={locale} />
        <ServicesSection servicesData={siteData.services} locale={locale} />
        <AboutSection
          about={siteData.about}
          gallery={siteData.gallery}
          highlights={siteData.pages.about_page.businessHighlights}
          locale={locale}
        />
        <ReviewsSection reviewsSectionData={siteData.reviews} locale={locale} />
        <Contacts
          workingTime={siteData.working_time}
          contacts={siteData.contacts}
          contactsFormData={siteData.contact_form}
          errorsData={siteData.errors}
          locale={locale}
        />
      </div>
    </>
  );
}
