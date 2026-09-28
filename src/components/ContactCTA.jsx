import { site } from "../lib/content.js";
import Container from "./Container.jsx";

export default function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="mt-24">
      <Container>
        <div className="rounded-3xl bg-cobalt px-6 py-14 text-paper sm:px-12 sm:py-20">
          <h2 id="cta-title" className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Let's build something useful together
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block rounded-full bg-paper px-6 py-3 font-bold text-ink transition-colors hover:bg-marigold"
          >
            Let's talk
          </a>
          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            {site.phone && (
              <div>
                <dt className="text-sm opacity-75">Phone</dt>
                <dd className="mt-1 font-display text-xl font-semibold">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm opacity-75">Email</dt>
              <dd className="mt-1 break-all font-display text-xl font-semibold">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
