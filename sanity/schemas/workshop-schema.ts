import { defineArrayMember, defineField, defineType } from "sanity";
import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const workshopSchema = {
  type: "document",
  titel: "Workshops",
  name: "workshops",
  groups: [
    {
      name: "upcoming",
      title: "Upcoming",
    },
    {
      name: "afterWorkshop",
      title: "After Workshop",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter Workshop Name",
      group: "upcoming",
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
      group: "upcoming",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      description: "Upload Image for Workshop Banner",
      group: "upcoming",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "dateTime",
      title: "Date & Time",
      type: "datetime",
      description: "Enter Workshop / Event Date & Time",
      group: "upcoming",
      validation: (val) => val.required(),
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      description:
        "Enter total quantity of tickets or leave blank if only one tickets.",
      group: "upcoming",
      initialValue: 1,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Enter Workshop / Event Price per person",
      group: "upcoming",
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
      description: "Enter short description of the workshop",
      group: "upcoming",
      validation: (val) => val.required(),
    }),

    defineField({
      name: "afterWorkshop",
      title: "After Workshop",
      type: "object",
      group: "afterWorkshop",

      fields: [
        {
          name: "images",
          title: "Images",
          type: "array",
          description:
            "Add one or more workshop Images (4 / 5 ratio recomended)",
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
        },
        {
          name: "description",
          title: "Description",
          type: "array",
          of: [
            defineArrayMember({
              type: "block",
            }),
          ],
          description: "Enter description of the product",
        },
      ],
    }),
  ],
};

export default workshopSchema;
