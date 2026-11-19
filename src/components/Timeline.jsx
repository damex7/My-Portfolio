import Container from "./Container.jsx";
import Reveal from "./Reveal.jsx";
import SectionTitle from "./SectionTitle.jsx";

// Vertical timeline for Experience / Education (edited in /admin). Hidden when empty.
export default function Timeline({ id, bold, rest, items }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby={id} className="mt-24">
      <Container>
        <Reveal>
          <SectionTitle id={id} bold={bold} rest={rest} />
        </Reveal>
        <ol className="mt-10 ml-2 border-l-2 border-line">
          {items.map((it, i) => (
            <Reveal as="li" key={`${it.role}-${it.org}`} delay={i * 90} className="relative pb-12 pl-8 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-ink bg-paper" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-xl font-semibold">{it.role}</h3>
                {it.period && <p className="text-sm font-bold text-muted">{it.period}</p>}
              </div>
              <p className="mt-1 font-semibold">{it.org}</p>
              {it.description && <p className="mt-3 max-w-2xl text-muted">{it.description}</p>}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
