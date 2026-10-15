"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zglxtxux";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Zeliha Portfolio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Site Ayarları is a single document: hide "create new" and "delete/duplicate" for it
    templates: (templates) => templates.filter(({ schemaType }) => schemaType !== "siteSettings"),
  },
  // Yorumlar ve görevler ayrı bir "comments" veri seti ister; ücretsiz planda bu sınır dolu olduğu için kapalı.
  tasks: { enabled: false },
  document: {
    comments: { enabled: false },
    actions: (actions, { schemaType }) =>
      schemaType === "siteSettings"
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik")
          .items([
            S.listItem()
              .title("Site Ayarları")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("project").title("Projeler"),
            S.documentTypeListItem("experience").title("Deneyimler"),
          ]),
    }),
  ],
});
