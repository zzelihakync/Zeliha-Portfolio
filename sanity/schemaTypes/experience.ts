import { defineField, defineType } from "sanity";

const EMPLOYMENT_TYPES = [
  { title: "Staj", value: "internship" },
  { title: "Yarı zamanlı", value: "part-time" },
  { title: "Tam zamanlı", value: "full-time" },
  { title: "Serbest / Proje bazlı", value: "freelance" },
  { title: "Gönüllü", value: "volunteer" },
];

const MONTHS_TR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

function monthYear(date?: string) {
  if (!date) return "";
  const [year, month] = date.split("-");
  return `${MONTHS_TR[Number(month) - 1] ?? ""} ${year}`.trim();
}

export const experience = defineType({
  name: "experience",
  title: "Deneyim",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Şirket / Kurum", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "position", title: "Pozisyon", type: "string", description: "Örn: Yazılım Geliştirme Stajyeri", validation: (rule) => rule.required() }),
    defineField({ name: "employmentType", title: "Çalışma Türü", type: "string", options: { list: EMPLOYMENT_TYPES, layout: "radio", direction: "horizontal" } }),
    defineField({ name: "location", title: "Konum", type: "string", description: "Örn: İstanbul, Uzaktan, Hibrit" }),
    defineField({ name: "startDate", title: "Başlangıç Tarihi", type: "date", options: { dateFormat: "MMMM YYYY" }, validation: (rule) => rule.required() }),
    defineField({ name: "isCurrent", title: "Hâlâ devam ediyor", type: "boolean", initialValue: false }),
    defineField({
      name: "endDate",
      title: "Bitiş Tarihi",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
      hidden: ({ document }) => Boolean(document?.isCurrent),
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const doc = context.document as { startDate?: string; isCurrent?: boolean } | undefined;
          if (doc?.isCurrent || !endDate || !doc?.startDate) return true;
          return String(endDate) >= doc.startDate ? true : "Bitiş tarihi başlangıç tarihinden önce olamaz.";
        }),
    }),
    defineField({ name: "description", title: "Açıklama", type: "text", rows: 6 }),
    defineField({
      name: "technologies",
      title: "Kullanılan Teknolojiler",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Her teknolojiyi yazıp Enter'a basın.",
    }),
    defineField({ name: "logo", title: "Şirket Logosu", type: "image", options: { hotspot: true }, description: "İsteğe bağlı." }),
    defineField({ name: "website", title: "Şirket Web Sitesi", type: "url", description: "İsteğe bağlı." }),
    defineField({ name: "order", title: "Sıra", type: "number", description: "Küçük sayı önce gösterilir. Boş bırakılırsa en yeni deneyim önce gelir." }),
  ],
  orderings: [
    { title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "En yeni", name: "startDateDesc", by: [{ field: "startDate", direction: "desc" }] },
  ],
  preview: {
    select: { company: "company", position: "position", startDate: "startDate", endDate: "endDate", isCurrent: "isCurrent", media: "logo" },
    prepare: ({ company, position, startDate, endDate, isCurrent, media }) => {
      const end = isCurrent ? "Devam ediyor" : monthYear(endDate);
      const range = [monthYear(startDate), end].filter(Boolean).join(" – ");
      return {
        title: [company, position].filter(Boolean).join(" · ") || "Yeni Deneyim",
        subtitle: range,
        media,
      };
    },
  },
});
