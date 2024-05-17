import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({ children, onClick, className }: Props) => {
  const brand = useAppSelector(selectBrand);

  //*---> Base styles
  const baseStyles: CSSProperties = {
    backgroundColor:
      brand && brand.buttonBackground ? brand.buttonBackground : "#003ecb",
    color: brand && brand.buttonText ? brand.buttonText : "#f5f5f7",
    transition: "all 200ms ease-in-out",
  };

  //*---> Hover styles
  const hoverStyles: CSSProperties = {
    backgroundColor:
      brand && brand.buttonHoverBackground
        ? brand.buttonHoverBackground
        : "#000000",
    color: brand && brand.buttonHoverText ? brand.buttonHoverText : "#ffffff",
  };

  //*---> Mouse Enter

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = hoverStyles.backgroundColor || "#000000";
    target.style.color = hoverStyles.color || "#ffffff";
  };

  //*---> Mouse leave

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = baseStyles.backgroundColor || "#003ecb";
    target.style.color = baseStyles.color || "#f5f5f7";
  };

  return (
    <button
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
