import { defineField } from "sanity";

export default defineField({
  name: "reviews_group",
  title: "Atsauksmju Sadaļa",
  type: "object",
  fields: [
    { name: "title", title: "Virsraksts", type: "localeString" },
    { name: "ctaButton", title: "Poga 'Atstāt atsauksmi'", type: "localeString" },
  ],
});
