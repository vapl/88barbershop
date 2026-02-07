import { defineField, defineType } from "sanity";

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
              name: "locations",
              title: "Pieejams Barbershopos",
              type: "array",
              of: [
                {
                  type: "string",
                  options: {
                    list: [
                      { title: "Ģertrūdes 34 barbershop", value: "gertrudes34" },
                      { title: "Akmeņu 16 barbershop", value: "akmenu16" },
                    ],
                  },
                },
              ],
              options: {
                layout: "list",
              },
              description: "Ja atstāsi tukšu, pakalpojums būs pieejams abos Barbershopos.",
              validation: (Rule) => Rule.unique(),
            }),
            defineField({
              name: "pricesByLocation",
              title: "Cenas pa Barbershopiem",
              type: "object",
              fields: [
                { name: "gertrudes34", title: "Ģertrūdes 34", type: "string" },
                { name: "akmenu16", title: "Akmeņu 16", type: "string" },
              ],
              description: "Ja aizpildi šeit, tiks izmantotas cenas pa Barbershopiem.",
            }),
          ],
          preview: {
            select: {
              title: "name.lv",
              subtitle: "price",
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              return {
                title: title || "—",
                subtitle: subtitle ? `Cena: ${subtitle}` : "",
              };
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
      };
    },
  },
});
