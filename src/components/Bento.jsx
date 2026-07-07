import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";
import Tilt from "./Tilt.jsx";
import Counter from "./Counter.jsx";

/* ---------------------------------------------------------------------------
   Bento — at-a-glance profile with 3D tilt on each cell.
   Cells stagger in one by one (--i drives the animation delay).
--------------------------------------------------------------------------- */
function Cell({ span, i, children }) {
  return (
    <Tilt className={span} max={5} style={{ "--i": i }}>
      <div className="cell">{children}</div>
    </Tilt>
  );
}

export default function Bento() {
  const r = useReveal();
  return (
    <section id="profile">
      <div className="wrap">
        <div ref={r} className="bento stagger">
          <Cell span="c-span4" i={0}>
            <span className="eyebrow">About</span>
            <h3>Rough idea in, working product out.</h3>
            <p>
              I work across the full stack — front-end, APIs, data, deployments —
              but I go deepest on the backend: fintech-grade services on Java,
              Spring Boot, Kafka, and Kubernetes, plus the AI features layered on
              top. You talk to the person writing the code.
            </p>
            <div className="chipline">
              <span>Full-stack</span>
              <span>AI integration</span>
              <span>Fintech-grade</span>
            </div>
          </Cell>
          <Cell span="c-span2" i={1}>
            <span className="eyebrow">Experience</span>
            <Counter to={2} suffix=" yrs" className="big grad-text shimmer" />
            <p>Building and running software in production.</p>
          </Cell>
          <Cell span="c-span2" i={2}>
            <span className="eyebrow">Status</span>
            <h3>Open to work</h3>
            <p>Full-time roles and select freelance projects.</p>
          </Cell>
          <Cell span="c-span2" i={3}>
            <span className="eyebrow">Base</span>
            <h3>{CONFIG.location}</h3>
            <p>Comfortable with remote and distributed teams.</p>
          </Cell>
          <Cell span="c-span2" i={4}>
            <span className="eyebrow">Focus</span>
            <h3>AI in production</h3>
            <p>Real features people use — not demos.</p>
          </Cell>
          {CONFIG.funFacts.map((f, i) => (
            <Cell span="c-span2" i={5 + i} key={f.title}>
              <span className="eyebrow">{f.eyebrow}</span>
              <h3>{f.title}</h3>
              <p>{f.sub}</p>
            </Cell>
          ))}
        </div>
      </div>
    </section>
  );
}
