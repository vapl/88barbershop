import { SanityRawData, ServiceGroup, SiteData } from "./types";

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
      services_section: {
        ...data.settings.services_section_group,
        backgroundImage: data.settings.services_section_group.backgroundImage,
      },
      services_list: adaptedServicesList,
    },
    about: {
      ...data.settings.about_group,
      image: data.settings.about_group.backgroundImage,
    },
    gallery: data.gallery || [],
    reviews: data.settings.reviews_group,
    ribbons: data.settings.ribbons_group,
    contact_form: {
      ...data.settings.contact_form_group,
      privacy_policy_message: data.settings.contact_form_group?.privacy_policy_message || {
        lv: "Nosūtot ziņu, jūs piekrītat, ka jūsu dati tiks izmantoti tikai saziņai un netiks glabāti.",
        en: "By sending a message, you agree that your data will be used only for communication and will not be stored.",
        ru: "Отправляя сообщение, вы соглашаетесь, что ваши данные будут использованы только для связи и не будут сохраняться.",
      },
    },
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
    errors: data.settings.errors_group || {
      name_error: { lv: "", en: "", ru: "" },
      email_error: { lv: "", en: "", ru: "" },
      empty_error: { lv: "", en: "", ru: "" },
      success: {
        lv: "Ziņojums nosūtīts veiksmīgi!",
        en: "Message sent successfully!",
        ru: "Сообщение успешно отправлено!",
      },
      message_short_error: { lv: "", en: "", ru: "" },
      message_long_error: { lv: "", en: "", ru: "" },
    },
  };

  return siteData;
}
