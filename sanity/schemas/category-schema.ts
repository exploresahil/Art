import { defineField, defineType } from "sanity";

const categorySchema = defineType({
  type: "document",
  title: "Product Category",
  name: "productCategory",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Enter Category Name",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      description: "Click Generate to generate slug",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload Image for Product Category",
    }),
    defineField({
      name: "isFeatured",
      title: "Is featured?",
      type: "boolean",
      description: "Select true if this category is Featured, false otherwise",
      initialValue: false,
    }),
  ],
});

export default categorySchema;
