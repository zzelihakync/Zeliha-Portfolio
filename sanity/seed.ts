// Uploads the site's original static content to Sanity.
// Run with:  npm run seed
// Safe to run again: it only creates documents that don't exist yet, so it never overwrites your edits.
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";
import { defaultProjects, defaultSiteSettings } from "./defaultContent";

const client = getCliClient({ apiVersion: "2026-10-14" });

async function seed() {
  console.log("Uploading profile photo…");
  const image = await client.assets.upload(
    "image",
    createReadStream(join(process.cwd(), "public", "resimler", "zeliha.jpg.jpeg")),
    { filename: "zeliha.jpg" },
  );

  const { profileImageUrl: _unused, focusAreas, ...settings } = defaultSiteSettings;

  const tx = client.transaction();
  tx.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    ...settings,
    focusAreas: focusAreas.map((area, i) => ({ _key: `focus-${i}`, _type: "focusArea", ...area })),
    profileImage: { _type: "image", asset: { _type: "reference", _ref: image._id } },
  });
  for (const project of defaultProjects) {
    tx.createIfNotExists({ _type: "project", ...project });
  }
  await tx.commit();

  console.log(`Done: site settings + ${defaultProjects.length} projects are in Sanity (${client.config().dataset}).`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
