import { marked } from "marked";
import { site } from "../lib/content.js";
import Container from "../components/Container.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

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
          {site.photo ? (
            <img src={site.photo} alt={site.name} className="aspect-[4/5] w-full rounded-3xl object-cover" />
          ) : (
            <div className="grid aspect-[4/5] w-full place-items-center rounded-3xl bg-ink font-display text-8xl font-extrabold text-paper" aria-hidden="true">
              {site.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
          )}
        </div>
      </Container>

      <section aria-labelledby="stack-title" className="mt-24">
        <Container>
          <SectionTitle id="stack-title" bold="My" rest="stack" />
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {site.stack.map((g) => (
              <div key={g.group} className="rounded-2xl border border-line p-6">
                <dt className="font-display text-lg font-semibold">{g.group}</dt>
                <dd className="mt-3">
                  <ul className="space-y-1.5 text-muted">
                    {g.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
