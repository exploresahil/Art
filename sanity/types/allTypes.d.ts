import { PortableTextBlock } from "sanity";

interface commonAttributes {
  _id: string;
  cratedAt: Date;
  name: string;
}

export interface brandType extends commonAttributes {
  logoMark?: string;
  headerImage?: string;
  darkImage?: string;
  lightImage?: string;

  backgroundColor?: string;
  primaryText: string;
  secondaryText: string;
  lightText: string;
  buttonBackground: string;
  buttonText: string;
  buttonHoverBackground: string;
  buttonHoverText: string;
  footerBackground: string;
  menuBackgroundColor: string;
  socialBackground: string;
  socialColor: string;
}

export interface heroType extends commonAttributes {
  headline: string;
  subHeadline: string;
  nameShop: string;
  headlineShop: string;
  subHeadlineShop: string;
  imageShop: string;

  nameWorkshop: string;
  headlineWorkshop: string;
  subHeadlineWorkshop: string;
  imageWorkshop: string;
}
export interface socialType extends commonAttributes {
  instagram: string;
  pinterest: string;
  facebook: string;
}

export interface categoryType extends commonAttributes {
  title: string;
  slug: string;
  image: string;
  products: productsType[];
}

export interface productsType extends commonAttributes {
  name: string;
  slug: string;
  category: categoryType;
  images: {
    _id: string;
    url: string;
  }[];
  description: PortableTextBlock[];
  price: number;
  isAvailable: boolean;
  quantity: number;
}

export interface muralHomeType extends commonAttributes {
  title: string;
  slug: string;
  image: string;
}

export interface footerType extends commonAttributes {
  name: string;
  bgImage: string;
}

export interface workshopType extends commonAttributes {
  slug: string;
  bannerImage: string;
  dateTime: string;
  quantity: number;
  price: number;
  description: PortableTextBlock[];
  afterWorkshop: {
    images: {
      _id: string;
      url: string;
    }[];
    description: PortableTextBlock[];
  };
}
