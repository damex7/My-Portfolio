import { useState } from "react";
import { categories, projects } from "../lib/content.js";
import Container from "../components/Container.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Work() {
  const [category, setCategory] = useState("All");
  const [showPlanned, setShowPlanned] = useState(false);

  const plannedCount = projects.filter((p) => p.status === "planned").length;
  const CLIENT = "Client work";
  const hasClients = projects.some((p) => p.client);
  const matches = (p) =>
    category === "All" || (category === CLIENT ? Boolean(p.client) : p.category === category);
  const visible = projects.filter((p) => matches(p) && (showPlanned || p.status !== "planned"));

  const chip = (active) =>
    `rounded-full border px-4 py-1.5 text-sm transition-[background-color,color,border-color,transform] duration-200 active:scale-95 ${
      active ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink hover:text-ink"
    }`;

  return (
    <Container className="pt-16 sm:pt-24">
      <SectionTitle as="h1" bold="Selected" rest="work" className="sm:text-6xl" />
      <p className="mt-4 max-w-xl text-lg text-muted">
        Client projects and everything I built in my 30-day challenge, from React basics to a full-stack AI platform.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {["All", ...(hasClients ? [CLIENT] : []), ...categories].map((c) => (
            <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={chip(category === c)}>
              {c}
            </button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={showPlanned}
            onChange={(e) => setShowPlanned(e.target.checked)}
            className="h-4 w-4 accent-ink"
          />
          Show planned ({plannedCount})
        </label>
      </div>

      {visible.length ? (
        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % 2) * 120} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-2xl border-2 border-dashed border-line p-8 text-muted">
          No projects in this category yet. Tick "Show planned" to see what's coming.
        </p>
      )}
    </Container>
  );
}
