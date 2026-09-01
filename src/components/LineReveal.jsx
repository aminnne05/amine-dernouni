import { useEffect, useState } from "react";
import useReady from "../hooks/useReady";

/*
  Chaque ligne de texte monte depuis un masque, l'une après l'autre.
  Les styles vivent dans index.css (.line-mask). Le mouvement est
  désactivé si l'utilisateur a demandé moins d'animations.
*/
export default function LineReveal({
  lines = [],
  delay = 0,
  stagger = 110,
  className = "",
}) {
  const ready = useReady();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(timer);
  }, [ready, delay]);

  return (
    <>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`line-mask ${shown ? "is-in" : ""} ${className}`}
        >
          <span style={{ transitionDelay: `${i * stagger}ms` }}>{line}</span>
        </span>
      ))}
    </>
  );
}
