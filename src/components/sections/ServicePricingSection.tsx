import React from "react";

import PricingCard from "../cards/PricingCard";
import { ServicesData } from "../../lib/types";

interface PricingProps {
  serviceData: ServicesData;
  locale: "lv" | "en" | "ru";
}

const ServicePricingSection: React.FC<PricingProps> = ({ serviceData, locale }) => {
  const cardOrder = ["haircut", "shave", "combo"];

  const sortedServiceList = [...serviceData.services_list].sort((a, b) => {
    const indexA = cardOrder.indexOf(a.slug);
    const indexB = cardOrder.indexOf(b.slug);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <section className="relative flex flex-col items-center w-full bg-background-alt px-4 md:px-16 lg:px-32 py-[120px] overflow-hidden">
      <div className="flex flex-col gap-16 w-full max-w-6xl">
        {sortedServiceList.map((serviceGroup) => (
          <PricingCard
            key={serviceGroup.id}
            list={serviceGroup}
            locale={locale}
            cardsData={serviceData.services_section.cards}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicePricingSection;
