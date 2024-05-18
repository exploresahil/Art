import React from "react";
import Button from "../../ui/Button/Button";
import "./style.scss";

const data = [{ title: "Previous" }, { title: "Upcoming" }];

interface CategoryProps {
  setSelectedCategory: (category: string) => void;
  loading: boolean;
  selectedCategory?: string;
}

const Category = ({
  setSelectedCategory,
  selectedCategory,
  loading,
}: CategoryProps) => {
  return (
    <div id="workshopCategory">
      <div className="title-container">
        <h2>Select Category</h2>
      </div>
      <div className="buttons-container">
        <div className="all-buttons">
          {loading ? (
            <Button className="loadingBtn">Loading...</Button>
          ) : (
            <>
              {data?.map((item, i) => (
                <Button
                  key={i}
                  onClick={() => setSelectedCategory(item.title)}
                  className={selectedCategory === item.title ? "selected" : ""}
                >
                  {item.title}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
