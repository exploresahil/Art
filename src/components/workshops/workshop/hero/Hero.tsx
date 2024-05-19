"use client";

import { workshopType } from "@/sanity/types/allTypes";
import "./style.scss";
import Image from "next/image";
import ImageSize from "@/src/utils/image-utils";
import Button from "@/src/components/ui/Button/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { BsFillBagPlusFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/src/lib/hook";
import {
  GetCart,
  addToCard,
  toggleCartOpen,
} from "@/src/lib/reducer/CardSlice.reducer";

interface Props {
  data?: workshopType;
}

const Hero = ({ data }: Props) => {
  const [count, setCount] = useState<number>(1);
  const items = useAppSelector(GetCart);
  const dispatch = useAppDispatch();
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
                  <Button
                    className="buyNow"
                    onClick={() => {
                      dispatch(
                        addToCard({
                          product: data,
                          quantity: count,
                        })
                      );
                      const prdData = items.filter(
                        (v) => v.product._id == data._id
                      )[0];
                      if (!prdData) dispatch(toggleCartOpen());
                      else if (data.quantity !== prdData.quantity)
                        dispatch(toggleCartOpen());
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    className="buyNow"
                    onClick={() => {
                      dispatch(
                        addToCard({
                          product: data,
                          quantity: count,
                        })
                      );
                      setCount(1);
                    }}
                  >
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
