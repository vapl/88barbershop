import { defineField } from "sanity";

export default defineField({
  name: "contact_form_group",
  title: "Kontaktu Formas Teksti",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Lauku Nosaukumi",
      type: "object",
      fields: [
        { name: "name", title: "Vārds", type: "localeString" },
        { name: "email", title: "E-pasts", type: "localeString" },
        { name: "message", title: "Ziņojums", type: "localeString" },
      ],
    },
    {
      name: "privacy_policy_message",
      title: "Privātuma Politikas Ziņojums",
      type: "localeString",
    },
    { name: "button", title: "Pogas Teksts", type: "localeString" },
  ],
});
