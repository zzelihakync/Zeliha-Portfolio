import Image from "next/image";
import { Footer, Navigation } from "../shared";
import { getSiteSettings } from "../../../sanity/content";

export default async function AboutPage() {
  const content = await getSiteSettings();
  return (
    <>
      <Navigation active="about" />
      <main className="page">
        <section className="container page-head about-head">
          <Image
            src={content.profileImageUrl || "/resimler/zeliha.jpg.jpeg"}
            alt={`${content.siteTitle} Profil`}
            className="about-avatar"
            width={192}
            height={192}
            unoptimized
          />
          <div className="about-head-text">
            <span className="eyebrow">{content.navAbout}</span>
            <h1 className="display-xl">{content.siteTitle}</h1>
            <p className="lead">{content.aboutIntro}</p>
          </div>
        </section>

        <section className="container section section-tight">
          <div className="grid grid-2 about-grid">
            <div className="stack">
              <article className="card">
                <h2 className="heading-md">{content.aboutVisionHeading}</h2>
                <p className="card-text">{content.aboutVision}</p>
              </article>
              <article className="card">
                <h2 className="heading-md">{content.educationHeading}</h2>
                <p className="label">{content.educationLabel}</p>
                <p className="card-text">{content.education}</p>
              </article>
            </div>
            <div className="stack">
              <article className="card">
                <h2 className="heading-md">{content.focusAreasHeading}</h2>
                <ul className="focus-list">
                  {content.focusAreas?.map((area: { title: string; description: string }, index: number) => (
                    <li key={`${area.title}-${index}`}>
                      <strong>{area.title}</strong>
                      <span>{area.description}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="card">
                <h2 className="heading-md">{content.skillsHeading}</h2>
                <ul className="tags">
                  {content.skills?.map((skill: string) => (
                    <li className="tag" key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
