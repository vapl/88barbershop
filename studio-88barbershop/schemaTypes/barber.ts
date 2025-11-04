import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'barber',
  title: 'Bārdzinis',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vārds',
      type: 'object',
      fields: [
        {name: 'lv', title: 'Latviski', type: 'string'},
        {name: 'en', title: 'Angliski', type: 'string'},
        {name: 'ru', title: 'Krieviski', type: 'string'},
      ],
    }),
    defineField({
      name: 'position',
      title: 'Amats',
      type: 'object', // Atkal objekts tulkojumiem
      fields: [
        {name: 'lv', title: 'Latviski', type: 'string'},
        {name: 'en', title: 'Angliski', type: 'string'},
        {name: 'ru', title: 'Krieviski', type: 'string'},
      ],
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'social',
      title: 'Sociālie tīkli',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'facebook', title: 'Facebook URL', type: 'url'},
      ],
    }),
  ],
})
