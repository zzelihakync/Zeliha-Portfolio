import Link from "next/link";
import Image from "next/image";
import { Footer, Navigation } from "./shared";
import { getProjects, getSiteSettings } from "../../sanity/content";

export default async function HomePage() {
  const [content, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  const featured = projects.slice(0, 3);
  return (
    <>
      <Navigation active="home" />
      <main className="page">
        <section className="container hero">
          <div className="hero-text">
            <span className="eyebrow">{content.footerLine2}</span>
            <h1 className="display-xl">
              {content.homeTitle} <span className="highlight">{content.homeHighlight}</span>
            </h1>
            <p className="lead">{content.homeDescription}</p>
            <div className="actions">
              <a href={content.githubUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                GitHub
              </a>
              {content.linkedinUrl && (
                <a href={content.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  LinkedIn
                </a>
              )}
              <Link href="/about" className="btn btn-secondary">
                {content.aboutButtonLabel}
              </Link>
            </div>
          </div>
          <figure className="hero-photo">
            <Image
              src={content.profileImageUrl || "/resimler/zeliha.jpg.jpeg"}
              alt={`${content.siteTitle} Profil`}
              className="profile-image"
              width={640}
              height={640}
              priority
              unoptimized
            />
          </figure>
        </section>

        {featured.length > 0 && (
          <section className="container section">
            <div className="section-head">
              <div>
                <span className="eyebrow">{content.navProjects}</span>
                <h2 className="heading-lg">{content.projectsHeading}</h2>
              </div>
              <Link href="/projects" className="btn-sm btn-sm-ghost">
                {content.navProjects} →
              </Link>
            </div>
            <div className="grid grid-3">
              {featured.map((project) => (
                <Link href="/projects" className="card card-link" key={project._id}>
                  <span className="card-icon" aria-hidden="true">{project.icon || "💻"}</span>
                  <h3 className="heading-md">{project.title}</h3>
                  {project.description && <p className="card-text clamp-3">{project.description}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
