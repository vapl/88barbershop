module.exports = {
  siteUrl: "https://88barbershop.lv",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.8,
  exclude: ["/admin/*", "/api/*", "/studio-88barbershop/*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: ["/admin", "/api", "/studio-88barbershop"] }],
  },
  alternateRefs: [
    { href: "https://88barbershop.lv/lv", hreflang: "lv" },
    { href: "https://88barbershop.lv/en", hreflang: "en" },
    { href: "https://88barbershop.lv/ru", hreflang: "ru" },
  ],
};
