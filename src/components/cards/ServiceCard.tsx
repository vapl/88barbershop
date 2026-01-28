import React, { useCallback, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import Link from "next/link";

type Props = {
  cardType?: "haircut" | "shave" | "combo";
  locale: "lv" | "en" | "ru";
};

const ServiceCard: React.FC<Props> = ({ cardType, locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const salonLinks = {
    centrs: `/${locale}/services/centrs`,
    pardaugava: `/${locale}/services/pardaugava`,
  };
  const labels = {
    salonBadge: {
      lv: "Salons",
      en: "Salon",
      ru: "Салон",
    },
    centrs: {
      lv: "Centrs",
      en: "Centrs",
      ru: "Центр",
    },
    pardaugava: {
      lv: "Pārdaugava",
      en: "Pardaugava",
      ru: "Пардауґава",
    },
    centrsAddress: {
      lv: "Barona iela 88, Rīga",
      en: "Barona iela 88, Riga",
      ru: "Улица Барона 88, Рига",
    },
    pardaugavaAddress: {
      lv: "Akmeņu iela 16",
      en: "Akmenu iela 16",
      ru: "Улица Акменю 16",
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
    setIsOpen((current) => !current);
  }, []);

  const topDrawerClass = [
    "h-[30%] bg-black/60 backdrop-blur-sm transition-transform duration-500",
    isOpen ? "translate-y-0 md:-translate-y-full" : "-translate-y-full",
    "md:group-hover:translate-y-0",
  ].join(" ");
  const bottomDrawerClass = [
    "mt-auto h-[30%] bg-black/60 backdrop-blur-sm transition-transform duration-500",
    isOpen ? "translate-y-0 md:translate-y-full" : "translate-y-full",
    "md:group-hover:translate-y-0",
  ].join(" ");

  return (
    <div className="w-full">
      <div
        className="group relative flex h-[512px] md:h-[640px] w-full md:max-w-[300] lg:max-w-[360px] flex-col gap-6 items-center justify-center text-center bg-secondary-accent/10 backdrop-blur-xs hover:bg-secondary-accent/20 hover:backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-primary rounded-sm p-6 overflow-hidden cursor-default"
        onClick={handleToggle}
        role="button"
        aria-expanded={isOpen}
      >
        <div className="relative z-10 flex flex-col gap-4 transition-transform duration-500 group-hover:scale-95 group-hover:opacity-80">
          <div className="flex flex-col h-full gap-4 text-primary font-heading uppercase font-semibold text-center">
            <Image
              src={selectedCard.icon}
              alt={selectedCard.alt}
              width={73}
              height={110}
              className="w-auto h-[150px] md:h-[110px]"
              style={{ width: "auto" }}
            />
            <h3>{selectedCard.title}</h3>
          </div>
        </div>
        <p className="relative z-10 text-small text-foreground transition-transform duration-500 group-hover:scale-95 group-hover:opacity-80">
          {selectedCard.description}
        </p>

        {/* Drawer overlays */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col">
          <div className={topDrawerClass}>
            <Link
              href={`${salonLinks.centrs}${cardType ? `#${cardType}` : ""}`}
              className="pointer-events-auto cursor-pointer text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-hover transition"
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
                <span className="rounded-xs border border-primary/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary">
                  {labels.salonBadge[locale]}
                </span>

                {labels.centrs[locale]}
                <span className="text-[11px] text-foreground/70">
                  {labels.centrsAddress[locale]}
                </span>
              </div>
            </Link>
          </div>
          <div className={bottomDrawerClass}>
            <Link
              href={`${salonLinks.pardaugava}${cardType ? `#${cardType}` : ""}`}
              className="pointer-events-auto cursor-pointer text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-hover transition"
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
                <span className="rounded-xs border border-primary/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary">
                  {labels.salonBadge[locale]}
                </span>
                {labels.pardaugava[locale]}
                <span className="text-[11px] text-foreground/70">
                  {labels.pardaugavaAddress[locale]}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
