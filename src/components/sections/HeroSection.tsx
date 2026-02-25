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
      className="relative flex flex-col items-center justify-center min-h-svh overflow-hidden px-4 pb-24"
    >
      {/* --- Background image --- */}
      <motion.div className="absolute inset-0 z-0 will-change-transform" style={{ y }}>
        <Image
          src={urlFor(heroData.backgroundImage).url()}
          alt="Hero image 88barbershop"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
          style={{
            objectFit: "cover",
          }}
          className="z-0"
        />
      </motion.div>
      {/* --- Dark overlay --- */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <>
        <div className="pointer-events-none absolute inset-x-0 bottom-34 z-40 flex justify-center px-3 sm:hidden">
          <div className="relative h-[180px] w-[180px]">
            <Image
              src={`/images/spec-offer/spec-offer-${locale === "lv" ? "lv" : locale === "en" ? "en" : "ru"}-20.png`}
              alt="Special offer 88barbershop"
              fill
              sizes="108px"
              className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-40 hidden px-3 sm:bottom-6 sm:block sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between">
            <div className="relative h-[128px] w-[128px] md:h-[170px] md:w-[170px] lg:h-[200px] lg:w-[200px] xl:h-[220px] xl:w-[220px]">
              <Image
                src={`/images/spec-offer/spec-offer-${locale === "lv" ? "lv" : locale === "en" ? "en" : "ru"}-20.png`}
                alt="Special offer 88barbershop"
                fill
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 170px, (max-width: 1280px) 200px, 220px"
                className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              />
            </div>
            <div className="relative h-[128px] w-[128px] md:h-[170px] md:w-[170px] lg:h-[200px] lg:w-[200px] xl:h-[220px] xl:w-[220px]">
              <Image
                src={`/images/spec-offer/spec-offer-${locale === "lv" ? "lv" : locale === "en" ? "en" : "ru"}-20.png`}
                alt="Special offer 88barbershop"
                fill
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 170px, (max-width: 1280px) 200px, 220px"
                className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </>

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
