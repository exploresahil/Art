import { defineField, defineType } from "sanity";

const brandSchema = defineType({
  type: "document",
  title: "Brand",
  name: "brand",
  groups: [
    {
      name: "brand",
      title: "Brand",
    },
    {
      name: "colors",
      title: "Colors",
    },
  ],
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Name",
      validation: (rule) => rule.required(),
      group: "brand",
    }),
    defineField({
      name: "logoMark",
      title: "Logo Mark",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "brand",
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: { hotspot: true },
      group: "brand",
    }),
    defineField({
      name: "darkImage",
      title: "Dark Image",
      type: "image",
      options: { hotspot: true },
      group: "brand",
    }),
    defineField({
      name: "lightImage",
      title: "Light Image",
      type: "image",
      options: { hotspot: true },
      group: "brand",
    }),
    //*---> colors
    defineField({
      name: "backgroundColor",
      title: "Page Background Color",
      type: "color",
      group: "colors",
      description: "Choose a light shade of color",
    }),
    defineField({
      name: "primaryText",
      title: "Primary Text Color",
      type: "color",
      group: "colors",
      description: "Choose according to Page Background Color",
    }),
    defineField({
      name: "secondaryText",
      title: "Secondary Text Color",
      type: "color",
      group: "colors",
      description: "Choose according to Page Background Color",
    }),
    defineField({
      name: "menuBackgroundColor",
      title: "Menu Background Color",
      type: "color",
      group: "colors",
      description: "Choose a Dark shade of color",
    }),
    defineField({
      name: "socialBackground",
      title: "Social Icons Background Color",
      type: "color",
      group: "colors",
    }),
    defineField({
      name: "socialColor",
      title: "Social Icons Color",
      type: "color",
      group: "colors",
    }),

    defineField({
      name: "lightText",
      title: "Text Color on Dark background",
      type: "color",
      group: "colors",
    }),
    defineField({
      name: "buttonBackground",
      title: "Button Background Color",
      type: "color",
      group: "colors",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text Color",
      type: "color",
      group: "colors",
    }),
    defineField({
      name: "buttonHoverBackground",
      title: "Button Hover Background Color",
      type: "color",
      group: "colors",
    }),
    defineField({
      name: "buttonHoverText",
      title: "Button Hover Text Color",
      type: "color",
      group: "colors",
    }),
    defineField({
      name: "footerBackground",
      title: "Footer Background Color",
      type: "color",
      group: "colors",
    }),
  ],
});
export default brandSchema;
