import { useEffect, useRef } from "react";
import { CONFIG } from "../config/site.js";

/* ---------------------------------------------------------------------------
   FloatingTags — a Wellfound-style word cloud for the hero. Your skills and
   interests drift as glass pills around the centered name, arranged in three
   depth layers (far = dim/small, near = solid/large) and nudged by a gentle
   cursor parallax. Kept in the Apple dark aesthetic: dark blurred pills, no
   pure white.

   Layout: positions are hand-placed (below) around the center so the field
   stays balanced and never crowds the headline. Labels are pulled from
   CONFIG.skills + CONFIG.beyond.facets, so editing content just works.

   Motion: each pill bobs on its own timing (CSS); the whole field parallaxes
   to the pointer (JS, one CSS var per axis). Disabled on touch and under
   prefers-reduced-motion — then pills are simply placed, no drift, no
   parallax.
--------------------------------------------------------------------------- */

// { left%, top%, layer } — layer 0 = far/dim, 1 = mid, 2 = near/solid.
// `m` marks the pills kept on small screens (the rest hide to avoid clutter).
const SLOTS = [
  { left: 20, top: 25, layer: 1, m: true },
  { left: 40, top: 19, layer: 0 },
  { left: 60, top: 18, layer: 1, m: true },
  { left: 79, top: 23, layer: 0, m: true },
  { left: 14, top: 36, layer: 0 },
  { left: 29, top: 33, layer: 1, m: true },
  { left: 71, top: 32, layer: 2, m: true },
  { left: 85, top: 39, layer: 1 },
  { left: 13, top: 48, layer: 0, m: true },
  { left: 19, top: 60, layer: 2, m: true },
  { left: 81, top: 50, layer: 1, m: true },
  { left: 87, top: 61, layer: 0 },
  { left: 16, top: 74, layer: 1, m: true },
  { left: 33, top: 79, layer: 0 },
  { left: 65, top: 77, layer: 2, m: true },
  { left: 82, top: 76, layer: 0 },
  { left: 26, top: 69, layer: 1, m: true },
  { left: 46, top: 83, layer: 0 },
  { left: 57, top: 84, layer: 1 },
  { left: 74, top: 67, layer: 0 },
  { left: 36, top: 59, layer: 0 },
  { left: 64, top: 57, layer: 1 },
];

const DEPTH = [0.4, 0.85, 1.35]; // parallax strength by layer

// Build the label pool from config: skills, interleaved with interests.
function buildLabels() {
  const skills = CONFIG.skills.flatMap((s) => s.items);
  const interests = [
    ...CONFIG.beyond.facets.map((f) => `${f.emoji} ${f.title}`),
    `📍 ${CONFIG.location}`,
  ];
  const out = [];
  let si = 0, ii = 0;
  for (let k = 0; k < SLOTS.length; k++) {
    if (k % 4 === 2 && ii < interests.length) out.push(interests[ii++]);
    else out.push(skills[si++ % skills.length]);
  }
  return out;
}

export default function FloatingTags() {
  const fieldRef = useRef(null);
  const labels = buildLabels();

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    if (
      window.matchMedia("(pointer:coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => {
      tx = -((e.clientX / window.innerWidth) * 2 - 1);
      ty = -((e.clientY / window.innerHeight) * 2 - 1);
      if (!raf) raf = requestAnimationFrame(ease);
    };
    const ease = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      field.style.setProperty("--mx", cx.toFixed(3));
      field.style.setProperty("--my", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001
        ? requestAnimationFrame(ease)
        : 0;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={fieldRef} className="tag-field" aria-hidden="true">
      {SLOTS.map((s, i) => (
        <div
          key={i}
          className={`tag-anchor l${s.layer}${s.m ? " keep" : ""}`}
          style={{ left: `${s.left}%`, top: `${s.top}%`, "--depth": DEPTH[s.layer] }}
        >
          <div
            className="tag-bob"
            style={{ "--dur": `${6 + (i % 5)}s`, "--delay": `${-(i % 8)}s` }}
          >
            <span className="float-tag">{labels[i]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
