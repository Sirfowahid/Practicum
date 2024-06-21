import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}
const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: Props) => {
  const buttonStyle = "font-bold rounded focus:outline-none focus:ring";
  const variantStyle = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  const disabledStyle = disabled ? "bg-gray-400 cursor-not-allowed" : "";
  const combinedStyle = `${buttonStyle} ${variantStyle[variant]} ${disabledStyle}`;
  return (
    <button className={combinedStyle} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
