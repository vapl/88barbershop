import React from "react";

import { HeroData } from "@/lib/types";

interface HeroProps {
  heroData: HeroData;
  locale: "lv" | "en" | "ru";
  titleOverride?: string;
  label?: string;
  badgeText?: string;
  backgroundImage?: string;
  overlayClassName?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  className?: string;
}

const HeroServices: React.FC<HeroProps> = ({
  heroData,
  locale,
  titleOverride,
  label,
  badgeText,
  backgroundImage,
  overlayClassName,
  backgroundSize,
  backgroundRepeat,
  className,
}) => {
  const title = titleOverride || heroData.hero_services[locale];
  const overlayClass = overlayClassName || "bg-black/35";
  const backgroundValue = backgroundImage?.includes("url(")
    ? backgroundImage
    : `url(${backgroundImage || "/images/bg-pattern-services.png"})`;

  return (
    <section
      className={`relative flex justify-center items-center h-[480px] w-full bg-background-alt px-4 md:px-16 lg:px-32 pt-20 ${className || ""}`}
      style={{
        backgroundImage: backgroundValue,
        backgroundRepeat: backgroundRepeat || "repeat",
        backgroundSize: backgroundSize || "220px auto",
      }}
    >
      {badgeText && (
        <div className="absolute right-6 top-6 z-20 rounded-xs border border-white/80 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white shadow-[0_0_20px_rgba(0,0,0,0.7)] backdrop-blur-[3px]">
          {badgeText}
        </div>
      )}
      <div className={`absolute inset-0 ${overlayClass}`} />

      <div className="flex flex-col items-center gap-3">
        {label && (
          <span className="text-sm text-primary uppercase tracking-[0.35em] text-shadow-lg">
            {label}
          </span>
        )}
        <h1 className="text-h2 md:text-h1 text-white font-heading uppercase text-shadow-black text-shadow-2xl text-center drop-shadow-[0_0_18px_rgba(0,0,0,0.6)]">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default HeroServices;
