// Šī funkcija pārveido Sanity datus atpakaļ vecajā 'siteData' formātā
export function adaptSanityData(data: any) {
  // 1. Pārveido 'services' sarakstu
  const adaptedServicesList = data.services.map((service: any) => ({
    id: service._id.replace("service-", ""), // Atgriežam veco ID formātu
    slug: service.slug?.current || "",
    title: service.title,
    description: service.description,
    services: service.servicesList, // Atceries, ka mēs pārsaucām šo lauku shēmā
    image: service.image, // Šis tagad ir Sanity attēla OBJEKTS, nevis string
  }));

  // 2. Saliekam visu atpakaļ vienā lielā objektā
  const siteData = {
    general: {
      ...data.settings.general_group,
      barbers: data.barbers || [], // Pievienojam bārddziņus no atsevišķa vaicājuma
    },
    navigation: data.settings.navigation_group,
    hero: data.settings.hero_group,
    contacts: data.settings.contacts_group,
    services: {
      services_section: data.settings.services_section_group,
      services_list: adaptedServicesList, // Izmantojam mūsu pārveidoto sarakstu
    },
    about: {
      ...data.settings.about_group,
      image: data.settings.about_group.backgroundImage,
    },
    gallery: data.gallery || [],
    reviews: data.settings.reviews_group,
    ribbons: data.settings.ribbons_group,
    contact_form: data.settings.contact_form_group,
    working_time: data.settings.working_time_group,
    modals: data.settings.modals_group,
    pages: {
      ...data.settings.pages_group,
      about_page: {
        ...data.settings.pages_group?.about_page,
        businessHighlights: data.settings.pages_group?.about_page?.businessHighlights || {
          highlight1: { title: { lv: "", en: "", ru: "" }, subtitle: { lv: "", en: "", ru: "" } },
          highlight2: { subtitle: { lv: "", en: "", ru: "" } },
          highlight3: { title: "", subtitle: { lv: "", en: "", ru: "" } },
          highlight4: { title: "", subtitle: { lv: "", en: "", ru: "" } },
        },
      },
    },
    footer: data.settings.footer_group,
    errors: data.settings.errors_group,
  };

  return siteData;
}
