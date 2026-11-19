import { Link } from "react-router-dom";
import Cover from "./Cover.jsx";
import Reveal from "./Reveal.jsx";
import StatusTag from "./StatusTag.jsx";

export default function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="group">
      <Link to={`/work/${project.slug}`} className="block transition-transform duration-300 group-hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <Cover project={project} interactive className="group-hover:scale-[1.03]" />
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <span>{project.client ? `For ${project.client}` : project.category}</span>
          <StatusTag status={project.status} />
        </div>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">
          <span className="link-u">{project.title}</span>
        </h3>
        <p className="mt-2 text-muted">{project.summary}</p>
      </Link>
    </Reveal>
  );
}
