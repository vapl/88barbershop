"use client";

import React from "react";
import EmployeeCard from "../cards/EmployeeCard";

import SectionHeading from "../SectionHeading";
import { urlFor } from "@/lib/sanityClient";
import { Barber, LocaleString } from "@/lib/types";

interface TeamSectionProps {
  heading: LocaleString;
  barbers: Barber[];
  locale: "lv" | "en" | "ru";
}

const TeamSection: React.FC<TeamSectionProps> = ({ heading, barbers, locale }) => {
  const sortedBarbers = [...barbers].sort((a, b) => {
    const positionA = a.position.en.trim().toLocaleLowerCase();
    const positionB = b.position.en.trim().toLocaleUpperCase();

    if (positionA.includes("owner")) return -1;
    if (positionB.includes("owner")) return 1;
    return 0;
  });

  return (
    <div className="bg-background grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 md:justify-normal xl:justify-normal px-4 md:px-16 lg:px-32 py-[80px]">
      <SectionHeading title={heading[locale]} />
      <div className="mb-12 md:hidden" />
      {sortedBarbers.map((barber) => (
        <div key={barber.name.en} className="flex justify-center">
          <EmployeeCard
            key={barber._id}
            name={barber.name[locale]}
            position={barber.position[locale]}
            photo={
              barber.image ? urlFor(barber.image).url() : "/images/team/default-placeholder.png"
            }
            alt={barber.name.en}
            socialLinks={barber.social}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamSection;
