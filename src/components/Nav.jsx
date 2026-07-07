import { CONFIG } from "../config/site.js";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-name">{CONFIG.name}</a>
        <div className="nav-links">
          <a href="#profile">Overview</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#journey">Journey</a>
          <a href="#beyond">Beyond</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href={CONFIG.resumeUrl} target="_blank" rel="noreferrer">
          Resume
        </a>
      </div>
    </nav>
  );
}
