"use client";

import MobileCaurusel from "./MobileCarousel";
import DesktopCarousel from "./DesktopCarousel";
import { Image } from "@/lib/types";
import { urlFor } from "@/lib/sanityClient";

interface Props {
  images: Image[];
}

type ImageType = {
  src: string;
  alt?: string;
};

const ImagesCarousel: React.FC<Props> = ({ images }) => {
  const formattedImages: ImageType[] = (images || []).map((image) => ({
    src: urlFor(image).url(),
    alt: image.alt || "88 Barber Shop galery image",
  }));

  return (
    <section className="relative w-full overflow-hidden">
      {formattedImages.length > 0 ? (
        <>
          {/* ======= DESKTOP (multiple in one line) ======= */}
          <DesktopCarousel IMAGES={formattedImages} />

          {/* ======= MOBILE (coverflow effect) ======= */}
          <MobileCaurusel IMAGES={formattedImages} />
        </>
      ) : (
        <div className="flex justify-center items-center h-[400px] text-gray-400">
          Loading images...
        </div>
      )}
    </section>
  );
};

export default ImagesCarousel;
