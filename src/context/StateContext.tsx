"use client";

import { productsType } from "@/sanity/types/allTypes";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextInterface {
  showCart: boolean;
  cartItems: any[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  setCartItems: Dispatch<SetStateAction<any[]>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setTotalQuantities: Dispatch<SetStateAction<number>>;
  setQty: Dispatch<SetStateAction<number>>;
  incQty: (maxQuantity?: number) => void;
  decQty: () => void;
  onAdd: (product: productsType, quantity: number) => void;
}

const Context = createContext<ContextInterface>({
  showCart: false,
  cartItems: [] as any[],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  setShowCart: () => {},
  setCartItems: () => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {},
  setQty: () => {},
  incQty: () => {},
  decQty: () => {},
  onAdd: () => {},
});

export default function StateContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //*--------->
  //*-------------------> Add to Cart
  //*--------->

  const onAdd = (product: productsType, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);

      alert(`${qty} ${product.name} added to the cart`);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
      alert(`${qty} ${product.name} added to the cart`);
    }
  };

  //console.log("product.name->", product.name, "qty->", qty);
  //console.log("Cart->", cartItems);

  //*--------->
  //*-------------------> Product Quantity
  //*--------->

  const incQty = (maxQuantity?: number) => {
    if (maxQuantity && qty >= maxQuantity) return;
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setQty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
