"use client";

import React from "react";
import Button from "../ui/Button";
import Scissors from "../../../public/icons/scissors-filled.svg";
import BarberPole from "../../../public/icons/barber-pole-bg.svg";
import Razor from "../../../public/icons/razor-bg.svg";
import { ServiceGroup, ServiceCards } from "../../lib/types";

type Props = {
  list: ServiceGroup;
  cardsData: ServiceCards;
  locale: "lv" | "en" | "ru";
};

const PricingCard: React.FC<Props> = ({ list, locale, cardsData }) => {
  return (
    <>
      <div
        id={list.slug}
        className="relative flex flex-col gap-16 w-full rounded-xs p-6 md:p-10 border-white/3 border-1 shadow-black/50 shadow-lg scroll-mt-[100px]"
      >
        <div className={`absolute inset-0 flex justify-center items-center sm:justify-end`}>
          {list.slug === "haircut" && <Scissors className="flex h-[80%] opacity-30 sm:pr-16" />}
          {list.slug === "shave" && <Razor className="flex h-[60%] opacity-30 sm:pr-16" />}
          {list.slug === "combo" && <BarberPole className="flex h-[80%] opacity-30 sm:pr-32" />}
        </div>
        {/* Header */}
        <div className="z-10 flex flex-col gap-4">
          <span className="text-xs text-primary uppercase">{cardsData.label[locale]}</span>
          <h3 className="text-h3 text-foreground font-heading uppercase">{list.title[locale]}</h3>
        </div>
        {/* Services */}
        <div className="flex flex-col z-10 gap-8 text-wrap md:text-nowrap">
          {list.services?.map((service, i) => {
            const text = service.name[locale];
            const isLong = text.length > 24;

            return (
              <div key={`${list.id}-${i}`} className="p-2 text-foreground hover:bg-primary/20">
                <div className="gap-4 w-full items-center hover:scale-95 transition-all duration-300">
                  <div className="gap-1 md:gap-6 items-start md:items-center justify-center md:justify-start flex-col md:flex-row">
                    <div className="flex gap-4 w-full items-center justify-between">
                      <span
                        className={`${isLong ? "min-w-[200px] text-wrap" : "text-nowrap"} text-body capitalize break-words leading-tight`}
                      >
                        {service.name[locale]}
                      </span>
                      {service.note && service.note[locale] && (
                        <span className="hidden md:block text-xs text-primary capitalize leading-tight">
                          {service.note[locale]}
                        </span>
                      )}
                      <div className="flex w-full h-[1px] bg-foreground/50" />
                      <span>{service.price}</span>
                    </div>

                    {service.note && service.note[locale] && (
                      <span className="flex md:hidden text-xs text-primary capitalize leading-tight">
                        {service.note[locale]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex z-10 justify-center items-center">
          <Button type="button" outline link="/contact">
            {cardsData.cta_button[locale]}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
