"use client";

import Image from "next/image";
import "./style.scss";
import ImageSize from "@/utils/image-utils";
import { useEffect, useState } from "react";
import { muralHomeType } from "@/sanity/types/allTypes";
import { getMuralHome } from "@/sanity/sanity-utils";
import LinkButton from "../../ui/LinkButton/LinkButton";

const Murals = () => {
  const [data, setData] = useState<muralHomeType>();

  useEffect(() => {
    const getMural = async () => {
      const response = await getMuralHome();
      setData(response);
    };
    getMural();
    return () => {};
  }, []);

  console.log("mural->", data);

  return (
    data && (
      <section id="murals">
        <Image src={data?.image} alt="" fill sizes={ImageSize.bannerSizes} />
        <div className="text-container">
          <h2>{data.title}</h2>
          <LinkButton id="muralMore" href={data.slug} title="Murals">
            See More
          </LinkButton>
        </div>
      </section>
    )
  );
};

export default Murals;
