"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const t = useTranslations("links");

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/contact", label: t("contact") },
  ];

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false); // scroll down -> hide
      } else {
        setShowNav(true); // scroll up -> show
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Window width logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      if (width > 760) {
        setIsOpen(false);
      }
    };

    handleResize();

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
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-32">
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
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition"
            >
              {link.label}
            </Link>
          ))}
          <button className="text-sm flex items-center gap-1">ENG ▼</button>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed right-0 top-[80px] h-lvh w-2/3 bg-black/90 backdrop-blur-md flex flex-col items-end justify-center gap-10 uppercase text-h2 px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-6 mt-12">
              <button>ENG ▼</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
