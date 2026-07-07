import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Tilt — pointer-tracked 3D perspective tilt for cards.
   Transform-only (GPU cheap). Disabled on touch and reduced motion.
   Also publishes --gx/--gy (pointer position in %) as CSS variables so the
   card inside can render a glare highlight that follows the cursor.
--------------------------------------------------------------------------- */
export default function Tilt({ children, max = 6, className = "", style = {} }) {
  const ref = useRef(null);
  const enabled = useRef(true);

  useEffect(() => {
    enabled.current =
      !window.matchMedia("(pointer:coarse)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const onMove = (e) => {
    if (!enabled.current) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
    el.style.transition = "transform .08s linear";
    el.style.transform =
      `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) ` +
      `rotateY(${(px * max).toFixed(2)}deg) translateY(-3px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    el.style.transition = "transform .55s cubic-bezier(.28,.9,.32,1)";
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
