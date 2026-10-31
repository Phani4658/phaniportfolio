import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";
import Tilt from "./Tilt.jsx";

/* ---------------------------------------------------------------------------
   Services — what clients can hire me for. Dark section, one tilted card
   per offer, each ending in a pre-filled "Get a quote" email.
--------------------------------------------------------------------------- */
const quoteHref = (title) =>
  `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Project enquiry: ${title}`)}`;

export default function Services() {
  const r = useReveal();
  const rGrid = useReveal();
  return (
    <section id="services">
      <div className="wrap section" style={{ paddingTop: 0 }}>
        <div ref={r} className="sec-head reveal">
          <h2 className="headline">What I can build for you.</h2>
          <p className="sub">
            Fixed scope, clear timeline, and you talk directly to the person
            writing the code.
          </p>
        </div>
        <div ref={rGrid} className="svc-grid stagger">
          {CONFIG.services.map((s, i) => (
            <Tilt key={s.title} max={5} style={{ "--i": i }}>
              <div className="cell svc">
                <span className="eyebrow">{s.eyebrow}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="svc-list">
                  {s.includes.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="svc-meta">
                  <span>{s.timeline}</span>
                  <span>Proof: {s.proof}</span>
                </div>
                <a className="more" href={quoteHref(s.title)}>
                  <span className="t">Get a quote</span> ›
                </a>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
