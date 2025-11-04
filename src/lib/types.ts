export interface LocaleString {
  lv: string;
  en: string;
  ru: string;
}

export interface LocaleStringArray {
  lv: string[];
  en: string[];
  ru: string[];
}

export interface NavigationItem {
  id: string;
  label: LocaleString;
  href: string;
}

export interface ContactsData {
  phone: { label: string; link: string };
  email: { label: string; link: string };
  address: { label: string; link: string };
  social: { instagram: string; facebook: string };
}

export interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
}

export interface Barber {
  _id: string;
  name: LocaleString;
  position: LocaleString;
  social: SocialLinks;
  image: Image;
}

export interface GeneralData {
  siteName: string;
  slogan: LocaleString;
  description: LocaleString;
  barbers: Barber[];
}

export interface WorkingTimeData {
  days: {
    working_days: LocaleString;
    closed_days: LocaleString;
  };
  hours: {
    working_hours: string;
    closed_hours: LocaleString;
  };
}

export interface FooterData {
  copyright: LocaleString;
  development: {
    text: string;
    url: string;
  };
  sections: {
    description: LocaleString;
    links: { title: LocaleString };
    contact: { title: LocaleString };
  };
}

export interface HeroCtaButton extends LocaleString {
  link: string;
}

export interface HeroData {
  backgroundImage: Image;
  cta1: HeroCtaButton;
  cta2: HeroCtaButton;
  hero_about: LocaleString;
  hero_services: LocaleString;
  hero_contact: LocaleString;
}

export interface RibbonsData {
  hair: LocaleStringArray;
  beard: LocaleStringArray;
}

export interface ServicePriceItem {
  name: LocaleString;
  note?: LocaleString;
  price: string;
}

export interface ServiceGroup {
  id: string;
  slug: string;
  title: LocaleString;
  description: LocaleString;
  services: ServicePriceItem[];
}

export interface ServiceCardItem {
  title: LocaleString;
  description: LocaleString;
}

export interface ServiceCards {
  label: LocaleString;
  cta_button: LocaleString;
  haircut: ServiceCardItem;
  shave: ServiceCardItem;
  combo: ServiceCardItem;
}

export interface ServicesSectionData {
  title: LocaleString;
  subtitle: LocaleString;
  cards: ServiceCards;
}

export interface ServicesData {
  services_section: ServicesSectionData;
  services_list: ServiceGroup[];
}

export interface ContactFormData {
  label: {
    name: LocaleString;
    email: LocaleString;
    message: LocaleString;
  };
  button: LocaleString;
}

export interface ErrorsData {
  name_error: LocaleString;
  email_error: LocaleString;
  empty_error: LocaleString;
}

export interface AboutData {
  experience: LocaleString;
  title: LocaleString;
  description_short: LocaleString;
  description_long: LocaleString;
  ctaButton: LocaleString;
  image: Image;
}

export interface PagesData {
  contact_page: {
    heading_intro: LocaleString;
    heading_map: LocaleString;
  };
  about_page: {
    heading_intro: LocaleString;
    heading_team: LocaleString;
    businessHighlights: {
      highlight1: {
        title: LocaleString;
        subtitle: LocaleString;
      };
      highlight2: {
        subtitle: LocaleString;
      };
      highlight3: {
        title: string;
        subtitle: LocaleString;
      };
      highlight4: {
        title: string;
        subtitle: LocaleString;
      };
    };
  };
}

export interface ReviewsSectionData {
  title: LocaleString;
  ctaButton: LocaleString;
}

export interface ModalData {
  modal: {
    title: LocaleString;
    call: LocaleString;
    cancel_button: LocaleString;
  };
}

// Sanity "raw" struktūra — kā tiek atgriezti dati no query
export interface SanityRawData {
  barbers: Barber[];
  gallery: Image[];
  services: {
    _id: string;
    slug?: { current: string };
    title: LocaleString;
    description: LocaleString;
    servicesList: ServicePriceItem[];
    image: Image;
  }[];
  settings: {
    general_group: GeneralData;
    navigation_group: NavigationItem[];
    hero_group: HeroData;
    contacts_group: ContactsData;
    services_section_group: ServicesSectionData;
    about_group: AboutData & { backgroundImage: Image };
    reviews_group: ReviewsSectionData;
    ribbons_group: RibbonsData;
    contact_form_group: ContactFormData;
    working_time_group: WorkingTimeData;
    modals_group: ModalData;
    pages_group: PagesData;
    footer_group: FooterData;
    errors_group: ErrorsData;
  };
}

export interface SiteData {
  general: GeneralData;
  navigation: NavigationItem[];
  hero: HeroData;
  contacts: ContactsData;
  services: ServicesData;
  about: AboutData;
  gallery: Image[];
  reviews: ReviewsSectionData;
  ribbons: RibbonsData;
  contact_form: ContactFormData;
  working_time: WorkingTimeData;
  modals: ModalData;
  pages: PagesData;
  footer: FooterData;
  errors: ErrorsData;
}
