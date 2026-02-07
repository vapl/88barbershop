"use client";

import React from "react";
import Button from "../ui/Button";
import Scissors from "../../../public/icons/scissors-filled.svg";
import BarberPole from "../../../public/icons/barber-pole-bg.svg";
import Razor from "../../../public/icons/razor-bg.svg";
import { ServiceGroup, ServiceCards, ContactsData } from "../../lib/types";

type Props = {
  list: ServiceGroup;
  cardsData: ServiceCards;
  locale: "lv" | "en" | "ru";
  locationId: "gertrudes34" | "akmenu16";
  locationLabel: string;
  premiumTag?: string;
  contactsData: ContactsData;
};

const PricingCard: React.FC<Props> = ({
  list,
  locale,
  cardsData,
  locationId,
  locationLabel,
  premiumTag,
  contactsData,
}) => {
  const bookingLabel = {
    lv: "Pierakstīties",
    en: "Book now",
    ru: "Записаться",
  };
  const visibleServices =
    list.services?.filter((service) => {
      const locations = service.locations;
      if (!locations || locations.length === 0) return true;
      return locations.includes(locationId);
    }) || [];

  return (
    <>
      <div
        id={list.slug}
        className="relative flex flex-col gap-16 w-full rounded-xs p-6 md:p-10 border-white/3 border shadow-black/50 shadow-lg scroll-mt-[100px]"
      >
        <div className={`absolute inset-0 flex justify-center items-center sm:justify-end`}>
          {list.slug === "haircut" && <Scissors className="flex h-[80%] opacity-30 sm:pr-16" />}
          {list.slug === "shave" && <Razor className="flex h-[60%] opacity-30 sm:pr-16" />}
          {list.slug === "combo" && <BarberPole className="flex h-[80%] opacity-30 sm:pr-32" />}
        </div>
        {/* Header */}
        <div className="z-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-primary uppercase">{cardsData.label[locale]}</span>
            {premiumTag && (
              <span className="rounded-xs border border-primary/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-primary">
                {premiumTag}
              </span>
            )}
          </div>
          <h3 className="text-h3 text-foreground font-heading uppercase">{list.title[locale]}</h3>
          <span className="text-xs text-foreground/70 uppercase">{locationLabel}</span>
        </div>
        {/* Services */}
        <div className="flex flex-col z-10 gap-8 text-wrap md:text-nowrap">
          {visibleServices.map((service, i) => {
            const text = service.name[locale];
            const isLong = text.length > 24;
            const priceByLocation = service.pricesByLocation?.[locationId];
            const price = priceByLocation || service.price;

            return (
              <div key={`${list.id}-${i}`} className="p-2 text-foreground hover:bg-primary/20">
                <div className="gap-4 w-full items-center hover:scale-95 transition-all duration-300">
                  <div className="gap-2 md:gap-6 items-start md:items-center justify-center md:justify-start flex-col md:flex-row">
                    <div className="flex gap-3 w-full items-start">
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`${isLong ? "min-w-[200px] text-wrap" : "text-nowrap"} text-body capitalize wrap-break-word leading-tight min-w-0`}
                        >
                          {service.name[locale]}
                        </span>
                        {service.note && service.note[locale] && (
                          <span className="hidden md:block text-xs text-primary capitalize leading-tight text-wrap wrap-break-word min-w-0 mt-1">
                            {service.note[locale]}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-6 h-px bg-foreground/50 self-center" />
                      <span className="whitespace-nowrap">{price}</span>
                    </div>

                    {service.note && service.note[locale] && (
                      <span className="flex md:hidden text-xs text-primary capitalize leading-tight text-wrap wrap-break-word">
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
          <Button
            variant="primary"
            outline={true}
            phoneModal={{
              phone: contactsData.phone.link,
              locations: contactsData.locations,
              locationId,
            }}
            className="hidden lg:block"
          >
            {bookingLabel[locale]}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
