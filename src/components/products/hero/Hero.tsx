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

  return (
    <>
      <OtherHero data={data} />
    </>
  );
};

export default Hero;
