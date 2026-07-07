import { CONFIG } from "../config/site.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Journey() {
  const r = useReveal();
  return (
    <section id="journey">
      <div className="wrap section">
        <div ref={r} className="reveal">
          <div className="sec-head">
            <h2 className="headline">The journey so far.</h2>
          </div>
          <div className="journey-grid">
            <div>
              <h3 className="tl-h">Experience</h3>
              <div className="tl">
                {CONFIG.experience.map((e) => (
                  <div className="tl-item" key={e.title}>
                    <div className="meta">{e.meta}</div>
                    <h4>{e.title}</h4>
                    <p>{e.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="tl-h">Highlights</h3>
              <div className="tl">
                {CONFIG.highlights.map((h) => (
                  <div className="tl-item" key={h.title}>
                    <div className="meta">{h.meta}</div>
                    <h4>{h.title}</h4>
                    <p>{h.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="achievements">
            <h3 className="tl-h">Achievements</h3>
            <div className="ach-grid">
              {CONFIG.achievements.map((a) => (
                <div className="ach" key={a.title}>
                  <span className="ach-em" aria-hidden="true">{a.icon}</span>
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
