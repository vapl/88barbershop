"use client";

import React, { useState } from "react";
import Image from "next/image";
import ContactItem from "../contacts/Contacts";
import { motion } from "framer-motion";

type SocialLinks = {
  instagram?: string;
  facebook?: string;
};

type Props = {
  name: string;
  position: string;
  photo: string;
  alt: string;
  socialLinks?: SocialLinks;
};

const EmployeeCard: React.FC<Props> = ({ name, position, photo, alt, socialLinks }) => {
  const [showSocial, setShowSocial] = useState(false);
  const toggleSocial = () => {
    setShowSocial((prev) => !prev);
  };
  return (
    <div className="group flex w-full max-w-[380px] flex-row overflow-hidden md:h-[460px]">
      {/* === PHOTO BLOCK === */}
      <motion.div
        className="relative aspect-3/4 w-full overflow-hidden rounded-xs"
        initial="initial"
        whileHover="hover"
        onClick={toggleSocial}
      >
        <Image
          src={photo}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
        <motion.div
          className="absolute inset-0"
          variants={{
            hover: { backgroundColor: "rgba(0,0,0,0.6)" },
            initial: { backgroundColor: "rgba(0,0,0,0)" },
          }}
          animate={showSocial ? { backgroundColor: "rgba(0,0,0,0.6)" } : {}}
          transition={{ duration: 0.3 }}
        />
        {/* SOCIAL SECTION */}
        <motion.div
          variants={{
            initial: { y: "100%", opacity: 0 },
            hover: { y: "0%", opacity: 1 },
          }}
          animate={showSocial ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 flex gap-3 items-center justify-center bg-primary/10 backdrop-blur-sm h-[20%] w-full"
        >
          {socialLinks?.instagram && <ContactItem type="instagram" link={socialLinks.instagram} />}
          {socialLinks?.facebook && <ContactItem type="facebook" link={socialLinks.facebook} />}
        </motion.div>
      </motion.div>
      {/* === TEXT ON THE RIGHT === */}
      <motion.div
        className="mt-0 flex items-start justify-start gap-2 tracking-wide font-heading text-h3 text-primary uppercase [writing-mode:vertical-rl] text-nowrap md:items-start md:text-h3 text-h4"
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.3, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h3 className="">{name}</h3>
        <span className="opacity-60">|</span>
        <h4 className="text-body ">{position}</h4>
      </motion.div>
    </div>
  );
};

export default EmployeeCard;
