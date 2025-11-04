// studio-88barbershop/schemaTypes/localeString.ts
import {defineType} from 'sanity'

// Šis definē jaunu, atkārtoti lietojamu tipu ar nosaukumu 'localeString'
export default defineType({
  name: 'localeString',
  title: 'Vairāku valodu teksts',
  type: 'object',
  fields: [
    {name: 'lv', title: 'Latviski', type: 'string'},
    {name: 'en', title: 'Angliski', type: 'string'},
    {name: 'ru', title: 'Krieviski', type: 'string'},
  ],
})
