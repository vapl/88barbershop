import { defineField } from "sanity";

export default defineField({
  name: "footer_group",
  title: "Kājene",
  type: "object",
  fields: [
    { name: "copyright", title: "Autortiesības", type: "localeString" },
    {
      name: "development",
      title: "Izstrādātāja info",
      type: "object",
      fields: [
        { name: "text", title: "Teksts", type: "string" },
        { name: "url", title: "Saite", type: "url" },
      ],
    },
    {
      name: "sections",
      title: "Kājenes sadaļas",
      type: "object",
      fields: [
        { name: "description", title: "Apraksts", type: "localeString" },
        {
          name: "links",
          title: "Saites sadaļa",
          type: "object",
          fields: [{ name: "title", title: "Virsraksts", type: "localeString" }],
        },
        {
          name: "contact",
          title: "Kontakti",
          type: "object",
          fields: [{ name: "title", title: "Virsraksts", type: "localeString" }],
        },
      ],
    },
  ],
});
