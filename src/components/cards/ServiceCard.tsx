import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  cardType?: "haircut" | "shave" | "combo";
  locale: "lv" | "en" | "ru";
};

const ServiceCard: React.FC<Props> = ({ cardType, locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const BarbershopLinks = {
    gertrudes34: `/${locale}/services/gertrudes34`,
    akmenu16: `/${locale}/services/akmenu16`,
  };
  const labels = {
    BarbershopBadge: {
      lv: "Barbershop",
      en: "Barbershop",
      ru: "Барбершоп",
    },
    gertrudes34: {
      lv: "Ģertrūdes 34",
      en: "Ģertrūdes 34",
      ru: "Ģertrūdes 34",
    },
    akmenu16: {
      lv: "Akmeņu 16",
      en: "Akmeņu 16",
      ru: "Akmeņu 16",
    },
    gertrudes34Address: {
      lv: "Ģertrūdes iela 34, Rīga",
      en: "Ģertrūdes iela 34, Riga",
      ru: "Ģertrūdes iela 34, Riga",
    },
    akmenu16Address: {
      lv: "Akmeņu iela 16, Rīga",
      en: "Akmeņu iela 16, Riga",
      ru: "Akmeņu iela 16, Riga",
    },
  };

  const card = {
    haircut: {
      icon: "/icons/services-haircut-scissors-icon.svg",
      alt: "Scissors icon",
      title: siteData.services.services_section.cards.haircut.title[locale],
      description: siteData.services.services_section.cards.haircut.description[locale],
    },
    shave: {
      icon: "/icons/services-shave-razor-icon.svg",
      alt: "Razor icon",
      title: siteData.services.services_section.cards.shave.title[locale],
      description: siteData.services.services_section.cards.shave.description[locale],
    },
    combo: {
      icon: "/icons/services-combo-icon.svg",
      alt: "Beard and Hair icon",
      title: siteData.services.services_section.cards.combo.title[locale],
      description: siteData.services.services_section.cards.combo.description[locale],
    },
  };

  const selectedCard = cardType ? card[cardType] : card.haircut;

  const handleToggle = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a")) {
      return;
    }
    if (!isDesktop) {
      setIsOpen((current) => !current);
    }
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseEnter = () => {
    if (isDesktop) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isDesktop) setIsOpen(false);
  };

  const topDrawerClass = [
    "h-[50%] bg-black/60 backdrop-blur-sm transition-transform duration-500",
    isOpen ? "translate-y-0 md:-translate-y-full" : "-translate-y-full",
    "md:group-hover:translate-y-0",
  ].join(" ");
  const bottomDrawerClass = [
    "mt-auto h-[50%] bg-black/60 backdrop-blur-sm transition-transform duration-500",
    isOpen ? "translate-y-0 md:translate-y-full" : "translate-y-full",
    "md:group-hover:translate-y-0",
  ].join(" ");

  return (
    <div className="w-full">
      <div
        className="group relative flex h-[512px] md:h-[640px] w-full flex-col items-center justify-center gap-3 text-center bg-secondary-accent/10 backdrop-blur-xs hover:bg-secondary-accent/20 hover:backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-primary rounded-sm p-6 overflow-hidden cursor-default"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        aria-expanded={isOpen}
      >
        <>
          <div className="absolute z-10 flex w-full flex-col items-center gap-4 text-center ">
            <motion.div
              className="relative flex items-center justify-center"
              animate={isOpen ? { scale: 0.95, y: 8 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src={selectedCard.icon}
                alt={selectedCard.alt}
                width={73}
                height={110}
                className={`w-auto "h-[150px]" md:h-[110px]`}
                style={{ width: "auto" }}
              />
            </motion.div>
            {!isOpen && (
              <>
                <motion.h3
                  className="text-primary font-heading uppercase font-semibold"
                  animate={isOpen ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {selectedCard.title}
                </motion.h3>
                <motion.p
                  className="relative z-10 px-6 text-small text-foreground"
                  animate={isOpen ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {selectedCard.description}
                </motion.p>
              </>
            )}
          </div>
        </>

        {/* Drawer overlays */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
          <div className={topDrawerClass}>
            <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
              <Link
                href={`${BarbershopLinks.gertrudes34}${cardType ? `#${cardType}` : ""}`}
                className="w-[80%] justify-center items-center pointer-events-auto cursor-pointer text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-hover transition"
              >
                <div className="flex flex-col items-center justify-center border p-3 gap-3 rounded-sm hover:bg-primary/10 transition-colors duration-300">
                  <span className="rounded-xs border border-primary/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary">
                    {labels.BarbershopBadge[locale]}
                  </span>

                  {/* {labels.gertrudes34[locale]} */}
                  <span className="text-[11px] text-foreground/70">
                    {labels.gertrudes34Address[locale]}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className={bottomDrawerClass}>
            <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
              <Link
                href={`${BarbershopLinks.akmenu16}${cardType ? `#${cardType}` : ""}`}
                className="w-[80%] justify-center pointer-events-auto cursor-pointer text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-hover transition"
              >
                <div className="flex flex-col items-center justify-center border p-3 gap-3 rounded-sm hover:bg-primary/10 transition-colors duration-300">
                  <span className="rounded-xs border border-primary/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary">
                    {labels.BarbershopBadge[locale]}
                  </span>
                  {/* {labels.akmenu16[locale]} */}
                  <span className="text-[11px] text-foreground/70">
                    {labels.akmenu16Address[locale]}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
