import { Link } from "react-router-dom";
import Cover from "./Cover.jsx";
import StatusTag from "./StatusTag.jsx";

export default function ProjectCard({ project }) {
  return (
    <article className="group">
      <Link to={`/works/${project.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl">
          <Cover project={project} className="transition-transform duration-300 group-hover:scale-[1.03]" />
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
          <span>{project.category}</span>
          <StatusTag status={project.status} />
        </div>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight group-hover:text-cobalt">
          {project.title}
        </h3>
        <p className="mt-2 text-muted">{project.summary}</p>
      </Link>
    </article>
  );
}
