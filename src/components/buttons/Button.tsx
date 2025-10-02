import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  outline?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  outline = false,
  onClick,
  disabled = false,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "px-5 py-2 rounded-xs font-semibold transition-all duration-200 cursor-pointer",
        "active:scale-95",
        {
          // PRIMARY
          "bg-primary text-gray-900 hover:bg-primary-hover":
            variant === "primary" && !outline && !disabled,
          "border-2 border-primary text-primary hover:bg-primary hover:text-black":
            variant === "primary" && outline && !disabled,

          // SECONDARY
          "bg-black text-primary hover:bg-secondary-accent":
            variant === "secondary" && !outline && !disabled,
          "border-2 border-black text-black hover:bg-black hover:text-primary":
            variant === "secondary" && outline && !disabled,

          // Disabled
          "opacity-40 cursor-not-allowed": disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
