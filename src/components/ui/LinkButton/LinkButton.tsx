import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import Link, { LinkProps } from "next/link";
import { ReactNode, MutableRefObject, CSSProperties } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  id?: string;
  ref?: MutableRefObject<HTMLAnchorElement | null>;
  title?: string;
}

const LinkButton = ({ children, ...props }: Props) => {
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
        : "#000000", // Example hover background color
    color: brand && brand.buttonHoverText ? brand.buttonHoverText : "#ffffff",
  };

  //*---> Mouse Enter

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = hoverStyles.backgroundColor || "#000000";
    target.style.color = hoverStyles.color || "#ffffff";
  };

  //*---> Mouse leave

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = baseStyles.backgroundColor || "#003ecb";
    target.style.color = baseStyles.color || "#f5f5f7";
  };

  return (
    <Link
      {...props}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
