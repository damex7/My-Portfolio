import { site } from "../lib/content.js";
import Container from "./Container.jsx";

export default function Footer() {
  return (
    // Inverted in light mode; in dark mode it stays dark with a hairline instead of becoming a bright bar.
    <footer className="mt-24 bg-ink text-paper dark:border-t dark:border-line dark:bg-paper dark:text-ink">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm">
        <p>
          © {new Date().getFullYear()}, {site.name}
        </p>
        <ul className="flex flex-wrap gap-5">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer" className="link-u opacity-80 transition-opacity hover:opacity-100">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="overflow-hidden pb-4">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap font-display text-[17vw] font-extrabold leading-none tracking-tighter opacity-10 lg:text-[11rem]"
        >
          {site.wordmark}
        </p>
      </Container>
    </footer>
  );
}
