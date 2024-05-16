"use client";

import React, { CSSProperties } from "react";
import styles from "./CustomCarousel.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const page = ({ speed = 3000 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,

    autoplaySpeed: speed,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
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
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        <div className={styles.slide}>
          <h3>Component 1</h3>
        </div>
        <div className={styles.slide}>
          <h3>Component 2</h3>
        </div>
        <div className={styles.slide}>
          <h3>Component 3</h3>
        </div>
        <div className={styles.slide}>
          <h3>Component 4</h3>
        </div>
        <div className={styles.slide}>
          <h3>Component 5</h3>
        </div>
      </Slider>
    </div>
  );
};

const NextArrow = (props: {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.nextArrow}`}
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
      className={`${className} ${styles.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

export default page;
