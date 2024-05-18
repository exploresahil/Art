import React from "react";
import Button from "../../ui/Button/Button";
import "./style.scss";

const data = [{ title: "Previous" }, { title: "Upcoming" }];

interface CategoryProps {
  setSelectedCategory: (category: string) => void;
  loading: boolean;
  selectedCategory?: string;
}

const Category = ({ setSelectedCategory, selectedCategory }: CategoryProps) => {
  return (
    <div id="workshopCategory">
      <div className="title-container">
        <h2>Select Category</h2>
      </div>
      <div className="buttons-container">
        <div className="all-buttons">
          {data?.map((item, i) => (
            <Button
              key={i}
              className={selectedCategory === item.title ? "selected" : ""}
              onClick={() => {
                setSelectedCategory(item.title);
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
