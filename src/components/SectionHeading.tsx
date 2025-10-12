import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  color?: "gold" | "black" | "white";
  decoration?: boolean;
};

const SectionHeading: React.FC<Props> = ({ title, subtitle, color = "gold", decoration }) => {
  const colorClass =
    color === "gold" ? "primary" : color === "black" ? "bacground-alt" : "foreground";

  return (
    <div className={`flex flex-col gap-2 text-${colorClass} items-center`}>
      <motion.div
        className="flex gap-4 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {decoration && (
          <span className="h-full">
            <Image
              src="/icons/decoration-icon.svg"
              alt="Decoration icon"
              width={60}
              height={6}
              className="h-auto w-[40px] md:w-[60px]"
            />
          </span>
        )}
        <h1 className="text-h2 md:text-h1 font-heading h-full uppercase">{title}</h1>
        {decoration && (
          <span className="h-full rotate-180">
            <Image
              src="/icons/decoration-icon.svg"
              alt="Decoration icon"
              width={60}
              height={6}
              className="h-auto w-[40px] md:w-[60px]"
            />
          </span>
        )}
      </motion.div>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.3, 1], delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h3 className="text-body md:text-h3 font-heading text-foreground text-center">
            {subtitle}
          </motion.h3>
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeading;
