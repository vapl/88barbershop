"use client";

import React from "react";
import { useLocale } from "next-intl";
import SectionHeading from "../SectionHeading";
import Image from "next/image";
import { urlFor } from "@/lib/sanityClient";
import { AboutData } from "@/lib/types";

interface Props {
  about: AboutData;
  locale: "lv" | "en" | "ru";
}

const AboutSection2: React.FC<Props> = ({ about, locale }) => {
  return (
    <section
      className="
        grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0
        items-start 
        w-full
        px-4 md:px-16 lg:px-32 
        py-[80px] lg:py-[120px]
        bg-background-alt
    "
    >
      {/* Left */}
      <div className="order-2 lg:order-1 relative h-[400px] lg:h-[500px] w-full flex justify-center text-white">
        <Image
          src={about.image ? urlFor(about.image).url() : "/images/about/default-placeholder.png"}
          alt={"88 Barber shop photo"}
          sizes="auto"
          fill
          className="object-cover rounded-sm shadow-black/50 drop-shadow-lg"
        />
      </div>

      {/* Right */}
      <div className="order-1 lg:order-2 lg:pl-16 flex flex-col gap-10 items-center lg:items-start">
        <SectionHeading title={about.title[locale]} />
        <p className="text-foreground text-body">{about.description_long[locale]}</p>
      </div>
    </section>
  );
};

export default AboutSection2;
