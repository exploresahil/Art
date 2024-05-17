"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../ui/Product-card/ProductCard";
import "./style.scss";
import { productsType } from "@/sanity/types/allTypes";
import { getProducts } from "@/sanity/sanity-utils";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";

const Randum = () => {
  const [data, setData] = useState<productsType[]>();
  const brand = useAppSelector(selectBrand);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setData(response.sort(() => 0.5 - Math.random()).slice(0, 3));
    };
    fetchData();
  }, []);

  return (
    <section
      id="randumProducts"
      style={{
        backgroundColor:
          brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
      }}
    >
      <h2>Products you may like:</h2>
      <div className="products-cont">
        {data && data.map((item, i) => <ProductCard key={i} item={item} />)}
      </div>
    </section>
  );
};

export default Randum;
