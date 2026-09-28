// Reads everything the CMS writes into /content. Adding a JSON file there
// (by hand or through /admin) is all it takes to add a project.
import site from "../../content/settings/site.json";

const files = import.meta.glob("../../content/projects/*.json", { eager: true, import: "default" });

export const projects = Object.entries(files)
  .map(([path, data]) => ({
    ...data,
    slug: path.split("/").pop().replace(/\.json$/, ""),
    tech: data.tech ?? [],
  }))
  .sort((a, b) => (a.day ?? 999) - (b.day ?? 999) || a.title.localeCompare(b.title));

export { site };

export const challengeProjects = projects.filter((p) => p.day);
export const shippedCount = projects.filter((p) => p.status === "shipped").length;

export const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

// Which day of the challenge today is (0 before it starts, capped at 30).
export function currentDay() {
  if (!site.challengeStart) return 0;
  const start = new Date(`${String(site.challengeStart).slice(0, 10)}T00:00:00`);
  const diff = Math.floor((Date.now() - start.getTime()) / 86400000) + 1;
  return Math.max(0, Math.min(30, diff));
}

export const phases = [
  { name: "React + Tailwind", days: [1, 5] },
  { name: "React + APIs", days: [6, 10] },
  { name: "Next.js + TypeScript", days: [11, 15] },
  { name: "Full-stack foundations", days: [16, 20] },
  { name: "Serious full-stack", days: [21, 25] },
  { name: "AI applications", days: [26, 29] },
  { name: "Flagship", days: [30, 30] },
];
