import { defineField } from "sanity";

export default defineField({
  name: "hero_group",
  title: "Galvenā Ekrāna Sadaļa (Hero)",
  type: "object",
  fields: [
    { name: "backgroundImage", title: "Fona bilde", type: "image", options: { hotspot: true } },
    {
      name: "cta1",
      title: "Call To Action Poga 1",
      type: "object",
      fields: [
        { name: "lv", title: "LV", type: "string" },
        { name: "en", title: "EN", type: "string" },
        { name: "ru", title: "RU", type: "string" },
        { name: "link", title: "Saite", type: "string" },
      ],
    },
    {
      name: "cta2",
      title: "Call To Action Poga 2",
      type: "object",
      fields: [
        { name: "lv", title: "LV", type: "string" },
        { name: "en", title: "EN", type: "string" },
        { name: "ru", title: "RU", type: "string" },
        { name: "link", title: "Saite", type: "string" },
      ],
    },
    { name: "hero_about", title: "Hero Par mums teksts", type: "localeString" },
    { name: "hero_services", title: "Hero Pakalpojumi teksts", type: "localeString" },
    { name: "hero_contact", title: "Hero Kontakti teksts", type: "localeString" },
  ],
});
