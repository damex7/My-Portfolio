import { useEffect, useState } from "react";

// Floating button that appears once you've scrolled near the bottom of a long page.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const { scrollY, innerHeight } = window;
      const pageHeight = document.documentElement.scrollHeight;
      const nearBottom = scrollY + innerHeight >= pageHeight - 600;
      const scrolledEnough = scrollY > innerHeight * 0.75;
      setVisible(nearBottom && scrolledEnough);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    // Move keyboard focus back to the start of the content too.
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      inert={!visible}
      aria-label="Back to top"
      title="Back to top"
      className={`group fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border-2 border-paper bg-ink text-paper shadow-lg transition-[opacity,transform] duration-300 hover:-translate-y-1 sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
