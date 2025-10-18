"use client";

import React, { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import Button from "../ui/Button";
import ReviewCard from "../cards/ReviewCard";
import { motion, useAnimation } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    review: 5,
    text: "Viens no labākajiem barbershopiem Rīgā! Profesionāļi, kuri zina, kā strādāt ar dažāda veida matu struktūrām. Draudzīga un atsaucīga komanda, elastīgs darba laiks un ātrs serviss bez garām rindām. Iesaku!",
    avatar: "",
    author: "Valdis Vascenkovs",
  },
  {
    id: 2,
    review: 5,
    text: "Ļoti profesionāli meistari, atmosfēra super, un vienmēr precīzi ar laiku. 10/10.",
    avatar: "",
    author: "Jānis Kalniņš",
  },
  {
    id: 3,
    review: 4.5,
    text: "Patīkami pārsteigts par kvalitāti un servisu. Noteikti nākšu vēl!",
    avatar: "",
    author: "Mārtiņš Ozoliņš",
  },
];

const ReviewsSection = () => {
  const locale = useLocale() as "lv" | "en" | "ru";
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative flex flex-col gap-[95px] items-center w-full text-background py-[120px] bg-gradient-to-br from-[#FFF9E9] via-[#FFF9E9]/80 to-[#E5DECE] overflow-hidden">
      <div className="flex px-4 md:px-16 lg:px-32">
        <SectionHeading title={siteData.reviews.title[locale]} decoration color="black" />
      </div>

      {/* Slided container */}
      <div
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex w-max animate-infinite-scroll"
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div key={i} className="mr-8 flex">
              <ReviewCard {...r} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex px-4 md:px-16 lg:px-32">
        <Button
          outline
          type="button"
          variant="secondary"
          link="https://search.google.com/local/writereview?placeid=ChIJZ8ENsrXP7kYRFpM0KzA2ApU"
        >
          {siteData.reviews.ctaButton[locale]}
        </Button>
      </div>
    </section>
  );
};

export default ReviewsSection;
