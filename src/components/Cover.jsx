// Shows the uploaded cover image, or a generated placeholder until you add one.
// `interactive` (used on cards) lets placeholder covers invert on hover. Images keep their own colours.
export default function Cover({ project, className = "", interactive = false }) {
  if (project.cover) {
    return (
      <img
        src={project.cover}
        alt=""
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-500 ${className}`}
      />
    );
  }
  const planned = project.status === "planned";
  const look = planned
    ? `bg-line/60 text-muted ${interactive ? "group-hover:bg-ink group-hover:text-paper" : ""}`
    : "bg-ink text-paper";
  return (
    <div
      className={`flex h-full w-full items-end justify-between p-5 transition-[background-color,color,transform] duration-500 ${look} ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-7xl font-extrabold leading-none">
        {project.day ? String(project.day).padStart(2, "0") : project.title.charAt(0)}
      </span>
      <span className="max-w-[60%] text-right text-sm opacity-80">{project.category}</span>
    </div>
  );
}
