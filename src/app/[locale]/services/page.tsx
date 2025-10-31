import Contacts from "@/components/sections/ContactsSection";
import HeroServices from "@/components/sections/HeroServices";
import ServicePricingSection from "@/components/sections/ServicePricingSection";

export default function ServicesPage() {
  return (
    <>
      <HeroServices />
      <ServicePricingSection />
      <Contacts />
    </>
  );
}
