import { type SchemaTypeDefinition } from "sanity";
import heroSchema from "./schemas/hero-schema";
import socialSchema from "./schemas/social-schema";
import brandSchema from "./schemas/brand-schema";
import categorySchema from "./schemas/category-schema";
import productsSchema from "./schemas/product-schema";
import muralSchema from "./schemas/mural-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    brandSchema,
    heroSchema,
    socialSchema,
    categorySchema,
    productsSchema,
    muralSchema,
  ],
};
