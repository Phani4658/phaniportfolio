import { CONFIG } from "../config/site.js";
import FloatingTags from "./FloatingTags.jsx";
import WordRotator from "./WordRotator.jsx";

/* ---------------------------------------------------------------------------
   Hero — keynote-style, with skills & interests drifting as pills around
   the centered name (Wellfound-style word cloud).
--------------------------------------------------------------------------- */
export default function Hero() {
  return (
    <header className="hero" id="top">
      <FloatingTags />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap hero-inner">
        <span className="eyebrow reveal is-in">{CONFIG.role}</span>
        <h1 className="display reveal is-in" style={{ "--d": "100ms" }}>
          Hi, I'm {CONFIG.firstName}.
          <br />
          <span className="hero-line2">
            I build software that <WordRotator words={CONFIG.heroWords} />
          </span>
        </h1>
        <p className="sub reveal is-in" style={{ "--d": "220ms" }}>
          Backend-focused full-stack developer. I build production web platforms
          and AI features — mostly on fintech systems used by real customers.
        </p>
        <div className="hero-ctas reveal is-in" style={{ "--d": "340ms" }}>
          <a href="#work" className="btn">See my work</a>
          <a
            href={CONFIG.resumeUrl}
            className="btn outline"
            target="_blank"
            rel="noreferrer"
            download="Phani-Peddapalem-Resume.pdf"
          >
            Download resume
          </a>
        </div>
        <div className="hero-note reveal is-in" style={{ "--d": "460ms" }}>
          <span className="pulse" /> Open to full-time roles &amp; freelance projects
        </div>
      </div>
    </header>
  );
}
