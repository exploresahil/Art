"use client";

import { MdDeleteForever } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { slideLeft } from "../anim";
import "./style.scss";

import { motion } from "framer-motion";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import { productsType } from "@/sanity/types/allTypes";
import { useEffect, useState } from "react";
import { getCartProducts } from "@/sanity/sanity-utils";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "../../ui/Button/Button";
import Image from "next/image";
import ImageSize from "@/src/utils/image-utils";

interface Props {
  setCartOpen: (value: boolean) => void;
  cartOpen: boolean;
}

const Cart = ({ setCartOpen, cartOpen }: Props) => {
  const brand = useAppSelector(selectBrand);
  const [data, setData] = useState<productsType[]>();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCartProducts();
      setData(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const total = data.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(total);
    }
  }, [data]);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Element)) return;

      if (!e.target.closest("#cart")) {
        setCartOpen(false);
      }
    };

    document.body.addEventListener("click", closeMenu);

    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, [setCartOpen]);

  //console.log("data->", data);

  const handleWheel = (e: WheelEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const cartItemContainer = document.querySelector(".cart-item-container");
    if (cartItemContainer) {
      cartItemContainer.addEventListener("wheel", (e) => {
        handleWheel(e as WheelEvent);
      });
    }

    return () => {
      if (cartItemContainer) {
        cartItemContainer.removeEventListener("wheel", (e) => {
          handleWheel(e as WheelEvent);
        });
      }
    };
  }, []);

  return (
    <div id="cart">
      <motion.div
        variants={slideLeft}
        initial="initial"
        animate="enter"
        exit="exit"
        className="cart-container"
        style={{
          backgroundColor:
            brand && brand.menuBackgroundColor
              ? brand.menuBackgroundColor
              : "#000000",
        }}
      >
        <button
          id="cartClose"
          onClick={() => {
            setCartOpen(false);
          }}
        >
          <CgClose />
        </button>
        <h1>Cart</h1>
        <div className="cart-item-container">
          <>{!data && <p style={{ color: "white" }}>Loading...</p>}</>

          {cartOpen === true &&
            data?.map((item, i) => (
              <div className="cart-item" key={i}>
                <div className="img-container">
                  <Image
                    src={item.images[0].url}
                    alt="product image"
                    fill
                    sizes={ImageSize.cardSize}
                  />
                </div>
                <div className="text-container">
                  <h2>{item.name}</h2>
                  <p>{item?.price && `₹${item.price}`}</p>
                  <div className="qty-container">
                    <Button>
                      <AiOutlineMinus />
                    </Button>
                    <p>Qty: 2</p>
                    <Button>
                      <AiOutlinePlus />
                    </Button>
                  </div>
                </div>
                <button id="deleteItem">
                  <MdDeleteForever />
                </button>
              </div>
            ))}
        </div>
        <div className="total-container">
          <h4>Total: ₹{totalPrice}</h4>
        </div>
        <Button
          onClick={() => {
            setCartOpen(false);
          }}
          className="checkout-btn"
        >
          Checkout
        </Button>
      </motion.div>
    </div>
  );
};

export default Cart;
