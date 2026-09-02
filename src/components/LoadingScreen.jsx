import { useEffect, useState } from "react";
import LogoHorizontal from "../assets/logo/logo-horizontal.svg?react";

/*
  Le logo monte tout de suite depuis son masque, marque un temps très
  court, puis le panneau se retire vers le haut. L'ensemble tient en
  deux secondes : l'écran d'attente ne doit jamais devenir le spectacle.
*/
export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState("enter"); // enter -> hold -> exit

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const court = setTimeout(() => onDone?.(), 400);
      return () => clearTimeout(court);
    }
    const t1 = setTimeout(() => setPhase("hold"), 60);
    const t2 = setTimeout(() => setPhase("exit"), 1250);
    const t3 = setTimeout(() => onDone?.(), 1950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] overflow-hidden ${
        phase === "exit" ? "pointer-events-none" : ""
      }`}
      style={{
        transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 700ms var(--ease-quint)",
      }}
    >
      <div className="flex h-full w-full items-center justify-center bg-ivoire">
        <div className="w-[42vw] max-w-[320px] overflow-hidden">
          <div
            style={{
              transform:
                phase === "enter" ? "translateY(105%)" : "translateY(0)",
              opacity: phase === "enter" ? 0 : 1,
              transition:
                "transform 850ms var(--ease-quint), opacity 500ms ease-out",
            }}
          >
            <LogoHorizontal className="h-auto w-full text-encre" />
          </div>
        </div>
      </div>
    </div>
  );
}
