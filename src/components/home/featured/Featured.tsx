"use client";

import { useAppSelector } from "@/src/lib/hook";
import "./style.scss";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import { useEffect, useState } from "react";
import { categoryType } from "@/sanity/types/allTypes";
import { getFeaturedCategory } from "@/sanity/sanity-utils";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import ImageSize from "@/src/utils/image-utils";

const Featured = () => {
  const brand = useAppSelector(selectBrand);
  //console.log("brand", brand);
  const [data, setData] = useState<categoryType[]>();
  const router = useRouter();

  useEffect(() => {
    async function fetchFeaturedCategory() {
      const data = await getFeaturedCategory();
      setData(data);
    }

    fetchFeaturedCategory();
  }, []);

  const handleSlideClick = (categorySlug: string) => {
    router.push(`/shop?category=${categorySlug}`);
  };

  //console.log("data->", data);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 819,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section
      id="featured"
      style={{
        backgroundColor:
          brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
      }}
    >
      <h2>Featured Products</h2>
      <div className="category-slider">
        <Slider {...settings}>
          {data?.map((item, i) => (
            <div className="slide" key={i}>
              <div
                className="slide-container"
                onClick={() => handleSlideClick(item.title)}
              >
                <div className="img-container">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt="card image"
                      fill
                      sizes={ImageSize.cardSize}
                    />
                  )}
                </div>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Featured;

const NextArrow = (props: {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} nextArrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
const PrevArrow = (props: {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} prevArrow`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
