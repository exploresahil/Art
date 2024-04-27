import { defineField, defineType } from "sanity";

const muralSchema = defineType({
  name: "mural",
  title: "Mural",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      description: "Upload Image for Mural home banner",
    }),
  ],
});

export default muralSchema;
