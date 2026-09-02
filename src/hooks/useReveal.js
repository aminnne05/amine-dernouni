import { useEffect, useRef, useState } from "react";
import useReady from "./useReady";
import { surveille } from "./revealBus";

/*
  Se déclenche une seule fois, quand l'élément entre dans le cadre, et ne
  revient jamais en arrière : rien ne doit s'effacer parce qu'on a défilé
  trop vite. Rien ne démarre non plus tant que l'écran de chargement
  couvre la page.

  Deux déclencheurs, volontairement : IntersectionObserver pour la
  finesse, et le balayage partagé (revealBus) comme filet. Un visuel
  masqué qui ne serait jamais révélé serait un visuel perdu.
*/
export default function useReveal({ threshold = 0.12 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const ready = useReady();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    let vivant = true;
    const reveler = () => {
      if (vivant) setInView(true);
    };

    const arrete = surveille(el, reveler);

    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveler();
        },
        { threshold, rootMargin: "0px 0px -8% 0px" }
      );
      observer.observe(el);
    }

    return () => {
      vivant = false;
      arrete();
      observer?.disconnect();
    };
  }, [threshold]);

  return [ref, inView && ready];
}
