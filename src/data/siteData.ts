const currentYear = () => {
  const d = new Date();
  let year = d.getFullYear();
  return year;
};

export const siteData = {
  general: {
    siteName: "88 Barbershop",
    slogan: {
      lv: "Stils. Precizitāte. Pārliecība.",
      en: "Style. Precision. Confidence.",
      ru: "Стиль. Точность. Уверенность.",
    },
    description: {
      lv: "Moderns barbershops Rīgā — profesionāla matu griešana un bārdas kopšana.",
      en: "Modern barbershop in Riga offering professional haircuts and beard styling.",
      ru: "Современный барбершоп в Риге — профессиональные стрижки и уход за бородой.",
    },
  },

  navigation: [
    {
      id: "home",
      label: { lv: "Sākums", en: "Home", ru: "Главная" },
      href: "/",
    },
    {
      id: "about",
      label: { lv: "Par mums", en: "About", ru: "О нас" },
      href: "/about",
    },
    {
      id: "services",
      label: { lv: "Pakalpojumi", en: "Services", ru: "Услуги" },
      href: "/services",
    },
    {
      id: "contact",
      label: { lv: "Kontakti", en: "Contact", ru: "Контакты" },
      href: "/contact",
    },
  ],

  hero: {
    title: {
      lv: "Moderns barbershop Rīgas centrā",
      en: "Modern barbershop in the heart of Riga",
      ru: "Современный барбершоп в центре Риги",
    },
    subtitle: {
      lv: "Profesionāli griezumi, fades un bārdas stilings.",
      en: "Professional cuts, fades & beard styling.",
      ru: "Профессиональные стрижки, фейды и оформление бороды.",
    },
    backgroundImage: "/images/hero.jpg",
    cta: {
      lv: "Rezervēt vizīti",
      en: "Book appointment",
      ru: "Записаться",
      link: "/book",
    },
  },

  services: [
    {
      id: "cut",
      title: {
        lv: "Matu griešana",
        en: "Haircut",
        ru: "Стрижка волос",
      },
      description: {
        lv: "Klasisks vai moderns matu griezums ar profesionālu pieeju.",
        en: "Classic or modern haircut with professional precision.",
        ru: "Классическая или современная стрижка с профессиональным подходом.",
      },
      price: "25€",
      duration: "40 min",
      image: "/images/services/haircut.jpg",
    },
    {
      id: "beard",
      title: {
        lv: "Bārdas korekcija",
        en: "Beard Trim",
        ru: "Коррекция бороды",
      },
      description: {
        lv: "Bārdas apgriešana, formas uzturēšana un kopšana.",
        en: "Beard trimming and maintenance for a clean look.",
        ru: "Оформление и уход за бородой.",
      },
      price: "15€",
      duration: "25 min",
      image: "/images/services/beard.jpg",
    },
  ],

  contacts: {
    phone: { label: "+371 28 816 466", link: "tel:+37128816466" },
    email: { label: "88barbershop@gmail.com", link: "mailto:88barbershop@gmail.com" },
    address: {
      label: "Akmeņu iela 16, Rīga, LV-1048",
      link: "https://www.google.com/maps?q=Akmeņu+iela+16,+Rīga,+LV-1048",
    },
    social: {
      instagram: "https://www.instagram.com/barbershop88.lv/",
      facebook: "https://www.facebook.com/88barbershoplv",
    },
  },

  modals: {
    map_modal: {
      title: {
        lv: "Atvērt ar:",
        en: "Open width:",
        ru: "Открыть с помощью:",
      },
      cancel_button: {
        lv: "Atcelt",
        en: "Cancel",
        ru: "Отмена",
      },
    },
  },

  footer: {
    cpoyright: {
      lv: `© 2025${currentYear() !== 2025 ? "–" + currentYear() : ""} 88Barbershop. Visas tiesības aizsargātas.`,
      en: `© 2025${currentYear() !== 2025 ? "-" + currentYear : ""} 88Barbershop. All rights reserved.`,
      ru: `© 2025${currentYear() !== 2025 ? "–" + currentYear() : ""} 88Barbershop. Все права защищены.`,
    },
    development: {
      lv: {
        text: "Dizains un izstrāde — - Valdis Vaščenkovs",
        url: "https://valdisvascenkovs.dev", // temp
      },
      en: {
        text: "Design and development by - Valdis Vascenkovs",
        url: "https://valdisvascenkovs.dev", // temp
      },
      ru: {
        text: "Дизайн и разработка — - Валдис Ващенков.",
        url: "https://valdisvascenkovs.dev", // temp
      },
    },
    sections: {
      description: {
        lv: "88 Barbershop Rīgā apvieno mūsdienīgu stilu un klasisku meistarību. Piedāvājam vīriešu matu griezumus, fade stilus un bārdas kopšanu.",
        en: "Experience 88 Barbershop in Riga — where modern grooming meets timeless craftsmanship. Specializing in men’s haircuts, fades, and beard styling.",
        ru: "88 Barbershop в Риге сочетает современный стиль и классическое мастерство. Мы предлагаем мужские стрижки, fade и уход за бородой.",
      },
      links: {
        title: {
          lv: "Saites",
          en: "Quick links",
          ru: "Ссылки",
        },
      },
      contact: {
        title: {
          lv: "Kontakti",
          en: "Contacts",
          ru: "Контакты",
        },
        working: {
          lv: {
            days: [
              { label: "Pirm. – Sest.", hours: "09:00 – 20:00" },
              { label: "Svētdiena", hours: "SLĒGTS" },
            ],
          },
          en: {
            days: [
              { label: "Mon – Sat", hours: "09:00 – 20:00" },
              { label: "Sunday", hours: "CLOSED" },
            ],
          },
          ru: {
            days: [
              { label: "Пн – Сб", hours: "09:00 – 20:00" },
              { label: "Воскресенье", hours: "ЗАКРЫТО" },
            ],
          },
        },
      },
    },
  },
};
