import React from "react";
import EmployeeCard from "../cards/EmployeeCard";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import SectionHeading from "../SectionHeading";

const TeamSection = () => {
  const locale = useLocale() as "lv" | "en" | "ru";
  return (
    <div className="bg-background grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center-safe px-4 md:px-16 lg:px-32 py-[80px]">
      <SectionHeading title={siteData.pages.about_page.heading_team[locale]} />
      <div className="mb-12 md:hidden" />
      {siteData.general.barbers.map((barber) => (
        <EmployeeCard
          key={barber.name.en}
          name={barber.name[locale]}
          position={barber.position[locale]}
          photo={`/images/team/${barber.name.en}.png`}
          alt="Barber image"
          socialLinks={barber.social}
        />
      ))}
    </div>
  );
};

export default TeamSection;
