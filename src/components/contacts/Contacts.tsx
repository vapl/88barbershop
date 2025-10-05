import React, { useRef, useState } from "react";
import { FaInstagram, FaFacebook, FaPhone, FaLocationDot, FaAt } from "react-icons/fa6";
import MapSelectModal from "../modals/MapSelectModal";

type Props = {
  type: "phone" | "email" | "address" | "instagram" | "facebook";
  value?: string | any;
  link?: string;
  className?: string;
};

const icons = {
  phone: (
    <FaPhone
      size={16}
      className="text-primary hover:text-primary-hover transition-all duration-200"
    />
  ),
  email: (
    <FaAt size={16} className="text-primary hover:text-primary-hover transition-all duration-200" />
  ),
  address: (
    <FaLocationDot
      size={16}
      className="text-primary hover:text-primary-hover transition-all duration-200"
    />
  ),
  instagram: (
    <FaInstagram
      size={22}
      className="text-primary hover:text-primary-hover transition-all duration-200"
    />
  ),
  facebook: (
    <FaFacebook
      size={22}
      className="text-primary hover:text-primary-hover transition-all duration-200"
    />
  ),
};

const ContactItem: React.FC<Props> = ({ type, value, link, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const icon = icons[type];
  const isSocial = type === "instagram" || type === "facebook";

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const canceledRef = useRef(false);

  const ua = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const encoded = encodeURIComponent(value);

  const handleClick = (e: any) => {
    e.preventDefault();

    if (type === "address" && value) {
      if (isIOS || isAndroid) {
        setIsModalOpen(true);
      } else {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } else if (link) {
      window.open(link, isSocial ? "_blank" : "_self", "noopener, noreferrer");
    }
  };

  const openApp = (service: "apple" | "google" | "waze") => {
    canceledRef.current = false;

    const clear = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const openUrl = (url: string) => {
      clear();
      window.location.href = url;
    };

    if (service === "apple") {
      openUrl(`https://maps.apple.com/?daddr=${encoded}`);
    } else if (service === "google") {
      const appUrl = isAndroid ? `geo:0,0?q=${encoded}` : `comgooglemaps://?daddr=${encoded}`;
      const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;

      openUrl(appUrl);

      timeoutRef.current = setTimeout(() => {
        if (!canceledRef.current && !isModalOpen) {
          window.location.href = webUrl;
        }
      }, 1200);
    } else if (service === "waze") {
      const appUrl = `waze://?q=${encoded}&navigate=yes`;
      const webUrl = `https://www.waze.com/ul?q=${encoded}`;

      openUrl(appUrl);

      timeoutRef.current = setTimeout(() => {
        if (!canceledRef.current && !isModalOpen) {
          window.location.href = webUrl;
        }
      }, 1200);
    }

    setIsModalOpen(false);
  };

  const handleClose = () => {
    canceledRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center px-3 cursor-pointer hover:text-primary transition-all ${className}`}
        onClick={handleClick}
      >
        {icon}
        {value && !isSocial && <span className="text-extra-small">{value}</span>}
      </div>

      <MapSelectModal isOpen={isModalOpen} onclose={handleClose} onSelect={openApp} isIOS={isIOS} />
    </>
  );
};

export default ContactItem;
