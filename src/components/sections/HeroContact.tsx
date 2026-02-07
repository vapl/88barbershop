import React from "react";

import { HeroData } from "@/lib/types";
import { FaPhone } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";

interface Props {
  heroData: HeroData;
  locale: "lv" | "en" | "ru";
}

const HeroServices: React.FC<Props> = ({ heroData, locale }) => {
  return (
    <section className="relative flex justify-center items-center h-[480px] w-full bg-linear-to-br from-[#1A1A1A]/30 via-[#1C2927]/30 to-[#1F1F1F]/30 px-4 md:px-16 lg:px-32 pt-20 overflow-hidden">
      <h1 className="text-h2 md:text-h1 text-foreground font-heading uppercase text-shadow-black/60 text-shadow-lg text-center">
        {heroData.hero_contact[locale]}
      </h1>
      <FaPhone className="absolute -bottom-2 -left-2 text-background-alt/50" size={200} />
      <MdAlternateEmail className="absolute top-12 -right-12 text-background-alt/50" size={300} />
    </section>
  );
};

export default HeroServices;
