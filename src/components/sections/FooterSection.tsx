"use client";

import React from "react";
import ContactItem from "../contacts/Contacts";

import Link from "next/link";
import Image from "next/image";
import { NavigationItem, ContactsData, FooterData, WorkingTimeData } from "@/lib/types";

interface FooterProps {
  footerData: FooterData;
  contactsData: ContactsData;
  navData: NavigationItem[];
  workingTimeData: WorkingTimeData;
  locale: "lv" | "en" | "ru";
}

const Footer: React.FC<FooterProps> = ({
  footerData,
  contactsData,
  navData,
  workingTimeData,
  locale,
}) => {
  const { development: dev } = footerData;
  const working = workingTimeData;

  const shortenDays = () => {
    const text = working.days.working_days[locale];
    const days = text.split(" ").filter((m) => m !== "-" && m.trim() !== "");
    const [first, second] = days;
    const map: Record<"lv" | "en" | "ru", Record<string, string>> = {
      lv: {
        Pirmdiena: "Pr",
        Sestdiena: "Se",
      },
      en: {
        Monday: "Mon",
        Saturday: "Sat",
      },
      ru: {
        Понедельник: "Пн",
        Суббота: "Сб",
      },
    };
    const short1 = map[locale][first] ?? first;
    const short2 = map[locale][second] ?? second;
    return `${short1} - ${short2}`;
  };

  return (
    <footer className="flex gap-14 flex-col items-center w-full bg-background px-4 md:px-16 lg:px-32 pt-20 pb-9">
      {/* ### Footer Top ### */}
      <div className="flex flex-col w-full gap-8 lg:flex-row items-center lg:items-start lg:justify-between text-extra-small">
        {/* LOGO */}
        <div className="flex flex-col w-full gap-8 max-w-xs items-center text-center">
          <Link href={"/"}>
            <Image
              src="/logo/logo-outline-gold.svg"
              alt="Logo 88barbershop"
              width={50}
              height={50}
              priority
            />
          </Link>
          <p className="hidden lg:flex">{footerData.sections.description[locale]}</p>
        </div>
        {/* LINKS */}
        <div className="flex flex-row gap-8 lg:gap-2 lg:flex-col justify-center lg:items-start">
          <h1 className="hidden lg:flex font-heading text-h3 pb-6">
            {footerData.sections.links.title[locale]}
          </h1>
          {navData
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link key={item.href} href={item.href} className="hover:underline">
                {item.label[locale]}
              </Link>
            ))}
        </div>
        {/* CONTACT */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-6">
          <div className="flex flex-col lg:w-fit gap-2 lg:gap-2 md:gap-4 md:flex-col lg:flex-col justify-center lg:items-start">
            <h1 className="hidden lg:flex font-heading text-h3 pb-6">
              {footerData.sections.contact.title[locale]}
            </h1>
            <ContactItem
              type="phone"
              value={contactsData.phone.label}
              link={contactsData.phone.link}
            />
            {/* <ContactItem
              type="email"
              value={contactsData.email.label}
              link={contactsData.email.link}
            /> */}
            <ContactItem
              type="address"
              value={contactsData.address.label}
              link={contactsData.address.link}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <span>{shortenDays()}</span>
              <span>{working.hours.working_hours}</span>
            </div>
            <div className="flex gap-2">
              <span>{working.days.closed_days[locale]}</span>
              <span
                className={
                  working.hours.closed_hours[locale] === "CLOSED" ||
                  working.hours.closed_hours[locale] === "SLĒGTS" ||
                  working.hours.closed_hours[locale] === "ЗАКРЫТО"
                    ? "font-bold"
                    : ""
                }
              >
                {working.hours.closed_hours[locale]}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ### Footer Bottom ### */}
      <div className="flex gap-4 flex-col lg:flex-row items-center  pt-6 lg:justify-between w-full border-t border-white/30 text-extra-small">
        <div className="flex lg:hidden items-center justify-start gap-4">
          <ContactItem type="instagram" link={contactsData.social.instagram} />
          <ContactItem type="facebook" link={contactsData.social.facebook} />
        </div>
        <p>{footerData.copyright[locale]}</p>
        <div className="hidden lg:flex items-center justify-start gap-4">
          <ContactItem type="instagram" link={contactsData.social.instagram} />
          <ContactItem type="facebook" link={contactsData.social.facebook} />
        </div>
        <p>
          {dev.text.split("-")[0]}
          <Link
            href={dev.url}
            target="_blank"
            className="underline text-text-muted hover:text-primary-hover transition"
          >
            {dev.text.split("-")[1].trim()}
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
