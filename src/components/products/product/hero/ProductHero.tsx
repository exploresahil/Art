"use client";

import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillBagPlusFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { productsType } from "@/sanity/types/allTypes";
import "./style.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/src/components/ui/Button/Button";
import { useMediaQuery } from "react-responsive";
import PageLoading from "@/src/components/ui/loading/PageLoading";
import ImageSize from "@/src/utils/image-utils";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";

interface Props {
  data?: productsType;
}

const ProductHero = ({ data }: Props) => {
  //console.log("data->", data);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);
  const brand = useAppSelector(selectBrand);

  const incCount = () => {
    if (data && count < data.quantity) {
      setCount(count + 1);
    }
  };

  const decCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1025px)",
  });

  const nextImage = () => {
    if (data?.images) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }
  };

  const prevImage = () => {
    if (data?.images) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length
      );
    }
  };

  const images = data?.images || [];

  let firstImageSrc = "";
  if (data && data.images.length >= 2) {
    firstImageSrc = data.images[currentIndex].url;
  }

  if (isMounted)
    return !isDesktopOrLaptop ? (
      <section
        id="productHero"
        style={{
          backgroundColor:
            brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
        }}
      >
        <div className="product-container">
          <div className="img-container">
            {images.length > 0 && (
              <Image
                src={images[currentIndex].url}
                alt="Product Image"
                fill
                sizes={ImageSize.cardSize}
                priority
              />
            )}
            {images.length > 1 && (
              <div className="nav-buttons">
                <button id="back" onClick={prevImage}>
                  <AiOutlineArrowLeft />
                </button>
                <button id="next" onClick={nextImage}>
                  <AiOutlineArrowRight />
                </button>
              </div>
            )}
          </div>
          <div className="title-container">
            <h2>{data?.name}</h2>
            <p>{data?.price && `₹${data.price}`}</p>
            {data && data.quantity && (
              <div className="quantity-container">
                <Button onClick={decCount}>
                  <AiOutlineMinus />
                </Button>
                <p>{count}</p>
                <Button onClick={incCount}>
                  <AiOutlinePlus />
                </Button>
              </div>
            )}
            <div className="buttons">
              <Button>Buy Now</Button>
              <Button>
                <BsFillBagPlusFill /> Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section
        id="productHero"
        style={{
          backgroundColor:
            brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
        }}
      >
        <div className="product-container">
          <div className="product-images">
            <div className="img-container">
              {images.length == 1 ? (
                <Image
                  src={images[currentIndex].url}
                  alt="Product Image"
                  fill
                  sizes={ImageSize.cardSize}
                  priority
                  className="zoomed-image"
                />
              ) : (
                <Image
                  src={firstImageSrc}
                  alt="Product Image"
                  fill
                  sizes={ImageSize.cardSize}
                  priority
                  className="zoomed-image"
                />
              )}
              {images.length > 1 && (
                <div className="nav-buttons">
                  <button id="back" onClick={prevImage}>
                    <AiOutlineArrowLeft />
                  </button>
                  <button id="next" onClick={nextImage}>
                    <AiOutlineArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="title-container">
            {data && images.length > 1 && (
              <div className="img-container" onClick={nextImage}>
                <Image
                  src={data.images[(currentIndex + 1) % data.images.length].url}
                  alt="Product Image"
                  fill
                  sizes={ImageSize.cardSize}
                  priority
                />
              </div>
            )}

            <h2>{data?.name}</h2>
            <p>{data?.price && `₹${data.price}`}</p>
            {data && data.quantity && (
              <div className="quantity-container">
                <Button onClick={decCount}>
                  <AiOutlineMinus />
                </Button>
                <p>{count}</p>
                <Button onClick={incCount}>
                  <AiOutlinePlus />
                </Button>
              </div>
            )}
            <div className="buttons">
              <Button>Buy Now</Button>
              <Button>
                <BsFillBagPlusFill /> Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
};

export default ProductHero;
