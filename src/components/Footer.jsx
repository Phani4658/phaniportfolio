import { CONFIG } from "../config/site.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} {CONFIG.name}. Designed with care, built by hand.</span>
        <span>
          <a href={CONFIG.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          {"  ·  "}
          <a href={CONFIG.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
          {"  ·  "}
          <a href={`mailto:${CONFIG.email}`}>Email</a>
        </span>
      </div>
    </footer>
  );
}
