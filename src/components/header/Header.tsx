"use client";

import ImageSize from "@/src/utils/image-utils";
import "./style.scss";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { brandType } from "@/sanity/types/allTypes";
import { getBrand } from "@/sanity/sanity-utils";
import Link from "next/link";
import { IoBagHandle } from "react-icons/io5";
import Menu from "../menu/Menu";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import useCart from "@/src/hooks/cart";
import Cart from "../menu/cart/Cart";
import { AnimatePresence } from "framer-motion";

const Header = () => {
  const [data, setData] = useState<brandType>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement | null>(null);
  const brand = useAppSelector(selectBrand);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  //console.log("brand", brand);

  //*----------> Data Fetching

  const fetchData = async () => {
    const response = await getBrand();
    setData(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //*----------> Scrolled?

  useEffect(() => {
    let prevScrollPos = window.scrollY || document.documentElement.scrollTop;

    const handleScroll = () => {
      const currentScrollPos =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScrollPos > 0 && currentScrollPos > prevScrollPos);

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //*----------> logs

  //console.log("brandData->", data);

  const useMenuOpen = () => {
    setMenuOpen(true);
  };
  const useMenuClose = () => {
    setMenuOpen(false);
  };

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        y: -110,
        opacity: 0,
        ease: "power1.Out",
        delay: 3,
      });
    },
    { scope: headerRef }
  );

  return (
    <>
      <header
        id="header"
        className={isScrolled && !menuOpen && !cartOpen ? "scrolled" : ""}
        ref={headerRef}
        style={{
          backgroundColor:
            brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
        }}
      >
        <div className="header-items">
          <Menu useMenuOpen={useMenuOpen} useMenuClose={useMenuClose} />
          <Link href="/" id="logo">
            {data?.headerImage && (
              <Image
                src={data?.headerImage}
                alt="Brush.Ish Logo"
                fill
                sizes={ImageSize?.bannerSizes}
              />
            )}
          </Link>
          <button
            id="cartBtn"
            onClick={() => {
              setCartOpen(true);
            }}
          >
            <IoBagHandle />
          </button>
        </div>
        <AnimatePresence mode="wait">
          {cartOpen && <Cart setCartOpen={setCartOpen} cartOpen={cartOpen} />}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
