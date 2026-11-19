import { marked } from "marked";
import { site } from "../lib/content.js";
import Container from "../components/Container.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Timeline from "../components/Timeline.jsx";

export default function About() {
  return (
    <>
      <Container className="pt-16 sm:pt-24">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_20rem]">
          <div>
            <SectionTitle as="h1" bold="About" rest="me" className="sm:text-6xl" />
            <p className="mt-4 font-display text-2xl text-muted">{site.role}{site.location && `, based in ${site.location}`}</p>
            <div
              className="prose-cms mt-8 max-w-prose text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: marked.parse(site.about ?? "") }}
            />
          </div>
          <Reveal delay={150}>
            {site.photo ? (
              <img
                src={site.photo}
                alt={site.name}
                className="aspect-[4/5] w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="grid aspect-[4/5] w-full place-items-center rounded-3xl bg-ink font-display text-8xl font-extrabold text-paper" aria-hidden="true">
                {site.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
            )}
          </Reveal>
        </div>
      </Container>

      <Timeline id="experience-title" bold="My" rest="experience" items={site.experience} />
      <Timeline id="education-title" bold="My" rest="education" items={site.education} />

      <section aria-labelledby="stack-title" className="mt-24">
        <Container>
          <Reveal>
            <SectionTitle id="stack-title" bold="My" rest="stack" />
          </Reveal>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {site.stack.map((g, i) => (
              <Reveal
                key={g.group}
                delay={i * 90}
                className="rounded-2xl border border-line p-6 transition-colors duration-300 hover:border-ink"
              >
                <dt className="font-display text-lg font-semibold">{g.group}</dt>
                <dd className="mt-3">
                  <ul className="space-y-1.5 text-muted">
                    {g.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
