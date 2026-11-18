import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../lib/content.js";
import Container from "./Container.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/work", label: "My work" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const { pathname } = useLocation();

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu and returns focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const navClass = ({ isActive }) =>
    `link-u text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? "active text-ink" : "text-muted hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md transition-colors duration-300">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-solid hidden px-5 py-2 text-sm sm:inline-flex">
            Let's talk
          </a>
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="relative grid h-9 w-9 place-items-center rounded-md border border-line transition-colors hover:border-ink md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>
      </Container>

      {/* Always rendered so it can animate open/closed; inert while closed. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <Container
            className={`flex flex-col items-start gap-4 border-t border-line py-5 transition-[opacity,transform] duration-300 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={navClass}>
                {l.label}
              </NavLink>
            ))}
            <a href={`mailto:${site.email}`} className="link-u text-sm font-bold uppercase tracking-wide text-ink">
              Let's talk
            </a>
          </Container>
        </nav>
      </div>
    </header>
  );
}
