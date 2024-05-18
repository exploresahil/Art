"use client";

import { getWorkshopBySlug } from "@/sanity/sanity-utils";
import { workshopType } from "@/sanity/types/allTypes";
import Description from "@/src/components/workshops/workshop/description/Description";
import Hero from "@/src/components/workshops/workshop/hero/Hero";
import { useEffect, useState } from "react";

type Props = {
  params: { workshop: string };
};

const page = ({ params }: Props) => {
  const [data, setData] = useState<workshopType>();
  const slug = params.workshop;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getWorkshopBySlug(slug);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  //console.log("data->", data);

  return (
    <>
      <Hero data={data} />
      <Description data={data} />
    </>
  );
};

export default page;
