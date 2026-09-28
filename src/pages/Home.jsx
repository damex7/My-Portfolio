import { Link } from "react-router-dom";
import { currentDay, projects, shippedCount, site } from "../lib/content.js";
import ChallengeGrid from "../components/ChallengeGrid.jsx";
import Container from "../components/Container.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Home() {
  const techCount = new Set(site.stack.flatMap((g) => g.items)).size;
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const selected = featured.length ? featured : projects.filter((p) => p.status === "shipped").slice(-4);

  const stats = [
    { value: shippedCount, label: "projects shipped" },
    { value: `${currentDay()}/30`, label: "challenge day" },
    { value: `${techCount}+`, label: "technologies" },
  ];

  return (
    <>
      {/* Hero */}
      <Container className="pt-16 sm:pt-24">
        <p className="flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-wide text-muted">
          {site.name}
          {site.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 normal-case tracking-normal">
              <span className="h-2 w-2 rounded-full bg-cobalt" aria-hidden="true" /> Open to work
            </span>
          )}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {site.headline}
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          {site.cvUrl && (
            <a href={site.cvUrl} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-6 py-3 font-bold text-paper hover:bg-cobalt">
              View CV
            </a>
          )}
          <Link to="/works" className="rounded-full border border-ink px-6 py-3 font-bold hover:bg-ink hover:text-paper">
            See my work
          </Link>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-4 border-y border-line py-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <ChallengeGrid />
        </div>
      </Container>

      {/* Expertise */}
      <section aria-labelledby="expertise-title" className="mt-28">
        <Container>
          <SectionTitle id="expertise-title" bold="My" rest="expertise" />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {site.expertise.map((e, i) => (
              <li key={e.title} className="bg-paper p-7">
                <span className="font-display text-lg font-extrabold text-cobalt">{String(i + 1).padStart(2, "0")}.</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-muted">{e.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Selected works */}
      <section aria-labelledby="selected-title" className="mt-28">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionTitle id="selected-title" bold="Selected" rest="works" />
            <Link to="/works" className="font-bold text-cobalt underline underline-offset-4">
              View all
            </Link>
          </div>
          {selected.length ? (
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {selected.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-2xl border-2 border-dashed border-line p-8 text-muted">
              Tick "Show on home page" on a project in the admin to feature it here.
            </p>
          )}
        </Container>
      </section>

      {/* Testimonials (hidden until you add some in the admin) */}
      {site.testimonials?.length > 0 && (
        <section aria-labelledby="reviews-title" className="mt-28">
          <Container>
            <SectionTitle id="reviews-title" bold="Kind words" rest="from people I've worked with" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {site.testimonials.map((t) => (
                <figure key={t.name} className="rounded-2xl border border-line p-7">
                  <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {t.photo && <img src={t.photo} alt="" className="h-11 w-11 rounded-full object-cover" />}
                    <span>
                      <span className="block font-bold">{t.name}</span>
                      <span className="block text-sm text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
