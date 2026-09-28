// Shows the uploaded cover image, or a generated placeholder until you add one.
export default function Cover({ project, className = "" }) {
  if (project.cover) {
    return <img src={project.cover} alt="" loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  const planned = project.status === "planned";
  return (
    <div
      className={`flex h-full w-full items-end justify-between p-5 ${planned ? "bg-line/60 text-muted" : "bg-ink text-paper"} ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-7xl font-extrabold leading-none">
        {project.day ? String(project.day).padStart(2, "0") : project.title.charAt(0)}
      </span>
      <span className="max-w-[60%] text-right text-sm opacity-80">{project.category}</span>
    </div>
  );
}
