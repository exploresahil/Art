import { defineField, defineType } from "sanity";

const heroSchema = defineType({
  name: "hero",
  type: "document",
  title: "Hero",

  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "headline",
      type: "string",
      title: "Headline",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "subHeadline",
      type: "string",
      title: "Sub-Headline",
      validation: (Rule: any) => Rule.required(),
    }),
  ],
});

export default heroSchema;
