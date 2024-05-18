"use client";

import { workshopType } from "@/sanity/types/allTypes";
import "./style.scss";
import Image from "next/image";
import ImageSize from "@/src/utils/image-utils";
import Button from "@/src/components/ui/Button/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { BsFillBagPlusFill } from "react-icons/bs";

interface Props {
  data?: workshopType;
}

const Hero = ({ data }: Props) => {
  const [count, setCount] = useState<number>(1);

  const incCount = () => {
    setCount(count + 1);
  };

  const decCount = () => {
    setCount(count - 1);
  };

  return (
    <section id="workshopHero">
      {data ? (
        <div className="workshop-hero-container">
          <div className="workshop-container">
            <div className="img-container">
              <Image
                src={data.bannerImage}
                alt={`${data.name} Image`}
                fill
                sizes={ImageSize.cardSize}
                priority
              />
            </div>

            <div className="right">
              <div className="text">
                <h2>{data.name}</h2>
                <p>₹{data.price}</p>
              </div>
              <div className="buttons-container">
                <div className="quantity-container">
                  <Button onClick={decCount}>
                    <AiOutlineMinus />
                  </Button>
                  <p>{count}</p>
                  <Button onClick={incCount}>
                    <AiOutlinePlus />
                  </Button>
                </div>
                <div className="buttons">
                  <Button className="buyNow">Buy Now</Button>
                  <Button className="buyNow">
                    <BsFillBagPlusFill /> Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </section>
  );
};

export default Hero;
