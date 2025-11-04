// studio-88barbershop/schemaTypes/settings.ts
// --- PILNĀ, PAPILDINĀTĀ VERSIJA ---

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Lapas Iestatījumi',
  type: 'document',
  fields: [
    // ——— GENERAL (Vispārīgi) ———
    defineField({
      name: 'general_group',
      title: 'Vispārīgā Informācija',
      type: 'object',
      fields: [
        defineField({
          name: 'siteName',
          title: 'Lapas Nosaukums (iekšējai lietošanai)',
          type: 'string',
        }),
        defineField({name: 'slogan', title: 'Slogans', type: 'localeString'}),
        defineField({
          name: 'description',
          title: 'Lapas Apraksts (SEO)',
          type: 'localeString',
        }),
      ],
    }),

    // ——— NAVIGATION (Navigācija) ———
    defineField({
      name: 'navigation_group',
      title: 'Navigācija',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', title: 'ID (piem. "home")', type: 'string'},
            {name: 'label', title: 'Nosaukums', type: 'localeString'},
            {name: 'href', title: 'Saite (piem. "/")', type: 'string'},
          ],
        },
      ],
    }),

    // ——— HERO (Galvenais ekrāns) - PAPILDINĀTS ———
    defineField({
      name: 'hero_group',
      title: 'Galvenā Ekrāna Sadaļa (Hero)',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Fona Bilde',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'cta1',
          title: 'CTA Poga 1',
          type: 'object',
          fields: [
            {name: 'lv', title: 'LV', type: 'string'},
            {name: 'en', title: 'EN', type: 'string'},
            {name: 'ru', title: 'RU', type: 'string'},
            {name: 'link', title: 'Saite', type: 'string'},
          ],
        }),
        defineField({
          name: 'cta2',
          title: 'CTA Poga 2',
          type: 'object',
          fields: [
            {name: 'lv', title: 'LV', type: 'string'},
            {name: 'en', title: 'EN', type: 'string'},
            {name: 'ru', title: 'RU', type: 'string'},
            {name: 'link', title: 'Saite', type: 'string'},
          ],
        }),
        defineField({
          name: 'hero_about',
          title: 'Hero "Par Mums" teksts',
          type: 'localeString',
        }),
        defineField({
          name: 'hero_services',
          title: 'Hero "Pakalpojumi" teksts',
          type: 'localeString',
        }),
        defineField({
          name: 'hero_contact',
          title: 'Hero "Kontakti" teksts',
          type: 'localeString',
        }),
      ],
    }),

    // ——— CONTACTS (Kontakti) ———
    defineField({
      name: 'contacts_group',
      title: 'Kontaktinformācija',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefons',
          type: 'object',
          fields: [
            {name: 'label', title: 'Teksts (piem. +371 ...)', type: 'string'},
            {name: 'link', title: 'Sazvanīšanas saite (piem. +371...)', type: 'string'},
          ],
        }),
        defineField({
          name: 'email',
          title: 'E-pasts',
          type: 'object',
          fields: [
            {name: 'label', title: 'Teksts (piem. info@...)', type: 'string'},
            {name: 'link', title: 'E-pasta saite (piem. mailto:info@...)', type: 'string'},
          ],
        }),
        defineField({
          name: 'address',
          title: 'Adrese',
          type: 'object',
          fields: [
            {name: 'label', title: 'Teksts (piem. Akmeņu iela 16...)', type: 'string'},
            {name: 'link', title: 'Google Maps Saite', type: 'url'},
          ],
        }),
        defineField({
          name: 'social',
          title: 'Sociālie tīkli',
          type: 'object',
          fields: [
            {name: 'instagram', title: 'Instagram', type: 'url'},
            {name: 'facebook', title: 'Facebook', type: 'url'},
          ],
        }),
      ],
    }),

    // ——— SERVICES SECTION (Pakalpojumu sadaļa) - JAUNS ———
    defineField({
      name: 'services_section_group',
      title: 'Pakalpojumu Sadaļa (Galvenā lapa)',
      type: 'object',
      fields: [
        {name: 'title', title: 'Virsraksts', type: 'localeString'},
        {name: 'subtitle', title: 'Apakšvirsraksts', type: 'localeString'},
        {
          name: 'cards',
          title: 'Kartītes',
          type: 'object',
          fields: [
            {name: 'label', title: 'Kartītes "Label"', type: 'localeString'},
            {name: 'cta_button', title: 'Kartītes "CTA Poga"', type: 'localeString'},
            {
              name: 'haircut',
              title: 'Matu Griešanas Kartīte',
              type: 'object',
              fields: [
                {name: 'title', title: 'Virsraksts', type: 'localeString'},
                {name: 'description', title: 'Apraksts', type: 'localeString'},
              ],
            },
            {
              name: 'shave',
              title: 'Skūšanās Kartīte',
              type: 'object',
              fields: [
                {name: 'title', title: 'Virsraksts', type: 'localeString'},
                {name: 'description', title: 'Apraksts', type: 'localeString'},
              ],
            },
            {
              name: 'combo',
              title: 'Komplekta Kartīte',
              type: 'object',
              fields: [
                {name: 'title', title: 'Virsraksts', type: 'localeString'},
                {name: 'description', title: 'Apraksts', type: 'localeString'},
              ],
            },
          ],
        },
      ],
    }),

    // ——— ABOUT (Par Mums) - JAUNS ———
    defineField({
      name: 'about_group',
      title: 'Par Mums Sadaļa',
      type: 'object',
      fields: [
        {name: 'experience', title: 'Pieredzes teksts', type: 'localeString'},
        {name: 'title', title: 'Virsraksts', type: 'localeString'},
        {name: 'description_short', title: 'Īsais apraksts', type: 'localeString'},
        {name: 'description_long', title: 'Garais apraksts', type: 'localeString'},
        {name: 'ctaButton', title: 'Poga "Uzzināt vairāk"', type: 'localeString'},
        defineField({
          name: 'backgroundImage',
          title: 'Fona Bilde',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),

    // ——— REVIEWS (Atsauksmes) - JAUNS ———
    defineField({
      name: 'reviews_group',
      title: 'Atsauksmju Sadaļa',
      type: 'object',
      fields: [
        {name: 'title', title: 'Virsraksts', type: 'localeString'},
        {name: 'ctaButton', title: 'Poga "Atstāt atsauksmi"', type: 'localeString'},
      ],
    }),

    // ——— RIBBONS (Skrejošās lentas) - JAUNS ———
    defineField({
      name: 'ribbons_group',
      title: 'Skrejošās Lentas',
      type: 'object',
      fields: [
        {
          name: 'hair',
          title: 'Matu lenta',
          type: 'object',
          fields: [
            {name: 'lv', title: 'LV', type: 'array', of: [{type: 'string'}]},
            {name: 'en', title: 'EN', type: 'array', of: [{type: 'string'}]},
            {name: 'ru', title: 'RU', type: 'array', of: [{type: 'string'}]},
          ],
        },
        {
          name: 'beard',
          title: 'Bārdas lenta',
          type: 'object',
          fields: [
            {name: 'lv', title: 'LV', type: 'array', of: [{type: 'string'}]},
            {name: 'en', title: 'EN', type: 'array', of: [{type: 'string'}]},
            {name: 'ru', title: 'RU', type: 'array', of: [{type: 'string'}]},
          ],
        },
      ],
    }),

    // ——— CONTACT FORM (Kontaktu Forma) - JAUNS ———
    defineField({
      name: 'contact_form_group',
      title: 'Kontaktu Formas Teksti',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Lauku nosaukumi',
          type: 'object',
          fields: [
            {name: 'name', title: 'Vārds', type: 'localeString'},
            {name: 'email', title: 'E-pasts', type: 'localeString'},
            {name: 'message', title: 'Ziņojums', type: 'localeString'},
          ],
        },
        {name: 'button', title: 'Pogas teksts', type: 'localeString'},
      ],
    }),

    // ——— WORKING TIME (Darba Laiks) - JAUNS ———
    defineField({
      name: 'working_time_group',
      title: 'Darba Laiks',
      type: 'object',
      fields: [
        {
          name: 'days',
          title: 'Dienas',
          type: 'object',
          fields: [
            {name: 'working_days', title: 'Darba dienas', type: 'localeString'},
            {name: 'closed_days', title: 'Brīvdienas', type: 'localeString'},
          ],
        },
        {
          name: 'hours',
          title: 'Stundas',
          type: 'object',
          fields: [
            {name: 'working_hours', title: 'Darba stundas', type: 'string'},
            {name: 'closed_hours', title: 'Brīvdienu teksts', type: 'localeString'},
          ],
        },
      ],
    }),

    // ——— MODALS (Modālie logi) - JAUNS ———
    defineField({
      name: 'modals_group',
      title: 'Modālo Logu Teksti',
      type: 'object',
      fields: [
        {
          name: 'modal',
          title: 'Galvenais modālais logs',
          type: 'object',
          fields: [
            {name: 'title', title: 'Virsraksts', type: 'localeString'},
            {name: 'call', title: '"Zvanīt" teksts', type: 'localeString'},
            {name: 'cancel_button', title: '"Atcelt" poga', type: 'localeString'},
          ],
        },
      ],
    }),

    // ——— PAGES (Lapas) - JAUNS ———
    defineField({
      name: 'pages_group',
      title: 'Lapas (specifiski teksti)',
      type: 'object',
      fields: [
        {
          name: 'contact_page',
          title: 'Kontaktu Lapas Teksti',
          type: 'object',
          fields: [
            {name: 'heading_intro', title: 'Ievada virsraksts', type: 'localeString'},
            {name: 'heading_map', title: 'Kartes virsraksts', type: 'localeString'},
          ],
        },
        {
          name: 'about_page',
          title: 'Par Mums Lapas Teksti',
          type: 'object',
          fields: [
            {name: 'heading_intro', title: 'Ievada virsraksts', type: 'localeString'},
            {name: 'heading_team', title: 'Komandas virsraksts', type: 'localeString'},
            {
              name: 'businessHighlights',
              title: 'Biznesa Aktualitātes',
              type: 'object',
              fields: [
                {
                  name: 'highlight1',
                  title: 'Biznesa Aktualitāte 1 (Stāvvieta)',
                  type: 'object',
                  fields: [
                    {name: 'title', title: 'Nosaukums', type: 'localeString'},
                    {name: 'subtitle', title: 'Apakšvirsraksts', type: 'localeString'},
                  ],
                },
                {
                  name: 'highlight2',
                  title: 'Biznesa Aktualitāte 2 (Bārddziņi)',
                  type: 'object',
                  fields: [{name: 'subtitle', title: 'Apakšvirsraksts', type: 'localeString'}],
                },
                {
                  name: 'highlight3',
                  title: 'Biznesa Aktualitāte 3 (Meistarība)',
                  type: 'object',
                  fields: [
                    {name: 'title', title: 'Nosaukums', type: 'string'},
                    {name: 'subtitle', title: 'Apakšvirsraksts', type: 'localeString'},
                  ],
                },
                {
                  name: 'highlight4',
                  title: 'Biznesa Aktualitāte 4 (Pieredze)',
                  type: 'object',
                  fields: [
                    {name: 'title', title: 'Nosaukums', type: 'string'},
                    {name: 'subtitle', title: 'Apakšvirsraksts', type: 'localeString'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    // ——— FOOTER (Kājene) - JAUNS ———
    defineField({
      name: 'footer_group',
      title: 'Kājene (Footer)',
      type: 'object',
      fields: [
        {name: 'copyright', title: 'Autortiesību teksts', type: 'localeString'},
        {
          name: 'development',
          title: 'Izstrādātāja info',
          type: 'object',
          fields: [
            {name: 'text', title: 'Teksts', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
        {
          name: 'sections',
          title: 'Kājenes sadaļas',
          type: 'object',
          fields: [
            {name: 'description', title: 'Apraksta sadaļa', type: 'localeString'},
            {
              name: 'links',
              title: 'Saites sadaļa',
              type: 'object',
              fields: [{name: 'title', title: 'Virsraksts', type: 'localeString'}],
            },
            {
              name: 'contact',
              title: 'Kontaktu sadaļa',
              type: 'object',
              fields: [{name: 'title', title: 'Virsraksts', type: 'localeString'}],
            },
          ],
        },
      ],
    }),

    // ——— ERRORS (Kļūdas) - JAUNS ———
    defineField({
      name: 'errors_group',
      title: 'Kļūdu Paziņojumi',
      type: 'object',
      fields: [
        {name: 'name_error', title: 'Vārda kļūda', type: 'localeString'},
        {name: 'email_error', title: 'E-pasta kļūda', type: 'localeString'},
        {name: 'empty_error', title: 'Tukšu lauku kļūda', type: 'localeString'},
      ],
    }),
  ],
  // Singleton dokumenta iestatījumi (lai nevar izveidot jaunu)
  //__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
})
