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
    backgroundImage: "/images/hero_image.jpg",
    cta1: {
      lv: "Rezervēt vizīti",
      en: "Book appointment",
      ru: "Записаться",
      link: "/contact",
    },
    cta2: {
      lv: "Pakalpojumi",
      en: "Services",
      ru: "Услуги",
      link: "/services",
    },
  },

  services: {
    services_section: {
      title: {
        lv: "Pakalpojumi",
        en: "Services",
        ru: "Услуги",
      },
      subtitle: {
        en: "Premium barbershop services in Riga – classic cuts, sharp fades, and hot towel shaves.",
        lv: "Premium barbershop pakalpojumi Rīgā – klasiskas frizūras, fade un karstā dvieļa skūšanās.",
        ru: "Премиальные услуги барбершопа в Риге – классические стрижки, fade и бритьё горячим полотенцем.",
      },
      cards: {
        haircut: {
          title: {
            lv: "Matu griešana",
            en: "Haircut",
            ru: "Стрижка волос",
          },
          description: {
            en: "Classic or modern haircut with professional precision.",
            lv: "Klasisks vai moderns matu griezums ar profesionālu pieeju.",
            ru: "Классическая или современная стрижка с профессиональным подходом.",
          },
        },
        shave: {
          title: {
            lv: "Skūšana",
            en: "Shave",
            ru: "Бритьё",
          },
          description: {
            en: "Smooth hot towel shave for a fresh and clean look.",
            lv: "Gluda skūšanās ar karstu dvieli – svaigs un tīrs izskats.",
            ru: "Гладкое бритьё горячим полотенцем – свежий и чистый вид.",
          },
        },
        combo: {
          title: {
            lv: "Komplekts",
            en: "Combo",
            ru: "Комплект",
          },
          description: {
            en: "Haircut and beard trim combo for a complete grooming experience.",
            lv: "Matu griešana un bārdas korekcija – pilnīga kopšanas pieredze.",
            ru: "Стрижка и коррекция бороды – полный уход.",
          },
        },
      },
    },
    services_list: [
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
  },

  about: {
    experience: {
      lv: "Gadi pieredzes",
      en: "Years Experience",
      ru: "Лет опыта",
    },
    title: {
      lv: "Kas mēs esam",
      en: "Who we are",
      ru: "Кто мы",
    },
    description_short: {
      lv: "88 Barbershop Rīgā – katrs matu griezums un skūšanās ir vairāk nekā tikai pakalpojums — tā ir meistarība. Ar vairāk nekā 15 gadu pieredzi mūsu barberi piedāvā precīzus griezumus, tīras pārejas un klasisku skūšanos mūsdienīgā, relaksētā atmosfērā.",
      en: "At 88 Barbershop in Rīga, every haircut and shave is more than just a service — it’s a craft. With 15+ years of experience, our barbers deliver precision cuts, clean fades, and traditional shaves in a modern, relaxed atmosphere.",
      ru: "В 88 Barbershop в Риге каждая стрижка и бритьё — это не просто услуга, а настоящее ремесло. С более чем 15-летним опытом наши барберы предлагают точные стрижки, чистые фейды и классическое бритьё в современной и уютной атмосфере.",
    },
    description_long: {
      lv: "Dibināts ar aizrautību pret tradicionālo barberinga kultūru un mūsdienīgu vīriešu stilu, 88 Barbershop apvieno klasiskas tehnikas ar šodienas tendencēm. No asiem matu griezumiem un karstā dvieļa skūšanās līdz bārdas korekcijām un stilam — mūsu mērķis ir vienkāršs: palīdzēt katram vīrietim izskatīties nevainojami un justies pārliecināti. Ērta atrašanās vieta ar bezmaksas autostāvvietu — mēs gaidām ikvienu, kurš novērtē kvalitāti, komfortu un autentisku barbershopa atmosfēru.",
      en: "Founded with a passion for traditional barbering and modern men’s style, 88 Barbershop combines classic techniques with today’s trends. From sharp haircuts and smooth hot towel shaves to beard trims and styling, our goal is simple — to help every man look sharp and feel confident. Conveniently located with free parking, we welcome clients who value quality, comfort, and authentic barbershop culture.",
      ru: "Основанный из любви к традиционному барберингу и современному мужскому стилю, 88 Barbershop сочетает классические техники с актуальными трендами. От точных стрижек и горячего полотенца до ухода за бородой и укладки — наша цель проста: помочь каждому мужчине выглядеть безупречно и чувствовать уверенность. Удобное расположение и бесплатная парковка — мы ждём тех, кто ценит качество, комфорт и настоящую атмосферу барбершопа.",
    },
    ctaButton: {
      lv: "Uzzināt vairāk",
      en: "Learn more",
      ru: "Узнать больше",
    },
  },

  reviews: {
    title: {
      lv: "Par mums saka",
      en: "Clients say",
      ru: "О нас говорят",
    },
    ctaButton: {
      lv: "Atstāt atsauksmi",
      en: "Leave a review",
      ru: "Оставить отзыв",
    },
  },

  ribbons: {
    hair: {
      en: ["HAIRCUTS", "FADES", "STYLING", "SHAPING", "TAPERING"],
      lv: ["FRIZŪRAS", "FADE", "STILS", "FORMĒŠANA", "TAPERINGS"],
      ru: ["СТРИЖКИ", "FADE", "УКЛАДКА", "ФОРМИРОВАНИЕ", "TAPERING"],
    },
    beard: {
      en: ["BEARD TRIM", "SHAPING", "LINE UP", "HOT TOWEL", "RAZOR SHAVE"],
      lv: ["BĀRDAS FORMĒŠANA", "KONTŪRAS", "KARSTĀ DVIEĻA SKŪŠANA", "ASMENS SKŪŠANA"],
      ru: ["ФОРМИРОВАНИЕ БОРОДЫ", "КОНТУР", "ГОРЯЧЕЕ ПОЛОТЕНЦЕ", "БРИТЬЁ"],
    },
  },

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

  contact_form: {
    label: {
      name: {
        lv: "Vārds",
        en: "Name",
        ru: "Имя",
      },
      email: {
        lv: "E-pasts",
        en: "Email",
        ru: "Эл. почта",
      },
      message: {
        lv: "Ziņojums",
        en: "Message",
        ru: "Сообщение",
      },
    },
    button: {
      lv: "Nosūtīt",
      en: "Send",
      ru: "Отправить",
    },
  },

  working_time: {
    days: {
      working_days: {
        lv: "Pirmdiena - Sestdiena",
        en: "Monday - Saturday",
        ru: "Понедельник - Суббота",
      },
      closed_days: {
        lv: "Svētdiena",
        en: "Sunday",
        ru: "Воскресенье",
      },
    },
    hours: {
      working_hours: "09:00 – 20:00",
      closed_hours: {
        lv: "SLĒGTS",
        en: "CLOSED",
        ru: "ЗАКРЫТО",
      },
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
      },
    },
  },
  errors: {
    name_error: {
      lv: "Vārdam jābūt vismaz 2 simboli",
      en: "Name must be at least 2 characters",
      ru: "Имя должно содержать минимум 2 символа",
    },
    email_error: {
      lv: "Lūdzu, ievadi derīgu e-pastu",
      en: "Please enter a valid email address",
      ru: "Введите корректный адрес эл. почты",
    },
    empty_error: {
      lv: "Lūdzu, aizpildi visus laukus",
      en: "Please fill in all required fields",
      ru: "Пожалуйста, заполните все обязательные поля",
    },
  },
};
