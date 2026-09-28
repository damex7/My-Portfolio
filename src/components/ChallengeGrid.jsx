import { Link } from "react-router-dom";
import { challengeProjects, phases } from "../lib/content.js";

const cellStyles = {
  shipped: "bg-ink text-paper border-ink",
  building: "bg-cobalt text-paper border-cobalt",
  planned: "bg-transparent text-muted border-line hover:border-muted",
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
                  to={`/works/${p.slug}`}
                  title={`Day ${p.day}: ${p.title} (${p.status})`}
                  aria-label={`Day ${p.day}, ${p.title}, ${p.status}`}
                  className={`cell-in grid h-10 w-10 place-items-center rounded-md border-2 font-display text-sm font-semibold transition-colors ${cellStyles[p.status] ?? cellStyles.planned}`}
                  style={{ animationDelay: `${p.day * 25}ms` }}
                >
                  {p.day}
                </Link>
              ))}
          </li>
        ))}
      </ol>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-ink" aria-hidden="true" /> Shipped</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-cobalt" aria-hidden="true" /> Building</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border-2 border-line" aria-hidden="true" /> Planned</li>
      </ul>
    </div>
  );
}
