"use client";

import React, { Suspense, useEffect, useState } from "react";
import Category from "../category/Category";
import WorkshopsByCategory from "../workshopByCategory/WorkshopsByCategory";
import { workshopType } from "@/sanity/types/allTypes";
import { getWorkshops } from "@/sanity/sanity-utils";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";

const AllWorkshopContect = () => {
  const [data, setData] = useState<workshopType[]>();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Upcoming");

  const [filteredWorkshops, setFilteredWorkshops] = useState<workshopType[]>(
    []
  );

  const brand = useAppSelector(selectBrand);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getWorkshops();
      setData(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const filterWorkshops = () => {
        const now = new Date();
        if (selectedCategory === "Upcoming") {
          return data.filter((workshop) => new Date(workshop.dateTime) > now);
        } else if (selectedCategory === "Previous") {
          return data.filter((workshop) => new Date(workshop.dateTime) <= now);
        } else {
          return data;
        }
      };
      setFilteredWorkshops(filterWorkshops());
    }
  }, [selectedCategory, data]);

  //console.log("data->", data);

  //console.log("selectedCategory->", selectedCategory);

  return (
    <section
      style={{
        backgroundColor:
          brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
      }}
    >
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        loading={loading}
      />
      <WorkshopsByCategory products={filteredWorkshops} loading={loading} />
    </section>
  );
};

const AllWorkshop = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AllWorkshopContect />
    </Suspense>
  );
};

export default AllWorkshop;
