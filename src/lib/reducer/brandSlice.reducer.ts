"use client";
import { getBrand } from "@/sanity/sanity-utils";
import { BrandState } from "@/src/types/reducers";
import { createAppSlice } from "../crateAppSlice";

const initialState: BrandState = {
  value: {
    _id: "",
    cratedAt: new Date(),
    name: "",
    logoMark: "",
    headerImage: "",
    darkImage: "",
    lightImage: "",

    backgroundColor: "",
    primaryText: "",
    secondaryText: "",
    lightText: "",
    buttonBackground: "",
    buttonText: "",
    buttonHoverBackground: "",
    buttonHoverText: "",
    footerBackground: "",
    menuBackgroundColor: "",
    socialBackground: "",
    socialColor: "",
  },
};

export const BrandSlice = createAppSlice({
  name: "BrandSlice",
  initialState,
  reducers: (create) => ({
    load: create.asyncThunk(async () => await getBrand(), {
      pending: (state) => {},
      fulfilled: (state, action) => {
        state.value = action.payload;
      },
      rejected: (state) => {},
    }),
  }),
  selectors: {
    selectBrand: (data) => data.value,
  },
});

export const { load } = BrandSlice.actions;

export const { selectBrand } = BrandSlice.selectors;
