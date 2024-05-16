import { defineField, defineType } from "sanity";

const footerSchema = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "bgImage",
      type: "image",
      title: "Background Image",
      validation: (Rule: any) => Rule.required(),
    }),
  ],
});

export default footerSchema;
