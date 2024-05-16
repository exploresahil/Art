"use client";

import Featured from "@/src/components/home/featured/Featured";
import Hero from "@/src/components/home/hero/Hero";
import Murals from "@/src/components/home/murals/Murals";
import Workshop from "@/src/components/home/workshop/Workshop";
import Loading from "@/src/components/loading/home/Loading";
import { useAppDispatch, useAppSelector } from "@/src/lib/hook";
import { load, selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import Lenis from "@studio-freight/lenis";
import { useLayoutEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    dispatch(load());
  }, []);

  return (
    <>
      {/* <Loading /> */}
      <Hero />
      <Featured />
      <Murals />
      <Workshop />
    </>
  );
}
