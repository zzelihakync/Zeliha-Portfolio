import Link from "next/link";
import { getSiteSettings } from "../../sanity/content";

type Active = "home" | "about" | "projects" | "experiences";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("tr-TR"))
    .join("");
}

async function Navigation({ active }: { active: Active }) {
  const content = await getSiteSettings();
  const links: { key: Active; href: string; label: string }[] = [
    { key: "home", href: "/", label: content.navHome },
    { key: "projects", href: "/projects", label: content.navProjects },
    { key: "experiences", href: "/experiences", label: content.navExperiences },
    { key: "about", href: "/about", label: content.navAbout },
  ];
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">{initials(content.siteTitle)}</span>
          {content.siteTitle}
        </Link>
        <nav className="nav-links" aria-label="Ana menü">
          {links.map((link) => (
            <Link key={link.key} href={link.href} className="nav-link" aria-current={active === link.key ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta-links">
          {content.githubUrl && (
            <a href={content.githubUrl} target="_blank" rel="noreferrer" className="btn-sm btn-sm-primary nav-cta">
              GitHub
            </a>
          )}

          {content.linkedinUrl && (
            <a href={content.linkedinUrl} target="_blank" rel="noreferrer" className="btn-sm btn-sm-primary nav-cta">
              LinkedIn
            </a>
          )
          }
        </div>
        
      </div>
    </header>
  );
}

async function Footer() {
  const content = await getSiteSettings();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>{content.footerLine1}</p>
        <p>{content.footerLine2}</p>
        {(content.linkedinUrl || content.githubUrl) && (
          <p className="footer-links">
            {content.linkedinUrl && (
              <a href={content.linkedinUrl} target="_blank" rel="noreferrer" className="text-link">
                LinkedIn ↗
              </a>
            )}
            {content.linkedinUrl && content.githubUrl && " · "}
            {content.githubUrl && (
              <a href={content.githubUrl} target="_blank" rel="noreferrer" className="text-link">
                GitHub ↗
              </a>
            )}
          </p>
        )}
      </div>
    </footer>
  );
}

export { Navigation, Footer };
