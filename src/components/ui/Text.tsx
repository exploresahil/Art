import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const Text = ({ children }: props) => {
  const brand = useAppSelector(selectBrand);
  //console.log("brand", brand);
  return (
    <div
      style={{
        color: brand && brand.primaryText ? brand.primaryText : "#1d1d1f",
      }}
      id="text"
    >
      {children}
    </div>
  );
};

export default Text;
