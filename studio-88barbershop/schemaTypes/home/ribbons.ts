import { defineField } from "sanity";

export default defineField({
  name: "ribbons_group",
  title: "Skrejošās Lentas",
  type: "object",
  fields: [
    {
      name: "hair",
      title: "Matu Lenta",
      type: "object",
      fields: [
        { name: "lv", title: "LV", type: "array", of: [{ type: "string" }] },
        { name: "en", title: "EN", type: "array", of: [{ type: "string" }] },
        { name: "ru", title: "RU", type: "array", of: [{ type: "string" }] },
      ],
    },
    {
      name: "beard",
      title: "Bārdas Lenta",
      type: "object",
      fields: [
        { name: "lv", title: "LV", type: "array", of: [{ type: "string" }] },
        { name: "en", title: "EN", type: "array", of: [{ type: "string" }] },
        { name: "ru", title: "RU", type: "array", of: [{ type: "string" }] },
      ],
    },
  ],
});
