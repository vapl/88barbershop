"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoWeb from "../../public/logo/logo-88barbershop.svg";
import LogoMobile from "../../public/logo/logo-88barbershop-mobile.svg";
import { usePathname } from "next/navigation";

const Preloader = () => {
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const preloaderWrapper = document.getElementById("preloader");
    if (pathName.startsWith("/admin")) setShow(false);

    if (!preloaderWrapper) return;

    if (show) {
      preloaderWrapper.classList.add("content-hidden");
    } else {
      preloaderWrapper.classList.remove("content-hidden");
      preloaderWrapper.classList.add("content-visible");
    }
  }, [show, pathName]);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 560);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const LOGO = isMobile ? LogoMobile : LogoWeb;

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 6500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fullscreen-safe flex items-center justify-center px-8 bg-black overflow-hidden"
        >
          <div className="relative w-full max-w-[900px] overflow-visible">
            {/* === RGB GLITCH LAYER: RED === */}
            <motion.div
              className="absolute inset-0 overflow-visible"
              style={{ filter: "drop-shadow(3px 0px 3px #ff0000)" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0, 0.7, 0, 0.6, 0.9, 0, 0.5, 0, 0],
                x: [-4, -6, -3, -7, -2, -5, -8, -3, -4, 0, 0],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.08, 0.15, 0.22, 0.3, 0.38, 0.45, 0.52, 0.6, 0.7, 1],
                delay: 0.3,
              }}
            >
              <LOGO className="w-full h-auto select-none p-6" />
            </motion.div>

            {/* === RGB GLITCH LAYER: BLUE === */}
            <motion.div
              className="absolute inset-0 overflow-visible"
              style={{ filter: "drop-shadow(-3px 0px 3px #0000ff)" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0, 0.7, 0.4, 0.8, 0, 0.5, 0.9, 0, 0.6, 0, 0],
                x: [4, 3, 6, 2, 7, 3, 5, 8, 2, 4, 0, 0],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.05, 0.12, 0.2, 0.28, 0.35, 0.42, 0.5, 0.58, 0.65, 0.75, 1],
                delay: 0.32,
              }}
            >
              <LOGO className="w-full h-auto select-none p-6" />
            </motion.div>

            <motion.div
              className="absolute inset-0 overflow-visible"
              animate={{
                opacity: [0, 0.2, 0, 0.3, 0, 0.5, 0, 0.2, 0.4, 0, 0.3, 0, 0],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.08, 0.12, 0.18, 0.24, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.7, 1],
                delay: 0.3,
              }}
            >
              <LOGO className="w-full h-auto select-none p-6" />
            </motion.div>

            {/* === MAIN LOGO === */}
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 1 }}
              className="origin-[55.8%_53%] md:origin-[18%_48%]"
              animate={{
                opacity: [0, 1, 1],
                x: [-80, 0, 0],
                scale: [1, 1, 60],
                filter: [
                  "brightness(1.1) drop-shadow(0 0 2px rgba(0,0,0,0.2))",
                  "brightness(1.2) drop-shadow(0 0 8px #ff0000)",
                  "brightness(1.2) drop-shadow(0 0 10px #00ff00)",
                  "brightness(1.2) drop-shadow(0 0 10px #0000ff)",
                ],
              }}
              transition={{
                opacity: { duration: 0.8 },
                x: { duration: 1, ease: "easeOut" },
                scale: { duration: 5, delay: 3, ease: "easeIn" },
                filter: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "linear",
                  delay: 1.2,
                },
              }}
            >
              <LOGO className="relative w-full h-auto select-none p-6" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
