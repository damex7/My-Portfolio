import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";

export default function NotFound() {
  return (
    <Container className="py-32">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-4 text-lg text-muted">This page doesn't exist or has moved.</p>
      <Link to="/" className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-bold text-paper">Go to home page</Link>
    </Container>
  );
}
