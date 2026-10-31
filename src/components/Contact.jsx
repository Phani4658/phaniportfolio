import { lazy, Suspense } from "react";
import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";

// three.js is heavy — load it in its own chunk so the first paint stays fast
const Particles3D = lazy(() => import("./Particles3D.jsx"));

const PROJECT_BRIEF = [
  "Hi Phani,",
  "",
  "What I need (website / automation / MVP / other):",
  "About my business:",
  "Timeline:",
  "Budget range:",
].join("\n");

const projectHref =
  `mailto:${CONFIG.email}?subject=${encodeURIComponent("New project enquiry")}` +
  `&body=${encodeURIComponent(PROJECT_BRIEF)}`;

/* ---------------------------------------------------------------------------
   Contact — second 3D scene behind the closer (denser, softer).
--------------------------------------------------------------------------- */
export default function Contact() {
  const r = useReveal();
  return (
    <section className="contact" id="contact">
      <Suspense fallback={null}>
        <Particles3D count={1800} radius={2.2} opacity={0.7} />
      </Suspense>
      <div className="wrap section" style={{ position: "relative", zIndex: 1 }}>
        <div ref={r} className="reveal">
          <h2 className="display" style={{ fontSize: "clamp(2.2rem,6vw,4.4rem)" }}>
            Let's build something <span className="grad-text shimmer">great.</span>
          </h2>
          <p className="sub">
            Tell me what you need — a website, an automation, or an MVP. I reply
            within one working day with next steps and a rough estimate.
          </p>
          <div className="hero-ctas">
            <a href={projectHref} className="btn">Start a project</a>
            <a href={CONFIG.linkedinUrl} className="btn outline" target="_blank" rel="noreferrer">
              Connect on LinkedIn
            </a>
          </div>
          <div className="contact-links">
            <a href={`mailto:${CONFIG.email}`}>Email — <b>{CONFIG.email}</b></a>
            <a href={`https://wa.me/${CONFIG.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
              WhatsApp — <b>{CONFIG.phone}</b>
            </a>
            <a href={CONFIG.githubUrl} target="_blank" rel="noreferrer">GitHub — <b>/{CONFIG.github}</b></a>
            <a href={CONFIG.resumeUrl} target="_blank" rel="noreferrer">Hiring? — <b>Resume</b></a>
          </div>
        </div>
      </div>
    </section>
  );
}
