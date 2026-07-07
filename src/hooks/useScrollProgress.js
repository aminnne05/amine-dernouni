import { useEffect, useState } from "react";

/*
  Renvoie une valeur 0 → 1 selon la position de scroll,
  sur une distance donnée en px depuis le haut de page.
*/
export default function useScrollProgress(distance = 400) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const p = Math.min(window.scrollY / distance, 1);
        setProgress(p);
        raf = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [distance]);

  return progress;
}
