import React from "react";
import { FaInstagram, FaFacebook, FaPhone, FaLocationDot, FaAt } from "react-icons/fa6";

type Props = {
  type: "phone" | "email" | "address" | "instagram" | "facebook";
  value?: string;
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
      size={18}
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
  const icon = icons[type];
  const isSocial = type === "instagram" || type === "facebook";

  return (
    <div className={`flex gap-2 items-center px-3 cursor-pointer ${className}`}>
      {link ? (
        <a href={link} target={isSocial ? "_blank" : "_self"} className="flex items-center gap-2">
          {icon}
          {!isSocial && <span className="text-extra-small">{value}</span>}
        </a>
      ) : (
        <>
          {icon}
          <span className="text-extra-small">{value}</span>
        </>
      )}
    </div>
  );
};

export default ContactItem;
