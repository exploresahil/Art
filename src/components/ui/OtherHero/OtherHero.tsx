"use client";
import Image from "next/image";
import "./style.scss";
import { heroType } from "@/sanity/types/allTypes";
import { useEffect, useState } from "react";
import ImageSize from "@/src/utils/image-utils";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";

interface Props {
  data?: heroType;
  names?: {
    loadingName: string;
    image: string;
    headline: string;
    subHeadline: string;
  };
}

const OtherHero = ({ data, names }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const brand = useAppSelector(selectBrand);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section
        id="otherHero"
        style={{
          backgroundColor:
            brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
        }}
      >
        <div className="hero-container heroLoading">
          <div className="title-container">
            <h1>
              <div className="title-container">
                <h1>{names?.loadingName}</h1>
                <p>Loading...</p>
              </div>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="otherHero"
      style={{
        backgroundColor:
          brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
      }}
    >
      <div className="hero-container">
        {data && names && (
          <Image src={names.image} alt="" fill sizes={ImageSize.bannerSizes} />
        )}
        <div className="title-container">
          <h1>{names?.headline}</h1>
          <p>{names?.subHeadline}</p>
        </div>
      </div>
    </section>
  );
};

export default OtherHero;
