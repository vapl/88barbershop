import React from "react";

import { HeroData } from "@/lib/types";

interface Props {
  heroData: HeroData;
  locale: "lv" | "en" | "ru";
}

const HeroServices: React.FC<Props> = ({ heroData, locale }) => {
  return (
    <section
      className="relative flex justify-center items-center h-[480px] w-full bg-background-alt px-4 md:px-16 lg:px-32 pt-[80px]"
      style={{
        backgroundImage: "url(/images/bg-pattern-about.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "80px auto",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <h1 className="text-h2 md:text-h1 text-foreground font-heading uppercase text-shadow-black/60 text-shadow-lg text-center">
        {heroData.hero_about[locale]}
      </h1>
    </section>
  );
};

export default HeroServices;
