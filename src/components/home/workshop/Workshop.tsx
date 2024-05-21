"use client";

import Image from "next/image";
import "./style.scss";
import ImageSize from "@/src/utils/image-utils";
import { useEffect, useState } from "react";
import { workshopType } from "@/sanity/types/allTypes";
import { getWorkshops } from "@/sanity/sanity-utils";
import LinkButton from "../../ui/LinkButton/LinkButton";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Workshop = () => {
  const [data, setData] = useState<workshopType[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWorkshops();
      setData(response);
    };
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    navigator: false,
  };

  return (
    <section id="homeWorkshop">
      <div className="workshop-container">
        <h2>Workshops</h2>
        <Slider {...settings} className="SliderMain">
          {data &&
            data.map((item, i) => (
              <div className="img-container" key={i}>
                <Image
                  src={item.bannerImage}
                  alt="Workshop background Image"
                  fill
                  sizes={ImageSize.bannerSizes}
                />
              </div>
            ))}
        </Slider>
        <LinkButton id="workshopLink" href="workshops">
          See More
        </LinkButton>
      </div>
    </section>
  );
};

export default Workshop;
