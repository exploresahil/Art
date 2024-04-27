import { createClient, groq } from "next-sanity";
import clientConfig from "./lib/client";
import { brandType, categoryType, muralHomeType } from "./types/allTypes";
import { heroType } from "./types/allTypes";
import { socialType } from "./types/allTypes";

//*--------->
//*-------------------> Brand
//*--------->

export async function getBrand(): Promise<brandType> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "brand"][0] {
      _id,
      _createdAt,
      name,
      "headerImage": headerImage.asset->url,
      "darkImage": darkImage.asset->url,
      "lightImage": lightImage.asset->url,
      "logoMark": logoMark.asset->url,
      "backgroundColor": backgroundColor.hex,
      "primaryText": primaryText.hex,
      "secondaryText": secondaryText.hex,
      "lightText": lightText.hex,
      "buttonBackground": buttonBackground.hex,
      "buttonText": buttonText.hex,
      "buttonHoverBackground": buttonHoverBackground.hex,
      "buttonHoverText": buttonHoverText.hex,
      "footerBackground": footerBackground.hex,
      "menuBackgroundColor": menuBackgroundColor.hex,
      "socialBackground": socialBackground.hex,
      "socialColor": socialColor.hex,
    }`
  );
}

//*--------->
//*-------------------> Hero
//*--------->

export async function getHero(): Promise<heroType> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "hero"][0] {
      _id,
      _createdAt,
      name,
      headline,
      subHeadline,
    
    }`
  );
}

//*--------->
//*-------------------> Socials
//*--------->

export async function getSocials(): Promise<socialType> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "social"][0] {
      _id,
      _createdAt,
      name,
      instagram,
      pinterest,
      facebook,
    }`
  );
}

//*--------->
//*-------------------> Featured Category
//*--------->

export async function getFeaturedCategory(): Promise<categoryType[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "productCategory" && isFeatured == true] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "image": image.asset->url,
    }`
  );
}

//*--------->
//*-------------------> Mural Home
//*--------->

export async function getMuralHome(): Promise<muralHomeType> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "mural"][0] {
       _id,
      _createdAt,
      title,
      "slug": slug.current,
      "image": image.asset->url,
    }`
  );
}
