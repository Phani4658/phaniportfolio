import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";
import Tilt from "./Tilt.jsx";

/* ---------------------------------------------------------------------------
   Work — light section. Tilted gradient feature card + tilted project cards.
--------------------------------------------------------------------------- */
export default function Work() {
  const r = useReveal();
  const rGrid = useReveal();
  const featured = CONFIG.projects.find((p) => p.featured);
  const rest = CONFIG.projects.filter((p) => !p.featured);
  return (
    <section className="on-light" id="work">
      <div className="wrap section">
        <div ref={r} className="sec-head reveal">
          <h2 className="headline">Work that made it to users.</h2>
          <p className="sub">
            A few things I've shipped — production systems at work, and client
            sites on the side. Happy to walk through any of it.
          </p>
        </div>
        <div className="proj-zone">
          {featured && (
            <Tilt max={2.5}>
              <a href={featured.link} className="feature">
                <span className="eyebrow">{featured.eyebrow}</span>
                <h3>{featured.title}</h3>
                <p>{featured.desc}</p>
                <ul className="tagrow">
                  {featured.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <span className="more"><span className="t">{featured.linkLabel}</span> ›</span>
              </a>
            </Tilt>
          )}
          <div ref={rGrid} className="proj-grid stagger">
            {rest.map((p, i) => {
              const external = p.link.startsWith("http");
              return (
                <Tilt key={p.title} max={5} style={{ "--i": i }}>
                  <div className="proj">
                    <span className="eyebrow">{p.eyebrow}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <ul className="tagrow">
                      {p.tags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                    <div className="linkrow">
                      <a
                        className="more"
                        href={p.link}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        <span className="t">{p.linkLabel}</span> ›
                      </a>
                      {p.repo && (
                        <a className="more" href={p.repo} target="_blank" rel="noreferrer">
                          <span className="t">GitHub</span> ›
                        </a>
                      )}
                    </div>
                  </div>
                </Tilt>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
