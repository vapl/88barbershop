import React from "react";

import PricingCard from "../cards/PricingCard";
import { ServicesData, ContactsData } from "../../lib/types";

interface PricingProps {
  serviceData: ServicesData;
  contactsData: ContactsData;
  locale: "lv" | "en" | "ru";
  locationId: "gertrudes34" | "akmenu16";
  locationLabel: string;
  premiumTag?: string;
}

const ServicePricingSection: React.FC<PricingProps> = ({
  serviceData,
  contactsData,
  locale,
  locationId,
  locationLabel,
  premiumTag,
}) => {
  const cardOrder = ["haircut", "shave", "combo"];

  const sortedServiceList = [...serviceData.services_list].sort((a, b) => {
    const indexA = cardOrder.indexOf(a.slug);
    const indexB = cardOrder.indexOf(b.slug);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  const visibleServiceList = sortedServiceList.filter((serviceGroup) =>
    serviceGroup.services?.some((service) => {
      const locations = service.locations;
      if (!locations || locations.length === 0) return true;
      return locations.includes(locationId);
    })
  );

  return (
    <section className="relative flex flex-col items-center w-full bg-background-alt px-4 md:px-16 lg:px-32 py-[120px] overflow-hidden">
      <div className="flex flex-col gap-10 w-full max-w-6xl">
        {visibleServiceList.map((serviceGroup) => (
          <PricingCard
            key={serviceGroup.id}
            list={serviceGroup}
            locale={locale}
            cardsData={serviceData.services_section.cards}
            locationId={locationId}
            locationLabel={locationLabel}
            premiumTag={premiumTag}
            contactsData={contactsData}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicePricingSection;
