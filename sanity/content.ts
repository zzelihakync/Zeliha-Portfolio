import { createClient } from "next-sanity";
import { defaultSiteSettings } from "./defaultContent";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zglxtxux",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-10-14",
  useCdn: false,
});

export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  siteTitle, navHome, navAbout, navProjects, navExperiences,
  homeTitle, homeHighlight, homeDescription, githubUrl, linkedinUrl, aboutButtonLabel,
  "profileImageUrl": profileImage.asset->url,
  aboutIntro, aboutVisionHeading, aboutVision,
  educationHeading, educationLabel, education,
  focusAreasHeading, focusAreas[]{title, description},
  skillsHeading, skills,
  projectsHeading, projectButtonLabel, experiencesHeading, footerLine1, footerLine2
}`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt asc){
  _id, title, icon, description, githubUrl
}`;

export type SiteSettings = typeof defaultSiteSettings;
export type Project = { _id: string; title: string; icon?: string; description?: string; githubUrl?: string };

export async function getSiteSettings(): Promise<SiteSettings> {
  const data: Partial<SiteSettings> | null = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 0 } });
  // Content comes from Sanity; a default is only used for a field that is empty there.
  const filled = Object.fromEntries(Object.entries(data ?? {}).filter(([, value]) => value !== null && value !== undefined));
  return { ...defaultSiteSettings, ...filled };
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(PROJECTS_QUERY, {}, { next: { revalidate: 0 } });
}

// ---- Deneyimler (experience) ----
export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(coalesce(order, 9999) asc, startDate desc){
  _id, company, position, employmentType, location,
  startDate, endDate, isCurrent, description, technologies, website,
  "logoUrl": logo.asset->url
}`;

export type Experience = {
  _id: string;
  company: string;
  position: string;
  employmentType?: "internship" | "part-time" | "full-time" | "freelance" | "volunteer";
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  technologies?: string[];
  website?: string;
  logoUrl?: string;
};

export async function getExperiences(): Promise<Experience[]> {
  return client.fetch(EXPERIENCES_QUERY, {}, { next: { revalidate: 0 } });
}
