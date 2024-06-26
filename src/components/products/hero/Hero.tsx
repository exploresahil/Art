"use client";

import { useEffect, useState } from "react";
import { heroType } from "@/sanity/types/allTypes";
import { getHero } from "@/sanity/sanity-utils";
import OtherHero from "../../ui/OtherHero/OtherHero";

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

  const names = {
    loadingName: "Shop",
    image: `${data?.imageShop}`,
    headline: `${data?.nameShop}`,
    subHeadline: `${data?.subHeadlineShop}`,
  };

  //console.log("names->", names);

  return (
    <>
      <OtherHero data={data} names={names} />
    </>
  );
};

export default Hero;
