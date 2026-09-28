import { marked } from "marked";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "../lib/content.js";
import Container from "../components/Container.jsx";
import Cover from "../components/Cover.jsx";
import StatusTag from "../components/StatusTag.jsx";
import NotFound from "./NotFound.jsx";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <Container className="pt-12 sm:pt-16">
      <Link to="/works" className="text-sm font-bold text-muted hover:text-ink">
        ← All works
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
        {project.day && <span>Day {project.day}</span>}
        <span>{project.category}</span>
        <StatusTag status={project.status} />
      </div>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-6 py-3 font-bold text-paper hover:bg-cobalt">
              View live site
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-full border border-ink px-6 py-3 font-bold hover:bg-ink hover:text-paper">
              View code
            </a>
          )}
        </div>
      )}

      <div className="mt-12 aspect-[16/9] overflow-hidden rounded-3xl">
        <Cover project={project} />
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_16rem]">
        <div className="prose-cms max-w-prose text-lg leading-relaxed">
          {project.body ? (
            <div dangerouslySetInnerHTML={{ __html: marked.parse(project.body) }} />
          ) : (
            <p className="text-muted">The write-up for this project is coming soon.</p>
          )}
        </div>
        {project.tech.length > 0 && (
          <aside>
            <h2 className="font-display text-lg font-semibold">Built with</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link to={`/works/${prev.slug}`} className="group">
            <span className="text-sm text-muted">Previous</span>
            <span className="block font-display text-xl font-semibold group-hover:text-cobalt">{prev.title}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/works/${next.slug}`} className="group sm:text-right">
            <span className="text-sm text-muted">Next</span>
            <span className="block font-display text-xl font-semibold group-hover:text-cobalt">{next.title}</span>
          </Link>
        )}
      </nav>
    </Container>
  );
}
