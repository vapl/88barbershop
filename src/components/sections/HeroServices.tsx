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
  backgroundPosition,
}) => {
  const title = titleOverride || heroData.hero_services[locale];
  const overlayClass = overlayClassName || "bg-black/35";
  const backgroundValue = backgroundImage?.includes("url(")
    ? backgroundImage
    : `url(${backgroundImage || "/images/bg-pattern-services.png"})`;

  return (
    <section
      className="relative flex justify-center items-center h-[480px] w-full bg-background-alt px-4 md:px-16 lg:px-32 pt-20"
      style={{
        backgroundImage: backgroundValue,
        backgroundRepeat: backgroundRepeat || "repeat",
        backgroundSize: backgroundSize || "220px auto",
        backgroundPosition: backgroundPosition || "center",
      }}
    >
      {badgeText && (
        <div className="absolute right-6 top-6 z-20 rounded-xs border border-primary/70 bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
          {badgeText}
        </div>
      )}
      <div className={`absolute inset-0 ${overlayClass}`} />

      <div className="flex flex-col items-center gap-3">
        {label && <span className="text-xs text-primary uppercase tracking-[0.3em]">{label}</span>}
        <h1 className="text-h2 md:text-h1 text-white font-heading uppercase text-shadow-black/95 text-shadow-xl text-center">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default HeroServices;
