import SectionHeading from "@/components/SectionHeading";
import Contacts from "@/components/sections/ContactsSection";
import HeroContact from "@/components/sections/HeroContact";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";

export default function ContactPage() {
  const locale = useLocale() as "lv" | "en" | "ru";

  return (
    <>
      <HeroContact />
      <div className="flex items-center justify-center px-4 md:px-16 lg:px-32 py-[80px]">
        <SectionHeading
          title={siteData.pages.contact_page.heading_intro[locale]}
          decoration={false}
          className="text-h3 md:text-h2"
          color="gold"
        />
      </div>
      <Contacts />
    </>
  );
}
