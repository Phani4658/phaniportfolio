import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   Magnetic — wraps a button/link so it's gently pulled toward the cursor
   and springs back on leave. Wrapper-level transform, so it composes with
   the child's own hover scale. Disabled on touch and reduced motion.
--------------------------------------------------------------------------- */
export default function Magnetic({ children, strength = 0.32, className = "" }) {
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
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transition = "transform .1s linear";
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    el.style.transition = "transform .55s cubic-bezier(.28,.9,.32,1)";
    el.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
