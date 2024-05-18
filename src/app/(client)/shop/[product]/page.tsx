"use client";

import { getProductsBySlug } from "@/sanity/sanity-utils";
import { productsType } from "@/sanity/types/allTypes";
import Description from "@/src/components/products/product/description/Description";
import ProductHero from "@/src/components/products/product/hero/ProductHero";
import Randum from "@/src/components/products/randum/Randum";
import { useEffect, useState } from "react";

type Props = {
  params: { product: string };
};

const page = ({ params }: Props) => {
  const [data, setData] = useState<productsType>();
  const slug = params.product;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductsBySlug(slug);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  console.log("-->", data);

  return (
    <>
      <ProductHero data={data} />
      <Description data={data} />
      <Randum />
    </>
  );
};

export default page;
