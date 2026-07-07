import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Skills() {
  const r = useReveal();
  const rGrid = useReveal();
  return (
    <section className="on-light" id="skills" style={{ background: "#eaeaee" }}>
      <div className="wrap section">
        <div ref={r} className="sec-head reveal">
          <h2 className="headline">The toolkit.</h2>
          <p className="sub">
            Strongest on the backend and integrations, with solid range across
            the frontend, cloud, and AI tooling.
          </p>
        </div>
        <div ref={rGrid} className="skill-grid stagger">
          {CONFIG.skills.map((s, i) => (
            <div key={s.label} className="skill" style={{ "--i": i }}>
              <h4>{s.label}</h4>
              <ul>
                {s.items.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
