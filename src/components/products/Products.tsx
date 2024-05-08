"use client";

import { useEffect, useState } from "react";
import Category from "./category/Category";
import { categoryType, productsType } from "@/sanity/types/allTypes";
import { getProductsByCategory } from "@/sanity/sanity-utils";
import AllProducts from "./allProducts/AllProducts";

const Products = () => {
  const [data, setData] = useState<categoryType[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<productsType[]>([]);

  const fetchData = async () => {
    const response = await getProductsByCategory();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && selectedCategory !== "All") {
      const selectedCategoryData = data.find(
        (item) => item.title === selectedCategory
      );
      if (selectedCategoryData) {
        setFilteredProducts(selectedCategoryData.products);
      }
    } else if (data) {
      const allProducts: productsType[] = [];
      data.forEach((category) => {
        category.products.forEach((product) => {
          allProducts.push(product);
        });
      });
      setFilteredProducts(allProducts);
    }
  }, [data, selectedCategory]);

  //console.log("data->", data);
  //console.log("selectedCategory->", selectedCategory);

  return (
    <section id="shopProducts">
      <Category data={data} setSelectedCategory={setSelectedCategory} />
      <AllProducts products={filteredProducts} />
    </section>
  );
};

export default Products;
