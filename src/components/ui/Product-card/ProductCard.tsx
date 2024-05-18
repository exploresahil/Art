import { productsType, workshopType } from "@/sanity/types/allTypes";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";
import ImageSize from "@/src/utils/image-utils";

interface Props {
  item?: productsType;
}

const ProductCard = ({ item }: Props) => {
  //console.log("ProductCard->", item);
  const href = item?.isAvailable ? `/shop/${item?.slug}` : "";

  if (item && item.isAvailable) {
    return (
      <Link id="productCard" href={href} title={item.name}>
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

        <h2>{item?.name}</h2>
        <p>{item?.price ? `₹${item.price}  ` : "No Price"}</p>
      </Link>
    );
  } else {
    return (
      <div id="productCard" title={`${item?.name} Unavailable`}>
        <div className="img-container">
          <div className="not-available" />

          {item && (
            <Image
              src={item.images[0].url}
              alt={item.name}
              fill
              sizes={ImageSize.cardSize}
            />
          )}
        </div>

        <h2 className="notAvailable">{item?.name}</h2>
        <p className="notAvailable">
          {item?.price ? `₹${item.price}  ` : "No Price"}
        </p>
      </div>
    );
  }
};

export default ProductCard;
