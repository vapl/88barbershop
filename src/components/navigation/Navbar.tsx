"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import LanguageSwitcher from "../LanguageSwitcher";
import ContactItem from "../contacts/Contacts";
import { siteData } from "@/data/siteData";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(true);

  const locale = useLocale() as "lv" | "en" | "ru";
  const pathname = usePathname();

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY < lastScrollYRef.current);
      lastScrollYRef.current = window.scrollY;
    };
    const lastScrollYRef = { current: 0 };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Window width logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md transition-transform duration-300",
        showNav ? "translate-y-0" : "-translate-y-full"
      )}
      style={{ height: "80px" }}
    >
      <div className="mx-auto h-full flex items-center justify-between px-4 md:px-16 lg:px-32">
        {/* LOGO */}
        <Link href={"/"}>
          <Image
            src="/logo/logo_outline_gold.svg"
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
                className={`relative group text-foreground ${isActive && "text-primary"} hover:text-primary-hover transition`}
                onClick={() => setIsOpen(false)}
              >
                <motion.span
                  className="relative"
                  whileHover="hover"
                  whileTap="hover"
                  animate={isActive ? "hover" : "rest"}
                >
                  {item.label[locale]}
                  <motion.span
                    className="absolute left-0 -bottom-1 h-[2px] bg-primary"
                    variants={{
                      rest: { width: 0, opacity: 0 },
                      hover: { width: "100%", opacity: 1 },
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.span>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <ContactItem type="phone" value={siteData.contacts.phone.label} />
          <span className="hidden lg:block">|</span>
          <LanguageSwitcher className="hidden lg:block" />
        </div>
        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                className="fixed right-0 top-[80px] h-[calc(100vh-80px)] w-2/3 bg-black/90 backdrop-blur-md flex flex-col justify-between items-end px-4 pt-6 pb-16"
              >
                <div className="self-end">
                  <LanguageSwitcher />
                </div>
                <div className="flex flex-col items-end justify-center gap-10 uppercase text-h2">
                  {siteData.navigation.map((item) => {
                    const href = `/${locale}${item.href === "/" ? "" : item.href}`;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={item.href}
                        href={href}
                        className={`relative group text-foreground ${isActive && "text-primary"} hover:text-primary-hover transition`}
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.span
                          className="relative"
                          whileHover="hover"
                          whileTap="hover"
                          animate={isActive ? "hover" : "rest"}
                        >
                          {item.label[locale]}
                          <motion.span
                            className="absolute left-0 -bottom-1 h-[2px] bg-primary"
                            variants={{
                              rest: { width: 0, opacity: 0 },
                              hover: { width: "100%", opacity: 1 },
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          />
                        </motion.span>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end gap-4 w-full">
                  <ContactItem type="instagram" />
                  <ContactItem type="facebook" />
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
