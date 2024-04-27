import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
};

export default config;
