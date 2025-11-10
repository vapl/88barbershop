import { defineField } from "sanity";

export default defineField({
  name: "contacts_group",
  title: "Kontaktinformācija",
  type: "object",
  fields: [
    {
      name: "phone",
      title: "Telefons",
      type: "object",
      fields: [
        { name: "label", title: "Teksts", type: "string" },
        { name: "link", title: "Sazvanīšanas saite", type: "string" },
      ],
    },
    {
      name: "email",
      title: "E-pasts",
      type: "object",
      fields: [
        { name: "label", title: "Teksts", type: "string" },
        { name: "link", title: "E-pasta saite", type: "string" },
      ],
    },
    {
      name: "address",
      title: "Adrese",
      type: "object",
      fields: [
        { name: "label", title: "Adrese", type: "string" },
        { name: "link", title: "Google Maps saite", type: "url" },
      ],
    },
    {
      name: "social",
      title: "Sociālie Tīkli",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
      ],
    },
  ],
});
