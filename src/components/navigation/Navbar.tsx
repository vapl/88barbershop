"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import ContactItem from "../contacts/Contacts";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  const locale = useLocale() as "lv" | "en" | "ru";
  const pathname = usePathname();

  const isHome = pathname === `/${locale}`;

  // Window width logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    console.log("Is home? ", pathname);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) return;
      setShowNav(window.scrollY < lastScrollYRef.current || window.scrollY < 100);
      lastScrollYRef.current = window.scrollY;
    };
    const lastScrollYRef = { current: 0 };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 150);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-[background-color,backdrop-filter] duration-500 ease-in-out",
        isTransparent && isHome
          ? "bg-transparent"
          : "bg-black/80 backdrop-blur-md transition-transform duration-300",
        showNav ? "translate-y-0" : "-translate-y-full",
        isOpen && "translate-y-0 bg-transparent backdrop-blur-none"
        // !isHome && "bg-black/80 backdrop-blur-md"
      )}
      style={{ height: "80px" }}
    >
      <div className="mx-auto h-full flex items-center justify-between px-4 md:px-16 lg:px-32">
        {/* LOGO */}
        <Link href={"/"}>
          <Image
            src="/logo/logo-outline-gold.svg"
            alt="Logo 88barbershop"
            width={50}
            height={50}
            priority
          />
        </Link>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-body">
          {siteData.navigation.map((item) => {
            const href = `/${locale}${item.href === "/" ? "" : item.href}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.href}
                href={href}
                className={`relative group text-foreground ${isActive ? "text-primary cursor-default hover:text-primary" : "hover:text-primary-hover transition"}`}
                onClick={(e) => {
                  if (isActive) {
                    e.preventDefault();
                    return;
                  }
                  setIsOpen(false);
                }}
              >
                <motion.span
                  className="relative"
                  whileHover="hover"
                  whileTap="hover"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  animate={isActive ? "hover" : "rest"}
                >
                  {item.label[locale]}
                  <motion.span
                    className={`absolute ${isHovered ? "left-0" : "right-0"} -bottom-1 h-[2px] bg-primary`}
                    variants={{
                      rest: { width: 0 },
                      hover: { width: "100%" },
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.span>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {!isOpen && (
            <ContactItem
              type="phone"
              value={siteData.contacts.phone.label}
              link={siteData.contacts.phone.link}
            />
          )}
          <span className="hidden lg:block">|</span>
          <LanguageSwitcher className="hidden lg:block" />
        </div>
        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 flex flex-col justify-center gap-2 w-7 h-3 ${isOpen && "hover:rotate-180 transition-all duration-500"} cursor-pointer group`}
          >
            <span
              className={`h-[3px] w-full bg-white rounded transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[5px]" : "group-hover:translate-x-1"
              }`}
            ></span>
            <span
              className={`h-[3px] w-full bg-white rounded transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[5px]" : "group-hover:-translate-x-1"
              }`}
            ></span>
          </button>
        </div>
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="mobile-menu"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="fixed inset-y-0 right-0 top-0 h-[100dvh] pl-8 bg-black/80 backdrop-blur-md flex flex-col justify-between items-end px-4 md:px-16 lg:px-32 pt-6 pb-16"
              >
                <div className="flex self-end pt-[80px] items-center">
                  <ContactItem
                    type="phone"
                    value={siteData.contacts.phone.label}
                    link={siteData.contacts.phone.link}
                  />
                  <span>|</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex flex-col items-end justify-center gap-10 uppercase font-heading text-h3">
                  {siteData.navigation.map((item) => {
                    const href = `/${locale}${item.href === "/" ? "" : item.href}`;
                    const isActive = pathname === href;

                    return (
                      <Link
                        key={item.href}
                        href={href}
                        className={`relative group text-foreground ${isActive ? "text-primary cursor-default hover:text-primary" : "hover:text-primary-hover transition"}`}
                        onClick={(e) => {
                          if (isActive) {
                            e.preventDefault();
                            return;
                          }
                          setIsOpen(false);
                        }}
                      >
                        <motion.span
                          className="relative"
                          whileHover="hover"
                          whileTap="hover"
                          onHoverStart={() => setIsHovered(true)}
                          onHoverEnd={() => setIsHovered(false)}
                          animate={isActive ? "hover" : "rest"}
                        >
                          {item.label[locale]}
                          <motion.span
                            className={`absolute ${isHovered ? "right-0" : "left-0"} -bottom-1 h-[2px] bg-primary`}
                            variants={{
                              rest: { width: 0 },
                              hover: { width: "100%" },
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          />
                        </motion.span>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end gap-4 w-full">
                  <ContactItem type="instagram" link={siteData.contacts.social.instagram} />
                  <ContactItem type="facebook" link={siteData.contacts.social.facebook} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
