import { defineType, defineField } from "sanity";

// Importē visus apakšfailus
import general from "./globals/general";
import navigation from "./globals/navigation";
import contacts from "./globals/contacts";
import workingTime from "./globals/workingTime";
import modals from "./globals/modals";
import footer from "./globals/footer";
import errors from "./globals/errors";
import hero from "./home/hero";
import servicesSection from "./home/servicesSection";
import ribbons from "./home/ribbons";
import reviews from "./home/reviewsSection";
import about from "./about/about";
import privacyGroup from "./privacy/privacy";
import contactForm from "./contact/contactForm";
import pagesGroup from "./pages/pagesGroup";

export default defineType({
  name: "settings",
  title: "Lapas Iestatījumi",
  type: "document",

  // 🔹 Grupas (cilnes kreisajā panelī)
  groups: [
    { name: "general", title: "Vispārīgi" },
    { name: "navigation", title: "Navigācija" },
    { name: "home", title: "Galvenā Lapa" },
    { name: "about", title: "Par Mums" },
    { name: "contact", title: "Kontakti" },
    { name: "system", title: "Sistēma" },
  ],

  fields: [
    defineField({ ...general, group: "general" }),
    defineField({ ...navigation, group: "navigation" }),

    // Galvenā lapa
    defineField({ ...hero, group: "home" }),
    defineField({ ...servicesSection, group: "home" }),
    defineField({ ...reviews, group: "home" }),
    defineField({ ...ribbons, group: "home" }),

    // Par mums
    defineField({ ...about, group: "about" }),

    // Kontakti
    defineField({ ...contacts, group: "contact" }),
    defineField({ ...contactForm, group: "contact" }),
    defineField({ ...workingTime, group: "contact" }),

    // Sistēmas/tehniskie
    defineField({ ...modals, group: "system" }),
    defineField({ ...footer, group: "system" }),
    defineField({ ...errors, group: "system" }),
    defineField({ ...pagesGroup, group: "system" }),
    defineField({ ...privacyGroup, group: "system" }),
  ],

  preview: {
    select: {
      title: "general_group.siteName",
      subtitle: "general_group.slogan.lv",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Lapas Iestatījumi",
        subtitle: subtitle || "88 Barbershop konfigurācija",
      };
    },
  },
});
