import { categoryType } from "@/sanity/types/allTypes";
import "./style.scss";
import Button from "../../ui/Button/Button";

interface CategoryProps {
  data: categoryType[] | undefined;
  setSelectedCategory: (category: string) => void;
}

const Category = ({ data, setSelectedCategory }: CategoryProps) => {
  //console.log("category->", data);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div id="category">
      <div className="title-container">
        <h2>Select Category</h2>
      </div>
      <div className="buttons-container">
        <div className="all-buttons">
          <Button onClick={() => handleCategoryClick("All")}>All</Button>
          {data?.map((item, i) => (
            <Button key={i} onClick={() => handleCategoryClick(item.title)}>
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
