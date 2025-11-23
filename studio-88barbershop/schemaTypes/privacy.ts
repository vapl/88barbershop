import { defineType, defineField } from "sanity";

export default defineType({
  name: "privacy",
  title: "Privacy Policy",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localeText",
    }),
  ],
});
