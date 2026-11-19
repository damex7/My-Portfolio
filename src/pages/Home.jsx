import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { challengeShipped, clientProjects, projects, shippedCount, site } from "../lib/content.js";
import CaseStudy from "../components/CaseStudy.jsx";
import ChallengeGrid from "../components/ChallengeGrid.jsx";
import Container from "../components/Container.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

// Counts the leading number up from 0 the first time it's on screen ("25+" -> 0+ ... 25+).
function CountUp({ value }) {
  const text = String(value);
  const match = text.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef(null);
  const [n, setN] = useState(target === null ? null : 0);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setN(target);
      return;
    }
    let frame;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  if (target === null) return text;
  return (
    <span ref={ref}>
      <span aria-hidden="true">{n}{suffix}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

export default function Home() {
  const techCount = new Set(site.stack.flatMap((g) => g.items)).size;
  // Client work and the case study have their own sections, so leave them out of "Selected work".
  const ownWork = projects.filter((p) => !p.client && p.slug !== site.caseStudy?.project);
  const featured = ownWork.filter((p) => p.featured).slice(0, 4);
  const selected = featured.length ? featured : ownWork.filter((p) => p.status === "shipped").slice(-4);

  const challengeDone = challengeShipped >= 30;
  const stats = [
    { value: shippedCount, label: "projects shipped" },
    { value: `${challengeShipped}/30`, label: challengeDone ? "30-day challenge completed" : "challenge projects shipped" },
    { value: `${techCount}+`, label: "technologies" },
  ];

  const words = (site.headline ?? "").split(" ");
  // Supporting lines follow the headline's word-by-word entrance.
  const after = (step) => ({ animationDelay: `${200 + words.length * 60 + step * 90}ms` });

  return (
    <>
      {/* Hero */}
      <Container className="pt-12 sm:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_17rem] lg:grid-cols-[1fr_21rem] lg:gap-16">
          {site.photo && (
            <Reveal delay={250} className="order-first w-36 sm:w-44 md:order-last md:w-full">
              <img
                src={site.photo}
                alt={site.name}
                className="aspect-[4/5] w-full rounded-3xl border border-line object-cover"
              />
            </Reveal>
          )}

          <div>
            <p className="flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-wide text-muted">
              {site.name}
              {site.available && (
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 normal-case tracking-normal text-ink">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
                  </span>
                  Available for work
                </span>
              )}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              {words.map((w, i) => (
                <span key={i}>
                  <span className="word-in inline-block" style={{ animationDelay: `${120 + i * 60}ms` }}>{w}</span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </h1>
            {site.intro && (
              <p className="word-in mt-6 max-w-2xl text-lg text-muted sm:text-xl" style={after(0)}>
                {site.intro}
              </p>
            )}
            {site.available && site.availability && (
              <p className="word-in mt-4 max-w-2xl border-l-2 border-ink pl-4 font-semibold" style={after(1)}>
                {site.availability}
              </p>
            )}
            <div className="word-in mt-8 flex flex-wrap gap-3" style={after(2)}>
              <a href={`mailto:${site.email}`} className="btn btn-solid group">
                Hire me
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <Link to="/work" className="btn btn-ghost">
                See my work
              </Link>
              {site.cvUrl && (
                <a href={site.cvUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  View CV
                </a>
              )}
            </div>
            {site.socials?.length > 0 && (
              <ul className="word-in mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold" style={after(3)} aria-label="Social profiles">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="link-u">
                      {s.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-4 border-y border-line py-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-3xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <CaseStudy />

      {/* Expertise */}
      <section aria-labelledby="expertise-title" className="mt-28">
        <Container>
          <Reveal>
            <SectionTitle id="expertise-title" bold="My" rest="expertise" />
          </Reveal>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {site.expertise.map((e, i) => (
              <Reveal
                as="li"
                key={e.title}
                delay={i * 90}
                className="group bg-paper p-7 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                <span className="font-display text-lg font-extrabold">{String(i + 1).padStart(2, "0")}.</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-muted transition-colors duration-300 group-hover:text-paper/70">{e.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Client work */}
      {clientProjects.length > 0 && (
        <section aria-labelledby="client-title" className="mt-28">
          <Container>
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionTitle id="client-title" bold="Client" rest="work" />
                <p className="mt-3 max-w-2xl text-muted">Websites built for real organisations: a business, a school and a non-profit.</p>
              </div>
              <Link to="/work" className="group inline-flex items-center gap-1.5 font-bold">
                <span className="link-u">All work</span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {clientProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={(i % 3) * 120} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Selected work */}
      <section aria-labelledby="selected-title" className="mt-28">
        <Container>
          <Reveal className="flex items-end justify-between gap-4">
            <SectionTitle id="selected-title" bold="Selected" rest="work" />
            <Link to="/work" className="group inline-flex items-center gap-1.5 font-bold">
              <span className="link-u">View all</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          {selected.length ? (
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {selected.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={(i % 2) * 120} />
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-2xl border-2 border-dashed border-line p-8 text-muted">
              Tick "Show on home page" on a project in the admin to feature it here.
            </p>
          )}
        </Container>
      </section>

      {/* The 30-day challenge, as proof of consistency */}
      <section aria-labelledby="challenge-title" className="mt-28">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionTitle id="challenge-title" bold="30 days," rest="30 projects" />
              <p className="mt-4 max-w-2xl text-lg text-muted">
                I set myself a challenge: build and ship one project every day for 30 days, moving from React
                fundamentals to full-stack apps with AI features. {challengeDone ? "I completed it." : ""} Each square
                is a day. Open one to see what I built.
              </p>
            </div>
            <Link to="/work" className="group inline-flex items-center gap-1.5 font-bold">
              <span className="link-u">See the projects</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <ChallengeGrid />
          </Reveal>
        </Container>
      </section>

      {/* Testimonials (hidden until you add some in the admin) */}
      {site.testimonials?.length > 0 && (
        <section aria-labelledby="reviews-title" className="mt-28">
          <Container>
            <Reveal>
              <SectionTitle id="reviews-title" bold="Kind words" rest="from people I've worked with" />
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {site.testimonials.map((t, i) => (
                <Reveal as="figure" key={t.name} delay={(i % 2) * 120} className="rounded-2xl border border-line p-7">
                  <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {t.photo && <img src={t.photo} alt="" className="h-11 w-11 rounded-full object-cover" />}
                    <span>
                      <span className="block font-bold">{t.name}</span>
                      <span className="block text-sm text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
