import { site } from "../lib/content.js";
import Container from "./Container.jsx";
import Reveal from "./Reveal.jsx";

// wa.me needs the number as digits only, with country code and no "+".
const whatsappDigits = (site.whatsapp ?? "").replace(/\D/g, "");
const whatsappUrl = whatsappDigits
  ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
      `Hi ${site.name.split(" ")[0]}, I saw your portfolio and I'd like to talk about working together.`
    )}`
  : null;

export default function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="mt-24">
      <Container>
        <Reveal className="rounded-3xl bg-ink px-6 py-14 text-paper sm:px-12 sm:py-20">
          <h2 id="cta-title" className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Let's build something useful together
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-full border border-paper bg-paper px-6 py-3 font-bold text-ink transition-[background-color,color,transform] duration-200 hover:bg-transparent hover:text-paper active:scale-[0.97]"
            >
              Email me
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-paper px-6 py-3 font-bold text-paper transition-[background-color,color,transform] duration-200 hover:bg-paper hover:text-ink active:scale-[0.97]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.23-.73-.66-1.23-1.47-1.37-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
                </svg>
                Chat on WhatsApp
              </a>
            )}
          </div>
          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            {site.phone && (
              <div>
                <dt className="text-sm text-paper/70">Phone</dt>
                <dd className="mt-1 font-display text-xl font-semibold">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-u">{site.phone}</a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-paper/70">Email</dt>
              <dd className="mt-1 break-all font-display text-xl font-semibold">
                <a href={`mailto:${site.email}`} className="link-u">{site.email}</a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
