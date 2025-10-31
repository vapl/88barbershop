import React from "react";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import PricingCard from "../cards/PricingCard";

const ServicePricingSection = () => {
  const locale = useLocale() as "lv" | "en" | "ru";

  return (
    <section className="relative flex flex-col items-center w-full bg-background-alt px-4 md:px-16 lg:px-32 py-[120px] overflow-hidden">
      <div className="flex flex-col gap-16 w-full max-w-6xl">
        {siteData.services.services_list.map((serviceGroup) => (
          <PricingCard key={serviceGroup.id} list={serviceGroup} locale={locale} />
        ))}
      </div>
    </section>
  );
};

export default ServicePricingSection;
