import { defineField } from "sanity";

export default defineField({
  name: "modals_group",
  title: "Modālie Logi",
  type: "object",
  fields: [
    {
      name: "modal",
      title: "Galvenais modālais logs",
      type: "object",
      fields: [
        { name: "title", title: "Virsraksts", type: "localeString" },
        { name: "subtitle", title: "Apakšvirsraksts", type: "localeString" },
        { name: "call", title: "“Zvanīt” teksts", type: "localeString" },
        { name: "cancel_button", title: "“Atcelt” poga", type: "localeString" },
      ],
    },
  ],
});
