"use client";

import React from "react";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

const StatsSection = () => {
  const locale = useLocale() as "lv" | "en" | "ru";

  return (
    <section className="flex justify-center items-center w-full bg-background-alt px-4 md:px-16 lg:px-32 pb-[80px]">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <motion.div
          className="flex w-full flex-col gap-1 items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">
            {siteData.pages.about_page.stats.s1.h1[locale]}
          </h2>
          <h3 className="text-body font-heading text-foreground">
            {siteData.pages.about_page.stats.s1.h3[locale]}
          </h3>
        </motion.div>
        <motion.div
          className="flex w-full flex-col gap-1 items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">
            {siteData.general.barbers.length}
          </h2>
          <h3 className="text-body font-heading text-foreground">
            {siteData.pages.about_page.stats.s2.h3[locale]}
          </h3>
        </motion.div>
        <motion.div
          className="flex w-full flex-col gap-1 items-center text-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">100%</h2>
          <h3 className="text-body font-heading text-foreground text-wrap">
            {siteData.pages.about_page.stats.s3.h3[locale]}
          </h3>
        </motion.div>
        <motion.div
          className="flex w-full flex-col gap-1 items-center text-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">15+</h2>
          <h3 className="text-body font-heading text-foreground">
            {siteData.pages.about_page.stats.s4.h3[locale]}
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
