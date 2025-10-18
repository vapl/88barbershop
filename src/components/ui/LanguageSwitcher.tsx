"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LANGS = [
  { code: "lv", flag: "fi fi-lv", label: "LV" },
  { code: "en", flag: "fi fi-gb", label: "EN" },
  { code: "ru", flag: "fi fi-ru", label: "RU" },
];

type Props = {
  className?: string;
};

const LanguageSwitcher: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[0];

  const handleChange = (locale: string) => {
    setOpen(false);
    router.replace(pathname, { locale, scroll: false });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1 rounded-xs focus:bg-foreground/10 hover:bg-foreground/10 transition-all"
      >
        <span style={{ height: 20 }}></span>
        <span className="text-sm font-medium uppercase">{current.code}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-19 bg-background-alt/80 border border-foreground/20 rounded-xs shadow-md z-50">
          {LANGS.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => handleChange(code)}
              className={`flex items-center px-3 py-1 justify-center w-full text-sm uppercase hover:bg-foreground/10 ${
                code === locale
                  ? "text-foreground/40 font-semibold hover:bg-transparent"
                  : "text-foreground cursor-pointer"
              }`}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
