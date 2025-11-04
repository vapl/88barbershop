import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: '88Barbershop',

  projectId: 'rfjv8kby',
  dataset: 'production',
  basePath: '/admin',
  unstable_noStore: true,

  plugins: [
    structureTool({
      // Pielāgota struktūra
      structure: (S) =>
        S.list()
          .title('Saturs')
          .items([
            // Mūsu jaunais "Singleton" iestatījumu dokuments
            S.listItem().title('Lapas Iestatījumi').child(
              S.document().schemaType('settings').documentId('settings'), // Fiksēts ID
            ),

            // Pievieno atdalītāju
            S.divider(),

            // Pārējie dokumentu tipi (kas ir saraksti)
            S.documentTypeListItem('barber').title('Bārddziņi'),
            S.documentTypeListItem('service').title('Pakalpojumu Grupas'),
            S.documentTypeListItem('gallery').title('Galerija'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
