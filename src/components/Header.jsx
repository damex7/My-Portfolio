import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { site } from "../lib/content.js";
import Container from "./Container.jsx";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/works", label: "My works" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={navClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-bold text-paper transition-colors hover:bg-cobalt sm:inline-block"
          >
            Let's talk
          </a>
          <button
            type="button"
            className="rounded-md border border-line px-3 py-1.5 text-sm font-bold md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line md:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={navClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <a href={`mailto:${site.email}`} className="text-sm font-bold uppercase tracking-wide text-cobalt">
              Let's talk
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
