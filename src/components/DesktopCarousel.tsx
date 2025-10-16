"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Img = { src: string; alt?: string };

export default function DesktopCarousel({ IMAGES }: { IMAGES: Img[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const VISIBLE_CARDS = IMAGES.length; // Cik kartes redzamas vienlaikus
  const CARD_WIDTH = 350;

  // autoplay
  useEffect(() => {
    if (IMAGES.length === 0 || isHovered) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [IMAGES.length, isHovered]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setIndex((i) => (i + 1) % IMAGES.length);
    } else {
      setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  if (IMAGES.length === 0) return null;

  // Iegūstam redzamās kartes (current + nākamās)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      const cardIndex = (index + i) % IMAGES.length;
      cards.push({
        ...IMAGES[cardIndex],
        displayIndex: cardIndex,
        position: i,
      });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div
      className="hidden md:flex w-full h-[500px] overflow-hidden relative items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative flex gap-0"
        style={{ width: CARD_WIDTH * VISIBLE_CARDS, height: 420 }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {visibleCards.map((card, i) => (
            <motion.div
              key={`${index}-${i}`}
              custom={direction}
              initial={{ x: direction > 0 ? CARD_WIDTH : -CARD_WIDTH, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -CARD_WIDTH : CARD_WIDTH, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute"
              style={{ left: i * CARD_WIDTH }}
            >
              <div className="relative w-[350px] h-[420px] overflow-hidden shadow-lg">
                <Image
                  src={card.src}
                  alt={card.alt ?? `Image ${card.displayIndex}`}
                  sizes="auto"
                  fill
                  //   priority={i === 0}
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bultiņas */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-6 z-10 bg-black/40 hover:bg-black/70 text-primary p-3 rounded-full transition cursor-pointer"
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-6 z-10 bg-black/40 hover:bg-black/70 text-primary p-3 rounded-full transition cursor-pointer"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Punkti */}
      <div className="absolute bottom-3 flex gap-2 z-10">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              i === index ? "bg-[#d1b26e] scale-110" : "bg-gray-500/60 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
