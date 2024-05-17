import { productsType } from "@/sanity/types/allTypes";
import "./style.scss";
import ProductCard from "../../ui/Product-card/ProductCard";

interface CategoryProps {
  products: productsType[] | undefined;
  loading: boolean;
}

const AllProducts = ({ products, loading }: CategoryProps) => {
  //console.log("products->", products);

  if (loading) {
    return <div id="allProducts">Loading...</div>;
  }

  if (products?.length == 0) {
    return <div id="allProducts">No Products found in selected category</div>;
  }

  return (
    <div id="allProducts">
      {products?.map((item, i) => (
        <ProductCard key={i} item={item} />
      ))}
    </div>
  );
};

export default AllProducts;
