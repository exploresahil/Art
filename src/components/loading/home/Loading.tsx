"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import { getHero } from "@/sanity/sanity-utils";
import { heroType } from "@/sanity/types/allTypes";
import Image from "next/image";
import { bgData } from "./db";
import ImageSize from "@/src/utils/image-utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  slideUp,
  slideUpFlower,
  slideUpLeft,
  slideUpRight,
  slideUpTwo,
} from "./anim";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import Text from "../../ui/Text";

const Loading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<heroType>();

  const brand = useAppSelector(selectBrand);
  //console.log("brand", brand);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3000);
  }, []);

  //*----------> Data Fetching

  const fetchData = async () => {
    const response = await getHero();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //*----------> logs

  //console.log("heroData->", data);

  return (
    <>
      {isLoading && (
        <section
          id="homeLoading"
          style={{
            backgroundColor:
              brand && brand.backgroundColor
                ? brand.backgroundColor
                : "#ffffff",
          }}
        >
          <>
            <div className="title-container">
              <AnimatePresence mode="wait">
                {data && (
                  <>
                    <Text>
                      <motion.h2
                        variants={slideUp}
                        initial="initial"
                        animate="enter"
                      >
                        {data?.headline}
                      </motion.h2>
                    </Text>
                    <Text>
                      <motion.h2
                        variants={slideUpTwo}
                        initial="initial"
                        animate="enter"
                      >
                        {data?.subHeadline}
                      </motion.h2>
                    </Text>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="bg-container">
              <AnimatePresence mode="wait">
                {data && (
                  <>
                    <motion.div
                      variants={slideUpLeft}
                      initial="initial"
                      animate="enter"
                      className="bg-image"
                    >
                      <Image
                        src={bgData.left}
                        alt={bgData.alt}
                        fill
                        sizes={ImageSize?.bannerSizes}
                      />
                    </motion.div>
                    <motion.div
                      variants={slideUpFlower}
                      initial="initial"
                      animate="enter"
                      className="bg-image"
                    >
                      <Image
                        src={bgData.flower}
                        alt={bgData.alt}
                        fill
                        sizes={ImageSize?.bannerSizes}
                      />
                    </motion.div>

                    <motion.div
                      variants={slideUpRight}
                      initial="initial"
                      animate="enter"
                      className="bg-image"
                    >
                      <Image
                        src={bgData.right}
                        alt={bgData.alt}
                        fill
                        sizes={ImageSize?.bannerSizes}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </>
        </section>
      )}
    </>
  );
};

export default Loading;
