"use client";

import { productsType } from "@/sanity/types/allTypes";
import { createAppSlice } from "../crateAppSlice";
import { current } from "@reduxjs/toolkit";

export interface Cart {
  product: productsType;
  quantity: number;
}

const initialState: {
  value: Cart[];
} = {
  value: [],
};

export const CartSlice = createAppSlice({
  name: "CartSlice",
  initialState,
  reducers: (create) => ({
    addToCard: create.reducer((state, action: { payload: Cart }) => {
      const maxQty = action.payload.product.quantity;
      const CurrentState = current(state);
      const cart = CurrentState.value.filter(
        (v) => v.product._id == action.payload.product._id
      );

      console.log(cart, cart.length);

      if (cart.length == 0) {
        alert(
          `${action.payload.quantity}  ${action.payload.product.name} added to a cart`
        );

        state.value.push(action.payload);
      } else {
        state.value = state.value.map((v) => {
          console.log(v.product._id);

          if (v.product._id == action.payload.product._id) {
            console.log(v.quantity + action.payload.quantity, maxQty);

            if (v.quantity + action.payload.quantity <= maxQty) {
              alert(
                `${action.payload.quantity}  ${action.payload.product.name} added to a cart`
              );
              return {
                ...v,
                quantity: v.quantity + action.payload.quantity,
              };
            } else {
              alert(
                `OUT OF STOCK [ONLY ${Math.abs(v.quantity - maxQty)} AVAILABLE]`
              );
            }
          }
          return v;
        });
      }
    }),
    removeFromCart: create.reducer((state, action: { payload: Cart }) => {
      state.value = state.value.filter(
        (v) => v.product._id != action.payload.product._id
      );
    }),
  }),
  selectors: {
    GetCart: (data) => data.value,
  },
});

export const { addToCard, removeFromCart } = CartSlice.actions;

export const { GetCart } = CartSlice.selectors;
