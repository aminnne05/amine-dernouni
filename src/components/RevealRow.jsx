import { useRef, useState } from "react";
import Reveal from "./Reveal";

const BOX_WIDTH = 288;

/*
  Ligne "titre + numéro" avec un petit rectangle qui suit le curseur
  au survol et affiche le paragraphe associé. Utilisée pour Services et
  Avec qui je collabore — même structure, thème clair/sombre au choix.
*/
export default function RevealRow({ title, number, paragraph, theme = "light", delay = 0 }) {
  const isDark = theme === "dark";
  const border = isDark ? "border-ivoire/15" : "border-encre/15";
  const idleColor = isDark ? "text-ivoire/45" : "text-taupe";
  const hoverColor = isDark ? "group-hover:text-ivoire" : "group-hover:text-encre";
  const box = isDark
    ? "border-ivoire bg-ivoire text-encre"
    : "border-encre bg-encre text-ivoire";

  const rowRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    const rect = rowRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left + 28;
    if (x + BOX_WIDTH > rect.width) {
      x = e.clientX - rect.left - BOX_WIDTH - 28;
    }
    setPos({ x, y: e.clientY - rect.top });
  };

  return (
    <Reveal
      delay={delay}
      className={`group border-t ${border} py-6 last:border-b md:py-8`}
    >
      <div
        ref={rowRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative flex items-center justify-between gap-6"
      >
        <h3
          className={`text-3xl font-medium tracking-[-0.03em] transition-colors duration-300 md:text-6xl ${idleColor} ${hoverColor}`}
        >
          {title}
        </h3>
        <span
          className={`shrink-0 text-sm font-light transition-colors duration-300 ${idleColor} ${hoverColor}`}
        >
          {number}
        </span>
        <div
          className={`pointer-events-none absolute z-20 hidden w-72 border p-4 text-sm font-light leading-relaxed transition-opacity duration-150 ease-out md:block ${box} ${
            hover ? "opacity-100" : "opacity-0"
          }`}
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translateY(-50%)",
          }}
        >
          {paragraph}
        </div>
      </div>
    </Reveal>
  );
}
