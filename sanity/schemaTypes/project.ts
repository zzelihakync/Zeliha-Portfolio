import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Proje",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Proje Adı", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "icon", title: "İkon (emoji)", type: "string", description: "Örn: ⚡ 🛸 🩺" }),
    defineField({ name: "description", title: "Açıklama", type: "text", rows: 4 }),
    defineField({ name: "githubUrl", title: "GitHub Linki", type: "url" }),
    defineField({ name: "order", title: "Sıra", type: "number", description: "Küçük sayı önce gösterilir." }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", icon: "icon", subtitle: "description" }, prepare: ({ title, icon, subtitle }) => ({ title: `${icon ?? ""} ${title ?? ""}`.trim(), subtitle }) },
});
