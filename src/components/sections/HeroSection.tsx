"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";

import { urlFor } from "@/lib/sanityClient";
import { HeroData } from "@/lib/types";

interface HeroProps {
  heroData: HeroData;
  locale: "lv" | "en" | "ru";
}

const HeroSection: React.FC<HeroProps> = ({ heroData, locale }) => {
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
      className="relative flex flex-col items-center justify-center min-h-[100svh] overflow-hidden px-4 pb-24"
    >
      {/* --- Background image --- */}
      <motion.div className="absolute inset-0 z-0 will-change-transform" style={{ y }}>
        <Image
          src={urlFor(heroData.backgroundImage).url()}
          alt="Hero image 88barbershop"
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

      {/* --- Content (logo + buttons) --- */}

      <div className="z-20 h-full flex flex-col items-center justify-center gap-24 pt-[100px]">
        <motion.div
          className="z-20 flex items-center justify-center top-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.3, 1] }}
        >
          <div className="relative w-[360px] md:w-[544px] h-[407px]">
            <Image
              src="/logo/hero-logo-gold.svg"
              alt="Logo 88barbershop"
              fill
              priority
              className="object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* <Button variant="primary" outline={false} disabled={false} link={`/${locale}/contact`}>
            {heroData.cta1[locale]}
          </Button> */}

          <Button variant="primary" outline={true} disabled={false} link={`/${locale}/services`}>
            {heroData.cta2[locale]}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
