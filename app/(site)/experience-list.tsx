// Deneyimler listesi. /experiences sayfasında kullanılıyor; başka bir sayfada da göstermek için:
//   import { ExperienceList } from "./experience-list";  (ya da "../experience-list")
//   <ExperienceList />
// Mevcut tasarımın sınıflarını (card, heading-md, card-text, label, tags, tag) kullanır; yeni CSS gerektirmez.
import Image from "next/image";
import { getExperiences, type Experience } from "../../sanity/content";

const EMPLOYMENT_LABELS: Record<NonNullable<Experience["employmentType"]>, string> = {
  internship: "Staj",
  "part-time": "Yarı zamanlı",
  "full-time": "Tam zamanlı",
  freelance: "Serbest",
  volunteer: "Gönüllü",
};

const monthFormat = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric", timeZone: "UTC" });

function formatMonth(date?: string) {
  if (!date) return "";
  const formatted = monthFormat.format(new Date(`${date}T00:00:00Z`));
  return formatted.charAt(0).toLocaleUpperCase("tr-TR") + formatted.slice(1);
}

export function formatDateRange(experience: Pick<Experience, "startDate" | "endDate" | "isCurrent">) {
  const start = formatMonth(experience.startDate);
  const end = experience.isCurrent ? "Devam ediyor" : formatMonth(experience.endDate);
  return [start, end].filter(Boolean).join(" – ");
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  const meta = [
    experience.employmentType ? EMPLOYMENT_LABELS[experience.employmentType] : null,
    experience.location,
    formatDateRange(experience),
  ].filter(Boolean);

  return (
    <article className="card experience-card">
      <div className="experience-head" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {experience.logoUrl && (
          <Image
            src={experience.logoUrl}
            alt={`${experience.company} logosu`}
            width={48}
            height={48}
            unoptimized
            style={{ objectFit: "contain", borderRadius: 8 }}
          />
        )}
        <div>
          <h3 className="heading-md">{experience.position}</h3>
          <p className="label">
            {experience.website ? (
              <a href={experience.website} target="_blank" rel="noreferrer" className="text-link">
                {experience.company} ↗
              </a>
            ) : (
              experience.company
            )}
          </p>
        </div>
      </div>
      {meta.length > 0 && <p className="label">{meta.join(" · ")}</p>}
      {experience.description && <p className="card-text">{experience.description}</p>}
      {experience.technologies && experience.technologies.length > 0 && (
        <ul className="tags">
          {experience.technologies.map((tech) => (
            <li className="tag" key={tech}>{tech}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export async function ExperienceList({ experiences }: { experiences?: Experience[] } = {}) {
  const items = experiences ?? (await getExperiences());
  if (items.length === 0) return null;
  return (
    <div className="stack experience-list">
      {items.map((experience) => (
        <ExperienceCard key={experience._id} experience={experience} />
      ))}
    </div>
  );
}
