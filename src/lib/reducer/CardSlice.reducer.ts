"use client";

import { productsType, workshopType } from "@/sanity/types/allTypes";
import { createAppSlice } from "../crateAppSlice";
import { current } from "@reduxjs/toolkit";

export interface Cart {
  product: productsType | workshopType;
  quantity: number;
}

const initialState: {
  value: { items: Cart[]; isOpen: boolean };
} = {
  value: { items: [], isOpen: false },
};

export const CartSlice = createAppSlice({
  name: "CartSlice",
  initialState,
  reducers: (create) => ({
    addToCard: create.reducer((state, action: { payload: Cart }) => {
      const maxQty = action.payload.product.quantity;
      const CurrentState = current(state);
      const cart = CurrentState.value.items.filter(
        (v) => v.product._id == action.payload.product._id
      );

      //console.log(cart, cart.length);

      if (cart.length == 0) {
        alert(
          `${action.payload.quantity}  ${action.payload.product.name} added to the cart`
        );

        state.value.items.push(action.payload);
      } else {
        state.value.items = state.value.items.map((v) => {
          //console.log(v.product._id);

          if (v.product._id == action.payload.product._id) {
            //console.log(v.quantity + action.payload.quantity, maxQty);

            if (v.quantity + action.payload.quantity <= maxQty) {
              alert(
                `${action.payload.quantity}  ${action.payload.product.name} added to the cart`
              );
              return {
                ...v,
                quantity: v.quantity + action.payload.quantity,
              };
            } else {
              alert(
                `OUT OF STOCK (${Math.abs(
                  v.quantity - maxQty
                )} Product AVAILABLE)`
              );
            }
          }
          return v;
        });
      }
    }),
    removeFromCart: create.reducer((state, action: { payload: Cart }) => {
      state.value.items = state.value.items.filter(
        (v) => v.product._id != action.payload.product._id
      );
    }),
    addQty: create.reducer(
      (
        state,
        action: { payload: { index: number; prd: productsType | workshopType } }
      ) => {
        const value = state.value.items[action.payload.index];
        const maxQty = action.payload.prd.quantity;
        if (value.quantity + 1 <= maxQty)
          state.value.items[action.payload.index].quantity += 1;
        else
          alert(
            `OUT OF STOCK (${Math.abs(
              value.quantity - maxQty
            )} Product AVAILABLE)`
          );
      }
    ),
    subQty: create.reducer(
      (state, action: { payload: { index: number; qty: number } }) => {
        const value = state.value.items[action.payload.index];
        if (action.payload.qty - 1 > 0) {
          state.value.items[action.payload.index].quantity -= 1;
        } else {
          state.value.items = state.value.items.filter(
            (v) => v.product._id != value.product._id
          );
        }
      }
    ),
    toggleCartOpen: create.reducer((state) => {
      state.value.isOpen = !state.value.isOpen;
    }),
  }),
  selectors: {
    GetCart: (data) => data.value.items,
    GetIsOpen: (data) => data.value.isOpen,
  },
});

export const { addToCard, removeFromCart, addQty, subQty, toggleCartOpen } =
  CartSlice.actions;

export const { GetCart, GetIsOpen } = CartSlice.selectors;
