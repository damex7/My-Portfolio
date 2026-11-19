import { Link } from "react-router-dom";
import { getProject, site } from "../lib/content.js";
import Container from "./Container.jsx";
import Cover from "./Cover.jsx";
import Reveal from "./Reveal.jsx";

// The in-depth project on the home page. Chosen and written in /admin under "Featured case study".
export default function CaseStudy() {
  const cs = site.caseStudy;
  const project = cs?.project ? getProject(cs.project) : null;
  if (!project) return null;

  const highlights = cs.highlights ?? [];
  const flow = cs.flow ?? [];

  return (
    <section aria-labelledby="case-title" className="mt-28">
      <Container>
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-wide text-muted">
            Featured case study{project.day ? ` · Day ${project.day} of 30` : ""}
          </p>
          <h2 id="case-title" className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted">{project.summary}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <Reveal className="group aspect-[16/10] overflow-hidden rounded-3xl border border-line">
            <Cover project={project} className="group-hover:scale-[1.02]" />
          </Reveal>

          {highlights.length > 0 && (
            <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
              {highlights.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 90} className="bg-paper p-6">
                  <span className="font-display text-sm font-extrabold text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
                </Reveal>
              ))}
            </ol>
          )}
        </div>

        {flow.length > 0 && (
          <Reveal className="mt-8 rounded-3xl border border-line p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold">How it works</h3>
            <ol className="mt-6 flex flex-col gap-2 md:flex-row md:items-stretch">
              {flow.map((step, i) => (
                <li key={step.label} className="flex flex-col items-stretch gap-2 md:flex-1 md:flex-row md:items-center">
                  <div className="flex-1 rounded-2xl border-2 border-ink px-4 py-3 transition-colors duration-300 hover:bg-ink hover:text-paper">
                    <span className="block font-display font-semibold">{step.label}</span>
                    {step.note && <span className="mt-0.5 block text-sm opacity-70">{step.note}</span>}
                  </div>
                  {i < flow.length - 1 && (
                    <span aria-hidden="true" className="self-center text-xl text-muted max-md:rotate-90">→</span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        )}

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-6">
          {project.tech.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Built with">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-3">
            <Link to={`/work/${project.slug}`} className="btn btn-solid group">
              Read the case study
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">Live site</a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">Code</a>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
