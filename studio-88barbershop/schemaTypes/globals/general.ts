import { defineField } from "sanity";

export default defineField({
  name: "general_group",
  title: "Vispārīgā Informācija",
  type: "object",
  fields: [
    { name: "siteName", title: "Lapas Nosaukums", type: "string" },
    { name: "slogan", title: "Slogans", type: "localeString" },
    { name: "description", title: "Lapas Apraksts (SEO)", type: "localeString" },
  ],
});
