import { defineArrayMember, defineField } from "sanity";
import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const productsSchema = {
  type: "document",
  title: "Products",
  name: "products",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter Product Name",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
      description: "Click Generate to generate slug",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      description: "Select Category of the product",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description: "Add one or more product Images",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            sources: [unsplashAssetSource],
          },
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (val) => val.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
      description: "Enter description of the product",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "isAvailable",
      title: "Is Available",
      type: "boolean",
      description: "Select true if this product is Available, false otherwise",
      initialValue: false,
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      description:
        "Enter total quantity of item or leave blank if only one item.",
      initialValue: 1,
    }),
  ],
};

export default productsSchema;
