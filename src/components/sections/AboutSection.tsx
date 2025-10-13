"use client";

import React from "react";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import SectionHeading from "../SectionHeading";
import Button from "../ui/Button";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  const locale = useLocale() as "lv" | "en" | "ru";

  return (
    <section
      className="
        grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-0
        items-start 
        w-full 
        bg-gradient-to-br from-background via-background-alt/80 to-background 
        px-4 md:px-16 lg:px-32 
        py-[120px]
    "
    >
      {/* Left */}
      <div className="relative h-[250px] sm:h-[300px] flex justify-center text-white">
        <div className="absolute top-0 z-20 text-primary pl-10 justify-center leading-none">
          <div className="flex gap-6 leading-none mask-origin-content">
            <motion.span
              className="font-highlight text-[150px] sm:text-[186px] leading-none"
              initial={{ y: -20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
              viewport={{ once: false, amount: 0.5 }}
            >
              1
            </motion.span>
            <motion.span
              className="font-highlight text-[180px] sm:text-[216px] leading-none"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
              viewport={{ once: false, amount: 0.5 }}
            >
              5
            </motion.span>
            <motion.span
              className="absolute -top-[90px] -right-[60px] sm:-top-[120px] sm:-right-[80px] text-[150px] sm:text-[200px] text-white/10 z-[5]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 20, rotate: 180 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
              viewport={{ once: false, amount: 0.5 }}
            >
              +
            </motion.span>
          </div>
        </div>
        <div className="absolute bottom-[45px] flex flex-col font-heading text-[38px] sm:text-[48px] tracking-[5px] leading-none">
          <span className="">Years</span>
          <span>Experience</span>
        </div>
      </div>

      {/* Right */}
      <div className="col-span-1 lg:pl-36 lg:col-span-2 flex flex-col gap-10 items-center lg:items-start">
        <SectionHeading title="Who we are" />
        <p className="text-foreground text-body">
          At 88 Barbershop in Rīga, every haircut and shave is more than just a service — it’s a
          craft. With 15+ years of experience, our barbers deliver precision cuts, clean fades, and
          traditional shaves in a modern, relaxed atmosphere.
        </p>
        <Button type="button" outline>
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default AboutSection;
