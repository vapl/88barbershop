import { PageProps, getSanityData } from "@/lib/pageUtils";
import { adaptSanityData } from "@/lib/dataAdapter";
import MapEmbed from "@/components/MapEmbed";
import SectionHeading from "@/components/SectionHeading";
import Contacts from "@/components/sections/ContactsSection";
import HeroContact from "@/components/sections/HeroContact";
import { getSEOData } from "@/lib/getSEOData";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return getSEOData(locale, "contact");
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
      <section className="relative flex flex-col gap-10 items-center w-full text-background pt-[120px] bg-linear-to-br from-background via-background-alt/80 to-background overflow-hidden">
        <SectionHeading
          title={siteData.pages.contact_page.heading_map[locale]}
          decoration={true}
          className="text-h3 md:text-h2"
          color="gold"
        />
        <div className="flex w-full max-w-6xl flex-col gap-10 pb-20">
          {(siteData.contacts.locations || []).map((loc) => (
            <div key={loc.id} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 px-4 md:px-0">
                <span className="text-xs uppercase tracking-[0.3em] text-primary/80">
                  {loc.label}
                </span>
                <span className="text-sm text-foreground/70">{loc.address?.label}</span>
              </div>
              <MapEmbed query={loc.address?.label || loc.label} title={loc.label} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
