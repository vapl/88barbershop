"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoWeb from "../../public/logo/logo-88barbershop.svg";
import LogoMobile from "../../public/logo/logo-88barbershop-mobile.svg";
import { usePathname } from "next/navigation";

const PRELOADER_KEY = "preloaderShown-v2";
const PRELOADER_DURATION_MS = 3200;

const Preloader = () => {
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName?.startsWith("/admin")) {
      setShow(false);
      return;
    }

    const hasShown = sessionStorage.getItem(PRELOADER_KEY);

    if (!hasShown) {
      setShow(true);
      sessionStorage.setItem(PRELOADER_KEY, "true");
    } else {
      setShow(false);
    }
  }, [pathName]);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => setShow(false), PRELOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    const preloaderWrapper = document.getElementById("preloader");

    if (!preloaderWrapper) return;

    if (show) {
      preloaderWrapper.classList.add("content-hidden");
    } else {
      preloaderWrapper.classList.remove("content-hidden");
      preloaderWrapper.classList.add("content-visible");
    }
  }, [show, pathName]);

  useEffect(() => {
    const checkWidth = () =>
      setIsMobile((prev) => {
        const next = window.innerWidth < 560;
        return prev === next ? prev : next;
      });
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const LOGO = isMobile ? LogoMobile : LogoWeb;

  if (!show) return null;

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
            <motion.div
              className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.45, 0.12] }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(201,169,76,0.45) 0%, rgba(201,169,76,0.15) 40%, transparent 70%)",
              }}
            />

            <motion.div
              className="absolute inset-0 overflow-visible"
              style={{ filter: "drop-shadow(3px 0px 4px #ff2d55)", mixBlendMode: "screen" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.9, 0, 0.65, 0, 0.5, 0],
                x: [-6, -8, -4, -7, -3, -2, 0],
                y: [0, -1, 1, 0, -1, 0, 0],
              }}
              transition={{
                duration: 0.9,
                times: [0, 0.16, 0.3, 0.45, 0.6, 0.75, 1],
                delay: 0.12,
              }}
            >
              <LOGO className="w-full h-auto select-none p-6" />
            </motion.div>

            <motion.div
              className="absolute inset-0 overflow-visible"
              style={{ filter: "drop-shadow(-3px 0px 4px #00c8ff)", mixBlendMode: "screen" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.75, 0, 0.6, 0, 0.45, 0],
                x: [6, 8, 4, 6, 2, 1, 0],
                y: [0, 1, -1, 0, 1, 0, 0],
              }}
              transition={{
                duration: 0.9,
                times: [0, 0.16, 0.3, 0.45, 0.6, 0.75, 1],
                delay: 0.14,
              }}
            >
              <LOGO className="w-full h-auto select-none p-6" />
            </motion.div>

            <motion.div
              className="absolute inset-0 overflow-visible"
              animate={{
                opacity: [0, 0.22, 0, 0.28, 0, 0.42, 0, 0.15, 0],
              }}
              transition={{
                duration: 0.85,
                times: [0, 0.16, 0.26, 0.4, 0.54, 0.68, 0.82, 0.92, 1],
                delay: 0.14,
              }}
            >
              <LOGO className="w-full h-auto select-none p-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -70, scale: 1 }}
              className="origin-[55.8%_53%] md:origin-[18%_48%]"
              animate={{
                opacity: [0, 1, 0.55, 1, 0.82, 1, 1],
                x: [-70, 0, 0, 0, 0, 0, 0],
                scale: [1, 1, 1, 1, 1, 1, 42],
                filter: [
                  "brightness(0.8) drop-shadow(0 0 0 rgba(201,169,76,0))",
                  "brightness(1.25) drop-shadow(0 0 16px rgba(255,60,60,0.8))",
                  "brightness(0.95) drop-shadow(0 0 8px rgba(201,169,76,0.45))",
                  "brightness(1.3) drop-shadow(0 0 18px rgba(0,195,255,0.75))",
                  "brightness(1.05) drop-shadow(0 0 10px rgba(201,169,76,0.5))",
                  "brightness(1.2) drop-shadow(0 0 14px rgba(255,60,60,0.65))",
                  "brightness(1.15) drop-shadow(0 0 12px rgba(201,169,76,0.6))",
                ],
              }}
              transition={{
                duration: 2.9,
                times: [0, 0.12, 0.2, 0.3, 0.4, 0.52, 1],
                ease: "easeOut",
                scale: { duration: 1.7, delay: 1.05, ease: "easeIn" },
                filter: { duration: 1.5, ease: "linear", delay: 0.28 },
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
