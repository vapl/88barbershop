"use client";

import React, { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import bg from "../../../public/images/services-bg.jpg";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import SercviceCard from "@/components/ServiceCard";
import { motion, useScroll, useTransform } from "framer-motion";

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale() as "lv" | "en" | "ru";

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
          src={bg}
          alt="Services background image 88barbershop"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="-z-0"
        />
      </motion.div>
      {/* --- Dark overlay --- */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-[96px]">
        <SectionHeading
          title={siteData.services.services_section.title[locale]}
          subtitle={siteData.services.services_section.subtitle[locale]}
          decoration
        />
        <div className="flex flex-col md:flex-row w-full justify-center gap-10">
          <SercviceCard cardType="haircut" />
          <SercviceCard cardType="shave" />
          <SercviceCard cardType="combo" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
