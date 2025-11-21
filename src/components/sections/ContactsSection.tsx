"use client";

import React, { useEffect, useState } from "react";
import ContactItem from "../contacts/Contacts";
import InputForm from "../contacts/InputForm";
import { WorkingTimeData, ContactsData, ContactFormData, ErrorsData } from "@/lib/types";

interface Props {
  workingTime: WorkingTimeData;
  contacts: ContactsData;
  contactsFormData: ContactFormData;
  errorsData: ErrorsData;
  locale: "lv" | "en" | "ru";
}

const Contacts: React.FC<Props> = ({
  workingTime,
  contacts,
  contactsFormData,
  errorsData,
  locale,
}) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 560);
    checkWidth();

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const shortenDays = (text: string) => {
    const days = text.split(" ").filter((m) => m !== "-" && m.trim() !== "");
    const [first, second] = days;

    const map: Record<"lv" | "en" | "ru", Record<string, string>> = {
      lv: {
        Pirmdiena: "Pr",
        Sestdiena: "Se",
        Svētdiena: "Sv",
      },
      en: {
        Monday: "Mon",
        Saturday: "Sat",
        Sunday: "Sun",
      },
      ru: {
        Понедельник: "Пн",
        Суббота: "Сб",
        Воскресенье: "Вс",
      },
    };
    const short1 = map[locale][first] ?? first;
    const short2 = map[locale][second] ?? second;
    if (first && second) {
      return `${short1} - ${short2}`;
    } else {
      return `${short1}`;
    }
  };

  return (
    <section className="flex gap-[56px] flex-col flex-wrap items-center w-full bg-primary text-background px-4 md:px-16 lg:px-32 py-20">
      {/* WORKING */}
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start">
          <span className="uppercase text-h2 md:text-h1 font-heading">
            {isMobile
              ? shortenDays(workingTime.days.working_days[locale])
              : workingTime.days.working_days[locale]}
          </span>
          <span className="text-h3 md:text-h2 font-heading">{workingTime.hours.working_hours}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="uppercase text-h2 md:text-h1 font-heading">
            {shortenDays(workingTime.days.closed_days[locale])}
          </span>
          <span className="text-h3 md:text-h2 font-heading">
            {workingTime.hours.closed_hours[locale]}
          </span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full border-t-1 border-t-background-alt/80" />
        {/* CONTACT LINKS */}
        <div className="md:flex lg:flex gap-6 py-4 justify-between w-full">
          <ContactItem
            className="hover:underline whitespace-nowrap"
            type="phone"
            value={contacts.phone.label}
            link={contacts.phone.link}
            color="dark"
          />
          <ContactItem
            className="hover:underline"
            type="email"
            value={contacts.email.label}
            link={contacts.email.link}
            color="dark"
          />
          <ContactItem
            className="hover:underline"
            type="address"
            value={contacts.address.label}
            link={contacts.address.link}
            color="dark"
          />
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="flex w-full sm:max-w-xl">
        <InputForm contactsFormData={contactsFormData} errorsData={errorsData} locale={locale} />
      </div>
    </section>
  );
};

export default Contacts;
