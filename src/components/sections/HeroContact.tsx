import React from "react";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";

const HeroServices = () => {
  const locale = useLocale() as "lv" | "en" | "ru";
  return (
    <section className="relative flex justify-center items-center h-[480px] w-full bg-gradient-to-br from-[#1A1A1A]/30 via-[#1C2927]/30 to-[#1F1F1F]/30 px-4 md:px-16 lg:px-32 pt-[80px]">
      <h1 className="text-h2 md:text-h1 text-foreground font-heading uppercase text-shadow-black/60 text-shadow-lg text-center">
        {siteData.hero.hero_contact[locale]}
      </h1>
    </section>
  );
};

export default HeroServices;
