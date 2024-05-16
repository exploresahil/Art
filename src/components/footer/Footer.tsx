"use client";

import { getBrand, getFooter } from "@/sanity/sanity-utils";
import { brandType, footerType } from "@/sanity/types/allTypes";
import { useEffect, useState } from "react";
import "./style.scss";
import Link from "next/link";
import { links } from "../menu/db";
import Image from "next/image";
import ImageSize from "@/src/utils/image-utils";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";

const Footer = () => {
  const [data, setData] = useState<footerType>();
  const [brandData, setBrandData] = useState<brandType>();
  const brand = useAppSelector(selectBrand);

  const fetchData = async () => {
    const response = await getFooter();
    setData(response);
  };
  const fetchBrand = async () => {
    const response = await getBrand();
    setBrandData(response);
  };

  useEffect(() => {
    fetchData();
    fetchBrand();
  }, []);

  //console.log("data->", data);

  return (
    <footer
      style={{
        backgroundColor:
          brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
      }}
    >
      <div
        className="footer-container"
        style={{ backgroundImage: `url(${data?.bgImage})` }}
      >
        <div className="container">
          <div className="menu-items">
            {links &&
              links.map((item, i) => (
                <Link key={i} href={item.link} target={item.target}>
                  {item.name}
                </Link>
              ))}
          </div>
          <Link href="/" className="logo-cont">
            {brandData?.lightImage && (
              <Image
                src={brandData?.lightImage}
                alt="brushish logo"
                fill
                sizes={ImageSize.cardSize}
              />
            )}
          </Link>
          <p>
            Design &amp; Developed by <br />
            <span>
              <Link target="_blank" href="https://thecirclstudio.com/">
                the circl studio
              </Link>
              &amp;
              <Link target="_blank" href="https://www.webstack.in/">
                webstack
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
