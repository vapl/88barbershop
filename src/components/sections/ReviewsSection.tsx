"use client";

import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "../SectionHeading";
import Button from "../ui/Button";
import ReviewCard from "../cards/ReviewCard";
import { ReviewsSectionData } from "@/lib/types";
import StarIcon from "@/icons/star.svg";

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

type GoogleSummary = {
  rating: number | null;
  totalReviews: number | null;
};

const ReviewsSection: React.FC<Props> = ({ reviewsSectionData, locale }) => {
  const [paused, setPaused] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);
  const [summary, setSummary] = useState<GoogleSummary | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const businessResponse = await fetch("/api/google-business-reviews?limit=5");
        const businessData = await businessResponse.json();

        if (
          businessResponse.ok &&
          Array.isArray(businessData.reviews) &&
          businessData.reviews.length > 0
        ) {
          const mapped = businessData.reviews.map((r: ReviewItem, index: number) => ({
            ...r,
            id: index + 1,
          }));
          setReviews(mapped);
        }

        const googleResponse = await fetch(`/api/google-reviews?lang=${locale}&limit=5`);
        const googleData = await googleResponse.json();

        if (googleResponse.ok) {
          if (googleData.summary) {
            setSummary(googleData.summary as GoogleSummary);
          }

          if (
            (!businessResponse.ok ||
              !Array.isArray(businessData.reviews) ||
              businessData.reviews.length === 0) &&
            Array.isArray(googleData.reviews) &&
            googleData.reviews.length > 0
          ) {
            const mapped = googleData.reviews.map((r: ReviewItem, index: number) => ({
              ...r,
              id: index + 1,
            }));
            setReviews(mapped);
          }
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
        <div className="flex flex-col items-center gap-4">
          <SectionHeading title={reviewsSectionData.title[locale]} decoration color="black" />
        </div>
      </div>

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
        <div className="w-full flex justify-center pt-16">
          {summary && summary.rating !== null && summary.totalReviews !== null && (
            <div className="text-background text-lg md:text-xl flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Google</span>{" "}
                {summary.rating.toFixed(1).replace(".", ",")}
                <div className="flex flex-col items-end">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4" fill="#C5A85D" stroke="#C5A85D" />
                    ))}
                  </div>
                  <span className="text-sm p-0! text-text-muted">
                    {summary.totalReviews} reviews
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 px-4 md:px-16 lg:px-32">
        <Button
          outline
          type="button"
          variant="secondary"
          link="https://search.google.com/local/writereview?placeid=ChIJZ8ENsrXP7kYRFpM0KzA2ApU"
        >
          {reviewsSectionData.ctaButton[locale]}
        </Button>
        <Button
          outline
          type="button"
          variant="primary"
          link="https://search.google.com/local/reviews?placeid=ChIJZ8ENsrXP7kYRFpM0KzA2ApU"
        >
          {locale === "lv"
            ? "Skatīt visas atsauksmes"
            : locale === "ru"
              ? "Все отзывы"
              : "View all reviews"}
        </Button>
      </div>
    </section>
  );
};

export default ReviewsSection;
