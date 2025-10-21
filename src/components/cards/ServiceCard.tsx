import React from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import Link from "next/link";

type Props = {
  cardType?: "haircut" | "shave" | "combo";
};

const ServiceCard: React.FC<Props> = ({ cardType }) => {
  const locale = useLocale() as "lv" | "en" | "ru";

  const card = {
    haircut: {
      link: "/services#haircut",
      icon: "/icons/services-haircut-scissors-icon.svg",
      alt: "Scissors icon",
      title: siteData.services.services_section.cards.haircut.title[locale],
      description: siteData.services.services_section.cards.haircut.description[locale],
    },
    shave: {
      link: "/services#shave",
      icon: "/icons/services-shave-razor-icon.svg",
      alt: "Razor icon",
      title: siteData.services.services_section.cards.shave.title[locale],
      description: siteData.services.services_section.cards.shave.description[locale],
    },
    combo: {
      link: "/services#combo",
      icon: "/icons/services-combo-icon.svg",
      alt: "Beard and Hair icon",
      title: siteData.services.services_section.cards.combo.title[locale],
      description: siteData.services.services_section.cards.combo.description[locale],
    },
  };

  const selectedCard = cardType ? card[cardType] : card.haircut;

  return (
    <Link href={selectedCard.link} className="w-full">
      <div className="flex h-[512px] md:h-[640px] w-full md:max-w-[300] lg:max-w-[360px] flex-col gap-6 items-center justify-center text-center bg-secondary-accent/10 backdrop-blur-xs hover:bg-secondary-accent/20 hover:backdrop-blur-sm hover:shadow-2xl hover:scale-105 cursor-pointer transition-all duration-300 border-1 border-primary rounded-sm p-6 active:scale-95">
        <div className="flex flex-col gap-4">
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
        <p className="text-small text-foreground">{selectedCard.description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;
