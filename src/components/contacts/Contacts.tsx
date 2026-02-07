import React, { useRef, useState } from "react";
import { FaInstagram, FaFacebook, FaLocationDot, FaAt } from "react-icons/fa6";
import MapSelectModal from "../modals/MapSelectModal";
import PhoneSelectModal from "../modals/PhoneSelectModal";
import PhoneIcon from "@/icons/PhoneIcon";

type Props = {
  type: "phone" | "email" | "address" | "instagram" | "facebook";
  value?: string;
  valueVisible?: boolean;
  link?: string;
  className?: string;
  color?: "primary" | "dark" | string;
  iconSize?: number;
  locations?: Array<{
    id: "gertrudes34" | "akmenu16";
    label: string;
    phone?: { label?: string; link?: string };
    address?: { label?: string; link?: string };
  }>;
};

const ContactItem: React.FC<Props> = ({
  type,
  value,
  valueVisible = true,
  link,
  className,
  color = "primary",
  iconSize = 16,
  locations,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const colorClass =
    color === "dark"
      ? "fill-background text-background"
      : color === "primary"
        ? "fill-primary text-primary"
        : `fill-[${color}] text-[${color}]`;

  const icons = {
    phone: <PhoneIcon size={iconSize} className={`transition-all duration-200 ${colorClass}`} />,
    email: <FaAt size={iconSize} className={`transition-all duration-200 ${colorClass}`} />,
    address: (
      <FaLocationDot size={iconSize} className={`transition-all duration-200 ${colorClass}`} />
    ),
    instagram: <FaInstagram size={22} className={`transition-all duration-200 ${colorClass}`} />,
    facebook: <FaFacebook size={22} className={`transition-all duration-200 ${colorClass}`} />,
  };

  const icon = icons[type];
  const isSocial = type === "instagram" || type === "facebook";

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const canceledRef = useRef(false);

  const ua = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const locationOptions = locations || [];
  const hasLocations = locationOptions.length > 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (type === "address" && (value || hasLocations)) {
      if (hasLocations) {
        setIsModalOpen(true);
        return;
      }
      if (isIOS || isAndroid) {
        setIsModalOpen(true);
      } else {
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(value || "")}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } else if (type === "phone" && (link || hasLocations)) {
      setIsPhoneModalOpen(true);
    } else if (isSocial && link) {
      window.open(link, "_blank", "noopener, noreferrer");
    } else if (type === "email" && link) {
      window.location.href = link;
    }
  };

  const openApp = (service: "apple" | "google" | "waze", addressOverride?: string) => {
    canceledRef.current = false;
    const addressValue = addressOverride || value || "";
    const encoded = encodeURIComponent(addressValue);

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
      const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
      if (!isIOS && !isAndroid) {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      } else {
        const appUrl = isAndroid ? `geo:0,0?q=${encoded}` : `comgooglemaps://?daddr=${encoded}`;
        openUrl(appUrl);
        timeoutRef.current = setTimeout(() => {
          if (!canceledRef.current) {
            window.location.href = webUrl;
          }
        }, 1200);
      }
    } else if (service === "waze") {
      const webUrl = `https://www.waze.com/ul?q=${encoded}`;
      if (!isIOS && !isAndroid) {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      } else {
        const appUrl = `waze://?q=${encoded}&navigate=yes`;
        openUrl(appUrl);
        timeoutRef.current = setTimeout(() => {
          if (!canceledRef.current) {
            window.location.href = webUrl;
          }
        }, 1200);
      }
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

  const handlePhoneSelect = (action: "call" | "whatsapp", phoneOverride?: string) => {
    const number = (phoneOverride || link || "").toString();
    if (!number) return;
    const cleanNumber = number.replace(/[^\d]/g, "");

    if (action === "call") {
      window.location.href = `tel:${number}`;
    } else if (action === "whatsapp") {
      const appUrl = `whatsapp://send?phone=${cleanNumber}`;
      window.location.href = appUrl;
    }

    setIsPhoneModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center px-3 cursor-pointer ${color === "primary" ? "hover:text-primary" : "hover:text-background-alt"} transition-all active:scale-95 duration-200 ${className}`}
        onClick={handleClick}
      >
        <span
          className={`${color === "primary" ? "text-primary hover:text-primary-hover" : "text-background hover:text-background-alt "}`}
        >
          {icon}
        </span>
        {value && valueVisible && !isSocial && <span className="text-extra-small">{value}</span>}
      </div>

      <MapSelectModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSelect={openApp}
        isIOS={isIOS}
        value={value}
        locations={locationOptions}
      />
      <PhoneSelectModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSelect={handlePhoneSelect}
        phone={link || ""}
        locations={locationOptions}
      />
    </>
  );
};

export default ContactItem;
