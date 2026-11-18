import { useEffect } from "react";
import { site } from "./lib/content.js";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // "instant" so the smooth-scroll CSS doesn't animate a jump to the top on every route change.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    document.title = `${site.name} — ${site.role}`;
  }, []);
  return null;
}

// Old /works/... links keep working after the rename to /work.
function LegacyProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}`} replace />;
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <div key={pathname} className="page-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="/works" element={<Navigate to="/work" replace />} />
            <Route path="/works/:slug" element={<LegacyProjectRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
