import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";

/* ---------------------------------------------------------------------------
   Beyond — the human note, as a centered editorial statement: a bold
   pull-quote + a short bio. Interests live in the hero tag-cloud, so they're
   deliberately not repeated here.
--------------------------------------------------------------------------- */
export default function Beyond() {
  const r = useReveal();
  const b = CONFIG.beyond;

  return (
    <section className="on-light" id="beyond">
      <div className="wrap section">
        <div ref={r} className="reveal beyond-statement">
          <span className="eyebrow">Beyond the code</span>
          <blockquote className="beyond-quote">
            {b.quote} <span className="grad-text">{b.quoteAccent}</span>
          </blockquote>
          <div className="beyond-body">
            {b.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="beyond-p">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
