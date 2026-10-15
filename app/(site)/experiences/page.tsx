import { Footer, Navigation } from "../shared";
import { ExperienceList } from "../experience-list";
import { getExperiences, getSiteSettings } from "../../../sanity/content";

export default async function ExperiencesPage() {
  const [content, experiences] = await Promise.all([getSiteSettings(), getExperiences()]);
  return (
    <>
      <Navigation active="experiences" />
      <main className="page">
        <section className="container page-head">
          <span className="eyebrow">{content.navExperiences}</span>
          <h1 className="display-xl">{content.experiencesHeading}</h1>
        </section>
        <section className="container section section-tight">
          {experiences.length > 0 ? (
            <ExperienceList experiences={experiences} />
          ) : (
            <p className="card-text">Henüz deneyim eklenmedi.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
