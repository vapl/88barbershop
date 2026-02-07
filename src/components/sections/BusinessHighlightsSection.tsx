"use client";

import React from "react";

import { motion } from "framer-motion";
import { PagesData } from "@/lib/types";

interface Props {
  highlights: PagesData["about_page"]["businessHighlights"];
  barbersCount: number;
  locale: "lv" | "en" | "ru";
}

const BusinessHighlightsSection: React.FC<Props> = ({ highlights, barbersCount, locale }) => {
  if (!highlights) return null;
  return (
    <section className="flex justify-center items-center w-full bg-background-alt px-4 md:px-16 lg:px-32 pb-20 overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <motion.div
          className="flex w-full flex-col gap-1 items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">
            {highlights.highlight1.title[locale]}
          </h2>
          <h3 className="text-body font-heading text-foreground">
            {highlights.highlight1.subtitle[locale]}
          </h3>
        </motion.div>
        <motion.div
          className="flex w-full flex-col gap-1 items-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">{barbersCount}</h2>
          <h3 className="text-body font-heading text-foreground">
            {highlights.highlight2.subtitle[locale]}
          </h3>
        </motion.div>
        <motion.div
          className="flex w-full flex-col gap-1 items-center text-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">
            {highlights.highlight3.title}
          </h2>
          <h3 className="text-body font-heading text-foreground text-wrap">
            {highlights.highlight3.subtitle[locale]}
          </h3>
        </motion.div>
        <motion.div
          className="flex w-full flex-col gap-1 items-center text-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-h3 md:text-h2 font-heading text-primary uppercase">
            {highlights.highlight4.title}
          </h2>
          <h3 className="text-body font-heading text-foreground">
            {highlights.highlight4.subtitle[locale]}
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessHighlightsSection;
