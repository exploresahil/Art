import { productsType } from "@/sanity/types/allTypes";
import ImageSize from "@/utils/image-utils";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";

interface Props {
  item: productsType;
}

const ProductCard = ({ item }: Props) => {
  console.log("ProductCard->", item);

  return (
    <Link id="productCard" href={item.slug}>
      <div className="img-container">
        {item && (
          <Image
            src={item.images[0].url}
            alt={item.name}
            fill
            sizes={ImageSize.cardSize}
          />
        )}
      </div>

      <h2>{item.name}</h2>
    </Link>
  );
};

export default ProductCard;
