import { defineField } from "sanity";

export default defineField({
  name: "pages_group",
  title: "Lapu Teksti (specifiski)",
  type: "object",
  fields: [
    {
      name: "contact_page",
      title: "Kontaktu Lapa",
      type: "object",
      fields: [
        { name: "heading_intro", title: "Ievada virsraksts", type: "localeString" },
        { name: "heading_map", title: "Kartes virsraksts", type: "localeString" },
      ],
    },
    {
      name: "about_page",
      title: "Par Mums Lapa",
      type: "object",
      fields: [
        { name: "heading_intro", title: "Ievada virsraksts", type: "localeString" },
        { name: "heading_team", title: "Komandas virsraksts", type: "localeString" },
        {
          name: "businessHighlights",
          title: "Biznesa Aktualitātes",
          type: "object",
          fields: [
            {
              name: "highlight1",
              title: "Aktualitāte 1 (Stāvvieta)",
              type: "object",
              fields: [
                { name: "title", title: "Nosaukums", type: "localeString" },
                { name: "subtitle", title: "Apakšvirsraksts", type: "localeString" },
              ],
            },
            {
              name: "highlight2",
              title: "Aktualitāte 2 (Bārddziņi)",
              type: "object",
              fields: [{ name: "subtitle", title: "Apakšvirsraksts", type: "localeString" }],
            },
            {
              name: "highlight3",
              title: "Aktualitāte 3 (Meistarība)",
              type: "object",
              fields: [
                { name: "title", title: "Nosaukums", type: "string" },
                { name: "subtitle", title: "Apakšvirsraksts", type: "localeString" },
              ],
            },
            {
              name: "highlight4",
              title: "Aktualitāte 4 (Pieredze)",
              type: "object",
              fields: [
                { name: "title", title: "Nosaukums", type: "string" },
                { name: "subtitle", title: "Apakšvirsraksts", type: "localeString" },
              ],
            },
          ],
        },
      ],
    },
  ],
});
