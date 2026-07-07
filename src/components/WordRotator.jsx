import { useEffect, useState } from "react";

/* ---------------------------------------------------------------------------
   WordRotator — cycles through a list of words with a small 3D flip-in.
   Under prefers-reduced-motion it stays on the first word.
--------------------------------------------------------------------------- */
export default function WordRotator({ words, interval = 2600 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="word-rotator">
      <span key={i} className="word-in grad-text shimmer">{words[i]}</span>
    </span>
  );
}
