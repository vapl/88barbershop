import ImagesCarousel from "@/components/carousel/ImagesCarousel";
import SectionHeading from "@/components/SectionHeading";
import AboutSection2 from "@/components/sections/AboutSection2";
import Contacts from "@/components/sections/ContactsSection";
import HeroAbout from "@/components/sections/HeroAbout";
import StatsSection from "@/components/sections/StatsSection";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";

export default function AboutPage() {
  const locale = useLocale() as "lv" | "en" | "ru";

  return (
    <>
      <HeroAbout />
      <div className="flex flex-col items-center justify-center px-4 md:px-16 lg:px-32 py-[80px] bg-background-alt">
        <SectionHeading
          title={siteData.pages.about_page.heading_intro[locale]}
          decoration={false}
          className="text-h3 md:text-h2"
          color="white"
        />
      </div>
      <StatsSection />
      <div className="bg-background-alt pb-[80px]">
        <ImagesCarousel />
      </div>
      <AboutSection2 />
      <Contacts />
    </>
  );
}
