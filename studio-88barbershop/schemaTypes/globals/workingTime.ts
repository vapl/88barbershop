import { defineField } from "sanity";

export default defineField({
  name: "working_time_group",
  title: "Darba Laiks",
  type: "object",
  fields: [
    {
      name: "days",
      title: "Dienas",
      type: "object",
      fields: [
        { name: "working_days", title: "Darba dienas", type: "localeString" },
        { name: "closed_days", title: "Brīvdienas", type: "localeString" },
      ],
    },
    {
      name: "hours",
      title: "Stundas",
      type: "object",
      fields: [
        { name: "working_hours", title: "Darba stundas", type: "string" },
        { name: "closed_hours", title: "Brīvdienu teksts", type: "localeString" },
      ],
    },
  ],
});
