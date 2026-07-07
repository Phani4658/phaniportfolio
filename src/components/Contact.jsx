import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";
import Particles3D from "./Particles3D.jsx";

/* ---------------------------------------------------------------------------
   Contact — second 3D scene behind the closer (denser, softer).
--------------------------------------------------------------------------- */
export default function Contact() {
  const r = useReveal();
  return (
    <section className="contact" id="contact">
      <Particles3D count={1800} radius={2.2} opacity={0.7} />
      <div className="wrap section" style={{ position: "relative", zIndex: 1 }}>
        <div ref={r} className="reveal">
          <h2 className="display" style={{ fontSize: "clamp(2.2rem,6vw,4.4rem)" }}>
            Let's build something <span className="grad-text shimmer">great.</span>
          </h2>
          <p className="sub">
            Hiring for a role, or have a project in mind? I reply within one
            working day.
          </p>
          <div className="hero-ctas">
            <a href={`mailto:${CONFIG.email}`} className="btn">Email me</a>
            <a href={CONFIG.linkedinUrl} className="btn outline" target="_blank" rel="noreferrer">
              Connect on LinkedIn
            </a>
          </div>
          <div className="contact-links">
            <a href={`mailto:${CONFIG.email}`}>Email — <b>{CONFIG.email}</b></a>
            <a href={`tel:${CONFIG.phone.replace(/\s/g, "")}`}>Phone — <b>{CONFIG.phone}</b></a>
            <a href={CONFIG.githubUrl} target="_blank" rel="noreferrer">GitHub — <b>/{CONFIG.github}</b></a>
          </div>
        </div>
      </div>
    </section>
  );
}
