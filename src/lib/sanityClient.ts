import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { Image } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

if (!projectId || !dataset || !apiVersion) {
  throw new Error("Please check .env.local file. Sanity variables are missing.");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = createImageUrlBuilder({ projectId, dataset });
export const urlFor = (source: Image | string) => builder.image(source);
