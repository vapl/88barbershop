import React from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  outline?: boolean;
  onClick?: () => void;
  link?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  outline = false,
  onClick,
  link,
  disabled = false,
  className,
  type = "button",
}) => {
  const baseClasses = clsx(
    "inline-block px-5 py-2 rounded-xs font-semibold transition-all duration-200 active:scale-95",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    {
      // PRIMARY
      "bg-primary text-gray-900 hover:bg-primary-hover":
        variant === "primary" && !outline && !disabled,
      "border-2 border-primary text-primary hover:bg-primary hover:text-black":
        variant === "primary" && outline && !disabled,

      // SECONDARY
      "bg-background text-primary hover:bg-secondary-accent":
        variant === "secondary" && !outline && !disabled,
      "border-2 border-background text-background hover:bg-background hover:text-primary":
        variant === "secondary" && outline && !disabled,
    },
    className
  );

  // 👉 ja padots "link", renderē <Link> (navigācija)
  if (link) {
    return (
      <Link href={link} className={baseClasses}>
        {children}
      </Link>
    );
  }

  // 👉 ja nav "link", renderē <button> (funkcionāla poga)
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
};

export default Button;
