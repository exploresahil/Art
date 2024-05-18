import { createClient, groq } from "next-sanity";
import clientConfig from "./lib/client";
import {
  brandType,
  categoryType,
  footerType,
  muralHomeType,
  productsType,
} from "./types/allTypes";
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
//*-------------------> Footer
//*--------->

export async function getFooter(): Promise<footerType> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "footer"][0] {
      _id,
      _createdAt,
      name,
      "bgImage": bgImage.asset->url
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
      nameShop,
      headlineShop,
      subHeadlineShop,
      "imageShop": imageShop.asset->url,
      nameWorkshop,
      headlineWorkshop,
      subHeadlineWorkshop,
      "imageWorkshop":imageWorkshop.asset->url,
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

//*--------->
//*-------------------> Products by Category
//*--------->

export async function getProductsByCategory(): Promise<categoryType[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "productCategory"] {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "products": *[_type == "products" && references(^._id)] {
      name,
      "slug": slug.current,
      "images": images[] {
        "_id": asset->_id,
        "url": asset->url
      },
      description,
      price,
      isAvailable
    }
  }`);
}

//*--------->
//*-------------------> Products, if isAvailable
//*--------->

export async function getProducts(): Promise<productsType[]> {
  return createClient(clientConfig)
    .fetch(groq`*[_type == "products" && isAvailable == true] {
      name,
      "slug": slug.current,
      "images": images[] {
        "_id": asset->_id,
        "url": asset->url
      },
      description,
      price,
      isAvailable
    }`);
}

//*--------->
//*-------------------> Products for cart
//*--------->

export async function getCartProducts(): Promise<productsType[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "products"] {
      name,
      "slug": slug.current,
      "images": images[] {
        "_id": asset->_id,
        "url": asset->url
      },
      description,
      price,
      isAvailable
    }`);
}

//*--------->
//*-------------------> Product by Slug
//*--------->

export async function getProductsBySlug(slug: string): Promise<productsType> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "products" && isAvailable == true && slug.current == $slug][0] {
      _id,
    name,
    "slug": slug.current,
    "images": images[] {
      "_id": asset->_id,
      "url": asset->url
    },
    description,
    price,
    isAvailable,
    quantity,
  }`,
    { slug }
  );
}
