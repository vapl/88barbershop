"use client";

import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../SectionHeading";

import Button from "../ui/Button";
import ReviewCard from "../cards/ReviewCard";
import { ReviewsSectionData } from "@/lib/types";

interface Props {
  reviewsSectionData: ReviewsSectionData;
  locale: "lv" | "en" | "ru";
}

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

type ReviewItem = {
  id: number;
  review: number;
  text: string;
  avatar?: string;
  author: string;
};

const ReviewsSection: React.FC<Props> = ({ reviewsSectionData, locale }) => {
  const [paused, setPaused] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/google-business-reviews?limit=10`);
        const data = await response.json();
        if (response.ok && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const mapped = data.reviews.map((r: ReviewItem, index: number) => ({
            ...r,
            id: index + 1,
          }));
          setReviews(mapped);
        }
      } catch {
        // Fallback to static reviews on failure
      }
    };
    fetchReviews();
  }, [locale]);

  const repeatedReviews = useMemo(() => [...reviews, ...reviews], [reviews]);

  return (
    <section className="relative flex flex-col gap-[95px] items-center w-full text-background py-[120px] bg-linear-to-br from-[#FFF9E9] via-[#FFF9E9]/80 to-[#E5DECE] overflow-hidden">
      <div className="flex px-4 md:px-16 lg:px-32">
        <SectionHeading title={reviewsSectionData.title[locale]} decoration color="black" />
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
          {repeatedReviews.map((r, i) => (
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
          {reviewsSectionData.ctaButton[locale]}
        </Button>
      </div>
    </section>
  );
};

export default ReviewsSection;
