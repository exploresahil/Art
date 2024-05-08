import { productsType } from "@/sanity/types/allTypes";
import "./style.scss";
import ProductCard from "../../ui/Product-card/ProductCard";

interface CategoryProps {
  products: productsType[] | undefined; // Define props interface
}

const AllProducts = ({ products }: CategoryProps) => {
  //console.log("products->", products);

  return (
    <div id="allProducts">
      {products?.length !== 0 ? (
        products?.map((item, i) => <ProductCard key={i} item={item} />)
      ) : (
        <div>No Products found in selected category</div>
      )}
    </div>
  );
};

export default AllProducts;
