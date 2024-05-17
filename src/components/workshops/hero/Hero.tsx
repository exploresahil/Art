"use client";

import React, { useEffect, useState } from "react";
import OtherHero from "../../ui/OtherHero/OtherHero";
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

  console.log("heroData->", data);

  const names = {
    loadingName: "Workshop",
    image: `${data?.imageWorkshop}`,
    headline: `${data?.nameWorkshop}`,
    subHeadline: `${data?.subHeadlineWorkshop}`,
  };

  //console.log("names->", names);
  return (
    <>
      <OtherHero data={data} names={names} />
    </>
  );
};

export default Hero;
