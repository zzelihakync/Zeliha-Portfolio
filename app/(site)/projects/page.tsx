import { Footer, Navigation } from "../shared";
import { getProjects, getSiteSettings } from "../../../sanity/content";

export default async function ProjectsPage() {
  const [content, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  return (
    <>
      <Navigation active="projects" />
      <main className="page">
        <section className="container page-head">
          <span className="eyebrow">{content.navProjects}</span>
          <h1 className="display-xl">{content.projectsHeading}</h1>
        </section>
        <section className="container section section-tight">
          <div className="grid grid-2 projects-grid">
            {projects.map((project) => (
              <article className="card project-card" key={project._id}>
                <span className="card-icon" aria-hidden="true">{project.icon || "💻"}</span>
                <h2 className="heading-md">{project.title}</h2>
                {project.description && <p className="card-text">{project.description}</p>}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-link card-footer">
                    {content.projectButtonLabel} ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
