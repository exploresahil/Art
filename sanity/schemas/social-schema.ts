import { defineField, defineType } from "sanity";

const socialSchema = defineType({
  name: "social",
  type: "document",
  title: "Social",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pinterest",
      type: "string",
      title: "Pinterest-Link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "facebook",
      type: "string",
      title: "Facebook-Link",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export default socialSchema;
