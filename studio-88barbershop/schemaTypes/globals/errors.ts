import { defineField } from "sanity";

export default defineField({
  name: "errors_group",
  title: "Kļūdu Paziņojumi",
  type: "object",
  fields: [
    { name: "name_error", title: "Vārda kļūda", type: "localeString" },
    { name: "email_error", title: "E-pasta kļūda", type: "localeString" },
    { name: "empty_error", title: "Tukša lauka kļūda", type: "localeString" },
    { name: "message_short_error", title: "Īsa ziņojuma kļūda", type: "localeString" },
    { name: "message_long_error", title: "Garā ziņojuma kļūda", type: "localeString" },
    { name: "success", title: "Veiksmīgs ziņojums", type: "localeString" },
  ],
});
