"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MobileCarousel({ IMAGES }: { IMAGES: { src: string }[] }) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      setIndex((i) => (i + 1) % IMAGES.length);
    } else {
      setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  // autoplay (apstājas, kad skar)
  useEffect(() => {
    if (isDragging || IMAGES.length === 0) return;
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [isDragging, IMAGES.length, index]);

  // Swipe detection
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (IMAGES.length === 0) return null;

  // Aprēķinām katra slide pozīciju
  const getSlidePosition = (slideIndex: number) => {
    const diff = (slideIndex - index + IMAGES.length) % IMAGES.length;

    if (diff === 0) {
      // Centrālais (aktīvais)
      return { x: "0%", scale: 1, opacity: 1, zIndex: 10 };
    } else if (diff === 1 || diff === -(IMAGES.length - 1)) {
      // Labais (nākamais)
      return { x: "65%", scale: 0.7, opacity: 0.5, zIndex: 5 };
    } else if (diff === IMAGES.length - 1 || diff === -1) {
      // Kreisais (iepriekšējais)
      return { x: "-65%", scale: 0.7, opacity: 0.5, zIndex: 5 };
    } else {
      // Pārējie (neredzami)
      return { x: "200%", scale: 0.5, opacity: 0, zIndex: 1 };
    }
  };

  return (
    <div
      className="relative w-full h-[390px] flex justify-center items-center overflow-visible md:hidden"
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {IMAGES.map((img, i) => {
        const position = getSlidePosition(i);

        return (
          <motion.div
            key={i}
            className="absolute w-[85%] h-[320px] rounded-sm overflow-hidden"
            animate={{
              x: position.x,
              scale: position.scale,
              opacity: position.opacity,
            }}
            style={{ zIndex: position.zIndex }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.4 },
            }}
            drag={position.zIndex === 10 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (position.zIndex !== 10) return;

              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1); // swipe pa kreisi = nākamā
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1); // swipe pa labi = iepriekšējā
              }
            }}
          >
            <Image
              src={img.src}
              alt={`Slide ${i}`}
              sizes="auto"
              fill
              className="object-cover rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        );
      })}

      {/* ———— Punkti ———— */}
      <div className="absolute bottom-1 flex gap-3 z-20">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-primary scale-110" : "bg-[#555] hover:bg-[#777]"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
