"use client";

import React, { useState } from "react";
import Category from "../category/Category";

const AllWorkshop = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Upcoming");

  //console.log("selectedCategory->", selectedCategory);

  return (
    <>
      <Category setSelectedCategory={setSelectedCategory} loading={loading} />
    </>
  );
};

export default AllWorkshop;
