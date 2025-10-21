import React from "react";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";

const HeroServices = () => {
  const locale = useLocale() as "lv" | "en" | "ru";
  return (
    <section
      className="relative flex justify-center items-center h-[480px] w-full bg-background-alt px-4 md:px-16 lg:px-32 pt-[80px]"
      style={{
        backgroundImage: "url(/images/bg-pattern-services.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "320px auto",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-h2 md:text-h1 text-foreground font-heading uppercase text-shadow-black/60 text-shadow-lg text-center">
        {siteData.hero.hero_services[locale]}
      </h1>
    </section>
  );
};

export default HeroServices;
