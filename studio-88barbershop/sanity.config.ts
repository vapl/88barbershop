import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemaTypes"

export default defineConfig({
  name: "default",
  title: "88Barbershop",

  projectId: "rfjv8kby",
  dataset: "production",
  basePath: "/admin",
  unstable_noStore: true,

  plugins: [
    // 🔹 STRUKTŪRAS RĪKS
    structureTool({
      structure: (S) =>
        S.list()
          .title("Saturs")
          .items([
            // --- SINGLETON: iestatījumi ---
            S.listItem()
              .title("🌐 Lapas Iestatījumi")
              .child(S.document().schemaType("settings").documentId("settings")),

            S.divider(),

            // --- CITI DOKUMENTI ---
            S.listItem()
              .title("💈 Personāls")
              .child(S.documentTypeList("barber").title("Personāls")),
            S.listItem()
              .title("💇 Pakalpojumi")
              .child(S.documentTypeList("service").title("Pakalpojumi")),
            S.listItem()
              .title("🖼️ Galerija")
              .child(S.documentTypeList("gallery").title("Galerija")),

            S.divider(),

            // --- Papildus sadaļas nākotnei ---
            // S.listItem().title("Bloga raksti").child(S.documentTypeList("post")),
          ]),
    }),

    // 🔹 DEBUG / SKATĪŠANAS RĪKS (ļoti noderīgs izstrādei)
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // 🔹 UI konfigurācija (nav obligāta, bet iesaku)
  studio: {
    components: {
      // Header vai dokumenta preview pielāgošanai (var pievienot vēlāk)
    },
  },

  // 🔹 Default dokumentu darbības
  document: {
    // “Singleton” aizsardzība — neļauj izveidot vairākus “settings”
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((templateItem) => templateItem.templateId !== "settings")
      }
      return prev
    },
  },
})
