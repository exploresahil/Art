"use client";

import { FaFacebookSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { getHero, getSocials } from "@/sanity/sanity-utils";
import { heroType, socialType } from "@/sanity/types/allTypes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bgData } from "../../loading/home/db";
import ImageSize from "@/src/utils/image-utils";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import LinkButton from "../../ui/LinkButton/LinkButton";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import Text from "../../ui/Text";

const Hero = () => {
  const [data, setData] = useState<heroType>();
  const [social, setSocial] = useState<socialType>();
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const shopNowRef = useRef<HTMLDivElement | null>(null);

  const leftLeafRef = useRef<HTMLDivElement | null>(null);
  const flowerRef = useRef<HTMLDivElement | null>(null);
  const rightLeafRef = useRef<HTMLDivElement | null>(null);
  const brand = useAppSelector(selectBrand);
  //console.log("brand", brand);

  //*----------> Data Fetching

  const fetchData = async () => {
    const response = await getHero();
    setData(response);
  };

  const fetchSocialData = async () => {
    const response = await getSocials();
    setSocial(response);
  };

  useEffect(() => {
    fetchData();
    fetchSocialData();
  }, []);

  //*----------> logs

  //console.log("heroData->", data);
  //console.log("socialData->", social);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add("(max-width: 1025px)", () => {
        gsap.to(titleRef.current, {
          y: 200,
          scrollTrigger: {
            trigger: titleRef.current,
            //markers: true,
            start: "top 100px",
            end: "600px top",
            scrub: 0.1,
          },
        });
      });

      gsap.from(socialRef.current, {
        y: 400,
        opacity: 0,
        ease: "power1.Out",
        delay: 3,
      });

      gsap.from(shopNowRef.current, {
        y: 100,
        opacity: 0,
        ease: "power1.Out",
        delay: 3.2,
      });

      gsap.to(leftLeafRef.current, {
        y: -80,
        x: 20,
        scrollTrigger: {
          trigger: leftLeafRef.current,
          //markers: true,
          start: "100px 100px",
          end: "bottom top",
          scrub: 0.1,
        },
      });

      gsap.to(flowerRef.current, {
        y: 50,
        x: 20,
        scrollTrigger: {
          trigger: flowerRef.current,
          //markers: true,
          start: "100px 100px",
          end: "bottom top",
          scrub: 0.1,
        },
      });

      gsap.to(rightLeafRef.current, {
        y: 100,
        x: -50,
        scrollTrigger: {
          trigger: rightLeafRef.current,
          //markers: true,
          start: "100px 100px",
          end: "bottom top",
          scrub: 0.1,
        },
      });
    },
    { scope: heroRef }
  );

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        style={{
          backgroundColor:
            brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
        }}
      >
        <>
          <div className="title-container" ref={titleRef}>
            {data && (
              <>
                <Text>
                  <h2>{data?.headline}</h2>
                </Text>
                <Text>
                  <h2>{data?.subHeadline}</h2>
                </Text>
              </>
            )}
          </div>
          <div className="bg-container">
            <>
              <div className="bg-image" ref={leftLeafRef}>
                {data && (
                  <Image
                    src={bgData.left}
                    alt={bgData.alt}
                    fill
                    sizes={ImageSize?.bannerSizes}
                  />
                )}
              </div>
              <div className="bg-image" ref={flowerRef}>
                {data && (
                  <Image
                    src={bgData.flower}
                    alt={bgData.alt}
                    fill
                    sizes={ImageSize?.bannerSizes}
                  />
                )}
              </div>
              <div className="bg-image" ref={rightLeafRef}>
                {data && (
                  <Image
                    src={bgData.right}
                    alt={bgData.alt}
                    fill
                    sizes={ImageSize?.bannerSizes}
                  />
                )}
              </div>
            </>
          </div>
          <div className="bottom-container">
            <div
              className="socials"
              ref={socialRef}
              style={{
                backgroundColor:
                  brand && brand.socialBackground
                    ? brand.socialBackground
                    : "#ffe5dd",
              }}
            >
              <Link
                href={`${social?.instagram}`}
                target="_blank"
                title="Instagram"
              >
                <RiInstagramFill
                  className="insta"
                  color={
                    brand && brand.socialColor ? brand.socialColor : "#003ecb"
                  }
                />
              </Link>
              <Link
                href={`${social?.pinterest}`}
                target="_blank"
                title="Pinterest"
              >
                <FaPinterestSquare
                  color={
                    brand && brand.socialColor ? brand.socialColor : "#003ecb"
                  }
                />
              </Link>
              <Link
                href={`${social?.facebook}`}
                target="_blank"
                title="Facebook"
              >
                <FaFacebookSquare
                  color={
                    brand && brand.socialColor ? brand.socialColor : "#003ecb"
                  }
                />
              </Link>
            </div>
            <div ref={shopNowRef}>
              <LinkButton id="shopNow" href="/shop" title="Shop">
                Shop Now
              </LinkButton>
            </div>
          </div>
        </>
      </section>
    </>
  );
};

export default Hero;
