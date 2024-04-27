"use client";

import Link from "next/link";
import { CgClose } from "react-icons/cg";
import "./style.scss";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { slideRight } from "./anim";
import { gsap } from "gsap";
import { links } from "./db";
import { brandType } from "@/sanity/types/allTypes";
import { getBrand } from "@/sanity/sanity-utils";
import Image from "next/image";
import ImageSize from "@/src/utils/image-utils";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";

const Menu = ({ useMenuOpen, useMenuClose }: any) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<brandType>();

  const brand = useAppSelector(selectBrand);
  //console.log("brand", brand);

  //*----------> Data Fetching

  const fetchData = async () => {
    const response = await getBrand();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (menu && menuRef.current) {
      gsap.from(menuRef.current?.children, {
        opacity: 0,
        x: -50,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: "power1.Out",
      });
    }
  }, [menu]);

  const onLinkClick = () => {
    setMenu(false);
  };

  if (menu) {
    useMenuOpen();
  } else {
    useMenuClose();
  }

  return (
    <>
      <button
        id="menuBtn"
        onClick={() => {
          setMenu(true);
        }}
      >
        <GiHamburgerMenu />
      </button>
      <AnimatePresence mode="wait">
        {menu && (
          <motion.section
            variants={slideRight}
            initial="initial"
            animate="enter"
            exit="exit"
            id="menu"
            style={{
              backgroundColor:
                brand && brand.menuBackgroundColor
                  ? brand.menuBackgroundColor
                  : "#000000",
            }}
          >
            <div id="menuHead">
              <Link href="/" id="lLogo" onClick={onLinkClick}>
                {data?.headerImage && (
                  <Image
                    src={data?.lightImage || ""}
                    alt="Brush.Ish Logo"
                    fill
                    sizes={ImageSize?.bannerSizes}
                  />
                )}
              </Link>
              <button
                id="menuClose"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <CgClose />
              </button>
            </div>
            <div className="menu-items" ref={menuRef}>
              {links &&
                links.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    target={item.target}
                    onClick={onLinkClick}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
