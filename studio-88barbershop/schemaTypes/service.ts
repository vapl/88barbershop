import { defineField, defineType } from "sanity"

export default defineType({
  name: "service",
  title: "Pakalpojumu Grupa",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Grupas Nosaukums",
      type: "object",
      fields: [
        { name: "lv", title: "Latviski", type: "string" },
        { name: "en", title: "Angliski", type: "string" },
        { name: "ru", title: "Krieviski", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Identifikators (Slug)",
      type: "slug",
      description:
        'Īsais nosaukums kodam (piemēram: "haircut"). NEMAINĪT vēlāk – tiek izmantots kodā!',
      options: {
        source: "title.lv",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Grupas Apraksts",
      type: "object",
      fields: [
        { name: "lv", title: "Latviski", type: "string" },
        { name: "en", title: "Angliski", type: "string" },
        { name: "ru", title: "Krieviski", type: "string" },
      ],
    }),

    defineField({
      name: "servicesList",
      title: "Pakalpojumu Cenrādis",
      type: "array",
      of: [
        defineField({
          name: "serviceItem",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Pakalpojuma Nosaukums",
              type: "object",
              fields: [
                { name: "lv", title: "Latviski", type: "string" },
                { name: "en", title: "Angliski", type: "string" },
                { name: "ru", title: "Krieviski", type: "string" },
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "note",
              title: "Piezīme (nav obligāta)",
              type: "object",
              fields: [
                { name: "lv", title: "Latviski", type: "string" },
                { name: "en", title: "Angliski", type: "string" },
                { name: "ru", title: "Krieviski", type: "string" },
              ],
            }),
            defineField({
              name: "price",
              title: "Cena",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pricesByLocation",
              title: "Cenas pa saloniem",
              type: "object",
              fields: [
                { name: "centrs", title: "Centrs", type: "string" },
                { name: "pardaugava", title: "Pārdaugava", type: "string" },
              ],
              description: "Ja aizpildi šeit, tiks izmantotas cenas pa saloniem.",
            }),
          ],
          preview: {
            select: {
              title: "name.lv",
              subtitle: "price",
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title || "—",
                subtitle: subtitle ? `Cena: ${subtitle}` : "",
              }
            },
          },
        }),
      ],
    }),
  ],

  // 🔹 Preview, kas parāda LV nosaukumu un slug
  preview: {
    select: {
      titleLv: "title.lv",
      titleEn: "title.en",
      slug: "slug.current",
    },
    prepare({ titleLv, titleEn, slug }) {
      return {
        title: titleLv || titleEn || "— Bez nosaukuma —",
        subtitle: slug ? `slug: ${slug}` : "",
      }
    },
  },
})
