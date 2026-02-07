"use client";

import React, { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";

import SercviceCard from "@/components/cards/ServiceCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { ServicesData } from "@/lib/types";
import { urlFor } from "@/lib/sanityClient";

interface Props {
  servicesData: ServicesData;
  locale: "lv" | "en" | "ru";
}

const ServicesSection: React.FC<Props> = ({ servicesData, locale }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center w-full text-background px-4 md:px-16 lg:px-32 py-[120px] overflow-hidden"
    >
      {/* --- Background image --- */}
      <motion.div className="absolute inset-0 z-0 will-change-transform" style={{ y }}>
        <Image
          src={urlFor(servicesData.services_section.backgroundImage).url()}
          alt="Services background image 88barbershop"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="z-0"
        />
      </motion.div>
      {/* --- Dark overlay --- */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Content */}
      <div className="relative w-full z-20 flex flex-col items-center gap-24">
        <SectionHeading
          title={servicesData.services_section.title[locale]}
          subtitle={servicesData.services_section.subtitle[locale]}
          decoration
        />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SercviceCard cardType="haircut" locale={locale} />
          <SercviceCard cardType="shave" locale={locale} />
          <div className="md:col-span-2 lg:col-span-1">
            <SercviceCard cardType="combo" locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
