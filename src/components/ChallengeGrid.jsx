import { Link } from "react-router-dom";
import { challengeProjects, phases } from "../lib/content.js";

// Diagonal stripes mark "building" days without needing a colour.
const stripes = "bg-[repeating-linear-gradient(135deg,var(--color-line)_0_4px,transparent_4px_8px)]";

const cellStyles = {
  shipped: "bg-ink text-paper border-ink hover:bg-paper hover:text-ink",
  building: `${stripes} text-ink border-ink hover:bg-ink hover:text-paper`,
  planned: "bg-transparent text-muted border-dashed border-muted hover:border-solid hover:border-ink hover:text-ink",
};

export default function ChallengeGrid() {
  return (
    <div>
      <ol className="flex flex-wrap gap-x-5 gap-y-3" aria-label="30-day challenge progress">
        {phases.map((phase) => (
          <li key={phase.name} className="flex gap-1.5">
            {challengeProjects
              .filter((p) => p.day >= phase.days[0] && p.day <= phase.days[1])
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  title={`Day ${p.day}: ${p.title} (${p.status})`}
                  aria-label={`Day ${p.day}, ${p.title}, ${p.status}`}
                  className={`cell-in grid h-10 w-10 place-items-center rounded-md border-2 font-display text-sm font-semibold transition-colors duration-200 ${cellStyles[p.status] ?? cellStyles.planned}`}
                  style={{ animationDelay: `${p.day * 25}ms` }}
                >
                  {p.day}
                </Link>
              ))}
          </li>
        ))}
      </ol>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border-2 border-ink bg-ink" aria-hidden="true" /> Shipped</li>
        <li className="flex items-center gap-2"><span className={`h-3 w-3 rounded-sm border-2 border-ink ${stripes}`} aria-hidden="true" /> Building</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border-2 border-dashed border-muted" aria-hidden="true" /> Planned</li>
      </ul>
    </div>
  );
}
