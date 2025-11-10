"use client";

import { motion } from "framer-motion";
import LiquidGlassCircle from "../ui/LiquidGlassCircle";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { RibbonsData } from "@/lib/types";

interface Props {
  ribbonsData: RibbonsData;
  locale: "lv" | "en" | "ru";
}

const BarberRibbons: React.FC<Props> = ({ ribbonsData, locale }) => {
  const repeatWords = (words: string[], repeatCount = 4) => {
    return Array(repeatCount).fill(words.join(" • ")).join(" • ") + " • ";
  };

  const hairText = useMemo(
    () => repeatWords(ribbonsData.hair[locale], 5),
    [ribbonsData.hair, locale]
  );

  const beardText = useMemo(
    () => repeatWords(ribbonsData.beard[locale], 5),
    [ribbonsData.beard, locale]
  );

  const [duration, setDuration] = useState<number | undefined>(40);
  const [isTop, setIsTop] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const ribbonHeight = 192;

  const degree = Math.atan(ribbonHeight / (screenWidth / 1.25)) * (180 / Math.PI);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  }, []);

  return (
    !isTop && (
      <motion.section
        className="relative w-full overflow-hidden bg-background flex items-center justify-center bg-radial-[at_50%_50%] from-background-alt/50 via-background-alt/50 to-background to-90%"
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 192, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        viewport={{ once: true }}
      >
        {/* BLUE ribbon (augšējā) */}
        <motion.div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] bg-[#4B5667]/60 text-[#EDEDED] font-semibold text-[18px] md:text-[24px] tracking-[4px] py-2`}
          style={{
            rotate: `${degree}deg`,
          }}
        >
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
            <span className="mr-[2rem]">{hairText}</span>
            <span className="mr-[2rem]">{hairText}</span>
          </motion.div>
        </motion.div>

        {/* RED ribbon (apakšējā) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] bg-[#7F3534]/60 text-[#EDEDED] font-semibold text-[18px] md:text-[24px] tracking-[4px] py-2"
          style={{
            rotate: `-${degree}deg`,
          }}
        >
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
          viewport={{ once: true }}
        >
          <LiquidGlassCircle />
        </motion.div>
      </motion.section>
    )
  );
};

export default BarberRibbons;
