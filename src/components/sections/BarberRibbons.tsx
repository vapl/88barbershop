"use client";

import { motion } from "framer-motion";
import LiquidGlassCircle from "../ui/LiquidGlassCircle";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";

const BarberRibbons = () => {
  const locale = useLocale() as "lv" | "en" | "ru";

  const repeatWords = (words: string[], repeatCount = 4) => {
    return Array(repeatCount).fill(words.join(" • ")).join(" • ") + " • ";
  };

  const hiarText = useMemo(() => repeatWords(siteData.ribbons.hair[locale], 5), [locale]);

  const beardText = useMemo(() => repeatWords(siteData.ribbons.beard[locale], 5), [locale]);

  const [duration, setDuration] = useState<number | undefined>(40);
  const [isTop, setIsTop] = useState(true);

  useLayoutEffect(() => {
    const updateSpeed = () => {
      const width = window.innerWidth;
      setDuration(width <= 768 ? 40 : 60);
    };

    updateSpeed(); // iestata pareizo vērtību uzreiz
    window.addEventListener("resize", updateSpeed);
    return () => window.removeEventListener("resize", updateSpeed);
  }, []);

  useEffect(() => {
    const handleTop = () => {
      setIsTop(window.scrollY < 100);
    };
    handleTop();
    console.log(isTop);
    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  });

  return (
    <motion.section
      className="relative w-full overflow-hidden bg-background flex items-center justify-center bg-radial-[at_50%_50%] from-background-alt/50 via-background-alt/50 to-background to-90%"
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: 192, opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      viewport={{ once: isTop, amount: 0.4 }}
    >
      {/* BLUE ribbon (augšējā) */}
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[15deg] md:rotate-[10deg] w-[250vw] bg-[#4B5667]/60 text-[#EDEDED] font-semibold text-[18px] md:text-[24px] tracking-[4px] py-2">
        <motion.div
          key={duration}
          className="whitespace-nowrap flex will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          }}
        >
          <span className="mr-[2rem]">{hiarText}</span>
          <span className="mr-[2rem]">{hiarText}</span>
        </motion.div>
      </motion.div>

      {/* RED ribbon (apakšējā) */}
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[15deg] md:-rotate-[10deg] w-[250vw] bg-[#7F3534]/60 text-[#EDEDED] font-semibold text-[18px] md:text-[24px] tracking-[4px] py-2">
        <motion.div
          key={duration}
          className="whitespace-nowrap flex will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          }}
        >
          <span className="mr-[2rem]">{beardText}</span>
          <span className="mr-[2rem]">{beardText}</span>
        </motion.div>
      </motion.div>

      {/* Stikla aplis */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex w-full items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.6,
        }}
        viewport={{ once: isTop }}
      >
        <LiquidGlassCircle />
      </motion.div>
    </motion.section>
  );
};

export default BarberRibbons;
