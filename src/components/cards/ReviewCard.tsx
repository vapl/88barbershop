import React from "react";
import StarIcon from "@/icons/star.svg";
import QuoteIcon from "@/icons/quote.svg";
import Image from "next/image";

type Props = {
  review: number;
  text: string;
  avatar?: string;
  author: string;
};

const ReviewCard: React.FC<Props> = ({ review, text, avatar, author }) => {
  return (
    <div className="relative flex flex-col gap-12 w-[320px] md:w-[620px] p-6 px-10 items-start justify-between bg-background-alt rounded-sm text-foreground shadow-black shadow-md overflow-hidden">
      {/* Quote decoration bg */}
      <QuoteIcon className="absolute -right-9 md:right-0 top-0 h-[60%] md:h-[95%]" />
      {/* Stars */}
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => {
          const isFull = i + 1 <= review;
          const isHalf = !isFull && i < review && review < i + 1;
          return (
            <div key={i} className="relative h-6 w-6">
              <StarIcon className="absolute inset-0" fill="none" stroke="#C5A85D" />
              {isFull && <StarIcon className="absolute inset-0" fill="#C5A85D" stroke="#C5A85D" />}
              {isHalf && (
                <StarIcon className="absolute inset-0" fill="url(#halfGradient)" stroke="#C5A85D" />
              )}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="halfGradient" x1="0" x2="100%" y1="0" y2="0">
                    <stop offset="50%" stopColor="#C5A85D" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          );
        })}
      </div>
      {/* Review */}
      <p>{text}</p>
      {/* Author */}
      <div className="flex gap-2 items-center text-small">
        {avatar ? (
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image
              src={avatar}
              alt={author}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-9 w-9 rounded-full bg-text-muted" />
        )}
        <span>{author}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
