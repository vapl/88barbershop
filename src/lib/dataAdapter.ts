import { SanityRawData, ServiceGroup, SiteData } from "./types"; // ja vēl nav, izveido SiteData interfeisu, skat. zemāk

export function adaptSanityData(data: SanityRawData): SiteData {
  const adaptedServicesList: ServiceGroup[] = data.services.map((service) => ({
    id: service._id.replace("service-", ""),
    slug: service.slug?.current || "",
    title: service.title,
    description: service.description,
    services: service.servicesList,
    image: service.image,
  }));

  const siteData: SiteData = {
    general: {
      ...data.settings.general_group,
      barbers: data.barbers || [],
    },
    navigation: data.settings.navigation_group,
    hero: data.settings.hero_group,
    contacts: data.settings.contacts_group,
    services: {
      services_section: data.settings.services_section_group,
      services_list: adaptedServicesList,
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
        ...data.settings.pages_group.about_page,
        businessHighlights: data.settings.pages_group.about_page.businessHighlights || {
          highlight1: {
            title: { lv: "", en: "", ru: "" },
            subtitle: { lv: "", en: "", ru: "" },
          },
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
