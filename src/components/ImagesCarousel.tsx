"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MobileCaurusel from "./MobileCarousel";
import DesktopCarousel from "./DesktopCarousel";

type ImageType = {
  src: string;
  alt?: string;
};

export default function BarberCarousel() {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/carousel");
      const data = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {images.length > 0 ? (
        <>
          {/* ======= DESKTOP (vairākas rindā, step-by-step) ======= */}
          <DesktopCarousel IMAGES={images} />

          {/* ======= MOBILE (coverflow efekts) ======= */}
          <MobileCaurusel IMAGES={images} />
        </>
      ) : (
        <div className="flex justify-center items-center h-[400px] text-gray-400">
          Loading images...
        </div>
      )}
    </section>
  );
}
