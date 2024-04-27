"use client";

import { useAppSelector } from "@/src/lib/hook";
import "./style.scss";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import { useEffect, useState } from "react";
import { categoryType } from "@/sanity/types/allTypes";
import { getFeaturedCategory } from "@/sanity/sanity-utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import ImageSize from "@/utils/image-utils";
import Link from "next/link";

const Featured = () => {
  const brand = useAppSelector(selectBrand);
  //console.log("brand", brand);
  const [data, setData] = useState<categoryType[]>();

  useEffect(() => {
    async function fetchFeaturedCategory() {
      const data = await getFeaturedCategory();
      setData(data);
    }

    fetchFeaturedCategory();
  }, []);

  //console.log("data->", data);

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
        <Swiper
          navigation={true}
          loop={true}
          autoplay={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          speed={500}
          allowTouchMove={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            820: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1025: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {data &&
            data.map((item, i) => {
              return (
                <SwiperSlide key={i} className="swiperSlide-card">
                  <div className="feat-card">
                    <Link href={item.slug}>
                      {item.image && (
                        <div className="img-container">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes={ImageSize.cardSize}
                          />
                        </div>
                      )}
                      <div className="title-container">
                        <h4>{item.title}</h4>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default Featured;
