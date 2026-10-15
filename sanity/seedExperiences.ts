// ONVO staj deneyimini Sanity'ye ekler.
// Çalıştırma:  npm run seed:experiences
// Güvenli: createIfNotExists kullanır; kayıt zaten varsa (Studio'da düzenlemiş olsanız bile) üzerine yazmaz.
// Mevcut seed.ts'ye, projelere ve site ayarlarına dokunmaz.
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-10-14" });

const experiences = [
  {
    _id: "experience-onvo",
    _type: "experience",
    company: "ONVO",
    position: "Yazılım Geliştirme Stajyeri",
    employmentType: "internship",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    isCurrent: false,
    description:
      "ONVO'da yazılım geliştirme stajyeri olarak web tabanlı Stajyer Takip ve Yönetim Sistemi'nin geliştirilmesine katkı sağladım. Frontend ve backend geliştirme süreçlerinde görev alarak kullanıcı arayüzleri, günlük raporlar, yetkili kullanıcı işlemleri ve veri yönetimi üzerine çalışmalar gerçekleştirdim.",
    technologies: ["Next.js", "React", "TypeScript", "MUI", "FastAPI", "Python", "PostgreSQL", "Git/GitHub"],
    order: 0,
  },
];

async function seedExperiences() {
  const tx = client.transaction();
  for (const experience of experiences) tx.createIfNotExists(experience);
  await tx.commit();
  console.log(`Tamam: ${experiences.length} deneyim kontrol edildi/eklendi (${client.config().dataset}).`);
}

seedExperiences().catch((err) => {
  console.error(err);
  process.exit(1);
});
