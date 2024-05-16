"use client";

import { useEffect, useState } from "react";
import Category from "./category/Category";
import { categoryType, productsType } from "@/sanity/types/allTypes";
import { getProductsByCategory } from "@/sanity/sanity-utils";
import AllProducts from "./allProducts/AllProducts";
import { useSearchParams } from "next/navigation";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import { useAppSelector } from "@/src/lib/hook";

const Products = () => {
  const [data, setData] = useState<categoryType[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<productsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const brand = useAppSelector(selectBrand);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getProductsByCategory();
      setData(response);
      setLoading(false);
    };
    fetchData();

    const categoryQuery = searchParams.get("category") || "";
    if (categoryQuery) setSelectedCategory(categoryQuery);

    //console.log("searchParams->", categoryQuery);
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
  //console.log("brand->", brand);

  return (
    <section
      id="shopProducts"
      style={{
        backgroundColor:
          brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
      }}
    >
      <Category
        data={data}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        loading={loading}
      />
      <AllProducts products={filteredProducts} loading={loading} />
    </section>
  );
};

export default Products;
