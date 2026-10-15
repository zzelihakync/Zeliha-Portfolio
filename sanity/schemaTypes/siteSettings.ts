import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  groups: [
    { name: "general", title: "Genel & Menü", default: true },
    { name: "home", title: "Ana Sayfa" },
    { name: "about", title: "Hakkımda" },
    { name: "projects", title: "Projeler" },
    { name: "experiences", title: "Deneyimler" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ name: "siteTitle", title: "Site Başlığı / İsim", type: "string", group: "general" }),
    defineField({ name: "navHome", title: "Menü: Ana Sayfa", type: "string", group: "general" }),
    defineField({ name: "navAbout", title: "Menü: Hakkımda", type: "string", group: "general" }),
    defineField({ name: "navProjects", title: "Menü: Projelerim", type: "string", group: "general" }),
    defineField({ name: "navExperiences", title: "Menü: Deneyimlerim", type: "string", group: "general" }),
    defineField({ name: "profileImage", title: "Profil Fotoğrafı", type: "image", options: { hotspot: true }, group: "general" }),
    defineField({ name: "githubUrl", title: "GitHub Linki", type: "url", group: "general" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn Linki", type: "url", description: "Örn: https://www.linkedin.com/in/kullanici-adi", group: "general" }),

    defineField({ name: "homeTitle", title: "Başlık", type: "string", group: "home" }),
    defineField({ name: "homeHighlight", title: "Vurgulu Başlık (renkli kısım)", type: "string", group: "home" }),
    defineField({ name: "homeDescription", title: "Açıklama", type: "text", rows: 4, group: "home" }),
    defineField({ name: "aboutButtonLabel", title: "Hakkımda Butonu Yazısı", type: "string", group: "home" }),

    defineField({ name: "aboutIntro", title: "Giriş Metni", type: "text", rows: 4, group: "about" }),
    defineField({ name: "aboutVisionHeading", title: "Vizyon Başlığı", type: "string", group: "about" }),
    defineField({ name: "aboutVision", title: "Profil & Vizyon", type: "text", rows: 6, group: "about" }),
    defineField({ name: "educationHeading", title: "Eğitim Başlığı", type: "string", group: "about" }),
    defineField({ name: "educationLabel", title: "Eğitim Etiketi", type: "string", group: "about" }),
    defineField({ name: "education", title: "Eğitim", type: "string", group: "about" }),
    defineField({ name: "focusAreasHeading", title: "Odak Alanları Başlığı", type: "string", group: "about" }),
    defineField({
      name: "focusAreas",
      title: "Odak Alanları",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "focusArea",
          fields: [
            defineField({ name: "title", title: "Başlık", type: "string" }),
            defineField({ name: "description", title: "Açıklama", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({ name: "skillsHeading", title: "Yetenekler Başlığı", type: "string", group: "about" }),
    defineField({ name: "skills", title: "Yetenekler", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" }, group: "about" }),

    defineField({ name: "projectsHeading", title: "Projeler Sayfası Başlığı", type: "string", group: "projects" }),
    defineField({ name: "projectButtonLabel", title: "Proje Butonu Yazısı", type: "string", group: "projects" }),

    defineField({ name: "experiencesHeading", title: "Deneyimler Sayfası Başlığı", type: "string", group: "experiences" }),

    defineField({ name: "footerLine1", title: "Footer Satır 1", type: "string", group: "footer" }),
    defineField({ name: "footerLine2", title: "Footer Satır 2", type: "string", group: "footer" }),
  ],
  preview: { prepare: () => ({ title: "Site Ayarları" }) },
});
