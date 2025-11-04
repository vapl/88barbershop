"use client";

import React from "react";
import SectionHeading from "../SectionHeading";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import ImagesCarousel from "../carousel/ImagesCarousel";
import { AboutData, Image, PagesData } from "@/lib/types";

interface Props {
  about: AboutData;
  gallery: Image[];
  highlights: PagesData["about_page"]["businessHighlights"];
  locale: "lv" | "en" | "ru";
}

const AboutSection: React.FC<Props> = ({ about, gallery, highlights, locale }) => {
  const experienceText = about.experience[locale];
  const splittedText = experienceText.split(" ");
  const yearsOfExperience = highlights.highlight4.title.split("");

  return (
    <div className="flex flex-col w-full py-[120px] bg-gradient-to-br from-background via-background-alt/80 to-background ">
      <section
        className="
        grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-0
        items-start 
        w-full
        px-4 md:px-16 lg:px-32 
        pb-[120px]
    "
      >
        {/* Left */}
        <div className="relative h-[250px] sm:h-[300px] flex justify-center text-white">
          <div className="absolute top-0 z-20 text-primary pl-10 justify-center leading-none">
            <div className="relative flex gap-6 leading-none mask-origin-content">
              <motion.span
                className="relative font-highlight text-[150px] sm:text-[186px] leading-none"
                initial={{ y: -20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
                viewport={{ once: false, amount: 0.5 }}
              >
                {yearsOfExperience[0]}
              </motion.span>
              <motion.span
                className="relative font-highlight text-[180px] sm:text-[216px] leading-none"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
                viewport={{ once: false, amount: 0.5 }}
              >
                {yearsOfExperience[1]}
              </motion.span>
              <motion.span
                className="absolute -top-[90px] -right-[60px] sm:-top-[120px] sm:-right-[80px] text-[150px] sm:text-[200px] text-white/10 z-[5]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, y: 20, rotate: 180 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
                viewport={{ once: false, amount: 0.5 }}
              >
                {yearsOfExperience[2]}
              </motion.span>
            </div>
          </div>
          <div
            className={`absolute ${locale === "lv" ? "bottom-[40px]" : "bottom-[45px]"} ${locale === "ru" ? "left-16" : ""} flex flex-col font-heading text-[38px] sm:text-[48px] tracking-[5px] leading-none capitalize`}
          >
            <span className="">{splittedText[0]}</span>
            <span>{splittedText[1]}</span>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-1 lg:pl-36 lg:col-span-2 flex flex-col gap-10 items-center lg:items-start">
          <SectionHeading title={about.title[locale]} />
          <p className="text-foreground text-body">{about.description_short[locale]}</p>
          <Button type="button" outline link="/about">
            {about.ctaButton[locale]}
          </Button>
        </div>
      </section>
      <ImagesCarousel images={gallery} />
    </div>
  );
};

export default AboutSection;
