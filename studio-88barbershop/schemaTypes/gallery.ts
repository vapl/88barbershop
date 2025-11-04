import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery', // Īsais nosaukums (tips)
  title: 'Galerija', // Nosaukums Sanity sānjoslā
  type: 'document', // <-- SVARĪGI: Šis ir dokuments, nevis lauks
  fields: [
    defineField({
      name: 'title',
      title: 'Nosaukums',
      type: 'string',
      initialValue: 'Galvenais Karuselis',
      hidden: true, // Paslēpjam, ja nevajag rediģēt
    }),
    defineField({
      name: 'images',
      title: 'Bildes',
      type: 'array',
      description: 'Bildes, kas rotēs karuselī. (Max 20 bildes)',
      validation: (Rule) => Rule.max(20),
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt teksts (Apraksts)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
})
