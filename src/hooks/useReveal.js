import { useEffect, useRef, useState } from "react";

/*
  Se déclenche une seule fois, quand l'élément entre dans le cadre, et
  ne revient jamais en arrière : rien ne doit s'effacer parce qu'on a
  défilé trop vite. Désactivé si l'utilisateur demande moins d'animations.
*/
export default function useReveal({ threshold = 0.12, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
