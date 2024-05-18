import { defineField, defineType } from "sanity";

const heroSchema = defineType({
  name: "hero",
  type: "document",
  title: "Hero",
  groups: [
    {
      name: "home",
      title: "Home",
    },
    {
      name: "shop",
      title: "Shop",
    },
    {
      name: "workshop",
      title: "WorkShop",
    },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: any) => Rule.required(),
      group: "home",
    }),
    defineField({
      name: "headline",
      type: "string",
      title: "Headline",
      validation: (Rule: any) => Rule.required(),
      group: "home",
    }),
    defineField({
      name: "subHeadline",
      type: "string",
      title: "Sub-Headline",
      validation: (Rule: any) => Rule.required(),
      group: "home",
    }),
    defineField({
      name: "nameShop",
      type: "string",
      title: "Shop Name",
      validation: (Rule: any) => Rule.required(),
      group: "shop",
    }),
    defineField({
      name: "headlineShop",
      type: "string",
      title: "Shop Headline",
      validation: (Rule: any) => Rule.required(),
      group: "shop",
    }),
    defineField({
      name: "subHeadlineShop",
      type: "string",
      title: "Shop Sub-Headline",
      validation: (Rule: any) => Rule.required(),
      group: "shop",
    }),
    defineField({
      name: "imageShop",
      title: "Shop Image",
      type: "image",
      description: "Upload Image for Product Category",
      group: "shop",
    }),
    defineField({
      name: "nameWorkshop",
      type: "string",
      title: "Workshop Name",
      validation: (Rule: any) => Rule.required(),
      group: "shop",
    }),
    defineField({
      name: "headlineWorkshop",
      type: "string",
      title: "Workshop Headline",
      validation: (Rule: any) => Rule.required(),
      group: "shop",
    }),
    defineField({
      name: "subHeadlineWorkshop",
      type: "string",
      title: "Workshop Sub-Headline",
      validation: (Rule: any) => Rule.required(),
      group: "shop",
    }),
    defineField({
      name: "imageWorkshop",
      title: "Workshop Image",
      type: "image",
      description: "Upload Image for Product Category",
      group: "shop",
    }),
  ],
});

export default heroSchema;
