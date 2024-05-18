import { productsType, workshopType } from "@/sanity/types/allTypes";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";
import ImageSize from "@/src/utils/image-utils";

interface Props {
  item?: workshopType;
}

const WorkshopCard = ({ item }: Props) => {
  //console.log("ProductCard->", item);

  return (
    <Link id="productCard" href={`${item?.slug}`} title={item?.name}>
      <div className="img-container">
        {item && (
          <Image
            src={item.bannerImage}
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
};

export default WorkshopCard;
