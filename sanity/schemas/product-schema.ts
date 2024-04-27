import { defineField, defineType } from "sanity";
import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const productsSchema = {
  type: "document",
  title: "Products",
  name: "products",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter Product Name",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
      description: "Click Generate to generate slug",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      description: "Select Category of the product",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      description: "Add one ore more product Images",

      of: [
        {
          type: "image",
          options: { hotspot: true },
          sources: [unsplashAssetSource],
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Enter description of the product",
    },
    {
      name: "isAvailable",
      title: "Is Available",
      type: "boolean",
      description: "Select true if this product is Available, false otherwise",
      initialValue: false,
    },
  ],
};

export default productsSchema;
