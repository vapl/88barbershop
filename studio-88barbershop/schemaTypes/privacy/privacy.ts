import { defineField } from "sanity";

export default defineField({
  name: "privacy_group",
  title: "Privātuma politika",
  type: "object",
  fields: [
    { name: "title", title: "Virsraksts", type: "localeString" },
    { name: "date_label", title: "Apakšvirsraksts", type: "localeString" },
    { name: "content", title: "Privātuma apraksts", type: "localeBlockContent" },
  ],
});
