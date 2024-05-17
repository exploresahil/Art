"use client";

import { productsType } from "@/sanity/types/allTypes";
import { createAppSlice } from "../crateAppSlice";

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
      state.value.push(action.payload);
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
