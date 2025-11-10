import { defineField } from "sanity";

export default defineField({
  name: "about_group",
  title: "Par Mums Sadaļa",
  type: "object",
  fields: [
    { name: "experience", title: "Pieredzes teksts", type: "localeString" },
    { name: "title", title: "Virsraksts", type: "localeString" },
    { name: "description_short", title: "Īsais apraksts", type: "localeString" },
    { name: "description_long", title: "Garais apraksts", type: "localeString" },
    { name: "ctaButton", title: "Poga 'Uzzināt vairāk'", type: "localeString" },
    {
      name: "backgroundImage",
      title: "Fona bilde",
      type: "image",
      options: { hotspot: true },
    },
  ],
});
