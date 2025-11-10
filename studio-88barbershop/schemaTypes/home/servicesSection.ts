import { defineField } from "sanity";

export default defineField({
  name: "services_section_group",
  title: "Pakalpojumu Sadaļa (Galvenā lapa)",
  type: "object",
  fields: [
    { name: "backgroundImage", title: "Fona bilde", type: "image", options: { hotspot: true } },

    { name: "title", title: "Virsraksts", type: "localeString" },
    { name: "subtitle", title: "Apakšvirsraksts", type: "localeString" },
    {
      name: "cards",
      title: "Kartītes",
      type: "object",
      fields: [
        { name: "label", title: "Kartītes 'Label'", type: "localeString" },
        { name: "cta_button", title: "Kartītes 'CTA poga'", type: "localeString" },
        {
          name: "haircut",
          title: "Matu Griešanas Kartīte",
          type: "object",
          fields: [
            { name: "title", title: "Virsraksts", type: "localeString" },
            { name: "description", title: "Apraksts", type: "localeString" },
          ],
        },
        {
          name: "shave",
          title: "Skūšanās Kartīte",
          type: "object",
          fields: [
            { name: "title", title: "Virsraksts", type: "localeString" },
            { name: "description", title: "Apraksts", type: "localeString" },
          ],
        },
        {
          name: "combo",
          title: "Komplekta Kartīte",
          type: "object",
          fields: [
            { name: "title", title: "Virsraksts", type: "localeString" },
            { name: "description", title: "Apraksts", type: "localeString" },
          ],
        },
      ],
    },
  ],
});
