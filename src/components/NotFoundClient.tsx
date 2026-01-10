"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

type Props = {
  locale: "lv" | "en" | "ru";
};

const NotFoundClient: React.FC<Props> = ({ locale }) => {
  const texts = {
    lv: {
      title: "Lapa nav atrasta",
      subtitle: "Izskatās, ka šī lapa neeksistē vai ir pārvietota.",
      button: "Atpakaļ uz sākumu",
    },
    en: {
      title: "Page Not Found",
      subtitle: "Looks like this page doesn’t exist or was moved.",
      button: "Back to Home",
    },
    ru: {
      title: "Страница не найдена",
      subtitle: "Похоже, эта страница не существует или была перемещена.",
      button: "На главную",
    },
  }[locale];

  return (
    <section className="flex flex-col items-center justify-center min-h-svh bg-background text-foreground text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6"
      >
        <h1 className="text-h1 text-primary font-heading">404</h1>
        <h2 className="text-h3 font-heading">{texts.title}</h2>
        <p className="max-w-[480px] text-body text-foreground-alt">{texts.subtitle}</p>
        <Link href={`/${locale}`}>
          <Button variant="primary">{texts.button}</Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFoundClient;
