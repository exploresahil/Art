import { categoryType } from "@/sanity/types/allTypes";
import "./style.scss";
import Button from "../../ui/Button/Button";

interface CategoryProps {
  data: categoryType[] | undefined;
  setSelectedCategory: (category: string) => void;
  loading: boolean;
  selectedCategory?: string;
}

const Category = ({
  data,
  setSelectedCategory,
  loading,
  selectedCategory,
}: CategoryProps) => {
  //console.log("category->", data);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    window.history.replaceState({}, "", "/shop");
  };

  return (
    <div id="category">
      <div className="title-container">
        <h2>Select Category</h2>
      </div>
      <div className="buttons-container">
        <div className="all-buttons">
          <Button
            className={selectedCategory === "All" ? "selected" : ""}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </Button>
          {loading ? (
            <Button className="loadingBtn">Loading...</Button>
          ) : (
            <>
              {data?.map((item, i) => (
                <Button
                  key={i}
                  onClick={() => handleCategoryClick(item.title)}
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
