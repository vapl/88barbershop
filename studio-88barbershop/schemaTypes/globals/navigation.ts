import { defineField } from "sanity";

export default defineField({
  name: "navigation_group",
  title: "Navigācija",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "id", title: "ID", type: "string" },
        { name: "label", title: "Nosaukums", type: "localeString" },
        { name: "href", title: "Saite", type: "string" },
      ],
    },
  ],
});
