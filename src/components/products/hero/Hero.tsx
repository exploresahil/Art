"use client";

import Image from "next/image";
import "./style.scss";
import ImageSize from "@/utils/image-utils";
import { useEffect, useState } from "react";
import { heroType } from "@/sanity/types/allTypes";
import { getHero } from "@/sanity/sanity-utils";

const Hero = () => {
  const [data, setData] = useState<heroType>();

  //*----------> Data Fetching

  const fetchData = async () => {
    const response = await getHero();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //console.log("heroData->", data);

  return (
    <section id="productHero">
      {data?.imageShop && (
        <Image
          src={data?.imageShop}
          alt=""
          fill
          sizes={ImageSize.bannerSizes}
        />
      )}
      <div className="title-container">
        <h1>{data?.headlineShop}</h1>
        <p>{data?.subHeadlineShop}</p>
      </div>
    </section>
  );
};

export default Hero;
