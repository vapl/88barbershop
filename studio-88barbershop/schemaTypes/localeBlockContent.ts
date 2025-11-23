import { defineType } from "sanity";

export default defineType({
  name: "localeBlockContent",
  title: "Localized Rich Text",
  type: "object",
  fields: [
    {
      name: "lv",
      title: "Latviski",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "en",
      title: "Angliski",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "ru",
      title: "Krieviski",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});
