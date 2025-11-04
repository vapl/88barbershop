// studio-88barbershop/schemaTypes/service.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Pakalpojumu Grupa', // Piemēram, "Matu griešana" vai "Bārdas kopšana"
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Grupas Nosaukums',
      type: 'object', // Tulkojumiem
      fields: [
        {name: 'lv', title: 'Latviski', type: 'string'},
        {name: 'en', title: 'Angliski', type: 'string'},
        {name: 'ru', title: 'Krieviski', type: 'string'},
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Identifikators (Slug)',
      type: 'slug',
      description:
        'Īsais nosaukums kodam (piemēram: "haircut"). NEMAIMĪT vēlāk! Šis tiek izmantots kodā.',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Grupas Apraksts',
      type: 'object',
      fields: [
        {name: 'lv', title: 'Latviski', type: 'string'},
        {name: 'en', title: 'Angliski', type: 'string'},
        {name: 'ru', title: 'Krieviski', type: 'string'},
      ],
    }),
    defineField({
      name: 'servicesList', // Šis ir tavs iekšējais "services" masīvs
      title: 'Pakalpojumu cenrādis šai grupai',
      type: 'array', // Mēs norādām, ka šis būs saraksts (masīvs)
      of: [
        {
          type: 'object', // Katrs ieraksts sarakstā būs objekts
          fields: [
            // Ar šādiem laukiem:
            defineField({
              name: 'name',
              title: 'Pakalpojuma nosaukums', // Piem., "Vīriešu griezums"
              type: 'object',
              fields: [
                {name: 'lv', title: 'Latviski', type: 'string'},
                {name: 'en', title: 'Angliski', type: 'string'},
                {name: 'ru', title: 'Krieviski', type: 'string'},
              ],
            }),
            defineField({
              name: 'note',
              title: 'Piezīme (nav obligāta)', // Piem., "Līdz 12 gadiem"
              type: 'object',
              fields: [
                {name: 'lv', title: 'Latviski', type: 'string'},
                {name: 'en', title: 'Angliski', type: 'string'},
                {name: 'ru', title: 'Krieviski', type: 'string'},
              ],
            }),
            defineField({
              name: 'price',
              title: 'Cena', // Piem., "€28"
              type: 'string', // Izmantojam string, lai klients var rakstīt "€" zīmi
            }),
          ],
        },
      ],
    }),
  ],
})
